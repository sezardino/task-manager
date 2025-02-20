import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { accessTokenConfig } from './config/access-token.config';
import { refreshTokenConfig } from './config/refresh-token.config';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forFeature(accessTokenConfig),
    ConfigModule.forFeature(refreshTokenConfig),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
