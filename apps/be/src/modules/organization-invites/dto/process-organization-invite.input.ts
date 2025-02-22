import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProcessOrganizationInviteInput {
  @Field()
  token: string;

  @Field(() => Boolean)
  accept: boolean;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
