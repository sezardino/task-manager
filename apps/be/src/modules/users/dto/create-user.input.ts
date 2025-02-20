import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOwnerUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
