import { ForbiddenError } from '@nestjs/apollo';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { accessTokenConfig } from './config/access-token.config';
import { organizationInviteTokenConfig } from './config/organization-invite-token.config';
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
    @Inject(organizationInviteTokenConfig.KEY)
    private readonly organizationInviteTokenConfiguration: ConfigType<
      typeof organizationInviteTokenConfig
    >,
  ) {}

  private getConfig(type: TokenType) {
    switch (type) {
      case TokenType.access:
        return this.accessTokenConfiguration;
      case TokenType.refresh:
        return this.refreshTokenConfiguration;
      case TokenType.organizationInvite:
        return this.organizationInviteTokenConfiguration;

      default:
        throw new ForbiddenError('Token type not provided');
    }
  }

  async generate(params: GenerateTokenParams) {
    const { payload, type } = params;

    return this.jwtService.signAsync(
      { ...payload, type },
      this.getConfig(type),
    );
  }

  async verify<Payload>(token: string, type: TokenType): Promise<Payload> {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.getConfig(type),
      );

      return payload;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
