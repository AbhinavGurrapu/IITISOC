import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import ContestsNavbar from '../components/ContestsNavbar';

const DAILY_PROBLEM_APIS = [
  // LeetCode Daily Challenge
  {
    name: 'LeetCode',
    fetcher: async () => {
      const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query questionOfToday { activeDailyCodingChallengeQuestion { question { title titleSlug difficulty } } }`,
        }),
      });
      const data = await res.json();
      const q = data.data?.activeDailyCodingChallengeQuestion?.question;
      return q ? {
        title: q.title,
        link: `https://leetcode.com/problems/${q.titleSlug}/`,
        platform: 'LeetCode',
        difficulty: q.difficulty,
      } : null;
    },
  },
  // GeeksforGeeks POTD
  {
    name: 'GeeksforGeeks',
    fetcher: async () => {
      // Use backend proxy to avoid CORS
      const res = await fetch('http://localhost:3001/api/gfg/potd');
      const data = await res.json();
      if (data && data.problem) {
        return {
          title: data.problem.title,
          link: data.problem.url,
          platform: 'GeeksforGeeks',
          difficulty: data.problem.difficulty,
        };
      }
      return null;
    },
  },
  // CodeChef POTD (unofficial, fallback to practice page)
  {
    name: 'CodeChef',
    fetcher: async () => {
      // No official API, so fallback to practice page
      return {
        title: 'CodeChef Practice Problem',
        link: 'https://www.codechef.com/practice',
        platform: 'CodeChef',
        difficulty: '',
      };
    },
  },
  // HackerRank Interview Preparation Kit (as daily)
  {
    name: 'HackerRank',
    fetcher: async () => {
      // No official daily, so fallback to Interview Preparation Kit
      return {
        title: 'HackerRank Interview Prep Kit',
        link: 'https://www.hackerrank.com/interview/interview-preparation-kit',
        platform: 'HackerRank',
        difficulty: '',
      };
    },
  },
];

export default function HomePage({ username, userId, userEmail, onSignOut, goToCalendar, goToHome, goToFirstPage, goToPractice, goToProfile }) {
  const [dailyProblem, setDailyProblem] = useState(null);
  const [streak, setStreak] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solvedToday, setSolvedToday] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const dropdownRef = useRef(null);

  // Use a stable key: prefer userId, then userEmail, then username, then demo
  const getStreakKey = () => `streak_${userId || userEmail || username || 'demo'}`;
  const getSolvedDatesKey = () => `solvedDates_${userId || userEmail || username || 'demo'}`;

  useEffect(() => {
    document.body.classList.toggle('night-mode', theme === 'dark');
    document.body.classList.toggle('day-mode', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Only run if userId/userEmail/username is available
    if (!userId && !userEmail && !username) return;
    const savedStreak = localStorage.getItem(getStreakKey()) || 0;
    setStreak(Number(savedStreak));
    // Fetch daily problem from random platform (LeetCode, GFG, CodeChef, HackerRank)
    async function fetchRandomDailyProblem() {
      const apis = [...DAILY_PROBLEM_APIS];
      for (let i = apis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [apis[i], apis[j]] = [apis[j], apis[i]];
      }
      for (const api of apis) {
        try {
          const prob = await api.fetcher();
          if (prob) {
            setDailyProblem(prob);
            return;
          }
        } catch (e) { /* ignore and try next */ }
      }
      setDailyProblem(null);
    }
    fetchRandomDailyProblem();
    // Check if solved today
    const today = new Date().toISOString().split('T')[0];
    const savedDates = JSON.parse(localStorage.getItem(getSolvedDatesKey()) || '[]');
    setSolvedToday(savedDates.includes(today));
    // Streak logic: check if yesterday was solved, else reset
    if (savedDates.length > 0) {
      const sorted = savedDates.slice().sort();
      const lastDate = sorted[sorted.length - 1];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate !== yesterday && lastDate !== today) {
        setStreak(0);
        localStorage.setItem(getStreakKey(), 0);
      }
    }
  }, [userId, userEmail, username]);

  const markSolved = () => {
    if (solvedToday) return;
    const today = new Date().toISOString().split('T')[0];
    const savedDates = JSON.parse(localStorage.getItem(getSolvedDatesKey()) || '[]');
    let newStreak = 1;
    if (savedDates.length > 0) {
      const sorted = savedDates.slice().sort();
      const lastDate = sorted[sorted.length - 1];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) {
        newStreak = Number(localStorage.getItem(getStreakKey()) || 0) + 1;
      }
    }
    setStreak(newStreak);
    localStorage.setItem(getStreakKey(), newStreak);
    if (!savedDates.includes(today)) {
      savedDates.push(today);
      localStorage.setItem(getSolvedDatesKey(), JSON.stringify(savedDates));
      setSolvedToday(true);
    }
    alert('Problem marked as solved!');
  };

  const handleSignOut = () => {
    // Only remove user-identifying info, NOT streak or solvedDates
    // localStorage.removeItem(getStreakKey());
    // localStorage.removeItem(getSolvedDatesKey());
    onSignOut();
  };

  const contests = [
    {
      name: 'CodeChef',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/CodeChef_Logo.svg/1200px-CodeChef_Logo.svg.png',
      link: 'https://www.codechef.com/contests',
      desc: 'Contests in CodeChef',
      pad: '', // Remove pl-44 for better centering
    },
    {
      name: 'AtCoder',
      img: 'atcoder.png',
      link: 'https://atcoder.jp/contests/',
      desc: 'Contests in AtCoder',
      pad: 'pl-60',
    },
    {
      name: 'CodeForces',
      img: 'forces.png', // Use the new attachment image in public/
      link: 'https://codeforces.com/contests',
      desc: 'Contests in CodeForces',
      pad: '',
    },
    {
      name: 'GeeksforGeeks',
      img: 'geeks.png',
      link: 'https://www.geeksforgeeks.org/contests/',
      desc: 'Contests in GeeksforGeeks',
      pad: 'pl-52',
    },
    {
      name: 'LeetCode',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1280px-LeetCode_Logo_black_with_text.svg.png', // Updated logo URL
      link: 'https://leetcode.com/contest/',
      desc: 'Contests in LeetCode',
      pad: '', // Remove padding for better centering
    },
    {
      name: 'HackerRank',
      img: 'hackerrank.png', // Corrected filename
      link: 'https://www.hackerrank.com/contests',
      desc: 'Contests in HackerRank',
      pad: '',
    },
  ];

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

  return (
    <div className={
      `min-h-screen flex flex-col transition-colors duration-300 ` +
      (theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-indigo-100'
        : 'bg-gradient-to-br from-white via-blue-100 to-yellow-100 text-indigo-900')
    }>
      {/* Shared ContestsNavbar with notification bell and always-visible nav links */}
      <ContestsNavbar
        goToHome={goToHome}
        goToCalendar={goToCalendar}
        onSignOut={onSignOut}
        streak={streak}
        username={username}
        theme={theme}
        setTheme={setTheme}
      />
      {/* Add padding to prevent content from being hidden behind navbar */}
      <div className={
        'pt-28 pb-4 flex flex-col items-center ' +
        (theme === 'dark' ? '' : 'text-indigo-900')
      }>
        <h1 className={
          'font-mono font-extrabold text-3xl md:text-4xl drop-shadow text-center ' +
          (theme === 'dark' ? 'text-indigo-100' : 'text-indigo-900')
        }>
          Welcome {username}! Looking For Contests?
        </h1>
        <p className={
          'text-lg font-medium max-w-xl text-center mt-2 ' +
          (theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700')
        }>
          Explore upcoming contests, track your streak, and solve a daily problem to keep your skills sharp!
        </p>
      </div>
      <main className="flex flex-col gap-12 px-8 pb-40 flex-1 w-full items-center">
        {/* Contest Cards - 3 per row, original size */}
        <div className="w-full">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto">
            {contests.map((c) => (
              <div key={c.name} className={
                'shadow-2xl rounded-3xl border text-center p-6 flex flex-col items-center transition-transform hover:scale-105 ' +
                (theme === 'dark'
                  ? 'bg-white/10 backdrop-blur-lg border-indigo-900/40 text-indigo-100 hover:shadow-indigo-700/40 hover:bg-white/20'
                  : 'bg-white border-indigo-200 text-indigo-900 hover:shadow-yellow-200 hover:bg-yellow-50')
              }>
                <h1 className={
                  'font-serif font-extrabold text-xl mb-2 drop-shadow-lg ' +
                  (theme === 'dark' ? 'text-indigo-100' : 'text-indigo-900')
                }>{c.name}</h1>
                <img className="h-20 w-auto object-contain mb-2" src={c.img} alt={c.name} />
                <p className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'}>{c.desc}</p>
                <a
                  className={
                    'font-sans font-semibold rounded-xl underline px-3 py-1 transition shadow ' +
                    (theme === 'dark'
                      ? 'bg-indigo-900/40 text-indigo-100 hover:bg-indigo-800/80 hover:text-yellow-300'
                      : 'bg-blue-100 text-indigo-900 hover:bg-yellow-200 hover:text-indigo-700')
                  }
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click Here
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Daily Problem Card - below all contest cards */}
        {dailyProblem && (
          <div className="w-full flex justify-center mt-8">
            <div className={
              'rounded-3xl shadow-2xl border p-8 flex flex-col items-center max-w-md w-full ' +
              (theme === 'dark'
                ? 'bg-white/10 backdrop-blur-lg border-indigo-900/40'
                : 'bg-white border-indigo-200')
            }>
              <div className={
                'text-2xl font-extrabold mb-2 drop-shadow ' +
                (theme === 'dark' ? 'text-indigo-100' : 'text-indigo-900')
              }>Daily Problem</div>
              <div className={
                'font-semibold text-center mb-1 text-lg ' +
                (theme === 'dark' ? 'text-indigo-100' : 'text-indigo-900')
              }>{dailyProblem.title}</div>
              <div className={
                'text-base mb-2 ' +
                (theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700')
              }>Platform: {dailyProblem.platform}{dailyProblem.difficulty ? ` (${dailyProblem.difficulty})` : ''}</div>
              <a
                href={dailyProblem.link}
                target="_blank"
                rel="noreferrer"
                className={
                  'font-bold px-6 py-2 rounded-xl shadow mb-2 transition text-lg ' +
                  (theme === 'dark'
                    ? 'bg-indigo-700 hover:bg-indigo-800 text-yellow-300'
                    : 'bg-blue-100 hover:bg-yellow-200 text-indigo-900')
                }
              >
                Solve Now
              </a>
              <button
                className={
                  `text-base px-5 py-2 rounded-xl font-semibold transition ` +
                  (solvedToday
                    ? (theme === 'dark' ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                    : (theme === 'dark' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-yellow-200 text-indigo-900 hover:bg-yellow-300'))
                }
                onClick={markSolved}
                disabled={solvedToday}
              >
                {solvedToday ? 'Already Marked Today' : `Mark as Solved (Streak: ${streak})`}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
