import { PrismaClient } from "@/src/generated/prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const prisma =
    globalForPrisma.prisma || new PrismaClient({adapter}).$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma