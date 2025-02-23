import { Field, InputType } from '@nestjs/graphql';
import { ProjectRole } from '@prisma/client';
import { IsEnum, IsMongoId } from 'class-validator';

@InputType()
class UserToAdd {
  @Field()
  @IsMongoId({ each: true })
  id: string;

  @Field(() => ProjectRole)
  @IsEnum(ProjectRole)
  role: ProjectRole;
}

@InputType()
export class AddUsersToProjectInput {
  @Field()
  @IsMongoId()
  organizationId: string;

  @Field()
  @IsMongoId()
  projectId: string;

  @Field(() => [UserToAdd])
  users: UserToAdd[];
}
