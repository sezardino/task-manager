import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokensInput {
  @Field()
  token: string;
}
