import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { GqlUser } from './entities/user.entity';
import { PrismaTransaction } from '../utils/prisma/types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findForAuth(dto: { id?: string; email?: string }) {
    if (!dto.email && !dto.id)
      throw new BadRequestException('Filter not provided');
    if (dto.email && dto.id)
      throw new BadRequestException('Only one filter allowed');

    return this.prismaService.user.findUnique({
      where: { email: dto.email, id: dto.id },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        _count: {
          select: {
            organizationsOwned: true,
          },
        },
      },
    });
  }

  async findOne(userId: string): Promise<GqlUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        organizationsOwned: true,
        organizationMemberships: {
          include: { organization: true, user: true },
        },
      },
    });

    return {
      ...user,
      organizationMemberships: user.organizationMemberships.map((member) => ({
        id: member.organization.id,
        name: member.organization.name,
      })),
    };
  }

  async createUser(
    input: CreateUserInput,
    role: UserRole,
    trx?: PrismaTransaction,
  ) {
    const prisma = trx ? trx : this.prismaService;

    return prisma.user.create({
      data: {
        email: input.email,
        password: await hash(input.password),
        role,
      },
    });
  }
}
