import React from 'react';
// Lucide icon SVG for UserPlus
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-user-plus" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);

export default function LandingPage({ onCreateAccount }) {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 relative overflow-hidden"
      style={{ backgroundImage: 'url("Untitled design.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Glassy Navbar */}
      <div className="h-20 flex justify-between items-center px-10 bg-white/20 backdrop-blur-md rounded-b-3xl shadow-2xl mt-4 mx-8 border border-white/30 z-10">
        <p className="text-4xl font-serif font-extrabold text-indigo-900 drop-shadow-lg cursor-pointer">CodeBlitz</p>
        <ul className="flex justify-end gap-2">
          <li className="cursor-pointer px-6 py-3 hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white">Practice</li>
          <li className="cursor-pointer px-6 py-3 hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white">Contests</li>
          <li className="cursor-pointer px-6 py-3 hover:bg-indigo-600/80 rounded-xl text-indigo-900 font-semibold text-lg transition shadow-sm hover:text-white">Login</li>
        </ul>
      </div>
      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row items-center justify-between px-10 py-16 gap-10 z-10">
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl bg-white/30 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/30 mt-10 md:mt-0">
          <p className="text-5xl md:text-6xl font-extrabold text-indigo-900 mb-8 drop-shadow-lg leading-tight">Know All About The Contests</p>
          <p className="text-xl text-indigo-800/90 mb-10 font-medium">Get info about contests on Codeforces, AtCoder, LeetCode, CodeChef, GeeksForGeeks, and more. Stay ahead, compete, and practice smarter!</p>
          <button
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition-all duration-200 border-2 border-white/30 hover:scale-105"
            onClick={onCreateAccount}
          >
            <UserPlusIcon />
            Create Account
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center relative">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl z-0"></div>
          <img
            src="Untitled design.png"
            alt="Design"
            className="w-full max-w-md rounded-3xl shadow-2xl object-contain z-10 border-4 border-white/30"
            style={{ aspectRatio: '1.2/1', background: 'rgba(255,255,255,0.05)' }}
          />
        </div>
      </main>
      {/* Decorative gradients */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
