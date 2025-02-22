import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class OneOrganizationInput {
  @Field()
  @IsMongoId()
  organizationId: string;
}
