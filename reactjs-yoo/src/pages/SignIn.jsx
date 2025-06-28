import React, { useState } from 'react';

export default function SignIn({ onLogin, goToSignUp, goToFirstPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let usernameMissing = !username.trim();
    let passwordMissing = !password;
    setShowUsernameError(usernameMissing);
    setShowPasswordError(passwordMissing);
    if (usernameMissing || passwordMissing) {
      return;
    }
    onLogin(username.trim()); // send to App
  };

  return (
    <div
      className="flex h-screen w-screen justify-center items-center"
      style={{
        backgroundImage: 'url("new.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      
      <div className="relative bg-white/20 backdrop-blur-lg shadow-2xl h-auto w-96 text-center p-10 rounded-3xl border border-white/30 flex flex-col items-center">
        <p className="text-4xl font-serif font-bold text-white mb-8 drop-shadow-lg tracking-wide">
          CodeBlitz
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col items-start w-full">
            <input
              type="text"
              placeholder="Username or E-mail"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setShowUsernameError(false);
              }}
              className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition"
            />
            {showUsernameError && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {' '}
                * You have to fill this to proceed
              </span>
            )}
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setShowPasswordError(false);
              }}
              className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition"
            />
            {showPasswordError && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {' '}
                * You have to fill this to proceed
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-sky-500 to-pink-400 hover:from-pink-500 hover:to-yellow-400 text-white font-semibold rounded-lg mt-2 px-4 py-2 w-full shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-60"
          >
            Sign in
          </button>
        </form>
        <a
          href="#"
          className="hover:underline mt-4 block text-indigo-100 text-sm"
        >
          Forgot Password?
        </a>
        <p className="text-gray-300 mt-8 mb-2">──────── or ────────</p>
        <div className="flex justify-evenly w-full mb-4">
          <i className="fab fa-google text-2xl text-white/80 hover:text-white cursor-pointer transition"></i>
          <i className="fab fa-github text-2xl text-white/80 hover:text-white cursor-pointer transition"></i>
          <i className="fab fa-facebook text-2xl text-white/80 hover:text-white cursor-pointer transition"></i>
        </div>
        <p className="text-white/80 mt-2 text-sm">
          Don't have an account?{' '}
          <span
            className="text-pink-200 hover:underline cursor-pointer"
            onClick={goToSignUp}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
