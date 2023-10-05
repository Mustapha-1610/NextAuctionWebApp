"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BidderNavbar from "@/app/bidder/components/BidderNavbar";
import { useSelector } from "react-redux";
import LandingNavbar from "@/app/(root)/components/LandingNavbar";
export default function Navbar() {
  const bidder = useSelector((state: any) => state.bidderData?.bidderInfo);
  const [navComponent, setNavComponent] = useState(<LandingNavbar />);
  useEffect(() => {
    bidder
      ? setNavComponent(<BidderNavbar />)
      : setNavComponent(<LandingNavbar />);
  }, [bidder]);
  return <>{navComponent}</>;
}
