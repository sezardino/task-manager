import { BadRequestException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { isUUID } from 'class-validator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { OrganizationMembersService } from '../organization-members/organization-members.service';
import { OrganizationUserInput } from './dto/organization-user.input';
import { OrganizationUsersInput } from './dto/organization-users.input';
import { GqlUser } from './entities/user.entity';
import { OrganizationUserPayload } from './payloads/organization-user.payload';
import { OrganizationUsersPayload } from './payloads/organization-users.payload';
import { UsersService } from './users.service';

@Resolver(() => GqlUser)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

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

  @Query(() => OrganizationUserPayload)
  organizationUser(@Args('input') input: OrganizationUserInput) {
    return this.organizationMembersService.one(input);
  }

  @Query(() => OrganizationUsersPayload)
  organizationUsers(@Args('input') input: OrganizationUsersInput) {
    return this.organizationMembersService.list(input);
  }
}
