import React, { useState } from 'react';

export default function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && pass === confirmPass) {
      onSignUp(username.trim()); // send to App
    }
  };

  return (
    <div>
      <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 justify-center">
        <div className="bg-blue-800 h-auto w-80 text-center p-8 rounded-lg">
          <p className="text-4xl font-serif">Create your CodeBlitz Account</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full"
            />
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full"
            />
            <label>
              <input type="checkbox" className="cursor-pointer" />
              I agree to{' '}
              <a href="/" className="text-blue-500 underline">
                terms and conditions
              </a>
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded cursor-pointer mt-4 px-4 py-2 w-full"
            >
              Create Account
            </button>
          </form>
        </div>
        <img src="new.png" alt="Logo" className="w-auto h-100" />
      </div>
    </div>
  );
}
