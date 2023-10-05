import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import { getBidder } from "../../../../Helpers/bidderTokenHandler";
export async function POST(request) {
  try {
    let bidder = getBidder(request);
    console.log(bidder);
    return NextResponse.json({ Message: "hello" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server Error" });
  }
}
