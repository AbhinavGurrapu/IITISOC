import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // for custom styling
import ContestsNavbar from '../components/ContestsNavbar';

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
  const [calendarStreak, setCalendarStreak] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.toggle('night-mode', theme === 'dark');
    document.body.classList.toggle('day-mode', theme === 'light');
    localStorage.setItem('theme', theme);

    const weekdayEls = document.querySelectorAll('.react-calendar__month-view__weekdays abbr');
    const navEls = document.querySelectorAll('.react-calendar__navigation button');

    const newClass = theme === 'dark' ? 'text-black font-semibold' : 'text-indigo-900 font-semibold';

    weekdayEls.forEach(el => {
      el.className = newClass;
    });

    navEls.forEach(el => {
      el.className = newClass;
    });
  }, [theme]);

  const getStreakKey = () => `streak_${username || 'demo'}`;
  const getSolvedDatesKey = () => `solvedDates_${username || 'demo'}`;

  useEffect(() => {
    const loadState = () => {
      const saved = JSON.parse(localStorage.getItem(getSolvedDatesKey()) || '[]');
      setSolvedDates(saved);
      if (saved.length > 0) {
        const sorted = saved.slice().sort();
        const lastDate = sorted[sorted.length - 1];
        const today = new Date().toLocaleDateString('en-CA');
        const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
        if (lastDate !== yesterday && lastDate !== today) {
          setCalendarStreak(0);
          localStorage.setItem(getStreakKey(), 0);
        } else {
          setCalendarStreak(Number(localStorage.getItem(getStreakKey()) || 0));
        }
      } else {
        setCalendarStreak(0);
        localStorage.setItem(getStreakKey(), 0);
      }
    };
    loadState();
    const handleStorage = (e) => {
      if (
        e.key === getStreakKey() ||
        e.key === getSolvedDatesKey() ||
        e.key === null
      ) {
        loadState();
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadState();
      }
    };
    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [username]);

  const isSolvedDate = (date) => {
    const formatted = date.toLocaleDateString('en-CA');
    return solvedDates.includes(formatted);
  };

  const markTodayDone = () => {
    const today = new Date().toLocaleDateString('en-CA');
    if (isSolvedDate(new Date())) return;
    const updated = [...solvedDates, today];
    setSolvedDates(updated);
    localStorage.setItem(getSolvedDatesKey(), JSON.stringify(updated));
    let newStreak = 1;
    if (updated.length > 1) {
      const sorted = updated.slice().sort();
      const lastDate = sorted[sorted.length - 2];
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
      if (lastDate === yesterday) {
        newStreak = Number(localStorage.getItem(getStreakKey()) || 0) + 1;
      }
    }
    setCalendarStreak(newStreak);
    localStorage.setItem(getStreakKey(), newStreak);
  };

  return (
    <div className={
      `min-h-screen flex flex-col transition-colors duration-300 ` +
      (theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-indigo-100'
        : 'bg-gradient-to-br from-white via-blue-100 to-yellow-100 text-black')
    }>
      <ContestsNavbar
        goToHome={goToHome}
        goToCalendar={goToCalendar}
        onSignOut={onSignOut}
        streak={calendarStreak}
        username={username}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Title & Subtitle */}
      <div className={
        'flex flex-col items-center mt-4 sm:mt-2 mb-10 sm:mb-4 px-2 w-full ' +
        (theme === 'dark' ? '' : 'text-black')
      }>
        <div className="mt-16"></div>
        <CalendarIcon />
        <h1 className={
          'text-center font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl py-2 ' +
          (theme === 'dark' ? 'text-indigo-100' : 'text-black')
        }>Your Practice Calendar</h1>
        <p className={
          'text-center text-base sm:text-lg font-medium max-w-xs sm:max-w-xl ' +
          (theme === 'dark' ? 'text-indigo-300' : 'text-gray-800')
        }>
          Track your daily progress and stay motivated! Days you solved a problem are highlighted in green.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-4 w-full max-w-xs sm:max-w-none justify-center items-center">
          <button
            className={
              theme === 'dark'
                ? 'px-4 py-2 rounded-lg bg-indigo-700 text-yellow-300 font-semibold shadow-lg hover:bg-indigo-900 hover:text-yellow-100 border border-indigo-900 transition scale-105'
                : 'px-4 py-2 rounded-lg bg-yellow-300 text-indigo-900 font-semibold shadow-lg hover:bg-yellow-400 hover:text-black border border-yellow-400 transition scale-105'
            }
            style={{ minWidth: 220, fontSize: 18, letterSpacing: 1 }}
            onClick={markTodayDone}
            disabled={isSolvedDate(new Date())}
          >
            <span className={theme === 'dark' ? 'text-indigo-100' : 'text-black'}>
              {isSolvedDate(new Date()) ? 'Already Marked Today' : 'Mark Practice Done Today'}
            </span>
          </button>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="flex justify-center flex-1 px-2 w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-2 sm:p-6 md:p-10 w-full max-w-xs sm:max-w-xl border border-indigo-900/40">
          <Calendar
            tileClassName={({ date }) => {
              return isSolvedDate(date)
                ? 'highlight'
                : theme === 'dark'
                  ? 'text-black font-semibold'
                  : 'text-indigo-900 font-semibold';
            }}
            className="w-full"
          />
        </div>
      </div>

      {/* Floating Streak Card */}
      <div className="fixed bottom-10 right-8 z-50 bg-indigo-900/90 border border-indigo-700 shadow-2xl rounded-2xl flex items-center gap-2 px-6 py-3 text-yellow-300 font-bold text-lg backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Streak: {calendarStreak}</span>
      </div>
    </div>
  );
}
