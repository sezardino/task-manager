import { Module } from '@nestjs/common';
import { ProjectMembersModule } from '../project-members/project-members.module';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [PrismaModule, ProjectMembersModule],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
