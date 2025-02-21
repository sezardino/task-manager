import { fetchGQL } from "@/utils/fetch-gql";
import { ORGANIZATION_INVITES_QUERY } from "./queries";
import { OrganizationInvitesInput, OrganizationInvitesPayload } from "./types";

export class OrganizationInvitesApiService {
  static list(input?: OrganizationInvitesInput) {
    return fetchGQL<OrganizationInvitesPayload>({
      query: ORGANIZATION_INVITES_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationInvites);
  }
}
