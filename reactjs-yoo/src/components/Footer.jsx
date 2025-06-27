import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-950 text-slate-200 text-sm flex justify-center gap-4 py-2 flex-wrap shadow-inner mt-auto">
      <span>© 2025 CodeBlitz</span>
      <ul className="flex space-x-4 cursor-pointer">
        <li className="hover:underline">Contact Us</li>
        <li className="hover:underline">Privacy Policy</li>
        <li className="hover:underline">Terms</li>
        <li className="hover:underline">Other Policy</li>
        <li className="hover:underline">Help Center</li>
      </ul>
    </footer>
  );
}
