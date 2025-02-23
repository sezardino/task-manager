import { fetchGQL } from "@/utils/fetch-gql";
import {
  CURRENT_USER_QUERY,
  ORGANIZATION_USER_QUERY,
  ORGANIZATION_USERS_QUERY,
  PROJECT_USERS_QUERY,
} from "./queries";
import {
  CurrentUserPayload,
  OrganizationUserInput,
  OrganizationUserPayload,
  OrganizationUsersInput,
  OrganizationUsersPayload,
  ProjectUsersInput,
  ProjectUsersPayload,
} from "./types";

export class UserApiService {
  static currentUser() {
    return fetchGQL<CurrentUserPayload>({
      query: CURRENT_USER_QUERY,
    }).then((r) => r.data.data.user);
  }

  static organizationUsers(input: OrganizationUsersInput) {
    return fetchGQL<OrganizationUsersPayload>({
      query: ORGANIZATION_USERS_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationUsers);
  }

  static organizationUser(input: OrganizationUserInput) {
    return fetchGQL<OrganizationUserPayload>({
      query: ORGANIZATION_USER_QUERY,
      variables: { input },
    }).then((res) => res.data.data.organizationUser);
  }

  static projectUsers(input: ProjectUsersInput) {
    return fetchGQL<ProjectUsersPayload>({
      query: PROJECT_USERS_QUERY,
      variables: { input },
    }).then((res) => res.data.data.projectUsers);
  }
}
