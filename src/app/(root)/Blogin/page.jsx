"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useBidderloginMutation } from "@/redux/BidderSlices/bidderApiSlice";
import { setBidderCredentials } from "@/redux/BidderSlices/bidderSlice";
import { useSendBidderActivationMailMutation } from "@/redux/BidderSlices/bidderApiSlice";
export default function Blogin() {
  const [login, { isLoading }] = useBidderloginMutation();
  const [sendMail] = useSendBidderActivationMailMutation();
  const handleMailRequest = async (e, Name, Email, _id, ActivationCode) => {
    const res = await sendMail({ Name, Email, _id, ActivationCode });
  };
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ Email, Password });
    dispatch(setBidderCredentials({ ...res.data.bidder }));
    console.log(res);
  };
  return (
    <>
      <h1>Login</h1>
      <h3>{errorMessage ? { errorMessage } : null}</h3>
      <form onSubmit={handleFormSubmit}>
        Email :
        <input
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        Password :
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <h5>
        Dont Have An Account ?{" "}
        <button onClick={() => router.push("/bidderSignup")}>SignUp</button>
      </h5>
    </>
  );
}
