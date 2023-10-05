import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bidder from "../modals/usersModals/bidder";

export const getBidder = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    let Bidder = await bidder.findById(decodedToken.id);
    console.log(Bidder);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
