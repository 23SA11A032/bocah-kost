import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const prisma = new PrismaClient();
        var kos = await prisma.kos.findMany();
        return Response.json(kos)
    } catch (error) {
        
    }
}