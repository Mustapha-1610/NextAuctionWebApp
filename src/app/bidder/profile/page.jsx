"use client";
import { useSelector, useDispatch } from "react-redux";
import { bidderLogout } from "@/redux/authslice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AuctionInfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <h1>Profile</h1>
      <button
        onClick={() => {
          dispatch(bidderLogout());
        }}
      >
        Click
      </button>
    </>
  );
}
