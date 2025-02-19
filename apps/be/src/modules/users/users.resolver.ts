import { BadRequestException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { isUUID } from 'class-validator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { GqlUser } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => GqlUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => GqlUser)
  user(
    @CurrentUser('id') userId: string,
    @Args('id', { nullable: true }) id?: string,
  ) {
    if (id && !isUUID(id))
      throw new BadRequestException('Id should be in uuid format');

    const filter = id ? id : userId;

    return this.usersService.findOne(filter);
  }
}
