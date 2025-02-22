import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { TokensModule } from '../utils/tokens/tokens.module';
import { OrganizationMembersService } from './organization-members.service';
import { OrganizationsResolver } from './organization-members.resolver';

@Module({
  imports: [PrismaModule, TokensModule, OrganizationsModule, UsersModule],
  providers: [OrganizationMembersService, OrganizationsResolver],
  exports: [OrganizationMembersService],
})
export class OrganizationMembersModule {}
