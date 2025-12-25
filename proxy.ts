import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

const COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE || "ogc_token";

function getRoleFromToken(token: string): string | null {
    try {
        const payload = decodeJwt(token) as any;
        // tùy backend, role có thể nằm ở "role" hoặc payload.user.role
        return payload?.role ?? payload?.user?.role ?? null;
    } catch {
        return null;
    }
}

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Chỉ match các route protected (được config bên dưới)
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    const role = getRoleFromToken(token);
    if (!role) {
        const url = new URL("/login", req.url);
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    // RBAC theo prefix
    if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/organizer") && role !== "organizer" && role !== "admin") {
        // nếu bạn muốn admin vào organizer page, giữ như trên
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/student") && role !== "student" && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/organizer/:path*", "/student/:path*"],
};
