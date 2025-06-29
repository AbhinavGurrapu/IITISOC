import React, { useState } from 'react';
import axios from 'axios';

export default function SignIn({ onLogin, goToSignUp, goToFirstPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let usernameMissing = !username.trim();
    let passwordMissing = !password;
    setShowUsernameError(usernameMissing);
    setShowPasswordError(passwordMissing);
    setLoginError('');
    if (usernameMissing || passwordMissing) return;
    try {
      let res;
      if (username.includes('@')) {
        // Login with email
        res = await axios.post('http://localhost:3001/api/login', { email: username.trim() });
      } else {
        // Try to get user by username, then login with their email
        const userRes = await axios.get('http://localhost:3001/api/users');
        const foundUser = Array.isArray(userRes.data)
          ? userRes.data.find(u => u.name === username.trim())
          : null;
        if (!foundUser || !foundUser.email) throw new Error('No account found');
        res = await axios.post('http://localhost:3001/api/login', { email: foundUser.email });
      }
      if (res.data && res.data.user) {
        onLogin(res.data.user.name, res.data.user.email);
      } else {
        setLoginError('No account found for this user. Please create an account.');
      }
    } catch (err) {
      setLoginError(
        err.response?.data?.error || 'No account found for this user. Please create an account.'
      );
    }
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
        <p className="text-3xl font-serif font-bold text-white mb-8 drop-shadow-lg tracking-wide">
          Login to your CodeBlitz Account
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
          <div className="flex flex-col items-start w-full relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setShowPasswordError(false);
              }}
              className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition pr-10"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-indigo-500"
              onClick={() => setShowPass((v) => !v)}
              style={{ userSelect: 'none' }}
              tabIndex={0}
              role="button"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06M1 1l22 22"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </span>
            {showPasswordError && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {' '}
                * You have to fill this to proceed
              </span>
            )}
          </div>
          {loginError && (
            <span className="text-red-500 text-xs mt-1 ml-1 text-center">{loginError}</span>
          )}
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
          <i
            className="fab fa-google text-2xl text-white/80 hover:text-white cursor-pointer transition"
            onClick={() => window.location.href = 'http://localhost:3001/auth/google'}
            title="Sign in with Google"
          ></i>
          <i
            className="fab fa-github text-2xl text-white/80 hover:text-white cursor-pointer transition"
            onClick={() => window.location.href = 'http://localhost:3001/auth/github'}
            title="Sign in with GitHub"
          ></i>
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