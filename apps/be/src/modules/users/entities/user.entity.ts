import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlUser {
  @Field()
  id: string;

  @Field()
  email: string;
}
