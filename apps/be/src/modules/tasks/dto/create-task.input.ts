import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

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
