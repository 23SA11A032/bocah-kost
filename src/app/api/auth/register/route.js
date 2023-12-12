import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const User = prisma.user;

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
    body.password = jwt.sign(body.password, process.env.JWT_SECRET)
    var res = await User.create({ data: body });
    return Response.json(res);
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
