import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationPayload } from 'src/common/payload/pagination.payload';
import { GqlOrganizationUser } from '../entities/organization-user.entity';

@ObjectType()
export class OrganizationUsersPayload extends PaginationPayload {
  @Field(() => [GqlOrganizationUser])
  users: GqlOrganizationUser[];
}
