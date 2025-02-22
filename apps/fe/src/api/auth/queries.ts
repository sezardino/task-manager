export const LOGIN_MUTATION_QUERY = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      email
      accessToken
      refreshToken
      onboarding
    }
  }
`;

export const REGISTRATION_MUTATION_QUERY = `
  mutation Registration($input: RegistrationInput!) {
    registration(input: $input) {
      email
    }
  }
`;

export const REFRESH_TOKENS_MUTATION_QUERY = `
  mutation RefreshTokens {
    refreshTokens {
      accessToken
      refreshToken
    }
}
`;
