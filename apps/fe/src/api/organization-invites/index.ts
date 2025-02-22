import { fetchGQL } from "@/utils/fetch-gql";
import {
  INVITE_USER_QUERY,
  ORGANIZATION_INVITES_QUERY,
  PROCESS_ORGANIZATION_INVITE_QUERY,
  VERIFY_ORGANIZATION_INVITE_QUERY,
} from "./queries";
import {
  InviteUserInput,
  InviteUserPayload,
  OrganizationInvitesInput,
  OrganizationInvitesPayload,
  ProcessOrganizationInviteInput,
  ProcessOrganizationInvitePayload,
  VerifyOrganizationInviteInput,
  VerifyOrganizationInvitePayload,
} from "./types";

export class OrganizationInvitesApiService {
  static invite(input: InviteUserInput) {
    return fetchGQL<InviteUserPayload>({
      query: INVITE_USER_QUERY,
      variables: { input },
    }).then((res) => res.data.data.createOrganizationInvite);
  }

  static list(input?: OrganizationInvitesInput) {
    return fetchGQL<OrganizationInvitesPayload>({
      query: ORGANIZATION_INVITES_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationInvites);
  }

  static verify(input: VerifyOrganizationInviteInput) {
    return fetchGQL<VerifyOrganizationInvitePayload>({
      query: VERIFY_ORGANIZATION_INVITE_QUERY,
      variables: { input },
    }).then((res) => res.data.data.verifyOrganizationInvite);
  }

  static process(input: ProcessOrganizationInviteInput) {
    return fetchGQL<ProcessOrganizationInvitePayload>({
      query: PROCESS_ORGANIZATION_INVITE_QUERY,
      variables: { input },
    }).then((res) => res.data.data.processOrganizationInvite);
  }
}
