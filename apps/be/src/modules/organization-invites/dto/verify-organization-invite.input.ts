import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyOrganizationInviteInput {
  @Field()
  token: string;
}
