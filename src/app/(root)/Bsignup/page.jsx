"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useBiddersignupMutation } from "../../../redux/BidderSlices/bidderApiSlice";
import Loader from "@/app/components/Loader";
const SignupPage = () => {
  const [signup, { isLoading }] = useBiddersignupMutation();
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
    State: "",
    City: "",
    FullAdress: "",
    PhoneNumber: "",
    BirthDate: "",
  });
  const formSubmitHandler = async (e) => {
    try {
      setMessage(<Loader />);
      e.preventDefault();
      const res = await signup(form);
      if (res.data.success) {
        setMessage(res.data.success);
      } else if (res.data.error) {
        setMessage(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <h2>{message}</h2>
        <br />
        Name :
        <input type="text" name="Name" onChange={(e) => handleFormChange(e)} />
        <br />
        <br />
        <br />
        Surname :{" "}
        <input
          type="text"
          name="Surname"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <br />
        Email :{" "}
        <input
          type="Email"
          name="Email"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <br />
        Password :{" "}
        <input
          type="password"
          name="Password"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <br />
        State :{" "}
        <input type="text" name="State" onChange={(e) => handleFormChange(e)} />
        <br />
        <br />
        <br />
        City :{" "}
        <input type="text" name="City" onChange={(e) => handleFormChange(e)} />
        <br />
        <br />
        <br />
        FullAdress :{" "}
        <textarea
          type="text"
          name="FullAdress"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <br />
        PhoneNumber :{" "}
        <input
          type="number"
          name="PhoneNumber"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <br />
        BirthDate :{" "}
        <input
          type="date"
          name="BirthDate"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <br />
        <button type="sumbit">SignUp</button>
      </form>
    </>
  );
};

export default SignupPage;
