import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string | null;

  @Field({ nullable: true })
  lastName: string | null;
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
