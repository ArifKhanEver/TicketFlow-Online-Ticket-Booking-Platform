'use client';

import React, { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignIn() {
  // const searchParams = useSearchParams();
  // const redirectTo = searchParams.get('redirectTo') || "/";
  const redirectTo = "/";
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const router = useRouter();

const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password");

    if (!email) {
        toast.error("Email is required");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
    }

    if (!password) {
        toast.error("Password is required");
        return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
      } else {
        toast.success('Signin Successful');
        router.replace(redirectTo);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
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
    <section className="relative min-h-screen w-full bg-gray-50 dark:bg-[#15151a] text-zinc-900 dark:text-white flex items-center justify-center px-4 py-12 overflow-hidden transition-colors duration-300 py-50">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-zinc-50 dark:bg-[#111113]/40 border border-zinc-200 dark:border-zinc-900/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl transition-colors duration-300">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-1 mb-4">
            <Link href="/" className="text-2xl font-black tracking-tight flex items-center text-zinc-900 dark:text-white">
              <Image src={logo} height={30} width={120} alt="Logo" priority />
            </Link>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight !text-zinc-900 dark:!text-white">Welcome back</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">Enter your credentials to access your account.</p>
        </div>

        <div className="space-y-4">
          {/* Google Button */}
          <Button
            variant="bordered"
            isLoading={socialLoading}
            onClick={handleGoogleSignIn}
            className="w-full h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113]/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-200 font-medium rounded-xl text-sm gap-2.5"
            startContent={!socialLoading && <FcGoogle size={18} />}
          >
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-900"></div>
            <span className="px-3 text-[11px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Or continue with</span>
            <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-900"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
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
                label: "text-zinc-600 dark:text-zinc-400 font-medium text-xs mb-1",
                inputWrapper: "h-11 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0C]/40 group-data-[focus=true]:border-indigo-500/50 group-data-[hover=true]:border-zinc-400 dark:group-data-[hover=true]:border-zinc-700 transition-colors duration-200",
                input: "text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm",
              }}
              startContent={<FiMail className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
            />

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
                label: "text-zinc-600 dark:text-zinc-400 font-medium text-xs mb-1",
                inputWrapper: "h-11 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0C]/40 group-data-[focus=true]:border-indigo-500/50 group-data-[hover=true]:border-zinc-400 dark:group-data-[hover=true]:border-zinc-700 transition-colors duration-200",
                input: "text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm",
              }}
              startContent={<FiLock className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
            />

            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-11 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold rounded-xl text-sm mt-6 shadow-lg transition-all duration-200 active:scale-[0.99]"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-6 pt-2">
            Don't have an account?{" "}
            <Link
              href={`/auth/signup?redirectTo=${redirectTo}`}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors duration-150 text-xs inline-flex"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}