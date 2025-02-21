import { fetchGQL } from "@/utils/fetch-gql";
import { ORGANIZATION_MEMBERS_QUERY } from "./queries";
import { OrganizationMembersInput, OrganizationMembersPayload } from "./types";

export class OrganizationMembersApiService {
  static list(input?: OrganizationMembersInput) {
    return fetchGQL<OrganizationMembersPayload>({
      query: ORGANIZATION_MEMBERS_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationMembers);
  }
}
