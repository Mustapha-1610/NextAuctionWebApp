import { connect } from "@/db/dbConfig.js";
import bidder from "@/modals/usersModals/bidder.js";
import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.json({ message: "Missing input" });
    }
    let existingBidder = await bidder.create({
      Name,
      Surname,
      Email,
      Password,
      State,
      City,
      FullAdress,
      PhoneNumber,
      BirthDate,
    });
    existingBidder.save();
    return NextResponse.json(
      { Message: "Account Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "ServerError !" }, { status: 500 });
  }
}
