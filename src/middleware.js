import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

/**
 * @param {NextRequest} request
 */
export function middleware(request) {
    var token = cookies().get("token")?.value;
    var path = request.nextUrl.pathname;
    var url = request.url;

    if (path.startsWith("/admin/admin")) {
        if (!token) return NextResponse.redirect(new URL("/", url));
        try {
            var decode = jwtDecode(token);
            if (decode.role !== "admin") return NextResponse.redirect(new URL("/", url));
        } catch {
            return NextResponse.redirect(new URL("/", url));
        }
    }

    if (path.startsWith("/admin/kost")) {
        if (!token) return NextResponse.redirect(new URL("/", url));
        try {
            var decode = jwtDecode(token);
            if (decode.role !== "kost") return NextResponse.redirect(new URL("/", url));
        } catch {
            return NextResponse.redirect(new URL("/", url));
        }
    }
}
