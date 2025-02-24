import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
