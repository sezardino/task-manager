import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
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

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  decideAt: Date | null;

  @Field(() => OrganizationRole)
  role: OrganizationRole;
}
