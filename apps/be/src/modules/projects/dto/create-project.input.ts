import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ProjectRole } from '@prisma/client';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

registerEnumType(ProjectRole, { name: 'ProjectRole' });

@InputType()
class CreateProjectUser {
  @Field()
  @IsMongoId()
  id: string;

  @Field(() => ProjectRole)
  @IsEnum(ProjectRole)
  role: ProjectRole;
}

@InputType()
export class CreateProjectInput {
  @Field()
  @IsMongoId()
  organizationId: string;

  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => [CreateProjectUser])
  users: CreateProjectUser[];
}
