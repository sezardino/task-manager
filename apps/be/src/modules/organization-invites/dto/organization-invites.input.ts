import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class OrganizationInvitesInput extends PaginationInput {
  @Field()
  @IsMongoId()
  organizationId: string;
}
