import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { OneTasksInput } from './dto/one-tasks.input';
import { TasksListInput } from './dto/tasks-list.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { GqlTask } from './entities/task.entity';
import { CreateTaskPayload } from './payload/create-task.payload';
import { TasksListPayload } from './payload/tasks-list.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';

type ValidateProjectInput = {
  organizationId: string;
  projectId: string;
  assigneeId?: string;
  taskId?: string;
};

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  private async validateProject(input: ValidateProjectInput) {
    const { organizationId, projectId, assigneeId, taskId } = input;

    const project = await this.prismaService.project.findFirst({
      where: {
        id: projectId,
        organizationId,
        members: assigneeId ? { some: { userId: assigneeId } } : undefined,
        tasks: taskId ? { some: { id: taskId } } : undefined,
      },
    });

    if (!project) throw new NotFoundException('Project not found');
  }

  async create(input: CreateTaskInput): Promise<CreateTaskPayload> {
    const { assigneeId, organizationId, projectId, title, description } = input;

    await this.validateProject({
      organizationId,
      projectId,
      assigneeId,
    });

    const task = await this.prismaService.task.create({
      data: {
        title,
        description,
        project: { connect: { id: projectId } },
        assignee: { connect: { id: assigneeId } },
      },
    });

    return { id: task.id };
  }

  async findAll(input: TasksListInput): Promise<TasksListPayload> {
    const { organizationId, projectId } = input;

    await this.validateProject({ organizationId, projectId });

    const tasks = await this.prismaService.task.findMany({
      where: { projectId },
      include: { assignee: true },
    });

    return { tasks };
  }

  async findOne(input: OneTasksInput): Promise<GqlTask> {
    const { projectId, organizationId, id } = input;

    await this.validateProject({
      organizationId,
      projectId,
      taskId: id,
    });

    return this.prismaService.task.findUnique({
      where: { id },
      include: { assignee: true },
    });
  }

  async update(input: UpdateTaskInput): Promise<UpdateTaskPayload> {
    const {
      id,
      organizationId,
      projectId,
      title,
      description,
      assigneeId,
      status,
    } = input;

    await this.validateProject({ organizationId, projectId, taskId: id });

    const updatedTask = await this.prismaService.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        assignee: assigneeId ? { connect: { id: assigneeId } } : undefined,
      },
    });

    return { id: updatedTask.id };
  }
}
