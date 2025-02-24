import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class OneProjectInput {
  @Field()
  @IsMongoId()
  organizationId: string;

  @Field()
  @IsMongoId()
  projectId: string;
}
