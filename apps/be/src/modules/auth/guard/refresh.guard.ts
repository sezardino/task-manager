import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_STRATEGY_NAME } from '../strategies/refresh-token.strategy';

@Injectable()
export class RefreshGuard extends AuthGuard(REFRESH_STRATEGY_NAME) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
