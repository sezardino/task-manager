import { PrismaClient } from '@prisma/client';
import {
  PrismaClientOptions,
  DefaultArgs,
} from '@prisma/client/runtime/library';

export type PrismaTransaction = Omit<
  PrismaClient<PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
