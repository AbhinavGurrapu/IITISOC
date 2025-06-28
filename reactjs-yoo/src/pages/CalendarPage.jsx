import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // for custom styling
import ContestsNavbar from '../components/ContestsNavbar';

// Lucide Calendar Icon SVG
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar text-indigo-500 drop-shadow-lg">
    <rect width="18" height="18" x="3" y="4" rx="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

export default function CalendarPage({ goToHome, onSignOut, goToCalendar, goToFirstPage, streak, username }) {
  const [solvedDates, setSolvedDates] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('solvedDates')) || [];
    setSolvedDates(saved);
  }, []);

  const isSolvedDate = (date) => {
    const formatted = date.toLocaleDateString('en-CA');
    return solvedDates.includes(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 pb-10 flex flex-col">
      {/* Only one navbar below, removed any duplicate */}
      <ContestsNavbar 
        goToHome={goToHome} 
        goToCalendar={goToCalendar} 
        onSignOut={onSignOut} 
        streak={streak} 
        username={username} 
      />
      
      {/* Title & Subtitle */}
      <div className="flex flex-col items-center mt-4 sm:mt-2 mb-10 sm:mb-4 px-2 w-full">
        <div className="mt-16"></div>
        <CalendarIcon />   
        <h1 className="text-center font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl py-2 text-indigo-800 drop-shadow">Your Practice Calendar</h1>
        <p className="text-center text-base sm:text-lg text-indigo-700/80 font-medium max-w-xs sm:max-w-xl">Track your daily progress and stay motivated! Days you solved a problem are highlighted in green.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-4 w-full max-w-xs sm:max-w-none justify-center items-center">
          <button
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl font-bold text-white shadow transition ${isSolvedDate(new Date()) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={() => {
              if (isSolvedDate(new Date())) return;
              const today = new Date().toLocaleDateString('en-CA');
              const updated = [...solvedDates, today];
              setSolvedDates(updated);
              localStorage.setItem('solvedDates', JSON.stringify(updated));
            }}
            disabled={isSolvedDate(new Date())}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          >
            <span className="text-center font-medium text-indigo-700 w-full block">
              {isSolvedDate(new Date()) ? 'Already Marked Today' : 'Mark Practice Done Today'}
            </span>
          </button>
        </div>
      </div>
      {/* Calendar Component in Card */}
      <div className="flex justify-center flex-1 px-2 w-full">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-2 sm:p-6 md:p-10 w-full max-w-xs sm:max-w-xl border border-indigo-100">
          <Calendar
            tileClassName={({ date }) => {
              return isSolvedDate(date) ? 'highlight' : null;
            }}
            className="w-full"
          />
        </div>
      </div>
      {/* Floating Streak Card at Bottom Right */}
      <div className="fixed bottom-10 right-8 z-50 bg-indigo-700 border border-indigo-300 shadow-2xl rounded-2xl flex items-center gap-2 px-6 py-3 text-white font-bold text-lg backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Streak: {streak}</span>
      </div>
    </div>
  );
}
