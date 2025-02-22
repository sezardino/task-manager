import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { verify } from 'argon2';
import { UsersService } from '../users/users.service';
import { TokensService } from '../utils/tokens/tokens.service';
import { TokenType } from '../utils/tokens/types/params';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../utils/tokens/types/payloads';
import { LoginInput } from './dto/login.input';
import { RegistrationInput } from './dto/registration.input';
import { LoginPayload } from './payload/login.payload';
import { RegistrationPayload } from './payload/registration.payload';
import { UserInRequest } from './types/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  private async generateTokens(
    atPayload: AccessTokenPayload,
    rtPayload: RefreshTokenPayload,
  ) {
    const access = await this.tokensService.generate({
      type: TokenType.access,
      payload: atPayload,
    });

    const refresh = await this.tokensService.generate({
      type: TokenType.refresh,
      payload: rtPayload,
    });

    return { access, refresh };
  }

  async login(input: LoginInput): Promise<LoginPayload> {
    const user = await this.usersService.findForAuth({ email: input.email });

    if (!user) throw new BadRequestException('Wrong credentials');

    const isPasswordMatch = await verify(user.password, input.password);

    if (!isPasswordMatch) throw new BadRequestException('Wrong credentials');

    const atPayload: AccessTokenPayload = {
      sub: { email: user.email, userId: user.id, role: user.role },
    };
    const rtPayload: RefreshTokenPayload = {
      sub: { email: user.email, userId: user.id, role: user.role },
    };

    const tokens = await this.generateTokens(atPayload, rtPayload);
    console.log(user);
    return {
      email: user.email,
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
      onboarding:
        user.role === UserRole.MEMBER
          ? false
          : user._count.organizationsOwned === 0,
    };
  }

  async registration(input: RegistrationInput): Promise<RegistrationPayload> {
    const user = await this.usersService.findForAuth({ email: input.email });

    if (user) throw new ConflictException('This email already in use');

    return this.usersService.createUser(input, UserRole.OWNER);
  }

  async validateTokenUser(userId: string): Promise<UserInRequest> {
    const user = await this.usersService.findForAuth({ id: userId });

    if (!user) throw new UnauthorizedException();

    return { id: user.id, email: user.email };
  }

  async refreshTokens(userId: string) {
    const user = await this.usersService.findForAuth({ id: userId });

    if (!user) throw new BadRequestException('Wrong credentials');

    const atPayload: AccessTokenPayload = {
      sub: { email: user.email, userId: user.id, role: user.role },
    };
    const rtPayload: RefreshTokenPayload = {
      sub: { email: user.email, userId: user.id, role: user.role },
    };

    const tokens = await this.generateTokens(atPayload, rtPayload);

    return {
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
    };
  }
}
