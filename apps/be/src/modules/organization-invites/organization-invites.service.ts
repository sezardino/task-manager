import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InviteStatus, UserRole } from '@prisma/client';
import { hash, verify } from 'argon2';
import { getPaginationData } from 'src/common/utils/pagination';
import { OrganizationMembersService } from '../organization-members/organization-members.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../utils/prisma/prisma.service';
import { TokensService } from '../utils/tokens/tokens.service';
import { TokenType } from '../utils/tokens/types/params';
import { OrganizationInviteTokenPayload } from '../utils/tokens/types/payloads';
import { CreateOrganizationInviteInput } from './dto/create-organization-invite.input';
import { OrganizationInvitesInput } from './dto/organization-invites.input';
import { ProcessOrganizationInviteInput } from './dto/process-organization-invite.input';
import { VerifyOrganizationInviteInput } from './dto/verify-organization-invite.input';
import { GqlOrganizationInvite } from './entities/organization-invite.entity';
import { CreateOrganizationInvitePayload } from './payload/create-organization-invite.payload';
import { OrganizationInvitesPayload } from './payload/organization-invites.payload';
import { ProcessOrganizationInvitePayload } from './payload/process-organization-invite.payload';
import { VerifyOrganizationInvitePayload } from './payload/verify-organization-invite.payload';

@Injectable()
export class OrganizationInvitesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokensService: TokensService,
    private readonly organizationsService: OrganizationsService,
    private readonly usersService: UsersService,
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  async create(
    input: CreateOrganizationInviteInput,
  ): Promise<CreateOrganizationInvitePayload> {
    const token = await this.prismaService.$transaction(async (trx) => {
      const invite = await trx.organizationInvite.create({
        data: {
          name: input.name,
          role: input.role,
          organization: { connect: { id: input.organizationId } },
        },
      });

      const token = await this.tokensService.generate({
        type: TokenType.organizationInvite,
        payload: {
          sub: { inviteId: invite.id, organizationId: input.organizationId },
        },
      });

      await trx.organizationInvite.update({
        where: { id: invite.id },
        data: { token: await hash(token) },
      });

      return token;
    });

    return { token };
  }

  protected async validateInviteToken(token: string) {
    const payload =
      await this.tokensService.verify<OrganizationInviteTokenPayload>(
        token,
        TokenType.organizationInvite,
      );

    const invite = await this.prismaService.organizationInvite.findFirst({
      where: {
        id: payload.sub.inviteId,
        organizationId: payload.sub.organizationId,
      },
      select: { status: true, token: true, role: true, createdAt: true },
    });

    if (!invite) throw new NotFoundException('Invite not found');
    if (invite.status !== InviteStatus.PENDING)
      throw new ForbiddenException('Invite is not Pending');
    if (!invite.token)
      throw new InternalServerErrorException('Invite doest have token');

    const isTokenMatch = await verify(invite.token, token);

    if (!isTokenMatch) throw new BadRequestException('Invalid token');

    return { payload, invite };
  }

  async verify(
    input: VerifyOrganizationInviteInput,
  ): Promise<VerifyOrganizationInvitePayload> {
    const { payload, invite } = await this.validateInviteToken(input.token);

    const organizationPreview = await this.organizationsService.preview(
      payload.sub.organizationId,
    );

    return { ...organizationPreview, createdAt: invite.createdAt };
  }

  async process(
    input: ProcessOrganizationInviteInput,
  ): Promise<ProcessOrganizationInvitePayload | null> {
    if (input.accept && (!input.email || !input.password))
      throw new BadRequestException('Email or password not provided');
    if (!input.accept && (input.email || input.password))
      throw new BadRequestException(
        'Email or password passed when user try to decline invite',
      );

    const { payload, invite } = await this.validateInviteToken(input.token);

    if (!input.accept) {
      await this.prismaService.organizationInvite.update({
        where: {
          id: payload.sub.inviteId,
          organizationId: payload.sub.organizationId,
        },
        data: { status: InviteStatus.USER_REJECT, decideAt: new Date() },
      });

      return null;
    }

    const user = await this.prismaService.$transaction(async (trx) => {
      const user = await this.usersService.createUser(
        { email: input.email, password: input.password },
        UserRole.MEMBER,
        trx,
      );

      await this.organizationMembersService.create(
        {
          organizationId: payload.sub.organizationId,
          userId: user.id,
          role: invite.role,
        },
        trx,
      );

      await trx.organizationInvite.update({
        where: {
          id: payload.sub.inviteId,
          organizationId: payload.sub.organizationId,
        },
        data: {
          status: InviteStatus.USER_ACCEPT,
          decideAt: new Date(),
          acceptedBy: { connect: { id: user.id } },
        },
      });

      return user;
    });

    return { email: user.email };
  }

  async one(inviteId: string): Promise<GqlOrganizationInvite> {
    return await this.prismaService.organizationInvite.findUnique({
      where: { id: inviteId },
      select: {
        id: true,
        role: true,
        name: true,
        status: true,
        createdAt: true,
        decideAt: true,
      },
    });
  }

  async list(
    input: OrganizationInvitesInput,
  ): Promise<OrganizationInvitesPayload> {
    const invitesCount = await this.prismaService.organizationInvite.count({
      where: { organizationId: input.organizationId },
    });

    const { meta, skip } = getPaginationData(
      invitesCount,
      input.page,
      input.limit,
    );

    const invites = await this.prismaService.organizationInvite.findMany({
      where: { organizationId: input.organizationId },
      select: {
        id: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        decideAt: true,
      },
      skip,
      take: input.limit,
    });

    return { meta, invites };
  }
}
