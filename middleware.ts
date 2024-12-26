import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const token = req.cookies.get("token")?.value || "";

    // Public paths that do not require authentication
    const isPublicPath = ["/login", "/signup"].includes(pathname);

    if (!token && !isPublicPath) {
        // If no token and trying to access a protected route, redirect to login
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (token && isPublicPath) {
        // If token exists and user tries to access public auth pages, redirect to home
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // Allow access for all other cases
    return NextResponse.next();
}

// Config for the middleware
export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
    ],
};
