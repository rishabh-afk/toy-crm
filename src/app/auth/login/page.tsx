"use client";

import Image from "next/image";
import { Post } from "@/hooks/apiUtils";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
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
  const error = "";

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
        <div className="flex items-center justify-center h-screen w-full">
          <div className="flex flex-col lg:h-screen h-full lg:flex-row justify-center items-center lg:gap-20">
            <div className="w-full order-1 lg:order-2 lg:bg-primary/10 lg:h-screen flex items-center justify-center">
              <div className="px-4 lg:px-0 lg:h-screen">
                <Image
                  src={"/assets/login/login.png"}
                  alt="Illustration"
                  width={100}
                  height={100}
                  priority
                  unoptimized
                  className="w-screen h-full bg-blue-200 object-contain"
                />
              </div>
            </div>
            <div className="w-full absolute left-0 lg:w-[45%] order-2 lg:order-1 lg:pl-20">
              <div className="px-5 mb-5">
                <Link href={"/dashboard"}>
                  <h1 className="text-3xl font-black">MASKEEN</h1>
                </Link>
              </div>
              <div className="p-5 pt-3">
                <h2 className="text-3xl text-primary font-bold mb-5">
                  Login to your account!
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    required
                    value={email}
                    autoComplete="off"
                    placeholder="Username or Email address"
                    className="w-full p-3 border-b text-primary placeholder:text-primary text-lg bg-transparent border-b-primary focus:outline-none focus:border-primary"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex mt-5 justify-between items-center border-b border-primary focus:outline-none focus:border-primary p-3 mb-5">
                    <input
                      required
                      value={password}
                      autoComplete="off"
                      placeholder="Password"
                      className="w-full text-primary placeholder:text-primary text-lg outline-none bg-transparent"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPassword ? (
                      <IoMdEye
                        onClick={() => setShowPassword(false)}
                        size={25}
                        className="text-primary"
                      />
                    ) : (
                      <IoEyeOff
                        onClick={() => setShowPassword(true)}
                        size={25}
                        className="text-primary"
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 text-xl rounded-full"
                  >
                    Login to your account!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
