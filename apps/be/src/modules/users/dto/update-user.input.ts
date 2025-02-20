import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateOwnerUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateOwnerUserInput) {
  @Field()
  id: string;
}
