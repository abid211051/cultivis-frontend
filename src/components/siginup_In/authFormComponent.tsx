"use client";
import AuthButtonComponent from "./authButtonComponent";
import React, { useState } from "react";
import AuthInputComponent from "./authInputComponent";
import { userRegistration } from "@/src/app/api/auth/userAuth";
import { toast } from "sonner";

export default function AuthFormComponent() {
  const [toggleSignInUp, setToggleSignInUp] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSiginUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(e.currentTarget);
    const res = await userRegistration(formData);
    if (res?.error) {
      toast.error(res?.error, {
        closeButton: true,
        richColors: true,
        position: "top-right",
      });
    } else {
      setMessage(res?.data);
    }
    setLoading(false);
  };
  return (
    <>
      <div>{message}</div>
      <h1 className="text-3xl xl:text-5xl mb-2 text-center">
        {toggleSignInUp ? "SignUp" : "SignIn"}
      </h1>
      <p className="text-sm lg:hidden xl:block block mx-auto text-center">
        {"Welcome to the Cultivis - Lets Explore our System"}
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSiginUp}>
        <AuthInputComponent
          type="email"
          name="email"
          label="Email"
          required={true}
          placeholder="example@gmail.com"
        />
        <AuthInputComponent
          type="password"
          name="password"
          label="Password"
          required={true}
          isForgotPass={!toggleSignInUp}
        />
        {toggleSignInUp && (
          <AuthInputComponent
            type="password"
            name="confirmPassword"
            required={true}
            label="Confirm Password"
          />
        )}
        <AuthButtonComponent text="Submit" disabled={loading} />
        <p className="text-sm">
          {toggleSignInUp
            ? "Already have an account?"
            : "Don't have any account?"}{" "}
          <span
            className="hover:underline text-blue-500 font-medium"
            onClick={() => setToggleSignInUp((prev) => !prev)}
          >
            {toggleSignInUp ? "SignIn" : "SignUp"}
          </span>
        </p>
      </form>
    </>
  );
}
