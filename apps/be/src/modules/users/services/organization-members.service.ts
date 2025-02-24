import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPaginationData } from 'src/common/utils/pagination';
import { PrismaService } from 'src/modules/utils/prisma/prisma.service';
import { PrismaTransaction } from 'src/modules/utils/prisma/types';
import { CreateOrganizationMemberInput } from '../dto/create-organization-member.input';
import { OrganizationUserInput } from '../dto/organization-user.input';
import { OrganizationUsersInput } from '../dto/organization-users.input';
import { OrganizationUserPayload } from '../payloads/organization-user.payload';
import { OrganizationUsersPayload } from '../payloads/organization-users.payload';

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

  async one(input: OrganizationUserInput): Promise<OrganizationUserPayload> {
    const { organizationId, userId } = input;

    const member = await this.prismaService.organizationMember.findFirst({
      where: { userId, organizationId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            lastName: true,
            firstName: true,
            role: true,
          },
        },
      },
    });

    if (!member) throw new NotFoundException('Organization user not found');

    return {
      userId: member.user.id,
      email: member.user.email,
      firstName: member.user.firstName,
      lastName: member.user.lastName,
      userRole: member.user.role,
      memberId: member.id,
      organizationRole: member.role,
    };
  }

  async list(input: OrganizationUsersInput): Promise<OrganizationUsersPayload> {
    const { limit, page, organizationId, notInProjectId } = input;

    const where: Prisma.OrganizationMemberWhereInput = {
      organizationId: organizationId,
      ...(notInProjectId
        ? {
            user: {
              projectMemberships: { none: { projectId: notInProjectId } },
            },
          }
        : {}),
    };

    const membersCount = await this.prismaService.organizationMember.count({
      where,
    });

    const { meta, skip } = getPaginationData(membersCount, page, limit);

    const members = await this.prismaService.organizationMember.findMany({
      where,
      include: { user: true },
      skip,
      take: limit,
    });

    const formattedMembers = members.map((m) => ({
      email: m.user.email,
      firstName: m.user.firstName,
      userRole: m.user.role,
      lastName: m.user.lastName,
      userId: m.user.id,
      memberId: m.id,
      organizationRole: m.role,
    }));

    return { meta, users: formattedMembers };
  }
}
