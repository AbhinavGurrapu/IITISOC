import React, { useState } from 'react';

export default function MyProfile({ username, goToHome, personalInfo = {}, onEditInfo }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: personalInfo.firstName || '',
    lastName: personalInfo.lastName || '',
    age: personalInfo.age || '',
    college: personalInfo.college || '',
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
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-indigo-200 p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-serif font-bold text-indigo-800 mb-6">My Profile</h1>
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="text-lg font-semibold text-indigo-700">Username:</div>
          <div className="text-2xl font-bold text-indigo-900 mb-4">{username || 'User'}</div>
          {editMode ? (
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="flex flex-row gap-6 w-full justify-center">
                <div className="flex flex-col items-start w-1/3">
                  <div className="text-lg font-semibold text-indigo-700">First Name:</div>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className="border rounded px-2 py-1 mb-2 w-full" />
                </div>
                <div className="flex flex-col items-start w-1/3">
                  <div className="text-lg font-semibold text-indigo-700">Last Name:</div>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className="border rounded px-2 py-1 mb-2 w-full" />
                </div>
                <div className="flex flex-col items-start w-1/3">
                  <div className="text-lg font-semibold text-indigo-700">Age:</div>
                  <input name="age" value={form.age} onChange={handleChange} className="border rounded px-2 py-1 mb-2 w-full" />
                </div>
              </div>
              <div className="flex flex-col items-start w-full mt-2">
                <div className="text-lg font-semibold text-indigo-700">College/Institute:</div>
                <input name="college" value={form.college} onChange={handleChange} className="border rounded px-2 py-1 mb-2 w-full" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full items-center">
              <div className="flex flex-row gap-4 w-full justify-center items-center">
                <div className="text-lg font-semibold text-indigo-700 w-32 text-right">Name:</div>
                <div className="text-xl text-indigo-900 mb-2 w-48 text-left">{fullName || '-'}</div>
              </div>
              <div className="flex flex-row gap-4 w-full justify-center items-center">
                <div className="text-lg font-semibold text-indigo-700 w-32 text-right">Age:</div>
                <div className="text-xl text-indigo-900 mb-2 w-48 text-left">{form.age || '-'}</div>
              </div>
              <div className="flex flex-row gap-4 w-full justify-center items-center">
                <div className="text-lg font-semibold text-indigo-700 w-32 text-right">College/Institute:</div>
                <div className="text-xl text-indigo-900 mb-2 w-48 text-left">{form.college || '-'}</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-8">
          {editMode ? (
            <>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-xl font-semibold shadow transition" onClick={handleSave}>Save</button>
              <button className="px-6 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded-xl font-semibold shadow transition" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl font-semibold shadow transition" onClick={() => setEditMode(true)}>Edit Info</button>
          )}
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl font-semibold shadow transition" onClick={goToHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
