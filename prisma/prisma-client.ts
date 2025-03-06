import { PrismaClient } from '@prisma/client';

// Создаем экземпляр PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

