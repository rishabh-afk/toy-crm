"use client";

import Image from "next/image";
import { Post } from "@/hooks/apiUtils";
import { IoEye, IoEyeOff, IoLogInOutline, IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
  const { token, login } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response: any = await Post(
      "/api/public/admin/login",
      {
        identifier: email,
        password: password,
      },
      5000
    );
    if (response?.success) {
      const token = response?.data?.accessToken;
      const adminDetails = response?.data?.user;
      login(token, adminDetails);
    }
  };

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  return (
    <>
      {!token && (
        <div className="bg-gray-100 min-h-screen py-12 px-2">
        <div className="contianer-sm m-5 mx-2 bg-white shadow rounded-md h-auto py-2 lg:flex lg:w-3/5 lg:mx-auto">
            <div className="col mx-auto pt-6 px-10 max-w-md text-center lg:mx-0 lg:flex-auto lg:py-4 lg:text-left lg:w-2/4 lg:pt-16 lg:px-2 lg:pl-10">
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label className="block text-left font-semibold text-gray-700 text-sm required mb-2" htmlFor="createPassword">
                            Email Address
                        </label>
                        <div className="flex mt-2 justify-between  appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <input
                                required
                                value={email}
                                autoComplete="off"
                                placeholder="Enter your email address"

                                className={`w-full text-primary  px-2 py-1.5 placeholder:text-gray-400 text-sm bg-transparent outline-[#8b7eff] rounded-l-sm`}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-semibold text-gray-700 text-sm required mb-2" htmlFor="confirmPassword">
                            Password
                        </label>
                        <div className="flex mt-2 justify-between  appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <input
                                required
                                value={password}
                                autoComplete="off"
                                placeholder="Enter your password"

                                className={`w-full text-primary px-2 py-0 placeholder:text-gray-400 text-sm bg-transparent outline-[#8b7eff] rounded-l-sm`}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <span className=' active:bg-[#8b7eff] bg-[#f3f2ff] py-1 rounded-r-md '>
                                    <IoEye
                                        onClick={() => setShowPassword(false)}
                                        size={16}
                                        className="text-[#8b7eff] active:text-[#f3f2ff] mx-3 my-1.5"
                                    />
                                </span>
                            ) : (
                                <span className=' bg-[#f3f2ff] active:bg-[#8b7eff] py-1 rounded-r-md'>
                                    <IoEyeOff
                                        onClick={() => setShowPassword(true)}
                                        size={16}
                                        className="text-[#8b7eff] active:text-[#f3f2ff] mx-3 my-1.5"
                                    />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-2 flex text-left">
                        <div className="flex mb-4  place-items-start">
                            <input id="checked-checkbox" type="checkbox" value="" className="w-3.5 h-3.5 mt-1 accent-[#8b7eff] appearance-auto rounded-sm border" />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-normal text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                        <div className="flex mb-4 items-center">

                            <Link href={""} className="ms-2 text-sm font-medium text-[#35bdaa] dark:text-gray-300">Forgate Password?</Link>
                        </div>
                    </div>
                </form>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full py-1 flex justify-center text-white rounded-md transition text-m duration-200
                        bg-[#8b7eff]/90`}
                >
                    <IoLogInOutline
                        size={16}
                        className="text-[#ffffff] active:text-[#f3f2ff] mx-1 m-auto"
                    />   Save Password
                </button>
                <div className="flex-fill my-4 text-center">
                    <p className="text-center text-sm text-gray-800/70 mb-5 px-2">
                        Don&apos;t have an account ? <Link href={"/demo/django/rixzo/dist/html/index.html"} className="text-blue-600 underline-offset-1">Sign Up</Link>
                    </p>
                </div>
            </div>
            <div className="col rounded m-4 py-4 bg-[#fff8ec] lg:w-2/4">
                <Image
                    src={"/assets/otp/otp.png"}
                    alt="Illustration"
                    width={220}
                    height={180}
                    priority
                    unoptimized
                    className="mx-auto mt-4 object-contain"></Image>
                <div className="flex-fill my-4 text-center">
                    <h6 className="mb-0 font-semibold pb-2 fs-12">Welcome Back</h6>
                    <p className='text-xs font-semibold text-gray-400 px-5'>Sign in to your account to continue.</p>
                </div>
                <div className="inline-flex justify-center w-full" role="group">
                    <button type="button" className="inline-flex bg-red-100 items-center px-4 py-1 text-sm font-medium text-red-500 bg-transparent  mx-1 rounded hover:bg-red-200 hover:text-black">
                        <IoLogoGoogle
                            size={16}
                            className="text-[#ff2121] active:text-[#f3f2ff] mx-1 m-auto"
                        />
                        Google
                    </button>
                    <button type="button" className="flex justify-center items-center bg-purple-100 px-4 py-1 text-sm font-medium text-[#8b7eff] bg-transparent  rounded mx-1 hover:bg-[#8b7eff]-900 hover:text-black">
                        <IoLogoFacebook
                            size={16}
                            className="text-[#8b7eff] active:text-[#f3f2ff] mx-1 m-auto"
                        />
                        Facebook
                    </button>
                </div>
                <div className="mx-4 lg:mx-16 lg:px-1">

                    <button type="button" className="w-full mx-auto mt-2 bg-blue-100 block items-center px-3 py-1 text-sm font-medium text-blue-500 rounded hover:bg-blue-200 hover:text-black">
                        <IoLogoTwitter

                            size={16}
                            className="text-[#1975ff] active:text-[#f3f2ff] inline-block mx-1 m-auto"
                        />
                        Twitter
                    </button>
                </div>

                <Link href="/dashboard">
                    <Image
                        src={"/assets/logo/logo.jpg"}
                        alt="logo"
                        width={60}
                        height={60}
                        priority
                        unoptimized
                        className="mx-auto my-4 bg-blue-200 object-contain"
                    />
                </Link>
            </div>
        </div>
    </div>
      )}
    </>
  );
};

export default Login;
