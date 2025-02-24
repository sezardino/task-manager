import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class OrganizationUserInput {
  @Field()
  @IsMongoId()
  organizationId: string;

  @Field()
  @IsMongoId()
  userId: string;
}
