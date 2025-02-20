import { Module } from '@nestjs/common';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OrganizationsResolver, OrganizationsService],
})
export class OrganizationsModule {}
