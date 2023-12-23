import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

/**
 * @param {Request} request
 */
export async function POST(request, { params }) {
    try {
        var body = await request.json();
        var user = await db.user.findFirst({
            where: { email: body.email },
        });
        var decoded = jwt.verify(user.password, process.env.JWT_SECRET);
        if (decoded !== body.password) return new Response("Email atau Password salah!", { status: 401 });

        var token = jwt.sign(user, process.env.JWT_SECRET);
        cookies().set("token", token);
        return Response.json(user);
    } catch (error) {
        return new Response("Server error!", { status: 500 });
    }
}
