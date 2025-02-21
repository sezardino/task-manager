import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrganizationRole } from '@prisma/client';

registerEnumType(OrganizationRole, { name: 'OrganizationRole' });

@InputType()
export class CreateOrganizationInviteInput {
  @Field()
  organizationId: string;

  @Field()
  name: string;

  @Field(() => OrganizationRole)
  role: OrganizationRole;
}
