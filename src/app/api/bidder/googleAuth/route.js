import jwt_decode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bidder from "@/modals/usersModals/bidder.js";
import { connect } from "@/db/dbConfig.js";

connect();
export async function POST(request) {
  try {
    const reqbody = await request.json();
    const token = jwt.decode(reqbody.credentials);
    let Bidder = await bidder.findOne({ Email: token.email });
    if (!Bidder) {
      return NextResponse.json({ Signed: false });
    }
    if (Bidder.ActivenessStatus === false) {
      return NextResponse.json({ error: "This Account Is Disabled" });
    }
    const tokenData = {
      id: Bidder._id,
    };
    //create token
    const jwtoken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "120d",
    });
    const response = NextResponse.json({
      bidder: Bidder,
    });
    response.cookies.set("bidder", token, {
      httpOnly: true,
      sameSite: "None", // Add this
      secure: true, // And this
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextRequest.json({ status: 500, data: error });
  }
}
