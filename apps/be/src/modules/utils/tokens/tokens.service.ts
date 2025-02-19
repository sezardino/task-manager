import { ForbiddenError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { accessTokenConfig } from './config/access-token.config';
import { refreshTokenConfig } from './config/refresh-token.config';
import { GenerateTokenParams, TokenType } from './types/params';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(accessTokenConfig.KEY)
    private readonly accessTokenConfiguration: ConfigType<
      typeof accessTokenConfig
    >,
    @Inject(refreshTokenConfig.KEY)
    private readonly refreshTokenConfiguration: ConfigType<
      typeof refreshTokenConfig
    >,
  ) {}

  private getConfig(type: TokenType) {
    switch (type) {
      case TokenType.access:
        return this.accessTokenConfiguration;
      case TokenType.refresh:
        return this.refreshTokenConfiguration;

      default:
        throw new ForbiddenError('Token type not provided');
    }
  }

  async generate(params: GenerateTokenParams) {
    const { payload, type } = params;

    return this.jwtService.signAsync(payload, this.getConfig(type));
  }
}
