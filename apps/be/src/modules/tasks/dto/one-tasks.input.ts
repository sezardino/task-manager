import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class OneTaskInput {
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
