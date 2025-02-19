import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from 'src/modules/utils/tokens/types/payloads';
import { AuthService } from '../auth.service';

export const REFRESH_STRATEGY_NAME = 'refresh-strategy-name';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_STRATEGY_NAME,
) {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate(payload: RefreshTokenPayload) {
    return this.authService.validateTokenUser(payload.sub.userId);
  }
}
