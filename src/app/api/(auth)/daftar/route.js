import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const User = db.user;

/**
 *
 * @param {Request} request
 */
export async function POST(request) {
    try {
        var body = await request.json();
        var user = await User.findFirst({ where: { email: body.email } });
        if (user) {
            return Response.json({ status: false, message: "Email sudah terdaftar!" }, { status: 403 });
        }
        body.password = jwt.sign(body.password, process.env.JWT_SECRET);
        let newUser = await User.create({ data: body });
        let token = jwt.sign(newUser, process.env.JWT_SECRET);
        cookies().set("token", token);
        return Response.json({ status: true, message: "Berhasil mendaftarkan akun" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response(error, { status: 500 });
    }
}
