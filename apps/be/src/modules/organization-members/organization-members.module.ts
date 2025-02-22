import { Module } from '@nestjs/common';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { OrganizationMembersService } from './organization-members.service';

@Module({
  imports: [PrismaModule],
  providers: [OrganizationMembersService],
  exports: [OrganizationMembersService],
})
export class OrganizationMembersModule {}
