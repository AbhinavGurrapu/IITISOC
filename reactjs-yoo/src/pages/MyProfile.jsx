import React, { useState } from 'react';

export default function MyProfile({ username, goToHome, personalInfo = {}, onEditInfo }) {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: personalInfo.firstName || '',
    lastName: personalInfo.lastName || '',
    age: personalInfo.age || '',
    college: personalInfo.college || '',
    password: personalInfo.password || '',
  });
  const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onEditInfo) onEditInfo(form);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col items-center justify-center">
      <div className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl border border-indigo-200 p-8 w-full max-w-lg flex flex-col items-center relative overflow-visible">
        {/* Decorative Profile Icon with Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-gradient-to-br from-indigo-400 via-indigo-200 to-emerald-200 border-4 border-white rounded-full w-28 h-28 flex items-center justify-center shadow-2xl animate-pulse-slow relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-indigo-600 drop-shadow-xl">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5" />
            </svg>
            <span className="absolute bottom-1 right-1 bg-green-400 border-2 border-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-white shadow">✔</span>
          </div>
          <div className="mt-2 text-xl font-extrabold text-indigo-700 tracking-wide drop-shadow">{username || 'User'}</div>
        </div>
        <h1 className="text-3xl font-serif font-extrabold text-indigo-900 mb-8 mt-16 tracking-tight drop-shadow-lg">My Profile</h1>
        <div className="w-full flex flex-col gap-8 items-center">
          {editMode ? (
            <div className="flex flex-col gap-4 w-full items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="flex flex-col items-start">
                  <label className="text-base font-bold text-indigo-700 mb-1">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className="border-2 border-indigo-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-base font-medium shadow" />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-base font-bold text-indigo-700 mb-1">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className="border-2 border-indigo-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-base font-medium shadow" />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-base font-bold text-indigo-700 mb-1">Age</label>
                  <input name="age" value={form.age} onChange={handleChange} className="border-2 border-indigo-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-base font-medium shadow" />
                </div>
                <div className="flex flex-col items-start md:col-span-3">
                  <label className="text-base font-bold text-indigo-700 mb-1">Password</label>
                  <div className="flex items-center w-full">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      className="border-2 border-indigo-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-base font-medium shadow"
                    />
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-indigo-600 hover:text-indigo-900 text-xs font-semibold"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-base font-bold text-indigo-700 mb-1">College/Institute</label>
                <input name="college" value={form.college} onChange={handleChange} className="border-2 border-indigo-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50 text-base font-medium shadow" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 w-full items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-start">
                  <div className="text-base font-bold text-indigo-700 mb-1">Name</div>
                  <div className="text-lg text-indigo-900 font-semibold bg-indigo-50 rounded-xl px-3 py-2 mt-1 w-full shadow-md tracking-wide">{fullName || '-'}</div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-base font-bold text-indigo-700 mb-1">Age</div>
                  <div className="text-lg text-indigo-900 font-semibold bg-indigo-50 rounded-xl px-3 py-2 mt-1 w-full shadow-md tracking-wide">{form.age || '-'}</div>
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <div className="text-base font-bold text-indigo-700 mb-1">Password</div>
                  <div className="flex items-center w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      readOnly
                      className="text-lg text-indigo-900 font-semibold bg-indigo-50 rounded-xl px-3 py-2 mt-1 w-full shadow-md tracking-wide"
                    />
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-indigo-600 hover:text-indigo-900 text-xs font-semibold"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-start md:col-span-2">
                  <div className="text-base font-bold text-indigo-700 mb-1">College/Institute</div>
                  <div className="text-lg text-indigo-900 font-semibold bg-indigo-50 rounded-xl px-3 py-2 mt-1 w-full shadow-md tracking-wide">{form.college || '-'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-10 justify-center w-full">
          {editMode ? (
            <>
              <button className="px-8 py-2 bg-green-600 hover:bg-green-800 text-white rounded-2xl font-bold shadow-lg transition text-base tracking-wide" onClick={handleSave}>Save</button>
              <button className="px-8 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded-2xl font-bold shadow-lg transition text-base tracking-wide" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button className="px-8 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-2xl font-bold shadow-lg transition text-base tracking-wide" onClick={() => setEditMode(true)}>Edit Info</button>
          )}
          <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg transition text-base tracking-wide" onClick={goToHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
