import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ContestsNavbar from '../components/ContestsNavbar';

export default function FavouritesPage({ userId, goToHome }) {
  const [favoriteProblems, setFavoriteProblems] = useState([]);
  const [favoriteContests, setFavoriteContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const debounceRef = useRef({});

  useEffect(() => {
    async function fetchFavourites() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3001/api/favorites/all?userId=${userId}`);
        setFavoriteProblems(res.data.practiceProblems || []);
        setFavoriteContests(res.data.contestProblems || []);
      } catch (e) {
        setFavoriteProblems([]);
        setFavoriteContests([]);
        console.error("Error fetching favorites:", e.message);
      }
      setLoading(false);
    }

    fetchFavourites();
  }, [userId]);

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  };

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
            {/* Practice Problems */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Practice Problems</h2>
              {favoriteProblems.length === 0 ? (
                <div className="text-indigo-500">No favourite practice problems yet.</div>
              ) : (
                <ul className="divide-y divide-indigo-100">
                  {favoriteProblems.map((p, i) => {
                    const key = p.problem?.id || p.problem?._id || i;
                    return (
                      <li key={key} className="py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <a href={p.problem?.link || p.problem?.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-800 hover:underline">
                          {p.problem?.title || p.problem?.name || 'Untitled'}
                        </a>
                        {p.problem?.platform && <span className="text-sm text-indigo-600">({p.problem.platform})</span>}
                        <button
                          className="ml-2 px-2 py-1 text-xs bg-red-100 hover:bg-red-300 text-red-700 rounded"
                          onClick={async () => {
                            const favKey = key;
                            if (debounceRef.current[favKey]) return;
                            debounceRef.current[favKey] = true;

                            try {
                              await axios.delete(`http://localhost:3001/api/favorites/problem`, {
                                data: { userId, problem: p.problem }
                              });
                              setFavoriteProblems((prev) => prev.filter((_, idx) => idx !== i));
                              showToast('Removed from favorites', 'success');
                            } catch (e) {
                              console.error("Failed to remove problem:", e);
                              showToast('Failed to remove favorite', 'error');
                            }

                            setTimeout(() => { debounceRef.current[favKey] = false; }, 500);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Favorite Contests */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contests</h2>
              {favoriteContests.length === 0 ? (
                <div className="text-indigo-500">No favourite contests yet.</div>
              ) : (
                <ul className="divide-y divide-indigo-100">
                  {favoriteContests.map((c, i) => {
                    const key = c.contest?.id || c.contest?._id || i;
                    const contestObj = c.contest?.id ? c.contest : c;

                    return (
                      <li key={key} className="py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <a href={contestObj.link || contestObj.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-800 hover:underline">
                          {contestObj.title || contestObj.name || contestObj.event || 'Untitled'}
                        </a>
                        {contestObj.platform && <span className="text-sm text-indigo-600">({contestObj.platform})</span>}
                        <button
                          className="ml-2 px-2 py-1 text-xs bg-red-100 hover:bg-red-300 text-red-700 rounded"
                          onClick={async () => {
                            const favKey = key;
                            if (debounceRef.current[favKey]) return;
                            debounceRef.current[favKey] = true;
                            try {
                              await axios.delete(`http://localhost:3001/api/favorites/contest`, {
                                data: { userId, contest: { id: contestObj.id } }
                              });
                              await new Promise(resolve => setTimeout(resolve, 300)); // Add a short delay to avoid rapid requests
                              setFavoriteContests((prev) => prev.filter((_, idx) => idx !== i));
                              showToast('Removed from favorites', 'success');
                            } catch (e) {
                              console.error("Failed to remove contest:", e);
                              showToast('Failed to remove favorite', 'error');
                            }
                            setTimeout(() => { debounceRef.current[favKey] = false; }, 500);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-lg ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
}
