'use client';

import React, { useState } from "react";
import { Input, Button, Radio, RadioGroup } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignUp() {
    // const searchParams = useSearchParams();
    // const redirectTo = searchParams.get('redirectTo') || "/";
    const redirectTo ="/";
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const router = useRouter();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            setPreviewUrl(URL.createObjectURL(file))
        }
    };

const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password");
    const role = formData.get("role");

    if (!name) {
        toast.error("Name is required");
        return; 
    }

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
        toast.error("Password cannot be empty");
        return;
    } 
    
    if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
    }

    setLoading(true);

    let uploadedImageUrl = "";

        try {
            if (imageFile) {
                const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
                if (!imgBBKey) {
                    throw new Error("ImgBB API key is missing in environmental variables!");
                }

                const imgFormData = new FormData();
                imgFormData.append("image", imageFile);

                const imgBBRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
                    method: "POST",
                    body: imgFormData,
                });

                const imgBBData = await imgBBRes.json();

                if (imgBBData.success) {
                    uploadedImageUrl = imgBBData.data.display_url;
                } else {
                    throw new Error("Failed to upload image to ImgBB");
                }
            }

            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                image: uploadedImageUrl,
                signupRole: role 
            });

            if (error) {
                toast.error(error.message || "Something went wrong!");
            } else {
                toast.success('Sign up successful');
                router.replace(redirectTo);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "An unexpected error occurred.");
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

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex items-center gap-1 mb-4 select-none">
                        <Link href="/" className="text-2xl font-black tracking-tight flex items-center select-none text-zinc-900 dark:text-white">
                            <Image src={logo} height={30} width={120} alt="Logo" priority />
                        </Link>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight !text-zinc-900 dark:!text-white">
                        Create your account
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                        Join thousands of job seekers finding their dream roles today.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Google Sign-In Button */}
                    <Button
                        variant="bordered"
                        isLoading={socialLoading}
                        onClick={handleGoogleSignIn}
                        className="w-full h-11 border-zinc-200 dark:border-zinc-800 bg-gray-200 dark:bg-[#111133]/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-200 font-medium rounded-xl text-sm gap-2.5"
                        startContent={!socialLoading && <FcGoogle size={18} />}
                    >
                        Sign up with Google
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-900"></div>
                        <span className="px-3 text-[11px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                            Or continue with
                        </span>
                        <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-900"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignUp} className="space-y-4">

                        <Input
                            type="text"
                            name="name"
                            label="Full Name"
                            labelPlacement="outside"
                            placeholder="Enter your full name"
                            variant="bordered"
                            radius="xl"
                            fullWidth
                            isRequired
                            classNames={{
                                label: "text-zinc-600 dark:text-zinc-400 font-medium text-xs mb-1",
                                inputWrapper: "h-11 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0C]/40 group-data-[focus=true]:border-indigo-500/50 group-data-[hover=true]:border-zinc-400 dark:group-data-[hover=true]:border-zinc-700 transition-colors duration-200",
                                input: "text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm",
                            }}
                            startContent={<FiUser className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                        />

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

                        <div className="flex flex-col gap-1">
                            <label className="text-zinc-600 dark:text-zinc-400 font-medium text-xs mb-1">Profile Picture</label>
                            <label className="h-11 flex items-center gap-2 border-2 border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0C]/40 rounded-xl px-4 cursor-pointer hover:border-indigo-500/50 transition-colors">
                                {
                                    previewUrl ? (
                                        <Image
                                            src={previewUrl}
                                            alt="User Preview"
                                            width={35}
                                            height={35}
                                            className="rounded-lg object-cover border border-zinc-300 dark:border-zinc-700"
                                        />
                                    ) : (
                                        <FiCamera className="text-zinc-400 dark:text-zinc-600" size={16} />
                                    )
                                }
                                <span className="text-sm text-zinc-400 truncate">
                                    {imageFile ? imageFile.name : "Upload avatar image"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            labelPlacement="outside"
                            placeholder="Create a strong password"
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

                        <div className="flex flex-col gap-2">
                            <p className="text-zinc-600 dark:text-zinc-400 font-medium text-xs">Role</p>
                            <RadioGroup defaultValue="user" name="role" orientation="horizontal">
                                <Radio value="user">
                                    <Radio.Content>
                                        <Radio.Control className="border-2 border-zinc-400 dark:border-zinc-500">
                                            <Radio.Indicator className="bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                                        </Radio.Control>
                                        User
                                    </Radio.Content>
                                </Radio>
                                <Radio value="vendor">
                                    <Radio.Content>
                                        <Radio.Control className="border-2 border-zinc-400 dark:border-zinc-500">
                                            <Radio.Indicator className="bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                                        </Radio.Control>
                                        Vendor
                                    </Radio.Content>
                                </Radio>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-11 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold rounded-xl text-sm mt-6 shadow-lg transition-all duration-200 active:scale-[0.99]"
                        >
                            Get Started
                        </Button>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-6 pt-2">
                        Already have an account?{" "}
                        <Link
                            href={`/auth/signin?redirectTo=${redirectTo}`}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors duration-150 text-xs inline-flex"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}