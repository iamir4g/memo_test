import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface VerificationResponse {
  message: string;
  verificationCode: string;
}

const PhoneVerification = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' or 'code'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<VerificationResponse>(
        "http://localhost:3000/api/send-verification",
        {
          phoneNumber,
        }
      );
      setStep("code");
      setError("");
      setCountdown(120); // 2 minutes countdown
      // In a real application, we wouldn't show the verification code
      setSuccess(`کد تایید ارسال شد! (کد: ${response.data.verificationCode})`);
    } catch (err) {
      setError("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
    }
  };

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/verify-code", {
        phoneNumber,
        code: verificationCode,
      });
      setSuccess("شماره تلفن شما با موفقیت تایید شد!");
      setError("");
    } catch (err) {
      setError("کد تایید نامعتبر است. لطفا دوباره تلاش کنید.");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post<VerificationResponse>(
        "http://localhost:3000/api/send-verification",
        {
          phoneNumber,
        }
      );
      setError("");
      setCountdown(120); // Reset countdown
      setSuccess(
        `کد تایید جدید ارسال شد! (کد: ${response.data.verificationCode})`
      );
    } catch (err) {
      setError("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4"
    >
      <div className="max-w-md w-full bg-purple-700 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {step === "phone" ? "تایید شماره تلفن" : "ورود کد تایید"}
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {success}
          </div>
        )}

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-white mb-2">
                شماره تلفن
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-pink-500 text-right"
                placeholder="شماره تلفن خود را وارد کنید"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                ارسال کد تایید
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                بازگشت
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCodeVerification} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-white mb-2">
                کد تایید
              </label>
              <input
                type="text"
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-pink-500 text-center"
                placeholder="کد ۴ رقمی را وارد کنید"
                maxLength={4}
                required
              />
            </div>
            <div className="text-center text-white mb-4">
              {countdown > 0 ? (
                <p>زمان باقی‌مانده تا ارسال مجدد: {formatTime(countdown)}</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-pink-300 hover:text-pink-400 underline"
                >
                  ارسال مجدد کد
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                تایید کد
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setVerificationCode("");
                  setError("");
                  setSuccess("");
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                بازگشت
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneVerification;
