import { Field, ObjectType } from '@nestjs/graphql';
import { GqlTask } from '../entities/task.entity';

@ObjectType()
export class TasksListPayload {
  @Field(() => [GqlTask])
  tasks: GqlTask[];
}
