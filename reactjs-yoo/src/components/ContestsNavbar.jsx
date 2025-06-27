import React from 'react';

function ContestsNavbar({ goToHome, goToCalendar, onSignOut, streak, username }) {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-8 shadow-xl rounded-2xl items-center border border-indigo-200">
      <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
        CodeBlitz
      </p>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-white font-bold shadow border border-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Streak: {streak || 0}</span>
        </div>
        <ul className="flex justify-end items-center gap-2">
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('contests')}>Compete</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition">Practice</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition">Help</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={goToCalendar}>My Calendar</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-red-600 rounded-xl text-white transition" onClick={onSignOut}>Sign Out</li>
        </ul>
      </div>
    </div>
  );
}

export default ContestsNavbar;
