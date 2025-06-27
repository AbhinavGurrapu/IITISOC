import { useEffect, useState } from 'react';
import axios from 'axios';

const platformLabels = {
  'codechef.com': 'CodeChef',
  'atcoder.jp': 'AtCoder',
  'codeforces.com': 'Codeforces',
  'geeksforgeeks.org': 'GeeksforGeeks',
  'leetcode.com': 'LeetCode',
  'hackerrank.com': 'HackerRank'
};

function FavoriteContests({ userId }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/favorites/contest?userId=${userId || 'demo'}`)
      .then(res => {
        setFavorites(res.data.favorites || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="text-center text-lg text-indigo-700/80 font-medium">Loading favorites...</div>;

  if (!favorites.length) return <div className="text-center text-lg text-indigo-700/80 font-medium">No favorite contests yet.</div>;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-4">
      <h2 className="text-3xl font-extrabold text-indigo-800 drop-shadow text-center mb-6">My Favorite Contests</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map(c => (
          <div key={c.id} className="shadow-xl rounded-3xl bg-white/90 border border-indigo-100 p-6 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-2xl relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-indigo-700">{platformLabels[c.resource] || c.resource}</span>
            </div>
            <div className="font-serif font-extrabold text-xl text-indigo-800 mb-1">{c.event}</div>
            <div className="text-indigo-600 text-base mb-1">Host: {c.host}</div>
            <div className="text-indigo-700 text-base mb-1">Starts at: {new Date(c.start).toLocaleString()}</div>
            <div className="flex gap-2 mt-2">
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-4 py-1 rounded-xl shadow transition text-sm">View</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteContests;
