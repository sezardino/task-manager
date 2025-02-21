import { Field, Int, ObjectType, PickType } from '@nestjs/graphql';
import { GqlOrganization } from 'src/modules/organizations/entities/organization.entity';

@ObjectType()
export class VerifyOrganizationInvitePayload extends PickType(GqlOrganization, [
  'id',
  'name',
  'owner',
] as const) {
  @Field(() => Int)
  members: number;
}
