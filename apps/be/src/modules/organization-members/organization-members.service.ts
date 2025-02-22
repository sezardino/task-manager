import { Injectable } from '@nestjs/common';
import { getPaginationData } from 'src/common/utils/pagination';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PrismaTransaction } from '../utils/prisma/types';
import { CreateOrganizationMemberInput } from './dto/create-organization-member.input';
import { OrganizationMembersInput } from './dto/organization-members.input';
import { GqlOrganizationMember } from './entities/organization-member.entity';
import { OrganizationMembersPayload } from './payload/organization-members.payload';

@Injectable()
export class OrganizationMembersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateOrganizationMemberInput, trx?: PrismaTransaction) {
    const prisma = trx ? trx : this.prismaService;

    await prisma.organizationMember.create({
      data: {
        role: input.role,
        organization: { connect: { id: input.organizationId } },
        user: { connect: { id: input.userId } },
      },
    });
  }

  async one(memberId: string): Promise<GqlOrganizationMember> {
    const member = await this.prismaService.organizationMember.findUnique({
      where: { id: memberId },
      include: {
        user: { select: { email: true, lastName: true, firstName: true } },
      },
    });

    return {
      id: member.id,
      role: member.role,
      email: member.user.email,
      firstName: member.user.firstName,
      lastName: member.user.lastName,
    };
  }

  async list(
    input: OrganizationMembersInput,
  ): Promise<OrganizationMembersPayload> {
    const membersCount = await this.prismaService.organizationMember.count({
      where: { organizationId: input.organizationId },
    });

    const { meta, skip } = getPaginationData(
      membersCount,
      input.page,
      input.limit,
    );

    const members = await this.prismaService.organizationMember.findMany({
      where: { organizationId: input.organizationId },
      include: { user: true },
      skip,
      take: input.limit,
    });

    const formattedMembers = members.map((m) => ({
      id: m.id,
      ...m.user,
      role: m.role,
    }));

    return { meta, members: formattedMembers };
  }
}
