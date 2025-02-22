import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class AllProjectsInput extends PaginationInput {
  @Field()
  @IsUUID()
  organizationId: string;
}
