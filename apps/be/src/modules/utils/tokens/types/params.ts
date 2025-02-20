import { AccessTokenPayload, RefreshTokenPayload } from './payloads';

export enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

export type GenerateTokenParams =
  | { type: TokenType.access; payload: AccessTokenPayload }
  | { type: TokenType.refresh; payload: RefreshTokenPayload };
