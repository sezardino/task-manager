import { Module } from '@nestjs/common';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { OrganizationMembersModule } from '../organization-members/organization-members.module';

@Module({
  imports: [PrismaModule, OrganizationMembersModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
