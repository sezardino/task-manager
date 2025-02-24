import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { OneOrganizationInput } from './dto/one-organization.input';
import { OrganizationsListInput } from './dto/organizations-list.input';
import { GqlOrganization } from './entities/organization.entity';
import { OrganizationsService } from './organizations.service';
import { OrganizationsListPayload } from './payload/organizations-list.payload';

@Resolver(() => GqlOrganization)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation(() => GqlOrganization)
  createOrganization(
    @CurrentUser('id') userId: string,
    @Args('input')
    input: CreateOrganizationInput,
  ) {
    return this.organizationsService.create(userId, input);
  }

  @Query(() => GqlOrganization, { name: 'organization' })
  one(
    @CurrentUser('id') userId: string,
    @Args('input') input: OneOrganizationInput,
  ) {
    return this.organizationsService.one(userId, input);
  }

  @Query(() => OrganizationsListPayload, { name: 'organizations' })
  list(
    @CurrentUser('id') userId: string,
    @Args('input') input: OrganizationsListInput,
  ) {
    return this.organizationsService.list(userId, input);
  }
}
