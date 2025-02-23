import { ProjectEntity } from "@/types/entity";
import { ProjectRole } from "@/types/enums";
import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type CreateProjectInput = {
  organizationId: string;
  name: string;
  description?: string;
  users: { role: ProjectRole; id: string }[];
};

export type CreateProjectPayload = GQLPayload<{
  createProject: Pick<ProjectEntity, "id" | "name">;
}>;

export type OrganizationProjectsInput = PaginationInput & {
  organizationId: string;
};

export type OrganizationProjectsPayload = GQLPayload<{
  projects: PaginationPayload & {
    projects: Pick<
      ProjectEntity,
      "id" | "name" | "description" | "membersCount" | "owner"
    >[];
  };
}>;

export type OrganizationProjectInput = {
  organizationId: string;
  projectId: string;
};

export type OrganizationProjectPayload = GQLPayload<{
  project: Pick<ProjectEntity, "id" | "name">;
}>;

export type AddMembersToProjectInput = {
  projectId: string;
  organizationId: string;
  users: { role: ProjectRole; id: string }[];
};

export type AddMembersToProjectPayload = GQLPayload<{
  addMembersToProject: { usersCount: number };
}>;
