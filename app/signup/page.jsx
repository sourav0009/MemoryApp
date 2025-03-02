"use client";

import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authRes = await createUserWithEmailAndPassword(email, password);
    if (authRes) {
      const result = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await result.json();
      if (result.ok) {
        alert("Signup successful");
      } else {
        alert("Schema already exists");
      }
    }else{
      alert("Unexpected error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign Up
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label
              className="block text-black text-sm font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" target="_blank" className="text-blue-500">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
