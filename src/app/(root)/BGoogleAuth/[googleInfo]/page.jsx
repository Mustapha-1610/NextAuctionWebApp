"use client";
import React, { useState, useEffect } from "react";
import { useBidderGoogleSignupMutation } from "@/redux/BidderSlices/bidderApiSlice";
import { setBidderCredentials } from "@/redux/BidderSlices/bidderSlice";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export default function GoogleAuth({ params }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const credentials = params.googleInfo;
  const [bidderGoogleSignup, { isLoading }] = useBidderGoogleSignupMutation();
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    credentials: credentials,
    PhoneNumber: null,
    State: null,
    City: null,
    FullAdress: null,
    BirthdDate: null,
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    setMessage(<Loader />);
    e.preventDefault();
    try {
      const res = await bidderGoogleSignup({ ...form });
      if (res.data.bidder) {
        dispatch(setBidderCredentials({ ...res.data.bidder }));
        router.push("/bidder/profile");
      } else if (res.data.error) {
        setMessage(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {message}
        PhoneNumber :{" "}
        <input type="number" name="PhoneNumber" onChange={handleFormChange} />
        State : <input type="text" name="State" onChange={handleFormChange} />
        City : <input type="text" name="City" onChange={handleFormChange} />
        Full Adress :{" "}
        <textarea type="text" name="FullAdress" onChange={handleFormChange} />
        BirthDate :{" "}
        <input type="date" name="BirthdDate" onChange={handleFormChange} />
        <button type="submit">Finich Signup</button>
      </form>
    </>
  );
}
