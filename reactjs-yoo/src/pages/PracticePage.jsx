import React from 'react';
const platforms = [
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/problems',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/CodeChef_Logo.svg/1200px-CodeChef_Logo.svg.png',
  },
  {
    name: 'AtCoder',
    url: 'https://atcoder.jp/contests/',
    logo: 'atcoder.png',
  },
  {
    name: 'CodeForces',
    url: 'https://codeforces.com/problemset',
    logo: 'forces.png',
  },
  {
    name: 'GeeksforGeeks',
    url: 'https://practice.geeksforgeeks.org/explore',
    logo: 'geeks.png',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/problemset/all/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1280px-LeetCode_Logo_black_with_text.svg.png',
  },
  {
    name: 'HackerRank',
    url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript',
    logo: 'hackerrank.png',
  },
];

export default function PracticePage({ goToHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col items-center pb-20">
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-8 shadow-xl rounded-2xl items-center border border-indigo-200">
        <p className="text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
          CodeBlitz
        </p>
      </div>
      <div className="pt-28 pb-8 flex flex-col items-center w-full">
        <h1 className="font-mono font-extrabold text-3xl md:text-4xl text-indigo-800 drop-shadow text-center mb-4">Practice Problems</h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="shadow-xl rounded-3xl bg-white/80 backdrop-blur-md border border-indigo-100 text-center p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img className="h-20 w-auto object-contain mb-2" src={p.logo} alt={p.name} />
              <h2 className="font-serif font-extrabold text-xl text-indigo-700 mb-2">{p.name}</h2>
              <span className="text-indigo-800/90 mb-2">Go to Problems</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
