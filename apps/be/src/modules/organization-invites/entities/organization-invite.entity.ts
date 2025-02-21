import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InviteStatus } from '@prisma/client';
import { GqlOrganization } from 'src/modules/organizations/entities/organization.entity';

registerEnumType(InviteStatus, { name: 'InviteStatus' });

@ObjectType()
export class GqlOrganizationInvite {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => GqlOrganization)
  organization: GqlOrganization;
}
