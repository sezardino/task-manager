import { Field, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { GqlOrganization } from 'src/modules/organizations/entities/organization.entity';

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
class Organization extends OmitType(GqlOrganization, [
  'members',
  'owner',
] as const) {}

@ObjectType()
export class GqlUser {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string | null;

  @Field({ nullable: true })
  lastName: string | null;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => [Organization])
  organizationsOwned: Organization[];

  @Field(() => [Organization])
  organizationMemberships: Organization[];
}
