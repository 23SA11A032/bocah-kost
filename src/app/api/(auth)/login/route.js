import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

/**
 * @param {Request} request 
 */
export async function POST(request, { params }) {
    try {
        var body = await request.json();
        var user = await prisma.user.findFirst({ where: { email: body.email } });
        var decoded = jwt.verify(user.password, process.env.JWT_SECRET);
        if (decoded !== body.password) return new Response('Email atau Password salah!', { status: 401 });

        return Response.json(user);
    } catch (error) {
        return new Response("Server error!", { status: 500 });
    }
}