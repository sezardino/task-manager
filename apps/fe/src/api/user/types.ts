import { OrganizationRole, UserRole } from "@/types/enums";
import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type CurrentUserPayload = GQLPayload<{
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}>;

export type OrganizationUser = {
  userId: string;
  memberId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  userRole: UserRole;
  memberRole: OrganizationRole;
};

export type OrganizationUsersPayload = GQLPayload<{
  organizationUsers: PaginationPayload & { users: OrganizationUser[] };
}>;

export type OrganizationUsersInput = PaginationInput & {
  organizationId: string;
};

export type OrganizationUserPayload = GQLPayload<{
  organizationUser: OrganizationUser;
}>;

export type OrganizationUserInput = PaginationInput & {
  organizationId: string;
  userId: string;
};
