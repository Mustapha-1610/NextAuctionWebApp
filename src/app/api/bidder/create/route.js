import { connect } from "@/db/dbConfig.js";
import bidder from "@/modals/usersModals/bidder.js";
import { NextRequest, NextResponse } from "next/server";
import { sendBidderConfirmationEmail } from "@/Helpers/NodeMailer/BidderMailer";
import bcrypt from "bcryptjs";
connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      Name,
      Surname,
      Email,
      Password,
      State,
      City,
      FullAdress,
      PhoneNumber,
      BirthDate,
    } = reqBody;
    if (
      !Name ||
      !Surname ||
      !Email ||
      !Password ||
      !State ||
      !City ||
      !FullAdress ||
      !PhoneNumber ||
      !BirthDate
    ) {
      return NextResponse.json({ error: "Missing input(s)" });
    }
    let existingBidder = await bidder.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });
    if (existingBidder) {
      return NextResponse.json({ error: "Account Exists Allready !" });
    }
    const securePassword = bcrypt.hashSync(Password);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ActivationCode = "";
    for (let i = 0; i < 25; i++) {
      ActivationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    existingBidder = await bidder.create({
      Name,
      Surname,
      Email,
      Password: securePassword,
      State,
      City,
      FullAdress,
      PhoneNumber,
      BirthDate,
      ActivationCode,
    });
    await sendBidderConfirmationEmail(
      existingBidder.Name,
      existingBidder.Email,
      existingBidder._id,
      existingBidder.ActivationCode
    );
    return NextResponse.json({
      success: "Account successfully created. Verification email sent.",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "ServerError !" }, { status: 500 });
  }
}
