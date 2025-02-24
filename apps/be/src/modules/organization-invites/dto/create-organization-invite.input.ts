import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrganizationRole } from '@prisma/client';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

registerEnumType(OrganizationRole, { name: 'OrganizationRole' });

@InputType()
export class CreateOrganizationInviteInput {
  @Field()
  @IsMongoId()
  organizationId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => OrganizationRole)
  @IsEnum(OrganizationRole)
  role: OrganizationRole;
}
