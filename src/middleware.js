import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const config = {
  matcher: ["/admin/:path?"],
};

/** @param {Request} req */
export function middleware(req) {
  var token = cookies().get("token")?.value;
  if (!token) return Response.redirect(new URL('/', req.url))

  // console.log(cookies().get("token"));
  // try {
  //     const authValue = req.headers.get('authorization');
  //     const token = authValue.replace('Bearer ', '');
  //     const decoded = jose.jwtVerify(token, process.env.JWT_SECRET).catch(() => {});
  //     if (decoded) {
  //         req.headers.set('user', decoded.user);
  //         return NextResponse.next();
  //     }
  // } catch (e) {
  //     // console.log(e)
  //     return new Response('Please authenticate.', { status: 401 });
  // }
}
