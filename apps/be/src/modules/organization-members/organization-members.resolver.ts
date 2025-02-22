import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrganizationMembersInput } from './dto/organization-members.input';
import { GqlOrganizationMember } from './entities/organization-member.entity';
import { OrganizationMembersService } from './organization-members.service';
import { OrganizationMembersPayload } from './payload/organization-members.payload';

@Resolver(() => GqlOrganizationMember)
export class OrganizationsResolver {
  constructor(
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  @Query(() => GqlOrganizationMember)
  organizationMember(@Args('memberId', ParseUUIDPipe) memberId: string) {
    return this.organizationMembersService.one(memberId);
  }

  @Query(() => OrganizationMembersPayload)
  organizationMembers(
    @Args('input', { nullable: true }) input?: OrganizationMembersInput,
  ) {
    return this.organizationMembersService.list(input);
  }
}
