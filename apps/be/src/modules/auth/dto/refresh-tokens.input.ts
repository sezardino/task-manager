import { Field, InputType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';

@InputType()
export class RefreshTokensInput {
  @Field()
  @IsJWT()
  token: string;
}
