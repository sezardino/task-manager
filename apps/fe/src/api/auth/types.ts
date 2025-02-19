import { GQLPayload } from "@/types/gql";

export type LoginPayload = GQLPayload<{
  login: {
    email: string;
    accessToken: string;
    refreshToken: string;
  };
}>;

export type LoginInput = {
  email: string;
  password: string;
};

export type RegistrationPayload = GQLPayload<{
  registration: {
    email: string;
  };
}>;

export type RegistrationInput = {
  email: string;
  password: string;
};

export type RefreshPayload = GQLPayload<{
  refreshTokens: {
    accessToken: string;
    refreshToken: string;
  };
}>;
