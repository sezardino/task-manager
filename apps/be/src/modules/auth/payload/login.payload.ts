import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginPayload {
  @Field()
  email: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
