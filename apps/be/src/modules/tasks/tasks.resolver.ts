import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { OneTasksInput } from './dto/one-tasks.input';
import { TasksListInput } from './dto/tasks-list.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { GqlTask } from './entities/task.entity';
import { CreateTaskPayload } from './payload/create-task.payload';
import { UpdateTaskPayload } from './payload/update-task.payload';
import { TasksService } from './tasks.service';

@Resolver(() => GqlTask)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => CreateTaskPayload)
  createTask(@Args('input') input: CreateTaskInput) {
    return this.tasksService.create(input);
  }

  @Query(() => [GqlTask], { name: 'tasks' })
  findAll(@Args('input') input: TasksListInput) {
    return this.tasksService.findAll(input);
  }

  @Query(() => GqlTask)
  findOne(@Args('input') input: OneTasksInput) {
    return this.tasksService.findOne(input);
  }

  @Mutation(() => UpdateTaskPayload)
  updateTask(@Args('input') input: UpdateTaskInput) {
    return this.tasksService.update(input);
  }
}
