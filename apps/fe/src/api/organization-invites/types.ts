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

export type VerifyOrganizationInvitePayload = GQLPayload<{
  verifyOrganizationInvite: {
    members: number;
    name: string;
    createdAt: string;
    owner: {
      email: string;
      firstName: string | null;
      lastName: string | null;
    };
  };
}>;

export type VerifyOrganizationInviteInput = {
  token: string;
};

export type ProcessOrganizationInvitePayload = GQLPayload<{
  processOrganizationInvite: {
    email: string;
  };
}>;

export type ProcessOrganizationInviteInput = {
  token: string;
  accept: boolean;
  email?: string;
  password?: string;
};
