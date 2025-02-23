import { UserApiService } from "@/api/user";
import { OrganizationUserInput } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATION_USER_QUERY_KEY = "ORGANIZATION_USER_QUERY_KEY";

export const getOrganizationUserQuery = (input: OrganizationUserInput) => ({
  queryKey: [ORGANIZATION_USER_QUERY_KEY, ...Object.values(input)],
  queryFn: () => UserApiService.organizationUser(input),
  retry: false,
});

export const useOrganizationUserQuery = (input: OrganizationUserInput) =>
  useQuery(getOrganizationUserQuery(input));
