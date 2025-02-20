import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from 'src/modules/utils/tokens/types/payloads';
import { AuthService } from '../auth.service';
import { UserInRequest } from '../types/user';

export const ACCESS_STRATEGY_NAME = 'access-strategy-name';

@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  ACCESS_STRATEGY_NAME,
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserInRequest> {
    const { userId } = payload.sub;

    const user = await this.authService.validateTokenUser(userId);

    return user;
  }
}
