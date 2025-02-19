import { fetchGQL } from "@/utils/fetch-gql";
import { LOGIN_MUTATION_QUERY, REGISTRATION_MUTATION_QUERY } from "./queries";
import {
  LoginInput,
  LoginPayload,
  RefreshPayload,
  RegistrationInput,
  RegistrationPayload,
} from "./types";

export class AuthApiService {
  static login(input: LoginInput) {
    return fetchGQL<LoginPayload>({
      query: LOGIN_MUTATION_QUERY,
      variables: { input },
    }).then((res) => res.data.data.login);
  }

  static registration(input: RegistrationInput) {
    return fetchGQL<RegistrationPayload>({
      query: REGISTRATION_MUTATION_QUERY,
      variables: input,
    });
  }

  static refreshTokens(token: string) {
    return fetchGQL<RefreshPayload>({
      query: REGISTRATION_MUTATION_QUERY,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
