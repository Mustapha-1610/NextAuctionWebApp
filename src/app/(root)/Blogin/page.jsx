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

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleMailRequest = async (Name, Email, _id, ActivationCode) => {
    await sendMail({ Name, Email, _id, ActivationCode });
  };

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
            className="text-blue-500 ml-2"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2 px-6">
      <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4 w-full md:w-1/2 lg:w-1/3">
        <div className="flex-shrink-0 w-full">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Login
          </h1>
          <h3 className="text-red-500">{errorMessage}</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4 w-full">
            <div>
              <label>Email :</label>
              <input
                type="email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label>Password :</label>
              <input
                type="password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>

          <div className="mt-4 w-full">
            <GoogleOAuthProvider clientId="38309083981-csjjtl51a2m8t0bd3f3398hgo953v67k.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleGoogleAuthSubmit(credentialResponse.credential)
                }
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
            </GoogleOAuthProvider>
          </div>
          <h5 className="mt-4 text-center">
            Dont Have An Account ?
            <button
              onClick={() => router.push("/Bsignup")}
              className="text-blue-500"
            >
              SignUp
            </button>
          </h5>
        </div>
      </div>
    </div>
  );
}
