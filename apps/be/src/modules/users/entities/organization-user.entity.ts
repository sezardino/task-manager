import { Field, ObjectType, PickType, registerEnumType } from '@nestjs/graphql';
import { OrganizationRole, UserRole } from '@prisma/client';
import { GqlUser } from './user.entity';

registerEnumType(OrganizationRole, { name: 'OrganizationRole' });

@ObjectType()
export class GqlOrganizationUser extends PickType(GqlUser, [
  'email',
  'firstName',
  'lastName',
] as const) {
  @Field()
  userId: string;

  @Field()
  memberId: string;

  @Field(() => UserRole)
  userRole: UserRole;

  @Field(() => OrganizationRole)
  organizationRole: OrganizationRole;
}
