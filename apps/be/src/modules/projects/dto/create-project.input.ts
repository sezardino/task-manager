import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

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
}
