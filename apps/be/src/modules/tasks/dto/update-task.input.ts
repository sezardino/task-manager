import { Field, InputType, PickType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PickType(CreateTaskInput, [
  'projectId',
  'organizationId',
] as const) {
  @Field()
  @IsMongoId()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  title?: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsMongoId()
  @IsOptional()
  assigneeId?: string;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
