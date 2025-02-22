import {
  AccessTokenPayload,
  OrganizationInviteTokenPayload,
  RefreshTokenPayload,
} from './payloads';

export enum TokenType {
  access = 'access',
  refresh = 'refresh',
  organizationInvite = 'organizationInvite',
}

export type GenerateTokenParams =
  | { type: TokenType.access; payload: AccessTokenPayload }
  | { type: TokenType.refresh; payload: RefreshTokenPayload }
  | {
      type: TokenType.organizationInvite;
      payload: OrganizationInviteTokenPayload;
    };
