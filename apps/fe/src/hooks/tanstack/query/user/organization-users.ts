import { UserApiService } from "@/api/user";
import { OrganizationUsersInput } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATION_USERS_QUERY_KEY = "ORGANIZATION_USERS_QUERY_KEY";

export const getOrganizationUsersQuery = (input: OrganizationUsersInput) => ({
  queryKey: [ORGANIZATION_USERS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => UserApiService.organizationUsers(input),
  retry: false,
});

export const useOrganizationUsersQuery = (input: OrganizationUsersInput) =>
  useQuery(getOrganizationUsersQuery(input));
