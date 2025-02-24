import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateProjectInput } from './create-project.input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field()
  @IsMongoId()
  projectId: string;
}
