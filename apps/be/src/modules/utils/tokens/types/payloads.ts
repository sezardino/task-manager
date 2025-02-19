export type AccessTokenPayload = {
  sub: {
    userId: string;
    email: string;
  };
};

export type RefreshTokenPayload = {
  sub: {
    userId: string;
    email: string;
  };
};
