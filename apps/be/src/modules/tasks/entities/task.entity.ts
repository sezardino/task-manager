import { Field, ObjectType, PickType, registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';
import { GqlUser } from 'src/modules/users/entities/user.entity';

registerEnumType(TaskStatus, { name: 'TaskStatus' });

@ObjectType()
class TaskAssignee extends PickType(GqlUser, [
  'email',
  'firstName',
  'lastName',
] as const) {}

@ObjectType()
export class GqlTask {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => TaskAssignee)
  assignee: TaskAssignee;
}
