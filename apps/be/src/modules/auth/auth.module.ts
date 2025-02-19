import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../utils/tokens/tokens.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessGuard } from './guard/access.guard';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [TokensModule, UsersModule],
  providers: [
    AuthResolver,
    AuthService,
    AccessStrategy,
    RefreshTokenStrategy,
    { provide: APP_GUARD, useClass: AccessGuard },
  ],
})
export class AuthModule {}
