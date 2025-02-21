import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InviteStatus, OrganizationRole } from '@prisma/client';

registerEnumType(InviteStatus, { name: 'InviteStatus' });

@ObjectType()
export class GqlOrganizationInvite {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => InviteStatus)
  status: InviteStatus;

  @Field(() => OrganizationRole)
  role: OrganizationRole;
}
