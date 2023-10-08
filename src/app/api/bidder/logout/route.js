import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
    });
    response.cookies.set("bidder", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "None", // Add this
      secure: true, // And this
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
