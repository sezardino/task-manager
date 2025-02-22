import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationPayload } from 'src/common/payload/pagination.payload';
import { GqlProject } from '../entities/project.entity';

@ObjectType()
export class AllProjectsPayload extends PaginationPayload {
  @Field(() => [GqlProject])
  projects: GqlProject[];
}
