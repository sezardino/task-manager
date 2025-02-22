import { OrganizationRole } from '@prisma/client';

export class CreateOrganizationMemberInput {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
}
