"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
export default function bidderlogin() {
  const [Email, setEmail] = useState("");

  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <h1>Login</h1>
      <h3>{errorMessage ? <>{errorMessage}</> : null}</h3>
      <form>
        test :
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
