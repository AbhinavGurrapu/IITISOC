import React from 'react';
// Lucide icon SVG for UserPlus
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-user-plus" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);

export default function LandingPage({ onCreateAccount }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col">
      {/* Navbar */}
      <div className="h-16 flex justify-between items-center px-8 bg-indigo-700 rounded-b-2xl shadow-lg mt-2 mx-4">
        <p className="text-4xl font-serif font-semibold text-white">CodeBlitz</p>
        <ul className="flex justify-end gap-2">
          <li className="cursor-pointer px-5 py-2 hover:bg-indigo-600 rounded-xl text-white font-semibold transition">Practice</li>
          <li className="cursor-pointer px-5 py-2 hover:bg-indigo-600 rounded-xl text-white font-semibold transition">Contests</li>
          <li className="cursor-pointer px-5 py-2 hover:bg-indigo-600 rounded-xl text-white font-semibold transition">Login</li>
        </ul>
      </div>
      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row items-center justify-between px-8 py-12 gap-8">
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <p className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow">Know All About The Contests</p>
          <p className="text-lg text-white/90 mb-8">Gives info about the contests on various sites such as Codeforces, AtCoder, LeetCode, CodeChef, and GeeksForGeeks</p>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg text-lg transition-all duration-200 border-2 border-white/20 hover:scale-105"
            onClick={onCreateAccount}
          >
            <UserPlusIcon />
            Create Account
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src="Untitled design.png"
            alt="Design"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-contain"
            style={{ aspectRatio: '1.2/1', background: 'rgba(255,255,255,0.05)' }}
          />
        </div>
      </main>
    </div>
  );
}
