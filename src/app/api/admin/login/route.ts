import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  console.log("hello");
  return NextResponse.json({ Message: "Working" });
}
