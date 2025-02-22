import { OrganizationApiService } from "@/api/organization";
import { OneOrganizationInput } from "@/api/organization/types";
import { useQuery } from "@tanstack/react-query";

export const ONE_ORGANIZATION_QUERY_KEY = "ONE_ORGANIZATION_QUERY_KEY";

export const getOneOrganizationQuery = (input: OneOrganizationInput) => ({
  queryKey: [ONE_ORGANIZATION_QUERY_KEY, ...Object.values(input)],
  queryFn: () => OrganizationApiService.one(input),
  retry: false,
});

export const useOneOrganizationQuery = (input: OneOrganizationInput) =>
  useQuery(getOneOrganizationQuery(input));
