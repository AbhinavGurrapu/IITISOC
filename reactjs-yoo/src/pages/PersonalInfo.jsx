import React, { useState, useEffect } from 'react';

export default function PersonalInfo({ onSubmit }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [college, setCollege] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.classList.toggle('night-mode', theme === 'dark');
    document.body.classList.toggle('day-mode', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!firstName.trim()) newErrors.firstName = '* Required';
    if (!lastName.trim()) newErrors.lastName = '* Required';
    if (!age.trim() || isNaN(age) || Number(age) < 1) newErrors.age = '* Enter a valid age';
    if (!college.trim()) newErrors.college = '* Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit({ firstName, lastName, age, college });
  };

  return (
    <div
      className={
        `min-h-screen flex flex-col transition-colors duration-300 ` +
        (theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-indigo-100'
          : 'bg-gradient-to-br from-white via-blue-100 to-yellow-100 text-black')
      }
      style={{
        backgroundImage: 'url("new.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-1 justify-center items-center">
        <div className="relative bg-white/20 backdrop-blur-lg shadow-2xl h-auto w-96 text-center p-10 rounded-3xl border border-white/30 flex flex-col items-center">
          <p className="text-3xl font-serif font-bold text-white mb-8 drop-shadow-lg tracking-wide">
            Personal Information
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
            <div className="flex flex-col items-start w-full">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className={
                  `border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition text-black`
                }
              />
              {errors.firstName && <span className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</span>}
            </div>
            <div className="flex flex-col items-start w-full">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className={
                  `border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition text-black`
                }
              />
              {errors.lastName && <span className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</span>}
            </div>
            <div className="flex flex-col items-start w-full">
              <input
                type="number"
                min="1"
                placeholder="Age"
                value={age}
                onChange={e => setAge(e.target.value)}
                className={
                  `border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition text-black`
                }
              />
              {errors.age && <span className="text-red-500 text-xs mt-1 ml-1">{errors.age}</span>}
            </div>
            <div className="flex flex-col items-start w-full">
              <input
                type="text"
                placeholder="College/Institute"
                value={college}
                onChange={e => setCollege(e.target.value)}
                className={
                  `border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition text-black`
                }
              />
              {errors.college && <span className="text-red-500 text-xs mt-1 ml-1">{errors.college}</span>}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-sky-500 to-pink-400 hover:from-pink-500 hover:to-yellow-400 text-white font-semibold rounded-lg mt-2 px-4 py-2 w-full shadow-md transition-all duration-200 hover:scale-105"
            >
              Save & Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
