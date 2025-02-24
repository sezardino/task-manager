import { InputType } from '@nestjs/graphql';
import { PaginationInput } from 'src/common/input/pagination.input';

@InputType()
export class OrganizationsListInput extends PaginationInput {}
