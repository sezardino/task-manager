import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class OrganizationUsersInput extends PaginationInput {
  @Field()
  organizationId: string;
}
