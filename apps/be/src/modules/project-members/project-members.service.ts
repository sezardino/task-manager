import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRole } from '@prisma/client';
import { getPaginationData } from 'src/common/utils/pagination';
import { ProjectUsersInput } from '../users/dto/project-users.input';
import { ProjectUsersPayload } from '../users/payloads/project-users.payload';
import { PrismaService } from '../utils/prisma/prisma.service';
import { AddUsersToProjectInput } from './dto/add-users-to-project.input';

@Injectable()
export class ProjectMembersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addUsers(input: AddUsersToProjectInput) {
    const { organizationId, projectId, userIds } = input;

    const project = await this.prismaService.project.findFirst({
      where: { organizationId, id: projectId },
    });

    if (!project) throw new NotFoundException('Project Not Found');

    const users = await this.prismaService.user.findMany({
      where: {
        organizationMemberships: { some: { organizationId } },
        id: { in: userIds },
      },
      select: { id: true },
    });

    if (!users.length)
      throw new BadRequestException(
        'There are no users that belongs to this organization',
      );

    await this.prismaService.projectMember.createMany({
      data: users.map((u) => ({
        userId: u.id,
        role: ProjectRole.MEMBER,
        projectId,
      })),
    });
  }

  async list(input: ProjectUsersInput): Promise<ProjectUsersPayload> {
    const { limit, page, organizationId, projectId } = input;

    const where = { projectId: projectId, project: { organizationId } };

    const count = await this.prismaService.projectMember.count({
      where,
    });

    const { meta, skip } = getPaginationData(count, page, limit);

    const members = await this.prismaService.projectMember.findMany({
      where,
      include: {
        user: {
          include: {
            organizationMemberships: { where: { id: organizationId } },
          },
        },
      },
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
      organizationRole: m.user.organizationMemberships[0].role,
      projectRole: m.role,
    }));

    return {
      meta,
      users: formattedMembers,
    };
  }
}
