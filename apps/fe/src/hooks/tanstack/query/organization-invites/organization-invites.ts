import { OrganizationInvitesApiService } from "@/api/organization-invites";
import { OrganizationInvitesInput } from "@/api/organization-invites/types";
import { useQuery } from "@tanstack/react-query";

export const ORGANIZATION_INVITES_QUERY_KEY = "ORGANIZATION_INVITES_QUERY_KEY";

export const getOrganizationInvitesQuery = (
  input: OrganizationInvitesInput
) => ({
  queryKey: [ORGANIZATION_INVITES_QUERY_KEY, ...Object.values(input)],
  queryFn: () => OrganizationInvitesApiService.list(input),
  retry: false,
});

export const useOrganizationInvitesQuery = (input: OrganizationInvitesInput) =>
  useQuery(getOrganizationInvitesQuery(input));
