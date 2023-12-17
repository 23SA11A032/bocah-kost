import { NextResponse } from 'next/server';
import * as jose from 'jose'

export const config = {
    matcher: ['/api/kos/:path+'],
};

export function middleware(req) {
    try {
        const authValue = req.headers.get('authorization');
        const token = authValue.replace('Bearer ', '');
        const decoded = jose.jwtVerify(token, process.env.JWT_SECRET).catch(() => {});

        if (decoded) {
            req.headers.set('user', decoded.user);
            return NextResponse.next();
        }
    } catch (e) {
        // console.log(e)
        return new Response('Please authenticate.', { status: 401 });
    }
}
