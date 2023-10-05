import { connect } from "@/db/dbConfig.js";
import bidder from "@/modals/usersModals/bidder.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqbody = await request.json();

    const { Email, Password, PhoneNumber } = reqbody;

    let BidderAccount;
    if ((!Email && !Password) || (!PhoneNumber && !Password)) {
      return res.status(401).json({ Message: "Invalid Input" });
    } else if (!Email) {
      BidderAccount = await bidder.findOne({ PhoneNumber });
    } else {
      BidderAccount = await bidder.findOne({ Email });
    }
    if (!BidderAccount) {
      return res.status(404).json({ Message: "Account Dosent Exist" });
    }
    const tokenData = {
      id: BidderAccount._id,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "server error" });
  }
}
