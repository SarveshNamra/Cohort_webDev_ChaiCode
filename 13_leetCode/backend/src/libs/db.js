import { PrismaClient } from "../generated/prisma/index.js";

// Node JS doesn't have access to globals by default, so we use globalThis
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();
// new PrismaClient() -> We are making new instance of PrismaClient(i.e. constructor)

if(process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export const db = prisma;
export default db;