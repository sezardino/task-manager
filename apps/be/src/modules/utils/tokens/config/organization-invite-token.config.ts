import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { ORGANIZATION_INVITE_EXPIRATION_DAYS } from '../const/expiration';

export const ORGANIZATION_INVITE_TOKEN_CONFIG_KEY =
  'organization-invite-token-config-key';

export const organizationInviteTokenConfig = registerAs(
  ORGANIZATION_INVITE_TOKEN_CONFIG_KEY,
  (): JwtSignOptions => ({
    secret: process.env.ORGANIZATION_INVITE_TOKEN_SECRET,
    expiresIn: `${ORGANIZATION_INVITE_EXPIRATION_DAYS}d`,
  }),
);
