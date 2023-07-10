"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CredentialsForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const responseGoogle = (response) => {
    // Perform any logic here when Google Sign-In is successful
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const signInResponse = await signIn("credentials", {
      email: email,
      password,
      password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/notes");
    } else {
      console.log("Error: ", signInResponse);
    }
  };

  return (
    <div className="bg-[#331D2C] min-h-screen flex justify-center items-center">
      <div className="bg-[#3F2E3E] rounded-lg p-8">
        <div className="text-[#EFE1D1] mb-4">Login</div>
        {/* {error && <p>{error}</p>} */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-4 bg-[#A78295] text-[#EFE1D1] w-full rounded-md"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 bg-[#A78295] text-[#EFE1D1] w-full rounded-md"
          />
        </div>
        <div>
          <button
            className="bg-[#EFE1D1] text-[#3F2E3E] px-4 py-2 rounded-md"
            onClick={onLoginHandler}
          >
            Login
          </button>
        </div>
        <div className="mt-4">
        </div>
      </div>
    </div>
  );
}
