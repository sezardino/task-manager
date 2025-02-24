import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationPayload } from 'src/common/payload/pagination.payload';
import { GqlProjectUser } from '../entities/project-user.entity';

@ObjectType()
export class ProjectUsersPayload extends PaginationPayload {
  @Field(() => [GqlProjectUser])
  users: GqlProjectUser[];
}
