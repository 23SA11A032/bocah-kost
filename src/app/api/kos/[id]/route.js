import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @param {Request} request
 */
export async function GET(request, { params }) {
    try {
        var id = Number(params.id);
        var kos = await prisma.kos.upsert({ where: { id: id }, update: {}, create: {} });
        return Response.json(kos)
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}

/**
 * @param {Request} request
 */
export async function POST(request, { params: { id } }) {
    try {
        id = Number(id);
        var body = await request.json();
        var kos = await prisma.kos.upsert({ where: { id: id }, update: body, create: body });
        return Response.json(kos);
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}