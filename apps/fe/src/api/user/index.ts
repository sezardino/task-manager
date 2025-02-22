import { fetchGQL } from "@/utils/fetch-gql";
import {
  CURRENT_USER_QUERY,
  ORGANIZATION_USER_QUERY,
  ORGANIZATION_USERS_QUERY,
} from "./queries";
import {
  CurrentUserPayload,
  OrganizationUserInput,
  OrganizationUserPayload,
  OrganizationUsersInput,
  OrganizationUsersPayload,
} from "./types";

export class UserApiService {
  static currentUser() {
    return fetchGQL<CurrentUserPayload>({
      query: CURRENT_USER_QUERY,
    }).then((r) => r.data.data.user);
  }

  static list(input: OrganizationUsersInput) {
    return fetchGQL<OrganizationUsersPayload>({
      query: ORGANIZATION_USERS_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationUsers);
  }

  static one(input: OrganizationUserInput) {
    return fetchGQL<OrganizationUserPayload>({
      query: ORGANIZATION_USER_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationUser);
  }
}
