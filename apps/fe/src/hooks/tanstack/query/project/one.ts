import { ProjectApiService } from "@/api/project";
import { OrganizationProjectInput } from "@/api/project/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATION_PROJECT_QUERY = "ORGANIZATION_PROJECT_QUERY";

export const getOrganizationProjectQuery = (
  input: OrganizationProjectInput
) => ({
  queryKey: [ORGANIZATION_PROJECT_QUERY, ...Object.values(input)],
  queryFn: () => ProjectApiService.one(input),
  retry: false,
});

export const useOrganizationProjectQuery = (input: OrganizationProjectInput) =>
  useQuery(getOrganizationProjectQuery(input));
