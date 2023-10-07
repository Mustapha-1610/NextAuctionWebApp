"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useBidderActivationMutation } from "@/redux/BidderSlices/bidderApiSlice";
import { useRouter } from "next/navigation";
export default function Bactivation({ params }) {
  const [activateEmail, { isLoading }] = useBidderActivationMutation();
  const router = useRouter();
  const BidderId = params.BidderId;
  const ActivationCode = params.ActivationCode;
  const [message, setMessage] = useState(
    "Account Activated You Can Now Log In"
  );
  const ActivateBidderAccount = async () => {
    try {
      const res = await activateEmail({ BidderId, ActivationCode });
      if (res.data.error) {
        setMessage(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("hello");
    if (BidderId && ActivationCode) {
      ActivateBidderAccount();
    }
  }, [BidderId, ActivationCode]);
  return (
    <>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <h3>{message}</h3>
          <button
            onClick={() => {
              router.push("/Blogin");
            }}
          >
            Log in
          </button>
        </>
      )}
    </>
  );
}
