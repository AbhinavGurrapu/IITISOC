import React, { useState, useEffect } from 'react';

export default function MyProfile({ username, goToHome, personalInfo = {}, onEditInfo }) {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [form, setForm] = useState({
    firstName: personalInfo.firstName || '',
    lastName: personalInfo.lastName || '',
    age: personalInfo.age || '',
    college: personalInfo.college || '',
    password: personalInfo.password || '',
  });
  const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ');

  // Use name and email from personalInfo if available
  const displayName = personalInfo.name || [form.firstName, form.lastName].filter(Boolean).join(' ');
  let displayEmail = personalInfo.email || '';
  if (!displayEmail && typeof window !== 'undefined') {
    displayEmail = localStorage.getItem('userEmail') || '';
  }
  if (!displayEmail && username && username.includes('@')) {
    displayEmail = username;
  }
  displayEmail = displayEmail || '-';

  // Load profile info from localStorage if available, and merge with personalInfo
  useEffect(() => {
    const savedProfile = localStorage.getItem('myProfileInfo');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setForm({
          firstName: parsed.firstName || personalInfo.firstName || '',
          lastName: parsed.lastName || personalInfo.lastName || '',
          age: parsed.age || personalInfo.age || '',
          college: parsed.college || personalInfo.college || '',
          password: parsed.password || personalInfo.password || '',
        });
      } catch {
        setForm({
          firstName: personalInfo.firstName || '',
          lastName: personalInfo.lastName || '',
          age: personalInfo.age || '',
          college: personalInfo.college || '',
          password: personalInfo.password || '',
        });
      }
    } else {
      setForm({
        firstName: personalInfo.firstName || '',
        lastName: personalInfo.lastName || '',
        age: personalInfo.age || '',
        college: personalInfo.college || '',
        password: personalInfo.password || '',
      });
    }
  }, [personalInfo]);

  useEffect(() => {
    document.body.classList.toggle('night-mode', theme === 'dark');
    document.body.classList.toggle('day-mode', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onEditInfo) onEditInfo(form);
    localStorage.setItem('myProfileInfo', JSON.stringify(form));
    setEditMode(false);
  };

  // For display, prefer localStorage profile if available
  const savedProfile = typeof window !== 'undefined' ? localStorage.getItem('myProfileInfo') : null;
  let displayFirstName = form.firstName;
  let displayLastName = form.lastName;
  let displayAge = form.age;
  let displayCollege = form.college;
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile);
      displayFirstName = parsed.firstName || displayFirstName;
      displayLastName = parsed.lastName || displayLastName;
      displayAge = parsed.age || displayAge;
      displayCollege = parsed.college || displayCollege;
    } catch {}
  }

  return (
    <div className={
      `min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ` +
      (theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-indigo-100'
        : 'bg-gradient-to-br from-white via-blue-100 to-yellow-100 text-black')
    }>
      {/* Optionally add ContestsNavbar here if you want nav and theme toggle */}
      <div className={
        'bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl border border-indigo-900/40 p-6 w-full max-w-md flex flex-col items-center relative overflow-visible ' +
        (theme === 'dark' ? '' : 'text-black')
      }>
        {/* Decorative Profile Icon with Glow */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-gradient-to-br from-indigo-700 via-indigo-400 to-emerald-400 border-4 border-white/10 rounded-full w-20 h-20 flex items-center justify-center shadow-2xl animate-pulse-slow relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-yellow-300 drop-shadow-xl">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5" />
            </svg>
            <span className="absolute bottom-1 right-1 bg-green-400 border-2 border-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold text-white shadow">✔</span>
          </div>
          <div className={theme === 'dark' ? 'mt-1 text-lg font-extrabold text-yellow-100 tracking-wide drop-shadow' : 'mt-1 text-lg font-extrabold text-indigo-900 tracking-wide drop-shadow'}>{username || 'User'}</div>
        </div>
        <h1 className={theme === 'dark' ? 'text-2xl font-serif font-extrabold text-yellow-100 mb-6 mt-12 tracking-tight drop-shadow-lg' : 'text-2xl font-serif font-extrabold text-indigo-900 mb-6 mt-12 tracking-tight drop-shadow-lg'}>My Profile</h1>
        <div className="w-full flex flex-col gap-6 items-center">
          {editMode ? (
            <div className="flex flex-col gap-3 w-full items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <div className="flex flex-col items-start">
                  <label className="text-sm font-bold text-indigo-200 mb-1">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className="border-2 border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-xl px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium shadow text-sm" />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-sm font-bold text-indigo-200 mb-1">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className="border-2 border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-xl px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium shadow text-sm" />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-sm font-bold text-indigo-200 mb-1">Age</label>
                  <input name="age" value={form.age} onChange={handleChange} className="border-2 border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-xl px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium shadow text-sm" />
                </div>
                <div className="flex flex-col items-start md:col-span-3">
                  <label className="text-sm font-bold text-indigo-200 mb-1">Password</label>
                  <div className="flex items-center w-full">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      className="border-2 border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-xl px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium shadow text-sm"
                    />
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-yellow-300 hover:text-yellow-100 text-xs font-semibold"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-sm font-bold text-indigo-200 mb-1">College/Institute</label>
                <input name="college" value={form.college} onChange={handleChange} className={
                  theme === 'dark'
                    ? 'border-2 border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-xl px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium shadow text-sm'
                    : 'border-2 border-indigo-400 bg-white text-indigo-900 rounded-xl px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 font-medium shadow text-sm'
                } />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <div className="flex flex-col items-start">
                  <div className="text-sm font-bold text-indigo-200 mb-1">Name</div>
                  <div className={
                    theme === 'dark'
                      ? 'text-base text-yellow-100 font-semibold bg-gray-900/60 rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                      : 'text-base text-indigo-900 font-semibold bg-white rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                  }>{displayName || '-'}</div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-sm font-bold text-indigo-200 mb-1">Age</div>
                  <div className={
                    theme === 'dark'
                      ? 'text-base text-yellow-100 font-semibold bg-gray-900/60 rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                      : 'text-base text-indigo-900 font-semibold bg-white rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                  }>{displayAge || '-'}</div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-sm font-bold text-indigo-200 mb-1">Email</div>
                  <div className={
                    theme === 'dark'
                      ? 'text-base text-yellow-100 font-semibold bg-gray-900/60 rounded-xl px-2 py-1 mt-1  w-fit shadow-md tracking-wide'
                      : 'text-base text-indigo-900 font-semibold bg-white rounded-xl px-2 py-1 mt-1 w-fit shadow-md tracking-wide'
                  }>{displayEmail}</div>
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <div className="text-sm font-bold text-indigo-200 mb-1">College/Institute</div>
                  <div className={
                    theme === 'dark'
                      ? 'text-base text-yellow-100 font-semibold bg-gray-900/60 rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                      : 'text-base text-indigo-900 font-semibold bg-white rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                  }>{displayCollege || '-'}</div>
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <div className="text-sm font-bold text-indigo-200 mb-1">Password</div>
                  <div className="flex items-center w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      readOnly
                      className={
                        theme === 'dark'
                          ? 'text-base text-yellow-100 font-semibold bg-gray-900/60 rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                          : 'text-base text-indigo-900 font-semibold bg-white rounded-xl px-2 py-1 mt-1 w-full shadow-md tracking-wide'
                      }
                    />
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-yellow-300 hover:text-yellow-100 text-xs font-semibold"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-8 justify-center w-full">
          {editMode ? (
            <>
              <button className={theme === 'dark' ? 'px-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-2xl font-bold shadow-lg transition text-sm tracking-wide' : 'px-6 py-2 bg-green-300 hover:bg-green-500 text-black rounded-2xl font-bold shadow-lg transition text-sm tracking-wide'} onClick={handleSave}>Save</button>
              <button className={theme === 'dark' ? 'px-6 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-2xl font-bold shadow-lg transition text-sm tracking-wide' : 'px-6 py-2 bg-gray-200 hover:bg-gray-400 text-black rounded-2xl font-bold shadow-lg transition text-sm tracking-wide'} onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button className={theme === 'dark' ? 'px-6 py-2 bg-indigo-700 hover:bg-indigo-900 text-yellow-100 rounded-2xl font-bold shadow-lg transition text-sm tracking-wide' : 'px-6 py-2 bg-indigo-200 hover:bg-indigo-400 text-black rounded-2xl font-bold shadow-lg transition text-sm tracking-wide'} onClick={() => setEditMode(true)}>Edit Info</button>
          )}
          <button className={theme === 'dark' ? 'px-6 py-2 bg-indigo-900 hover:bg-indigo-800 text-yellow-100 rounded-2xl font-bold shadow-lg transition text-sm tracking-wide' : 'px-6 py-2 bg-indigo-300 hover:bg-indigo-500 text-black rounded-2xl font-bold shadow-lg transition text-sm tracking-wide'} onClick={goToHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}