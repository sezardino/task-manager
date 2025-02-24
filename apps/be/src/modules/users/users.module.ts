import { Module } from '@nestjs/common';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { OrganizationMembersService } from './services/organization-members.service';
import { ProjectMembersService } from './services/project-members.service';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersResolver,
    UsersService,
    ProjectMembersService,
    OrganizationMembersService,
  ],
  exports: [UsersService, ProjectMembersService, OrganizationMembersService],
})
export class UsersModule {}
