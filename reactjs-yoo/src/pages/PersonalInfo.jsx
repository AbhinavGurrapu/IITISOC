import React, { useState } from 'react';

export default function PersonalInfo({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [college, setCollege] = useState('');
  const [errors, setErrors] = useState({});

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 px-2 sm:px-0">
      <div className="bg-white/30 backdrop-blur-lg p-4 sm:p-10 rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col items-center border border-indigo-200">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 sm:mb-6 text-center">Personal Information</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col items-start w-full">
            <label className="font-semibold text-indigo-700 mb-1 text-sm sm:text-base">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="border-2 border-indigo-400 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg focus:outline-none focus:border-indigo-600"
            />
            {errors.firstName && <span className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</span>}
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="font-semibold text-indigo-700 mb-1 text-sm sm:text-base">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="border-2 border-indigo-400 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg focus:outline-none focus:border-indigo-600"
            />
            {errors.lastName && <span className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</span>}
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="font-semibold text-indigo-700 mb-1 text-sm sm:text-base">Age</label>
            <input
              type="number"
              min="1"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="border-2 border-indigo-400 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg focus:outline-none focus:border-indigo-600"
            />
            {errors.age && <span className="text-red-500 text-xs mt-1 ml-1">{errors.age}</span>}
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="font-semibold text-indigo-700 mb-1 text-sm sm:text-base">College/Institute</label>
            <input
              type="text"
              value={college}
              onChange={e => setCollege(e.target.value)}
              className="border-2 border-indigo-400 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg focus:outline-none focus:border-indigo-600"
            />
            {errors.college && <span className="text-red-500 text-xs mt-1 ml-1">{errors.college}</span>}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-sky-500 to-pink-400 hover:from-pink-500 hover:to-yellow-400 text-white font-semibold rounded-lg px-4 py-2 w-full shadow-md transition-all duration-200 hover:scale-105 mt-2 text-base sm:text-lg"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
