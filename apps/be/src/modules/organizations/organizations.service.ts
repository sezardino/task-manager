import { Injectable } from '@nestjs/common';
import { OrganizationRole } from '@prisma/client';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { GqlOrganization } from './entities/organization.entity';

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
}
