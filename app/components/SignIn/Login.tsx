/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { supabase } from "@/app/utils/superBaseClient";
import React, { useEffect, useState } from "react";
import Spinner from "../generalComponent/spinner";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading as true

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login successful:", data);
      console.log(email);
      console.log(password);

      // Redirect or save token
      router.push("/createAccount");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkUser = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const session_data = data.session;
      console.log(data);
      if (session_data) {
        router.push("/createAccount");
      } else {
        setLoading(false); // Set loading to false after check
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh] bg-[#F1EFE8]">
        <div className="h-[5rem]">
          <Spinner bg={"black"} />
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex justify-center items-center w-full h-[100vh] bg-[#F1EFE8]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-between bg-white py-[1.3rem] w-[27rem] max-w-[80%] max-h-[90vh] rounded-[20px] px-[2rem] gap-[1rem] ">
        <h1 className="text-2xl">CUBBY</h1>

        <div className="w-full">
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 border outline-none border-black px-[5%] rounded-[20px] h-[3.5rem] focus:border-opacity-70 border-opacity-30 transition duration-300 bg-[#F1F1F1]"
          />
        </div>
        <div className="w-full">
          <input
            placeholder="Password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 border outline-none border-black px-[5%] rounded-[20px] h-[3.5rem] focus:border-opacity-70 border-opacity-30 transition duration-300 bg-[#F1F1F1]"
          />
        </div>
        <button
          className="w-full mt-[1rem] border outline-none text-white px-[10px] rounded-full h-[3.5rem] focus:border-opacity-70 border-opacity-30 transition duration-300 bg-[#050505]"
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner bg={"white"} /> : "Login"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default Login;
