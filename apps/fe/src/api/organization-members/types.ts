import { UserRole } from "@/types/enums";
import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type OrganizationMember = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type OrganizationMembersPayload = GQLPayload<{
  organizationMembers: PaginationPayload & { members: OrganizationMember[] };
}>;

export type OrganizationMembersInput = PaginationInput & {
  organizationId: string;
};
