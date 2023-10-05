"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function LandingNavbar() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/ongoing"> Ongoing </Link>
      <Link href="/finiched">Finiched </Link>
      <Link href="/howitworks">How it Works </Link>
      <Link href="/Blogin">Bidder Login </Link>
      <Link href="/Slogin">Seller Login </Link>
    </>
  );
}
