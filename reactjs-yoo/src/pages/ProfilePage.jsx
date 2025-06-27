import React from 'react';

export default function ProfilePage({ username, streak, goToHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col items-center pb-20">
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-8 shadow-xl rounded-2xl items-center border border-indigo-200">
        <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
          CodeBlitz
        </p>
      </div>
      <div className="pt-28 pb-8 flex flex-col items-center w-full">
        <h1 className="font-mono font-extrabold text-3xl md:text-4xl text-indigo-800 drop-shadow text-center mb-4">My Profile</h1>
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 border border-indigo-100 flex flex-col items-center max-w-md w-full">
          <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-4xl font-bold text-indigo-700 mb-4">
            {username ? username[0].toUpperCase() : '?'}
          </div>
          <div className="text-xl font-bold text-indigo-800 mb-2">{username || 'User'}</div>
          <div className="flex items-center gap-2 text-lg font-semibold text-indigo-700 mb-2">
            {/* Thunder icon Lucide */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Streak: {streak}</span>
          </div>
          <div className="text-indigo-600 text-base mb-2">Email: (not set)</div>
          <div className="text-indigo-600 text-base mb-2">More profile features coming soon!</div>
        </div>
      </div>
    </div>
  );
}
