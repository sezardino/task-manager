import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegistrationPayload {
  @Field()
  email: string;
}
