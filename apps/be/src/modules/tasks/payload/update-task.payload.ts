import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTaskPayload {
  @Field()
  id: string;
}
