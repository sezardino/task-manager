import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInRequest } from '../types/user';

export const CurrentUser = createParamDecorator(
  (key: keyof UserInRequest, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    const user = gqlContext.getContext().req.user as UserInRequest;

    return key ? user?.[key] : user;
  },
);
