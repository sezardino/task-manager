import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class OneTasksInput {
  @Field()
  @IsMongoId()
  id: string;

  @Field()
  @IsMongoId()
  projectId: string;

  @Field()
  @IsMongoId()
  organizationId: string;
}
