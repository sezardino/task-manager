import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateTaskPayload {
  @Field()
  id: string;
}
