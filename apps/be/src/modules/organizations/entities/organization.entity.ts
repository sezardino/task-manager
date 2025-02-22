import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Owner {
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

  @Field(() => Owner)
  owner: Owner;

  @Field(() => Int)
  membersCount: number;
}
