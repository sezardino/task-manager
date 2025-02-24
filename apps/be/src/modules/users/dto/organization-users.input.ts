import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class OrganizationUsersInput extends PaginationInput {
  @Field()
  @IsMongoId()
  organizationId: string;

  @Field({ nullable: true })
  @IsMongoId()
  @IsOptional()
  notInProjectId?: string;
}
