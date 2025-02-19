import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokensPayload {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
