import React from 'react';

export default function ProfilePage({ username, streak, goToHome }) {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'dark');
  React.useEffect(() => {
    document.body.classList.toggle('night-mode', theme === 'dark');
    document.body.classList.toggle('day-mode', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <div className={
      `min-h-screen flex flex-col items-center pb-20 transition-colors duration-300 ` +
      (theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-indigo-100'
        : 'bg-gradient-to-br from-white via-blue-100 to-yellow-100 text-black')
    }>
      <div className={
        'fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 h-16 flex justify-between px-8 shadow-xl rounded-2xl items-center border ' +
        (theme === 'dark' ? 'bg-indigo-700 border-indigo-200' : 'bg-white border-indigo-300')
      }>
        <p className={theme === 'dark' ? 'text-4xl font-serif font-semibold text-white cursor-pointer' : 'text-4xl font-serif font-semibold text-indigo-900 cursor-pointer'} onClick={goToHome}>
          CodeBlitz
        </p>
      </div>
      <div className={
        'pt-28 pb-8 flex flex-col items-center w-full ' +
        (theme === 'dark' ? '' : 'text-black')
      }>
        <h1 className={
          'font-mono font-extrabold text-3xl md:text-4xl drop-shadow text-center mb-4 ' +
          (theme === 'dark' ? 'text-indigo-100' : 'text-indigo-900')
        }>My Profile</h1>
        <div className={
          (theme === 'dark'
            ? 'bg-white/90 rounded-3xl shadow-2xl p-8 border border-indigo-100 flex flex-col items-center max-w-md w-full'
            : 'bg-white rounded-3xl shadow-2xl p-8 border border-indigo-200 flex flex-col items-center max-w-md w-full')
        }>
          <div className={
            (theme === 'dark'
              ? 'w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-4xl font-bold text-indigo-700 mb-4'
              : 'w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-900 mb-4')
          }>
            {username ? username[0].toUpperCase() : '?'}
          </div>
          <div className={theme === 'dark' ? 'text-xl font-bold text-indigo-800 mb-2' : 'text-xl font-bold text-indigo-900 mb-2'}>{username || 'User'}</div>
          <div className={theme === 'dark' ? 'flex items-center gap-2 text-lg font-semibold text-indigo-700 mb-2' : 'flex items-center gap-2 text-lg font-semibold text-indigo-900 mb-2'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Streak: {streak}</span>
          </div>
          <div className={theme === 'dark' ? 'text-indigo-600 text-base mb-2' : 'text-indigo-700 text-base mb-2'}>Email: (not set)</div>
          <div className={theme === 'dark' ? 'text-indigo-600 text-base mb-2' : 'text-indigo-700 text-base mb-2'}>More profile features coming soon!</div>
        </div>
      </div>
    </div>
  );
}
