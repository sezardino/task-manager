import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganizationRole } from '@prisma/client';

registerEnumType(OrganizationRole, { name: 'OrganizationRole' });

@ObjectType()
export class GqlOrganizationMember {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string | null;

  @Field({ nullable: true })
  lastName: string | null;

  @Field(() => OrganizationRole)
  role: OrganizationRole;
}
