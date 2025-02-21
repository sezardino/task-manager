import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationPayload } from 'src/common/payload/pagination.payload';
import { GqlOrganizationInvite } from '../entities/organization-invite.entity';

@ObjectType()
export class OrganizationInvitesPayload extends PaginationPayload {
  @Field(() => [GqlOrganizationInvite])
  invites: GqlOrganizationInvite[];
}
