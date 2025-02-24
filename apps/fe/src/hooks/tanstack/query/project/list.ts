import { ProjectApiService } from "@/api/project";
import { OrganizationProjectsInput } from "@/api/project/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATION_PROJECTS_QUERY_KEY =
  "ORGANIZATION_PROJECTS_QUERY_KEY";

export const getOrganizationProjectsQuery = (
  input: OrganizationProjectsInput
) => ({
  queryKey: [ORGANIZATION_PROJECTS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => ProjectApiService.list(input),
  retry: false,
});

export const useOrganizationProjectsQuery = (
  input: OrganizationProjectsInput
) => useQuery(getOrganizationProjectsQuery(input));
