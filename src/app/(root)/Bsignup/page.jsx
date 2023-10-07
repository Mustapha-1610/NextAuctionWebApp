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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={formSubmitHandler} className="w-1/2 space-y-2">
          <h2 className="text-2xl font-bold text-center">{message}</h2>
          <div className="flex flex-col space-y-4">
            <label>
              Name:
              <input
                type="text"
                name="Name"
                onChange={(e) => handleFormChange(e)}
                className="w-full px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </label>
          </div>
          <div className="flex flex-col space-y-4">
            Surname :{" "}
            <input
              type="text"
              name="Surname"
              onChange={(e) => handleFormChange(e)}
              className="w-full px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            Email :{" "}
            <input
              type="Email"
              name="Email"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            Password :{" "}
            <input
              type="password"
              name="Password"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            State :{" "}
            <input
              type="text"
              name="State"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            City :{" "}
            <input
              type="text"
              name="City"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            FullAdress :{" "}
            <textarea
              type="text"
              name="FullAdress"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            PhoneNumber :{" "}
            <input
              type="number"
              name="PhoneNumber"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            BirthDate :{" "}
            <input
              type="date"
              name="BirthDate"
              onChange={(e) => handleFormChange(e)}
              className="w-full  px-1 py-1 mt-1 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            />
          </div>
          <button type="sumbit">SignUp</button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
