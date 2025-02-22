import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationPayload } from 'src/common/payload/pagination.payload';
import { GqlOrganizationMember } from '../entities/organization-member.entity';

@ObjectType()
export class OrganizationMembersPayload extends PaginationPayload {
  @Field(() => [GqlOrganizationMember])
  members: GqlOrganizationMember[];
}
