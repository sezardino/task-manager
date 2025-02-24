import { UserEntity } from "@/types/entity";
import { OrganizationRole, ProjectRole, UserRole } from "@/types/enums";
import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type CurrentUserPayload = GQLPayload<{
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}>;

export type OrganizationUser = Pick<
  UserEntity,
  "email" | "firstName" | "lastName"
> & {
  userId: string;
  memberId: string;
  organizationRole: OrganizationRole;
};

export type OrganizationUsersPayload = GQLPayload<{
  organizationUsers: PaginationPayload & { users: OrganizationUser[] };
}>;

export type OrganizationUsersInput = PaginationInput & {
  organizationId: string;
  notInProjectId?: string;
};

export type OrganizationUserPayload = GQLPayload<{
  organizationUser: OrganizationUser;
}>;

export type OrganizationUserInput = {
  organizationId: string;
  userId: string;
};

export type ProjectUser = Pick<
  UserEntity,
  "email" | "firstName" | "lastName"
> & {
  userId: string;
  memberId: string;
  organizationRole: OrganizationRole;
  projectRole: ProjectRole;
};

export type ProjectUsersPayload = GQLPayload<{
  projectUsers: PaginationPayload & { users: ProjectUser[] };
}>;

export type ProjectUsersInput = PaginationInput & {
  organizationId: string;
  projectId: string;
};
