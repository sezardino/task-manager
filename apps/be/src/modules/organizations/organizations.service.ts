import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationRole, Prisma } from '@prisma/client';
import { getPaginationData } from 'src/common/utils/pagination';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { OneOrganizationInput } from './dto/one-organization.input';
import { OrganizationsListInput } from './dto/organizations-list.input';
import { GqlOrganization } from './entities/organization.entity';
import { OrganizationsListPayload } from './payload/organizations-list.payload';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    input: CreateOrganizationInput,
  ): Promise<GqlOrganization> {
    const organization = await this.prismaService.organization.create({
      data: {
        name: input.name,
        owner: { connect: { id: userId } },
        members: { create: { role: OrganizationRole.OWNER, userId } },
      },

      include: {
        _count: { select: { members: true } },
        owner: true,
      },
    });

    return {
      ...organization,
      membersCount: organization._count.members,
    };
  }

  async preview(organizationId: string) {
    const organization = await this.prismaService.organization.findUnique({
      where: { id: organizationId },
      include: {
        _count: { select: { members: true } },
        owner: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });

    return {
      id: organization.id,
      name: organization.name,
      owner: organization.owner,
      members: organization._count.members,
    };
  }

  async list(
    userId: string,
    input: OrganizationsListInput,
  ): Promise<OrganizationsListPayload> {
    const { limit, page } = input;

    const where: Prisma.OrganizationWhereInput = {
      members: { some: { userId } },
    };

    const count = await this.prismaService.organization.count({
      where,
    });

    const { meta, skip } = getPaginationData(count, page, limit);

    const organizations = await this.prismaService.organization.findMany({
      include: {
        owner: true,
        _count: { select: { members: true } },
        members: true,
      },
      where,
      skip,
      take: limit,
    });

    const formattedOrganizations = organizations.map((o) => ({
      ...o,
      membersCount: o._count.members,
    }));

    return {
      meta,
      organizations: formattedOrganizations,
    };
  }

  async one(
    userId: string,
    input: OneOrganizationInput,
  ): Promise<GqlOrganization> {
    const organization = await this.prismaService.organization.findUnique({
      where: { id: input.organizationId, members: { some: { id: userId } } },
      include: { _count: { select: { members: true } }, owner: true },
    });

    if (!organization) throw new NotFoundException('Organization not found');

    return { ...organization, membersCount: organization._count.members };
  }
}
