import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const ACCESS_TOKEN_CONFIG_KEY = 'access-token-config-key';

export const accessTokenConfig = registerAs(
  ACCESS_TOKEN_CONFIG_KEY,
  (): JwtSignOptions => ({
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  }),
);
