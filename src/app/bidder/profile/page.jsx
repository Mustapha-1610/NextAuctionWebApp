"use client";
import { useDispatch, useSelector } from "react-redux";
export default function Profile() {
  const bidder = useSelector((state) => state.bidderData?.bidderInfo);

  return (
    <>
      <h1>Hello {bidder?.Name}</h1>
    </>
  );
}
