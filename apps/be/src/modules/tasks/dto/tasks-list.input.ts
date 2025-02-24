import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class TasksListInput {
  @Field()
  @IsMongoId()
  projectId: string;

  @Field()
  @IsMongoId()
  organizationId: string;
}
