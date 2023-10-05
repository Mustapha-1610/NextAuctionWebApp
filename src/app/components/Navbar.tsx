"use client";
import Link from "next/link";
import React from "react";
export default function Navbar() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/ongoing"> Ongoing </Link>
      <Link href="/finiched">Finiched </Link>
      <Link href="/howitworks">How it Works </Link>
      <Link href="/bidderLogin">Login </Link>
    </>
  );
}
