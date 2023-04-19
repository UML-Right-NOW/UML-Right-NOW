import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const auth = req.nextUrl.clone();
    auth.pathname = "/login";
    const afterAuth = req.nextUrl.clone();
    afterAuth.pathname = "/";
  
    if (req.nextUrl.pathname === "/profile") {
        const session = await getToken({
            req,
            secret: process.env.JWT_SECRET,
            secureCookie: process.env.NODE_ENV === "production",
        });
        
        if (!session) return NextResponse.redirect(auth);
        
    }
  
    if (req.nextUrl.pathname === "/sign-up" || req.nextUrl.pathname === "/login") {
        const session = await getToken({
            req,
            secret: process.env.JWT_SECRET,
            secureCookie: process.env.NODE_ENV === "production",
        });
    
        if (session) return NextResponse.redirect(afterAuth);
    }
}