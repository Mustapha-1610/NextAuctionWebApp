"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useBidderLogoutMutation } from "../../../redux/BidderSlices/bidderApiSlice";
import { bidderLogout } from "../../../redux/BidderSlices/bidderSlice";
import { useRouter } from "next/navigation";

export default function BidderNavbar() {
  const [logout, { isLoading }] = useBidderLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    const res = await logout();
    dispatch(bidderLogout());
  };
  return (
    <>
      <Link href="/bidder/home">Home</Link>
      <Link href="/bidder/ongoing"> Ongoing </Link>
      <Link href="/bidder/finiched">Finiched </Link>
      <Link href="/bidder/howitworks">How it Works </Link>
      <Link href="/bidder/profile">Profile </Link>
      <button onClick={handleLogout}>Signout</button>
    </>
  );
}
