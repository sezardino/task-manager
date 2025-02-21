import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PrismaTransaction } from '../utils/prisma/types';
import { CreateOrganizationMemberInput } from './dto/create-organization-member.input';

@Injectable()
export class OrganizationMembersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateOrganizationMemberInput, trx?: PrismaTransaction) {
    const prisma = trx ? trx : this.prismaService;

    await prisma.organizationMember.create({
      data: {
        role: input.role,
        organization: { connect: { id: input.organizationId } },
        user: { connect: { id: input.userId } },
      },
    });
  }
}
