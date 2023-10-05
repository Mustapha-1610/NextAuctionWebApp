"use client";
import { useSelector, useDispatch } from "react-redux";
import { bidderLogout } from "@/redux/authslice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AuctionInfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  let bidderinfo = useSelector((state) => state?.bidderData.bidderInfo);
  useEffect(() => {
    if (!bidderinfo) {
      router.push("/");
    }
  }, [bidderinfo]);
  return (
    <>
      <h1>Profile</h1>
      {bidderinfo}
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
