import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { TokensModule } from '../utils/tokens/tokens.module';
import { OrganizationInvitesResolver } from './organization-invites.resolver';
import { OrganizationInvitesService } from './organization-invites.service';
import { OrganizationMembersModule } from '../organization-members/organization-members.module';

@Module({
  imports: [
    PrismaModule,
    TokensModule,
    OrganizationsModule,
    UsersModule,
    OrganizationMembersModule,
  ],
  providers: [OrganizationInvitesResolver, OrganizationInvitesService],
})
export class OrganizationInvitesModule {}
