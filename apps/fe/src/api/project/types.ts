import { GQLPayload } from "@/types/gql";
import { PaginationInput, PaginationPayload } from "@/types/pagination";

export type CreateProjectInput = {
  organizationId: string;
  name: string;
  description?: string;
};

export type CreateProjectPayload = GQLPayload<{
  createProject: { id: string; name: string };
}>;

export type OrganizationProjectsInput = PaginationInput & {
  organizationId: string;
};

export type OrganizationProjectsPayload = GQLPayload<{
  projects: PaginationPayload & { projects: { id: string; name: string }[] };
}>;

export type OrganizationProjectInput = {
  organizationId: string;
  projectId: string;
};

export type OrganizationProjectPayload = GQLPayload<{
  project: { id: string; name: string };
}>;
