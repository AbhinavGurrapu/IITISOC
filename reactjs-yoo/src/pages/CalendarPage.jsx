import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // for custom styling

// Lucide Calendar Icon SVG
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar text-indigo-500 drop-shadow-lg"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

export default function CalendarPage({ goToHome, onSignOut, goToCalendar }) {
  const [solvedDates, setSolvedDates] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('solvedDates')) || [];
    setSolvedDates(saved);
  }, []);

  // Close dropdown on outside click
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

  const isSolvedDate = (date) => {
    const formatted = date.toISOString().split('T')[0];
    return solvedDates.includes(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 pb-10 flex flex-col">
      {/* Floating Navbar with solid color, rounded edges, and margin (copied from HomePage) */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-8 shadow-xl rounded-2xl items-center border border-indigo-200">
        <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
          CodeBlitz
        </p>
        <ul className="flex justify-end items-center gap-2">
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition">Practice</li>
          <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition">Help</li>
          <li
            className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition"
            onClick={goToCalendar}
          >
            My Calendar
          </li>
          <div className="relative flex items-center ml-4" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl shadow transition focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <i className="fa-solid fa-user"></i>
              <span className="hidden sm:inline">Profile</span>
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

      {/* Title & Subtitle */}
      <div className="flex flex-col items-center mt-8 mb-4">
        <CalendarIcon />
        <h1 className="text-center font-mono font-extrabold text-3xl md:text-4xl py-2 text-indigo-800 drop-shadow">Your Practice Calendar</h1>
        <p className="text-center text-lg text-indigo-700/80 font-medium max-w-xl">Track your daily progress and stay motivated! Days you solved a problem are highlighted in green.</p>
        <div className="flex gap-4 mt-4">
          <button
            className={`px-6 py-2 rounded-xl font-bold text-white shadow transition ${isSolvedDate(new Date()) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={() => {
              if (isSolvedDate(new Date())) return;
              const today = new Date().toISOString().split('T')[0];
              const updated = [...solvedDates, today];
              setSolvedDates(updated);
              localStorage.setItem('solvedDates', JSON.stringify(updated));
            }}
            disabled={isSolvedDate(new Date())}
          >
            {isSolvedDate(new Date()) ? 'Already Marked Today' : 'Mark Practice Done Today'}
          </button>
          {/* Optionally, add a separate button for contests if you want to track them separately */}
        </div>
      </div>

      {/* Calendar Component in Card */}
      <div className="flex justify-center flex-1">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-xl border border-indigo-100">
          <Calendar
            tileClassName={({ date }) => {
              return isSolvedDate(date) ? 'highlight' : null;
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
