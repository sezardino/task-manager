import { OrganizationMembersApiService } from "@/api/organization-members";
import { OrganizationMembersInput } from "@/api/organization-members/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATION_MEMBERS_QUERY_KEY = "ORGANIZATION_MEMBERS_QUERY_KEY";

export const getOrganizationMembersQuery = (
  input: OrganizationMembersInput
) => ({
  queryKey: [ORGANIZATION_MEMBERS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => OrganizationMembersApiService.list(input),
  retry: false,
});

export const useOrganizationMembersQuery = (input: OrganizationMembersInput) =>
  useQuery(getOrganizationMembersQuery(input));
