import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig.js";
import bidder from "@/modals/usersModals/bidder.js";
connect();
export async function PUT(request) {
  const reqbody = await request.json();
  try {
    let BidderId = reqbody.BidderId;
    let ActivationCode = reqbody.ActivationCode;
    let verifiedBidder = await bidder.findById(BidderId);
    if (!verifiedBidder) {
      return NextResponse.json({ error: "Error Try Again After !" });
    }
    let VerifiedCode = verifiedBidder.ActivationCode === ActivationCode;
    if (!VerifiedCode) {
      return NextResponse.json({ error: "Error Try Again After !" });
    }
    verifiedBidder.ActivationStatus = true;
    await verifiedBidder.save();
    return NextResponse.json({
      success: "Account Verified You Can New Log In !",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server Error" });
  }
}
