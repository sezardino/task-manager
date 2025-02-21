import { InviteStatus, OrganizationRole } from "@/types/enums";
import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type OrganizationInvite = {
  id: string;
  status: InviteStatus;
  name: string;
  role: OrganizationRole;
  createdAt: string;
  decideAt: string | null;
};

export type OrganizationInvitesPayload = GQLPayload<{
  organizationInvites: PaginationPayload & { invites: OrganizationInvite[] };
}>;

export type OrganizationInvitesInput = PaginationInput & {
  organizationId: string;
};

export type InviteUserPayload = GQLPayload<{
  createOrganizationInvite: { token: string };
}>;

export type InviteUserInput = {
  organizationId: string;
  name: string;
  role: OrganizationRole;
};
