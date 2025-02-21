import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrganizationInviteInput } from './dto/create-organization-invite.input';
import { OrganizationInvitesInput } from './dto/organization-invites.input';
import { ProcessOrganizationInviteInput } from './dto/process-organization-invite.input';
import { VerifyOrganizationInviteInput } from './dto/verify-organization-invite.input';
import { GqlOrganizationInvite } from './entities/organization-invite.entity';
import { OrganizationInvitesService } from './organization-invites.service';
import { CreateOrganizationInvitePayload } from './payload/create-organization-invite.payload';
import { OrganizationInvitesPayload } from './payload/organization-invites.payload';
import { VerifyOrganizationInvitePayload } from './payload/verify-organization-invite.payload';

@Resolver(() => GqlOrganizationInvite)
export class OrganizationInvitesResolver {
  constructor(
    private readonly organizationInvitesService: OrganizationInvitesService,
  ) {}

  @Mutation(() => CreateOrganizationInvitePayload)
  createOrganizationInvite(
    @Args('input')
    input: CreateOrganizationInviteInput,
  ) {
    return this.organizationInvitesService.create(input);
  }

  @Mutation(() => VerifyOrganizationInvitePayload)
  verifyOrganizationInvite(
    @Args('input')
    input: VerifyOrganizationInviteInput,
  ) {
    return this.organizationInvitesService.verify(input);
  }

  @Mutation(() => VerifyOrganizationInvitePayload)
  processOrganizationInvite(
    @Args('input')
    input: ProcessOrganizationInviteInput,
  ) {
    return this.organizationInvitesService.process(input);
  }

  @Query(() => GqlOrganizationInvite)
  organizationInvite(@Args('inviteId', ParseUUIDPipe) inviteId: string) {
    return this.organizationInvitesService.one(inviteId);
  }

  @Query(() => OrganizationInvitesPayload)
  organizationInvites(
    @Args('input', { nullable: true }) input?: OrganizationInvitesInput,
  ) {
    return this.organizationInvitesService.list(input);
  }
}
