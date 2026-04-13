import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool, type PoolConfig } from 'pg';

// Optimized pool configuration for serverless/Supabase environments
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 10, // Recommended for Supabase to prevent connection exhaustion
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Database connection string is missing. Check your .env file.');
  }

  const pool = new Pool(poolConfig);
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
