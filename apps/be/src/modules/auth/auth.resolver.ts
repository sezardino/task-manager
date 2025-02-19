import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { LoginInput } from './dto/login.input';
import { RegistrationInput } from './dto/registration.input';
import { RefreshGuard } from './guard/refresh.guard';
import { LoginPayload } from './payload/login.payload';
import { RefreshTokensPayload } from './payload/refresh-tokens.payload';
import { RegistrationPayload } from './payload/registration.payload';

@Public()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegistrationPayload)
  registration(@Args('input') input: RegistrationInput) {
    return this.authService.registration(input);
  }

  @Mutation(() => LoginPayload)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => RefreshTokensPayload)
  @UseGuards(RefreshGuard)
  refreshTokens(
    // @Args('token') token: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.authService.refreshTokens(userId);
  }
}
