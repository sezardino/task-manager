import { Field, InputType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @Field()
  @IsMongoId()
  assigneeId: string;

  @Field()
  @IsMongoId()
  projectId: string;

  @Field()
  @IsMongoId()
  organizationId: string;
}
