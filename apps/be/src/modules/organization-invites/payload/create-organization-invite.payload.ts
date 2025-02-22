import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateOrganizationInvitePayload {
  @Field()
  token: string;
}
