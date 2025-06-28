import React from 'react';

// Lucide icon SVG for UserPlus
const UserPlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="lucide lucide-user-plus"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

export default function FirstPage({ goToSignIn, goToSignUp, goToHome }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with opacity 0.7 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('Untitled design.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Glassy Lucid Navbar */}
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-20 flex justify-between items-center shadow-2xl rounded-2xl px-8 border border-indigo-200">
          <p
            className="text-4xl font-serif font-extrabold text-white cursor-pointer drop-shadow-lg"
            onClick={goToHome}
          >
            CodeBlitz
          </p>
          <ul className="flex justify-end gap-2">
            <li className="cursor-pointer px-6 py-3 text-white hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white"
                onClick={goToSignIn}>
              Compete
            </li>
            <li className="cursor-pointer px-6 py-3 text-white hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white"
              onClick={goToSignIn}>
              Practice
            </li>
            <li className="cursor-pointer px-6 py-3 text-white hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white"
              onClick={goToSignIn}>
              Contests
            </li>
            <li
              className="cursor-pointer px-6 py-3 text-white hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white"
              onClick={goToSignIn}
            >
              Login
            </li>
          </ul>
        </div>
        {/* Main Content Lucid Style */}
        <main className="flex flex-1 items-center justify-center pt-32 pb-10">
          <div className="flex flex-col justify-center items-start max-w-xl bg-white/30 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/30 mt-10 md:mt-0">
            <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-8 drop-shadow-lg leading-tight">
              Know All About The Contests
            </p>
            <p className="text-xl text-indigo-800/90 mb-10 font-medium">
              Gives info about the contests on various sites such as Codeforces,
              AtCoder, LeetCode, CodeChef, and GeeksForGeeks
            </p>
            <button
              className="flex items-center gap-3 bg-white/60 backdrop-blur-md text-indigo-900 font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition-all duration-200 border-2 border-white/30 hover:bg-white/80 hover:text-blue-600 hover:scale-105"
              onClick={goToSignUp}
            >
              <UserPlusIcon />
              Create Account
            </button>
          </div>
        </main>
      </div>
      {/* Decorative gradients for Lucid style */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
