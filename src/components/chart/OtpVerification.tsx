"use client";


import React, { useState, useRef, useEffect } from "react";
import { Post } from "@/hooks/apiUtils";
import Link from "next/link";

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
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [, setIsResendDisabled] = useState(true);

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
      <div className="bg-white px-6 py-10 w-full max-w-md">

        <p className="text-left text-sm font-semibold text-primary/70 mb-5">
          Email Verification Code:
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-4 gap-3 justify-center items-center mb-2"
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
              className="w-full h-10 aspect-square text-center border focus:border-2 border-primary/30 rounded-md focus:outline-none focus:border-primary/70 text-lg" // Reduced font size
            />
          ))}
        </form>
        <p className="text-center text-sm mb-5">
          Did&apos;t receive a code? <Link href={""} className="text-blue-600" onClick={handleResend}>Resend</Link>
        </p>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={`w-full py-1 text-white rounded-md transition text-m duration-200 ${isButtonDisabled
              ? "bg-[#8b7eff]/90 cursor-not-allowed"
              : "bg-[#8b7eff] hover:bg-primary-700"
            }`}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;