"use client";

import React, { useState, useRef, useEffect } from "react";
import { Post } from "@/hooks/apiUtils";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/router";

const OtpVerification = ({
  email,
  // setOtpLocal,
  // handleGoBack,
  setIsModalVisible,
}: {
  email: any;
  setOtpLocal?: any;
  handleGoBack?: any;
  setIsModalVisible?: any;
}) => {
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();

  // Enable the verify button when all OTP digits are filled
  useEffect(() => {
    const isOtpComplete = otp.every((digit) => digit !== "");
    setIsButtonDisabled(!isOtpComplete);
  }, [otp]);

  // Timer countdown for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
      // setOtpLocal();
    }
    // eslint-disable-next-line
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Handle case when pasting a 6-digit OTP
    if (value.length === 6 && index === 0) {
      const newOtp = value.split("").slice(0, 6);
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      inputRefs.current[5].focus();
    } else if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input box
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleGoBack = ()=>{
    router.prefetch("/auth/login");
  }

  const handleResend = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    await Post("vendors/send-otp", { email: email });
    setOtp(Array(6).fill(""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    try {
      const response: any = await Post("vendors/verify-otp", {
        email: email,
        otp: otpCode,
      });
      if (response.success) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white px-6 items-center w-full max-w-md">
      <h6 className="text-md font-bold text-primary text-center mb-4">
          Enter OTP to verify your <br className="hidden bg:block" /> E-mail
        </h6>
        <p className="text-center text-xs text-primary/70 mb-5">
          We&apos;ve sent an OTP to this E-mail Address <br />
          <span className="text-primary/70 pt-1 flex justify-center items-center font-semibold cursor-pointer">
            {email}{" "}
            <span
              onClick={handleGoBack}
              className="text-primary hover:text-primary/80 hover:underline text-xs pl-2 cursor-pointer"
            >
              <CiEdit size={18} />
            </span>
          </span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-6 gap-3 justify-center items-center mb-2"
        >
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric" // Opens numeric keyboard on mobile
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputRefs.current[index] = el as HTMLInputElement;
              }}
              className="w-full aspect-square text-center border focus:border-2 border-primary/30 rounded-md focus:outline-none focus:border-primary/70 text-lg" // Reduced font size
            />
          ))}
        </form>

        <div className="flex mb-4  place-items-start">
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-3.5 h-3.5 mt-1 accent-[#8b7eff] appearance-auto rounded-sm border"
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-normal text-gray-500 dark:text-gray-300"
          >
            {" "}
            Did&apos;t receive a code?{" "}
            <Link href={""} className="text-blue-600" onClick={handleResend}>
              Resend
            </Link>
          </label>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={`w-full py-1 text-white rounded-md transition text-m duration-200 ${
            isButtonDisabled
              ? "btn-primary cursor-not-allowed"
              : "btn-primary hover:bg-primary-700"
          }`}
        >
          Verify
        </button>
        <div className="text-center mt-2">
          {isResendDisabled ? (
            <p className="text-primary">Resend OTP in {timer}s</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
