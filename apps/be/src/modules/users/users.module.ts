import { Module } from '@nestjs/common';
import { OrganizationMembersModule } from '../organization-members/organization-members.module';
import { ProjectMembersModule } from '../project-members/project-members.module';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, OrganizationMembersModule, ProjectMembersModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
