import React, { useState } from 'react';

export default function SignIn({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim()); // send to App
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 justify-center">
      <div className="bg-blue-800 h-auto w-80 text-center p-8 rounded-lg">
        <p className="text-4xl font-serif pt-2 font-semibold">CodeBlitz</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-black rounded-md cursor-text mt-28 px-2 py-1 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-black rounded-md cursor-text mt-5 px-2 py-1 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded cursor-pointer mt-4 px-4 py-2 w-full"
          >
            Sign in
          </button>
        </form>
        <a href="#" className="hover:underline mt-2 block">
          Forgot Password?
        </a>
        <p className="text-gray-400 mt-8">___________or_____________</p>
        <div className="flex justify-evenly mt-4">
          <i className="fab fa-google text-3xl cursor-pointer"></i>
          <i className="fab fa-github text-3xl cursor-pointer"></i>
          <i className="fab fa-facebook text-3xl cursor-pointer"></i>
        </div>
      </div>
      <img src="new.png" alt="Logo" className="w-auto h-100" />
    </div>
  );
}
