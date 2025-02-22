import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class OneProjectInput {
  @Field()
  @IsUUID()
  organizationId: string;

  @Field()
  @IsUUID()
  projectId: string;
}
