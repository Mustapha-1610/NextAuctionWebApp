import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
const publicRoutes = [
  "/",
  "/ongoing",
  "/finiched",
  "/howitworks",
  "/Blogin",
  "Bsignup",
  "/Slogin",
  "Ssignup",
];

export default function middleware(req: any) {
  const bidder = req.cookies.get("bidder")?.value || "";

  if (!bidder && req.nextUrl.pathname.startsWith("/bidder")) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (bidder && publicRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/bidder/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
