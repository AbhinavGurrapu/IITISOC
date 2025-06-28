import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';

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
      // GFG POTD unofficial API (community-maintained)
      const res = await fetch('https://gfg-problem-of-the-day-api.vercel.app/api/potd');
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

export default function HomePage({ username, onSignOut, goToCalendar, goToHome, goToFirstPage }) {
  const [dailyProblem, setDailyProblem] = useState(null);
  const [streak, setStreak] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solvedToday, setSolvedToday] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedStreak = localStorage.getItem('streak') || 0;
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
    const savedDates = JSON.parse(localStorage.getItem('solvedDates')) || [];
    setSolvedToday(savedDates.includes(today));
  }, []);

  const markSolved = () => {
    if (solvedToday) return;
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('streak', newStreak);

    const today = new Date().toISOString().split('T')[0];
    const savedDates = JSON.parse(localStorage.getItem('solvedDates')) || [];
    if (!savedDates.includes(today)) {
      savedDates.push(today);
      localStorage.setItem('solvedDates', JSON.stringify(savedDates));
      setSolvedToday(true);
    }
    alert('Problem marked as solved! Streak increased!');
  };

  const handleSignOut = () => {
    localStorage.removeItem('streak');
    localStorage.removeItem('solvedDates');
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
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col">
      {/* Go Back Button */}
      <button
        className="absolute top-8 left-8 bg-white/40 hover:bg-white/70 text-indigo-700 rounded-full p-2 shadow-lg z-50 transition"
        onClick={goToFirstPage}
        aria-label="Go Back"
        style={{backdropFilter: 'blur(6px)'}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      {/* Floating Navbar with solid color, rounded edges, and margin */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-2 shadow-xl rounded-2xl items-center border border-indigo-200">
        <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
          CodeBlitz
        </p>
        <div className="flex items-center gap-6">
          <ul className="flex justify-end items-center gap-2">
            <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('contests')}>
              Compete
            </li>
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
      </div>

      {/* Add padding to prevent content from being hidden behind navbar */}
      <div className="pt-28 pb-4 flex flex-col items-center">
        <h1 className="font-mono font-extrabold text-3xl md:text-4xl text-indigo-800 drop-shadow text-center">
          Welcome {username}! Looking For Contests?
        </h1>
        <p className="text-lg text-indigo-700/80 font-medium max-w-xl text-center mt-2">
          Explore upcoming contests, track your streak, and solve a daily problem to keep your skills sharp!
        </p>
      </div>

      <main className="flex flex-col gap-12 px-8 pb-40 flex-1 w-full items-center">
        {/* Contest Cards - 3 per row, original size */}
        <div className="w-full">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto">
            {contests.map((c) => (
              <div key={c.name} className="shadow-xl rounded-3xl bg-white/80 backdrop-blur-md border border-indigo-100 text-center p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
                <h1 className="font-serif font-extrabold text-xl text-indigo-700 mb-2">{c.name}</h1>
                <img className={`h-20 w-auto object-contain mb-2`} src={c.img} alt={c.name} />
                <p className="text-indigo-800/90 mb-2">{c.desc}</p>
                <a
                  className="font-sans font-semibold rounded-xl underline bg-indigo-100 px-3 py-1 text-indigo-700 hover:bg-indigo-200 transition"
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
            <div className="rounded-3xl shadow-2xl bg-white/90 border border-indigo-100 p-8 flex flex-col items-center max-w-md w-full">
              <div className="text-2xl font-extrabold text-indigo-800 mb-2">Daily Problem</div>
              <div className="text-indigo-800 font-semibold text-center mb-1 text-lg">{dailyProblem.title}</div>
              <div className="text-indigo-600 text-base mb-2">Platform: {dailyProblem.platform}{dailyProblem.difficulty ? ` (${dailyProblem.difficulty})` : ''}</div>
              <a
                href={dailyProblem.link}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-2 rounded-xl shadow mb-2 transition text-lg"
              >
                Solve Now
              </a>
              <button
                className={`text-base px-5 py-2 rounded-xl font-semibold transition ${solvedToday ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                onClick={markSolved}
                disabled={solvedToday}
              >
                {solvedToday ? 'Already Marked Today' : `Mark as Solved (Streak: ${streak})`}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Streak Card at Bottom Right */}
      <div className="fixed bottom-10 right-8 z-50 bg-indigo-700 border border-indigo-300 shadow-2xl rounded-2xl flex items-center gap-2 px-6 py-3 text-white font-bold text-lg backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Streak: {streak}</span>
      </div>
    </div>
  );
}
