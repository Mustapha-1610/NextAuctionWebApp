"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useRouter } from "next/navigation";
import { useBidderloginMutation } from "@/redux/BidderSlices/bidderApiSlice";
import { setBidderCredentials } from "@/redux/BidderSlices/bidderSlice";
import { useSendBidderActivationMailMutation } from "@/redux/BidderSlices/bidderApiSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useBidderGoogleAuthMutation } from "@/redux/BidderSlices/bidderApiSlice";
export default function Blogin() {
  const [login] = useBidderloginMutation();
  const [bidderGoogleAuth] = useBidderGoogleAuthMutation();
  const [sendMail] = useSendBidderActivationMailMutation();
  const handleMailRequest = async (Name, Email, _id, ActivationCode) => {
    console.log(Email);
    await sendMail({ Name, Email, _id, ActivationCode });
  };
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    setErrorMessage(<Loader />);
    e.preventDefault();
    const res = await login({ Email, Password });
    if (res.data.bidder) {
      dispatch(setBidderCredentials({ ...res.data.bidder }));
      router.push("/bidder/profile");
    } else if (res.data.mailError) {
      console.log(res.data);
      setErrorMessage(
        <>
          {res.data.mailError}
          <button
            onClick={(e) => (
              handleMailRequest(
                res.data.Name,
                res.data.Email,
                res.data._id,
                res.data.ActivationCode
              ),
              setErrorMessage("Email Sent Check Your Inbox .")
            )}
          >
            Resend mail
          </button>
        </>
      );
    } else if (res.data.error) {
      setErrorMessage(res.data.error);
    }
  };
  const handleGoogleAuthSubmit = async (credentials) => {
    try {
      const res = await bidderGoogleAuth({ credentials });
      if (res.data.Signed === false) {
        router.push(`/BGoogleAuth/${credentials}`);
      } else {
        dispatch(setBidderCredentials({ ...res.data.bidder }));
        router.push("/bidder/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <h3>{errorMessage}</h3>
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
      <GoogleOAuthProvider clientId="38309083981-csjjtl51a2m8t0bd3f3398hgo953v67k.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleAuthSubmit(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
      <h5>
        Dont Have An Account ?{" "}
        <button onClick={() => router.push("/Bsignup")}>SignUp</button>
      </h5>
    </>
  );
}
