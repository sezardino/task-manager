import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class OrganizationInvitesInput extends PaginationInput {
  @Field()
  organizationId: string;
}
