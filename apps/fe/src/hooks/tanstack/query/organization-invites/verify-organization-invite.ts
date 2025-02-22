import { OrganizationInvitesApiService } from "@/api/organization-invites";
import { VerifyOrganizationInviteInput } from "@/api/organization-invites/types";
import { useQuery } from "@tanstack/react-query";

export const VERIFY_ORGANIZATION_INVITE_QUERY_KEY =
  "VERIFY_ORGANIZATION_INVITE_QUERY_KEY";

export const getOrganizationInvitesQuery = (
  input: VerifyOrganizationInviteInput
) => ({
  queryKey: [VERIFY_ORGANIZATION_INVITE_QUERY_KEY, ...Object.values(input)],
  queryFn: () => OrganizationInvitesApiService.verify(input),
  enabled: !!input.token,
});

export const useVerifyOrganizationInvitesQuery = (
  input: VerifyOrganizationInviteInput
) => useQuery(getOrganizationInvitesQuery(input));
