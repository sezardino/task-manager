import { OrganizationApiService } from "@/api/organization";
import { OrganizationsListInput } from "@/api/organization/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATIONS_LIST_QUERY_KEY = "ORGANIZATIONS_LIST_QUERY_KEY";

export const getOrganizationsListQuery = (input: OrganizationsListInput) => ({
  queryKey: [ORGANIZATIONS_LIST_QUERY_KEY, ...Object.values(input)],
  queryFn: () => OrganizationApiService.list(input),
  retry: false,
});

export const useOrganizationsListQuery = (input: OrganizationsListInput) =>
  useQuery(getOrganizationsListQuery(input));
