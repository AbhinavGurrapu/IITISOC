import React, { useState, useEffect } from 'react';

// Lucide UserPlus icon
const UserPlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="lucide lucide-user-plus"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

export default function FirstPage({ goToSignIn, goToSignUp, goToHome }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.toggle('night-mode', theme === 'dark');
    document.body.classList.toggle('day-mode', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navItems = ['Compete', 'Practice', 'Contests', 'Login'];

  return (
    <div className={
      `min-h-screen flex flex-col relative transition-colors duration-300 ` +
      (theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-indigo-100'
        : 'bg-gradient-to-br from-white via-blue-100 to-yellow-100 text-black')
    }>
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('Untitled design.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      ></div>

      {/* Navigation */}
      <div className={
        'relative z-10 flex flex-col min-h-screen ' +
        (theme === 'dark' ? '' : 'text-black')
      }>
        <div className={
          'fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 h-20 flex justify-between items-center shadow-2xl rounded-2xl px-6 md:px-8 border ' +
          (theme === 'dark' ? 'bg-indigo-900/90 border-indigo-700' : 'bg-white border-indigo-300')
        }>
          <p
            className={theme === 'dark' ? 'text-3xl md:text-4xl font-serif font-extrabold text-yellow-300 cursor-pointer drop-shadow-lg' : 'text-3xl md:text-4xl font-serif font-extrabold text-indigo-900 cursor-pointer drop-shadow-lg'}
          >
            CodeBlitz
          </p>

          {/* Desktop nav */}
          <ul className="hidden md:flex justify-end gap-3 items-center">
            {navItems.map((label) => (
              <li
                key={label}
                className={theme === 'dark' ? 'cursor-pointer px-4 py-2 text-yellow-100 hover:bg-indigo-800/80 rounded-xl font-semibold text-lg transition shadow-sm' : 'cursor-pointer px-4 py-2 text-indigo-900 hover:bg-indigo-200 rounded-xl font-semibold text-lg transition shadow-sm'}
                onClick={goToSignIn}
              >
                {label}
              </li>
            ))}
          </ul>

          {/* Hamburger - Mobile */}
          <div className={theme === 'dark' ? 'md:hidden text-yellow-100' : 'md:hidden text-indigo-900'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className={theme === 'dark' ? 'fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] bg-indigo-900/90 text-yellow-100 rounded-2xl shadow-xl z-40 md:hidden flex flex-col px-6 py-4 gap-2 border border-indigo-700' : 'fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] bg-white text-indigo-900 rounded-2xl shadow-xl z-40 md:hidden flex flex-col px-6 py-4 gap-2 border border-indigo-300'}>
            {navItems.map((label) => (
              <button
                key={label}
                className={theme === 'dark' ? 'text-left px-3 py-2 rounded-lg hover:bg-indigo-800 text-lg font-semibold' : 'text-left px-3 py-2 rounded-lg hover:bg-indigo-200 text-lg font-semibold'}
                onClick={() => {
                  setMenuOpen(false);
                  goToSignIn();
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Main Hero Content */}
        <main className={theme === 'dark' ? 'flex flex-1 items-center justify-center pt-32 pb-10' : 'flex flex-1 items-center justify-center pt-32 pb-10 text-black'}>
          <div className={theme === 'dark' ? 'flex flex-col justify-center items-start max-w-xl bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-indigo-900/40 mt-10 md:mt-0' : 'flex flex-col justify-center items-start max-w-xl bg-white rounded-3xl p-10 shadow-2xl border border-indigo-300 mt-10 md:mt-0'}>
            <p className={theme === 'dark' ? 'text-4xl md:text-5xl font-extrabold text-yellow-100 mb-8 drop-shadow-lg leading-tight' : 'text-4xl md:text-5xl font-extrabold text-indigo-900 mb-8 drop-shadow-lg leading-tight'}>
              Know All About The Contests
            </p>
            <p className={theme === 'dark' ? 'text-xl text-indigo-200 mb-10 font-medium' : 'text-xl text-indigo-700 mb-10 font-medium'}>
              Gives info about the contests on various sites such as Codeforces, AtCoder, LeetCode, CodeChef, and GeeksForGeeks
            </p>
            <button
              className={theme === 'dark' ? 'flex items-center gap-3 bg-indigo-900/80 backdrop-blur-md text-yellow-300 font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition-all duration-200 border-2 border-indigo-700 hover:bg-indigo-800 hover:text-yellow-400 hover:scale-105' : 'flex items-center gap-3 bg-indigo-200 text-indigo-900 font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition-all duration-200 border-2 border-indigo-300 hover:bg-indigo-400 hover:text-black hover:scale-105'}
              onClick={goToSignUp}
            >
              <UserPlusIcon />
              Create Account
            </button>
          </div>
        </main>
      </div>

      {/* Decorative gradients */}
      <div className={theme === 'dark' ? 'absolute left-0 top-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl -z-10' : 'absolute left-0 top-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl -z-10'}></div>
      <div className={theme === 'dark' ? 'absolute right-0 bottom-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl -z-10' : 'absolute right-0 bottom-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl -z-10'}></div>
    </div>
  );
}
