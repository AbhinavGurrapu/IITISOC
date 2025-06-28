import React, { useState, useRef, useEffect } from 'react';

function ContestsNavbar({ goToHome, goToCalendar, onSignOut, streak, username }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="top-6 mx-auto w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-2 shadow-xl rounded-2xl items-center border-indigo-200">
      <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
        CodeBlitz
      </p>
      <div className="flex items-center gap-6">
        <ul className="flex justify-end items-center gap-2">
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('contests')}>Compete</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('practice')}>Practice</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition">Help</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={goToCalendar}>My Calendar</li>
          <div className="relative flex items-center ml-4" style={{zIndex: 60}} ref={dropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl shadow transition focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
            >
              <i className="fa-solid fa-user"></i>
              <span className="hidden sm:inline">{username || 'Profile'}</span>
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-indigo-200 z-50 animate-fade-in"
                style={{
                  top: '100%',
                  left: 'auto',
                  right: 0,
                  minWidth: '11rem',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
              >
                <ul className="py-2 text-gray-800">
                  <li className="px-4 py-2 hover:bg-indigo-100 cursor-pointer">My Profile</li>
                  <li className="px-4 py-2 hover:bg-indigo-100 cursor-pointer">Edit Profile</li>
                  <li className="px-4 py-2 hover:bg-indigo-100 cursor-pointer">Report a Bug</li>
                  <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer" onClick={onSignOut}>
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default ContestsNavbar;