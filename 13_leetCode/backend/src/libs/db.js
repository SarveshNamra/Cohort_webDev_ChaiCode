import {PrismaClient} from "../generated/prisma/index.js";

// Node JS dont have access to windows, so we have to use globalThis
const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();
// new PrismaClient() -> We are making new instance of PrismaClient(i.e. constructor)

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;