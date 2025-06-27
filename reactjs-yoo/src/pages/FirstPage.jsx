import React from 'react';

export default function FirstPage({ goToSignIn, goToSignUp, goToHome }) {
  return (
    <div className="bg-sky-500 min-h-screen flex flex-col">
      {/* Floating Navbar with solid color, rounded edges, and margin */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between shadow-xl rounded-2xl px-8 items-center border border-indigo-200">
        <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
          CodeBlitz
        </p>
        <ul className="flex justify-end">
          <li className="cursor-pointer px-5 py-3 hover:bg-indigo-600 rounded-xl text-xl font-semibold text-white transition">
            Compete
          </li>
          <li className="cursor-pointer px-5 py-3 hover:bg-indigo-600 rounded-xl text-xl font-semibold text-white transition">
            Practice
          </li>
          <li className="cursor-pointer px-5 py-3 hover:bg-indigo-600 rounded-xl text-xl font-semibold text-white transition">
            Contests
          </li>
          <li
            className="cursor-pointer px-5 py-3 hover:bg-indigo-600 rounded-xl text-xl font-semibold text-white transition"
            onClick={goToSignIn}
          >
            Login
          </li>
        </ul>
      </div>

      {/* Add padding to prevent content from being hidden behind navbar */}
      <main className="flex pt-28 flex-1">
        <div className="h-96 pt-40">
          <p className="text-3xl font-semibold pl-16 text-white drop-shadow">
            Know All About The Contests
          </p>
          <p className="w-0.125 m-10 text-white/90">
            Gives info about the contests on various sites such as Codeforces,
            AtCoder, LeetCode, CodeChef, and GeeksForGeeks
          </p>
          <div className="pl-40 m-10 font-medium">
            <button
              className="bg-indigo-500 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl py-2 px-4 text-white shadow-lg"
              onClick={goToSignUp}
            >
              Create Account {'>'}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <img src="Untitled design.png" alt="Design" className="h-fit" />
        </div>
      </main>
    </div>
  );
}
