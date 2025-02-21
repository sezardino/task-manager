import { GQLPayload } from "@/types/gql";

export type OnboardingPayload = GQLPayload<{
  createOrganization: {
    id: string;
  };
}>;

export type OnboardingInput = {
  name: string;
};
