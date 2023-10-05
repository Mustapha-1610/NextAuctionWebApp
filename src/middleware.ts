import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/bidderLogin"];
const publicRoutes = ["/"];

const test = true;

export default function middleware(req: any) {
  if (!test && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (test && publicRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/bidderLogin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
