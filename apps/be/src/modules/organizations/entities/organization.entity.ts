import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field()
  id: string;

  @Field()
  email: string;
}

@ObjectType()
export class GqlOrganization {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Member)
  owner: Member;

  @Field(() => [Member])
  members: Member[];
}
