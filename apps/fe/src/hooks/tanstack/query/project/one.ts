import { ProjectApiService } from "@/api/project";
import { OrganizationProjectInput } from "@/api/project/types";
import { useQuery } from "@tanstack/react-query";
import { ORGANIZATION_PROJECTS_QUERY_KEY } from "./list";

export const ORGANIZATION_PROJECT_QUERY = "ORGANIZATION_PROJECT_QUERY";

export const getOrganizationProjectQuery = (
  input: OrganizationProjectInput
) => ({
  queryKey: [ORGANIZATION_PROJECTS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => ProjectApiService.one(input),
  retry: false,
});

export const useOrganizationProjectQuery = (input: OrganizationProjectInput) =>
  useQuery(getOrganizationProjectQuery(input));
