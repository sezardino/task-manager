import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationUserInput {
  @Field()
  organizationId: string;

  @Field()
  userId: string;
}
