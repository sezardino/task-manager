import { ProjectEntity } from "@/types/entity";
import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type CreateProjectInput = {
  organizationId: string;
  name: string;
  description?: string;
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
