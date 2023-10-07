import jwt_decode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bidder from "@/modals/usersModals/bidder.js";
import { connect } from "@/db/dbConfig.js";
connect();
export async function POST(request) {
  try {
    const reqbody = await request.json();

    if (
      !reqbody.PhoneNumber ||
      !reqbody.State ||
      !reqbody.City ||
      !reqbody.FullAdress
    ) {
      return NextResponse.json({ error: "Missing Input" });
    }
    let Bidder = await bidder.findOne({ PhoneNumber: reqbody.PhoneNumber });
    if (Bidder) {
      return NextResponse.json({
        error: "Account with same phone number exists allready",
      });
    }
    const token = jwt.decode(reqbody.credentials);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ActivationCode = "";
    for (let i = 0; i < 25; i++) {
      ActivationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    Bidder = await bidder.create({
      Name: token.given_name,
      Surname: token.family_name,
      Email: token.email,
      State: reqbody.State,
      City: reqbody.City,
      FullAdress: reqbody.FullAdress,
      PhoneNumber: reqbody.PhoneNumber,
      BirthDate: reqbody.BirthDate,
      ActivationCode: ActivationCode,
      ProfilePicture: token.picture,
      GmailAccount: true,
    });
    return NextResponse.json({
      success: "Account successfully created. Verification email sent.",
    });
  } catch (error) {
    console.log(error);
    return NextRequest.json({ status: 500, data: error });
  }
}
