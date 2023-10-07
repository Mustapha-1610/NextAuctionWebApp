import { NextRequest, NextResponse } from "next/server";
import { sendBidderConfirmationEmail } from "../../../../Helpers/NodeMailer/BidderMailer.js";

export async function POST(request) {
  const reqbody = await request.json();
  try {
    const Name = reqbody.Name;
    const Email = reqbody.Email;
    const _id = reqbody._id;
    const ActivationCode = reqbody.ActivationCode;
    await sendBidderConfirmationEmail(Name, Email, _id, ActivationCode);
    return NextResponse.json({ success: "Email Sent" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server Error try again after !" });
  }
}
