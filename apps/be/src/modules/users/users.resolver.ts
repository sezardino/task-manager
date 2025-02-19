import { Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => GqlUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => GqlUser)
  user() {
    return;
  }
}
