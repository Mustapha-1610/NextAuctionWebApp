"use client";
import React, { useState, useEffect } from "react";
import { useBidderGoogleSignupMutation } from "@/redux/BidderSlices/bidderApiSlice";
export default function GoogleAuth({ params }) {
  const credentials = params.googleInfo;
  const [bidderGoogleSignup, { isLoading }] = useBidderGoogleSignupMutation();
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
    console.log(form);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await bidderGoogleSignup({ ...form });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
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
