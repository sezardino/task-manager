import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const REFRESH_TOKEN_CONFIG_KEY = 'refresh-token-config-key';

export const refreshTokenConfig = registerAs(
  REFRESH_TOKEN_CONFIG_KEY,
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  }),
);
