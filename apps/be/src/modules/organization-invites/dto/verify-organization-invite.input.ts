import { Field, InputType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';

@InputType()
export class VerifyOrganizationInviteInput {
  @Field()
  @IsJWT()
  token: string;
}
