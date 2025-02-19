import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginInput } from './dto/login.input';
import { RegistrationInput } from './dto/registration.input';
import { LoginPayload } from './payload/login.payload';

@Public()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginPayload)
  registration(@Args('input') input: RegistrationInput) {
    return this.authService.registration(input);
  }

  @Mutation(() => LoginPayload)
  login(@Args('loginInput') input: LoginInput) {
    return this.authService.login(input);
  }
}
