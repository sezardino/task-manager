import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class ProjectUsersInput extends PaginationInput {
  @Field()
  organizationId: string;

  @Field()
  projectId: string;
}
