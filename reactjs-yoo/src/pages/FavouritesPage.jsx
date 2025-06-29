import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContestsNavbar from '../components/ContestsNavbar';

export default function FavouritesPage({ userId, goToHome }) {
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [contestProblems, setContestProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavourites() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3001/api/favorites/all?userId=${userId}`);
        setPracticeProblems(res.data.practiceProblems || []);
        setContestProblems(res.data.contestProblems || []);
      } catch (e) {
        setPracticeProblems([]);
        setContestProblems([]);
      }
      setLoading(false);
    }
    fetchFavourites();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col items-center py-10">
      <ContestsNavbar
        goToHome={goToHome}
        goToCalendar={() => window.setPage && window.setPage('calendar')}
        onSignOut={() => {
          localStorage.removeItem('username');
          localStorage.removeItem('personalInfo');
          window.setPage && window.setPage('first');
        }}
        streak={0}
        username={userId}
      />
      <div className="bg-white/90 rounded-3xl shadow-2xl border border-indigo-200 p-8 w-full max-w-3xl flex flex-col items-center mt-24">
        <h1 className="text-4xl font-serif font-bold text-indigo-800 mb-8">My Favourites</h1>
        <button className="mb-8 px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl font-semibold shadow transition" onClick={goToHome}>Back to Home</button>
        {loading ? (
          <div className="text-indigo-700 font-semibold">Loading favourites...</div>
        ) : (
          <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Practice Problems</h2>
              {practiceProblems.length === 0 ? (
                <div className="text-indigo-500">No favourite practice problems yet.</div>
              ) : (
                <ul className="divide-y divide-indigo-100">
                  {practiceProblems.map((p, i) => (
                    <li key={i} className="py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <a href={p.problem?.link || p.problem?.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-800 hover:underline">
                        {p.problem?.title || p.problem?.name || 'Untitled'}
                      </a>
                      {p.problem?.platform && <span className="text-sm text-indigo-600">({p.problem.platform})</span>}
                      <button
                        className="ml-2 px-2 py-1 text-xs bg-red-100 hover:bg-red-300 text-red-700 rounded"
                        onClick={async () => {
                          try {
                            await axios.delete(`http://localhost:3001/api/favorites/problem`, { data: { userId, problem: p.problem } });
                            setPracticeProblems(practiceProblems.filter((_, idx) => idx !== i));
                          } catch (e) {
                            alert('Failed to remove favorite');
                          }
                        }}
                      >Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contest Problems</h2>
              {contestProblems.length === 0 ? (
                <div className="text-indigo-500">No favourite contest problems yet.</div>
              ) : (
                <ul className="divide-y divide-indigo-100">
                  {contestProblems.map((p, i) => (
                    <li key={i} className="py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <a href={p.link || p.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-800 hover:underline">
                        {p.title || p.name}
                      </a>
                      {p.platform && <span className="text-sm text-indigo-600">({p.platform})</span>}
                      <button
                        className="ml-2 px-2 py-1 text-xs bg-red-100 hover:bg-red-300 text-red-700 rounded"
                        onClick={async () => {
                          try {
                            await axios.delete(`http://localhost:3001/api/favorites/contest`, { data: { userId, contest: p } });
                            setContestProblems(contestProblems.filter((_, idx) => idx !== i));
                          } catch (e) {
                            alert('Failed to remove favorite');
                          }
                        }}
                      >Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
