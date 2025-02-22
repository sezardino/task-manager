import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { OrganizationInvitesModule } from './organization-invites/organization-invites.module';
import { OrganizationMembersModule } from './organization-members/organization-members.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    OrganizationsModule,
    OrganizationInvitesModule,
    OrganizationMembersModule,
    ProjectsModule,
  ],
})
export class AppModule {}
