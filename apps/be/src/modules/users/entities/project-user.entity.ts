import { Field, ObjectType, PickType, registerEnumType } from '@nestjs/graphql';
import { OrganizationRole, ProjectRole, UserRole } from '@prisma/client';
import { GqlUser } from './user.entity';

registerEnumType(ProjectRole, { name: 'ProjectRole' });

@ObjectType()
export class GqlProjectUser extends PickType(GqlUser, [
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

  @Field(() => ProjectRole)
  projectRole: ProjectRole;
}
