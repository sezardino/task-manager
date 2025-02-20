import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { GqlUser } from './entities/user.entity';

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
      select: { id: true, email: true, password: true },
    });
  }

  async findOne(userId: string): Promise<GqlUser> {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }

  async create(input: CreateUserInput) {
    return this.prismaService.user.create({
      data: { email: input.email, password: await hash(input.password) },
    });
  }
}
