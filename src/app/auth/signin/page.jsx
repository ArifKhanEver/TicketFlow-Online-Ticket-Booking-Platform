'use client';

import React, { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SignIn() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || "/";
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
      } else {
        toast.success('Signin Successful')
        router.replace(redirectTo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      setSocialLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0A0A0C] text-white flex items-center justify-center px-4 py-12 overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[440px] bg-[#111113]/40 border border-zinc-900/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-1 mb-4 select-none">
            <Link href="/" className="text-2xl font-black tracking-tight flex items-center select-none">
              <Image src={logo} height={30} width={120} alt="ticketflow Logo" />
            </Link>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="text-xs text-zinc-500 mt-1.5">
            Enter your credentials to access your account.
          </p>
        </div>

        <div className="space-y-4">
          {/* Google Sign-In Button */}
          <Button
            variant="bordered"
            isLoading={socialLoading}
            onClick={handleGoogleSignIn}
            className="w-full h-11 border-zinc-800 bg-[#111113]/60 text-zinc-300 hover:bg-zinc-900/50 hover:text-white transition-all duration-200 font-medium rounded-xl text-sm gap-2.5"
            startContent={!socialLoading && <FcGoogle size={18} />}
          >
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-zinc-900"></div>
            <span className="px-3 text-[11px] font-medium uppercase tracking-widest text-zinc-600">
              Or continue with
            </span>
            <div className="flex-1 h-[1px] bg-zinc-900"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            

            {/* Email Input */}
            <Input
              type="email"
              name="email"
              label="Email Address"
              labelPlacement="outside"
              placeholder="name@example.com"
              variant="bordered"
              radius="xl"
              fullWidth
              isRequired
              classNames={{
                label: "text-zinc-400 font-medium text-xs mb-1",
                inputWrapper: "h-11 border-zinc-800 bg-[#0A0A0C]/40 group-data-[focus=true]:border-indigo-500/50 group-data-[hover=true]:border-zinc-700 transition-colors duration-200",
                input: "text-white placeholder:text-zinc-600 text-sm",
              }}
              startContent={<FiMail className="text-zinc-600 mr-1" size={16} />}
            />

            {/* Password Input */}
            <Input
              type="password"
              name="password"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              variant="bordered"
              radius="xl"
              fullWidth
              isRequired
              classNames={{
                label: "text-zinc-400 font-medium text-xs mb-1",
                inputWrapper: "h-11 border-zinc-800 bg-[#0A0A0C]/40 group-data-[focus=true]:border-indigo-500/50 group-data-[hover=true]:border-zinc-700 transition-colors duration-200",
                input: "text-white placeholder:text-zinc-600 text-sm",
              }}
              startContent={<FiLock className="text-zinc-600 mr-1" size={16} />}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-11 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl text-sm mt-6 shadow-lg transition-all duration-200 active:scale-[0.99]"
            >
              Sign In
            </Button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-xs text-zinc-500 mt-6 pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?redirectTo=${redirectTo}`}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150 text-xs inline-flex"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}