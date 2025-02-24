import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddUsersToProjectPayload {
  @Field(() => Int)
  usersCount: number;
}
