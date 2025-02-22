import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { PrismaModule } from '../utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
