import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMeta {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
export class PaginationPayload {
  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
