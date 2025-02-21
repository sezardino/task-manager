import { fetchGQL } from "@/utils/fetch-gql";
import { INVITE_USER_QUERY, ORGANIZATION_INVITES_QUERY } from "./queries";
import {
  InviteUserInput,
  InviteUserPayload,
  OrganizationInvitesInput,
  OrganizationInvitesPayload,
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
}
