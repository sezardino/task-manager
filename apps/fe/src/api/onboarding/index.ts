import { fetchGQL } from "@/utils/fetch-gql";
import { ORGANIZATION_MUTATION_QUERY } from "./queries";
import { OnboardingInput, OnboardingPayload } from "./types";

export class OnboardingApiService {
  static onboarding(input: OnboardingInput) {
    return fetchGQL<OnboardingPayload>({
      query: ORGANIZATION_MUTATION_QUERY,
      variables: { input },
    }).then((res) => res.data.data.createOrganization);
  }
}
