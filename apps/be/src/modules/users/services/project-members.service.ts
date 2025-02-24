import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRole } from '@prisma/client';
import { getPaginationData } from 'src/common/utils/pagination';
import { AddUsersToProjectPayload } from '../../projects/payload/add-users-to-project.payload';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { AddUsersToProjectInput } from '../dto/add-users-to-project.input';
import { ProjectUsersInput } from '../dto/project-users.input';
import { ProjectUsersPayload } from '../payloads/project-users.payload';

@Injectable()
export class ProjectMembersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addUsers(
    input: AddUsersToProjectInput,
  ): Promise<AddUsersToProjectPayload> {
    const { organizationId, projectId, users } = input;

    const userIds = users.map((u) => u.id);

    const project = await this.prismaService.project.findFirst({
      where: { organizationId, id: projectId },
    });

    if (!project) throw new NotFoundException('Project Not Found');

    const usersList = await this.prismaService.user.findMany({
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

    const usersListIds = usersList.map((u) => u.id);
    const checkedList = users.filter((u) => usersListIds.includes(u.id));

    await this.prismaService.projectMember.createMany({
      data: checkedList.map((u) => ({
        userId: u.id,
        role: ProjectRole.MEMBER,
        projectId,
      })),
    });

    return {
      usersCount: checkedList.length,
    };
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
            organizationMemberships: { where: { organizationId } },
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
