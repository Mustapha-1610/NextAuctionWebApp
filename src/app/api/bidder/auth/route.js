import { connect } from "@/db/dbConfig.js";
import bidder from "@/modals/usersModals/bidder.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request) {
  try {
    const reqbody = await request.json();

    const { Email, Password, PhoneNumber } = reqbody;

    let BidderAccount;
    if ((!Email && !Password) || (!PhoneNumber && !Password)) {
      return NextResponse.json({ error: "Invalid Input" });
    } else if (!Email) {
      BidderAccount = await bidder.findOne({ PhoneNumber });
    } else {
      BidderAccount = await bidder.findOne({ Email });
    }
    if (!BidderAccount) {
      return NextResponse.json({ error: "Account Dosent Exist" });
    }
    const passwordcheck = bcrypt.compareSync(Password, BidderAccount.Password);
    if (!passwordcheck) {
      return NextResponse.json({
        Message: "Invalid email or password !",
      });
    }
    if (BidderAccount.ActivationStatus === false) {
      return NextResponse.json({
        mailError: "You need to verify your email first before logging in !",
        Name: BidderAccount.Name,
        Email: BidderAccount.Email,
        _id: BidderAccount._id,
        ActivationCode: BidderAccount.ActivationCode,
      });
    }
    if (BidderAccount.ActivenessStatus === false) {
      res.status(401).json({ Message: "This Account Is Disabled" });
    }
    const tokenData = {
      id: BidderAccount._id,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
    const response = NextResponse.json({
      bidder: BidderAccount,
    });
    response.cookies.set("bidder", token, {
      httpOnly: true,
    });
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "server error" });
  }
}
