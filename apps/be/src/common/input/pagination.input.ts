import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export const DEFAULT_PAGINATION_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;

@InputType()
export class PaginationInput {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) =>
    value ? Number(value) : DEFAULT_PAGINATION_PAGE_NUMBER,
  )
  @Field(() => Int)
  page: number = DEFAULT_PAGINATION_PAGE_NUMBER;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => (value ? Number(value) : DEFAULT_PAGE_LIMIT))
  @Field(() => Int)
  limit: number = DEFAULT_PAGE_LIMIT;
}
