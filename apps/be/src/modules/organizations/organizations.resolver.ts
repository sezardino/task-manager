import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { GqlOrganization } from './entities/organization.entity';
import { OrganizationsService } from './organizations.service';

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
}
