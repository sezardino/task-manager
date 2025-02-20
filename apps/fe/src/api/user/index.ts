import { fetchGQL } from "@/utils/fetch-gql";
import { CURRENT_USER_QUERY } from "./queries";
import { CurrentUserPayload } from "./types";

export class UserApiService {
  static currentUser() {
    return fetchGQL<CurrentUserPayload>({
      query: CURRENT_USER_QUERY,
    }).then((r) => r.data.data.user);
  }
}
