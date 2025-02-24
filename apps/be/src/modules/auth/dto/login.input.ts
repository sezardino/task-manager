import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'User email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { description: 'User password to verify login' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
