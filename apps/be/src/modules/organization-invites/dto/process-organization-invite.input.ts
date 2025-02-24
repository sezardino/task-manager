import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsJWT,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class ProcessOrganizationInviteInput {
  @Field()
  @IsJWT()
  token: string;

  @Field(() => Boolean)
  @IsBoolean()
  accept: boolean;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  password?: string;
}
