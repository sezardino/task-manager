import { Injectable, NotFoundException } from '@nestjs/common';
import { getPaginationData } from 'src/common/utils/pagination';
import { PrismaService } from '../utils/prisma/prisma.service';
import { AllProjectsInput } from './dto/all-projects.input';
import { CreateProjectInput } from './dto/create-project.input';
import { OneProjectInput } from './dto/one-project.input';
import { AllProjectsPayload } from './payload/all-projects.payload';
import { CreateObjectPayload } from './payload/create-project.payload';
import { OneProjectPayload } from './payload/one-project.payload';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    ownerId: string,
    input: CreateProjectInput,
  ): Promise<CreateObjectPayload> {
    const project = await this.prismaService.project.create({
      data: {
        name: input.name,
        description: input.description,
        organization: { connect: { id: input.organizationId } },
        owner: { connect: { id: ownerId } },
      },
      include: { owner: true, _count: { select: { members: true } } },
    });

    return {
      ...project,
      membersCount: project._count.members,
    };
  }

  async findAll(input: AllProjectsInput): Promise<AllProjectsPayload> {
    const { limit, page, organizationId } = input;

    const count = await this.prismaService.project.count({
      where: { organizationId },
    });

    const { meta, skip } = getPaginationData(count, page, limit);

    const projects = await this.prismaService.project.findMany({
      where: { organizationId },
      include: { owner: true, _count: { select: { members: true } } },
      skip,
      take: limit,
    });

    const formattedProjects = projects.map((p) => ({
      ...p,
      membersCount: p._count.members,
    }));

    return {
      meta,
      projects: formattedProjects,
    };
  }

  async findOne(input: OneProjectInput): Promise<OneProjectPayload> {
    const { organizationId, projectId } = input;

    const project = await this.prismaService.project.findFirst({
      where: { organizationId, id: projectId },
      include: { owner: true, _count: { select: { members: true } } },
    });

    if (!project) throw new NotFoundException('Project not found');

    return { ...project, membersCount: project._count.members };
  }
}
