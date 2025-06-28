import React, { useState } from 'react';

export default function SignUp({ onSignUp, goToSignIn, goToFirstPage }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const [showConfirmPassError, setShowConfirmPassError] = useState(false);
  const [showMismatchError, setShowMismatchError] = useState(false);
  const [showPassLengthError, setShowPassLengthError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let usernameMissing = !username.trim();
    let emailMissing = !email.trim();
    let passMissing = !pass;
    let confirmPassMissing = !confirmPass;
    let mismatch = pass && confirmPass && pass !== confirmPass;
    let passLength = pass && pass.length < 8;
    setShowUsernameError(usernameMissing);
    setShowEmailError(emailMissing);
    setShowPassError(passMissing);
    setShowConfirmPassError(confirmPassMissing);
    setShowMismatchError(mismatch);
    setShowPassLengthError(passLength);
    if (usernameMissing || emailMissing || passMissing || confirmPassMissing || mismatch || passLength) {
      return;
    }
    onSignUp(username.trim()); // send to App
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url("new.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Go Back Button */}
      <button
        className="absolute top-8 left-8 bg-white/40 hover:bg-white/70 text-indigo-700 rounded-full p-2 shadow-lg z-50 transition"
        onClick={goToFirstPage}
        aria-label="Go Back"
        style={{backdropFilter: 'blur(6px)'}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div className="flex flex-1 justify-center items-center">
        <div className="relative bg-white/20 backdrop-blur-lg shadow-2xl h-auto w-96 text-center p-10 rounded-3xl border border-white/30 flex flex-col items-center">
          <p className="text-3xl font-serif font-bold text-white mb-8 drop-shadow-lg tracking-wide">
            Create your CodeBlitz Account
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className="flex flex-col items-start w-full">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setShowUsernameError(false);
                }}
                className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition"
              />
              {showUsernameError && (
                <span className="text-red-500 text-xs mt-1 ml-1">* You have to fill this to proceed</span>
              )}
            </div>
            <div className="flex flex-col items-start w-full">
              <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowEmailError(false);
                }}
                className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition"
              />
              {showEmailError && (
                <span className="text-red-500 text-xs mt-1 ml-1">* You have to fill this to proceed</span>
              )}
            </div>
            <div className="flex flex-col items-start w-full">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setShowPassError(false);
                  setShowMismatchError(false);
                  setShowPassLengthError(false);
                }}
                className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition"
              />
              <label className="flex items-center gap-2 mt-1 ml-1 text-xs text-indigo-700">
                <input type="checkbox" checked={showPass} onChange={() => setShowPass((v) => !v)} /> Show Password
              </label>
              {showPassError && (
                <span className="text-red-500 text-xs mt-1 ml-1">* You have to fill this to proceed</span>
              )}
              {showPassLengthError && !showPassError && (
                <span className="text-red-500 text-xs mt-1 ml-1">* Password should at least contain 8 characters</span>
              )}
            </div>
            <div className="flex flex-col items-start w-full">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setShowConfirmPassError(false);
                  setShowMismatchError(false);
                }}
                className="border-2 border-indigo-400 bg-white/70 focus:bg-white focus:border-indigo-600 rounded-lg px-4 py-2 w-full text-lg shadow-sm focus:outline-none transition"
              />
              <label className="flex items-center gap-2 mt-1 ml-1 text-xs text-indigo-700">
                <input type="checkbox" checked={showConfirmPass} onChange={() => setShowConfirmPass((v) => !v)} /> Show Password
              </label>
              {showConfirmPassError && (
                <span className="text-red-500 text-xs mt-1 ml-1">* You have to fill this to proceed</span>
              )}
              {showMismatchError && (
                <span className="text-red-500 text-xs mt-1 ml-1">* Passwords do not match</span>
              )}
            </div>
            <label className="flex items-center gap-2 text-white/90 text-sm mt-2">
              <input
                type="checkbox"
                className="cursor-pointer accent-indigo-500"
                required
              />
              I agree to{' '}
              <a
                href="/"
                className="text-blue-200 underline hover:text-blue-400"
              >
                terms and conditions
              </a>
            </label>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-sky-500 to-pink-400 hover:from-pink-500 hover:to-yellow-400 text-white font-semibold rounded-lg mt-2 px-4 py-2 w-full shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-60"
            >
              Create Account
            </button>
          </form>
          <p className="text-white/80 mt-4 text-sm">
            Already have an account?{' '}
            <span
              className="text-pink-200 hover:underline cursor-pointer"
              onClick={goToSignIn}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
