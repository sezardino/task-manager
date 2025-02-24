import { PaginationPayload } from 'src/common/payload/pagination.payload';
import { GqlOrganization } from '../entities/organization.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class OrganizationsListPayload extends PaginationPayload {
  @Field(() => [GqlOrganization])
  organizations: GqlOrganization[];
}
