import React, { useState } from "react";
import logoMemo from "./assets/logo_memo.png";
import "./App.css";
import animationData from "./assets/Animation.json";
import Lottie from "lottie-react";
// import animationData from "./assets/animation.json";
import memoAnimation from "./assets/memo_Lottie.json";
const App = () => {
  const [isCardsHovered, setIsCardsHovered] = useState(false);

  return (
    <div
      dir="rtl"
      className="bg-gray-800 min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Header */}
      <header className="text-center mb-12 relative flex flex-col items-center justify-center">
        {/* Logo Image */}
        {/* <img
          src={logoMemo}
          alt="MEMO Logo"
          className={`w-48 md:w-96 transition-transform duration-500 ease-in-out ${
            isCardsHovered ? "animate-wobble" : ""
          }`}
        /> */}
        <Lottie
          className="w-48 md:w-96"
          animationData={animationData}
          loop={true}
        />
        {/* <Lottie animationData={animationData} loop={true} /> */}
        {/* MEMO Title */}
        <h1 className="text-5xl font-bold text-white mt-4">MEMO</h1>
        <p className="text-xl text-white mt-4">
          ممو، راهنمای هوشمندت برای انتخاب عطری که واقعاً نیازش داری.
        </p>
      </header>

      {/* Cards Section */}
      <div
        onMouseEnter={() => setIsCardsHovered(true)}
        onMouseLeave={() => setIsCardsHovered(false)}
        className="flex flex-col md:flex-row gap-8 w-full max-w-4xl"
      >
        {/* Card 1: پیدا کردن عطر */}
        <div className="bg-purple-700 rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/2 cursor-pointer transform transition hover:scale-105">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              عطر خاص خودت رو با MEMO پیدا کن
            </h2>
            <p className="text-white mt-2">
              فقط کافیه به چند تا سؤال ساده جواب بدی، ممو عطر مناسب تو رو پیدا
              می‌کنه!
            </p>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition float-left">
            شروع
          </button>
        </div>

        {/* Card 2: راهنمای خرید هدیه */}
        <div className="bg-purple-700 rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/2 cursor-pointer transform transition hover:scale-105">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              پیدا کردن عطر هدیه با MEMO
            </h2>
            <p className="text-white mt-2">
              ممو کمکت می‌کنه تا بهترین عطر رو برای هدیه انتخاب کنی
            </p>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition float-left">
            شروع
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
