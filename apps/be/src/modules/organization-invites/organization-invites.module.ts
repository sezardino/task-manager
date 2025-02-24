import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { TokensModule } from '../utils/tokens/tokens.module';
import { OrganizationInvitesResolver } from './organization-invites.resolver';
import { OrganizationInvitesService } from './organization-invites.service';

@Module({
  imports: [PrismaModule, TokensModule, OrganizationsModule, UsersModule],
  providers: [OrganizationInvitesResolver, OrganizationInvitesService],
})
export class OrganizationInvitesModule {}
