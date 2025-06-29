import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ContestsNavbar from '../components/ContestsNavbar';

const allowedPlatforms = [
  'codechef.com',
  'atcoder.jp',
  'codeforces.com',
  'geeksforgeeks.org',
  'leetcode.com',
  'hackerrank.com'
];
const platformLabels = {
  'codechef.com': 'CodeChef',
  'atcoder.jp': 'AtCoder',
  'codeforces.com': 'Codeforces',
  'geeksforgeeks.org': 'GeeksforGeeks',
  'leetcode.com': 'LeetCode',
  'hackerrank.com': 'HackerRank'
};

function ContestListByDay({ userId, goToHome, goToCalendar, onSignOut, streak, username }) {
  // Make sure to pass goToHome, goToCalendar, onSignOut, streak, username from the parent just like CalendarPage
  // This ensures the navbar is fully functional (navigation and sign out)
  const [groupedContests, setGroupedContests] = useState({});
  const [favLoading, setFavLoading] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState(allowedPlatforms);
  const [favoriteContests, setFavoriteContests] = useState([]); // store contest ids
  const [favoriteContestObjs, setFavoriteContestObjs] = useState([]); // store full favorite objects
  const [toast, setToast] = useState(null);
  const debounceRef = useRef({}); // To debounce rapid clicks

  // Show toast for 2s
  const showToast = (msg, type = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  };

  // Fetch favorite contests for user
  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:3001/api/favorites/contest?userId=${userId || 'demo'}`)
      .then(res => {
        const favs = res.data.favorites || [];
        setFavoriteContestObjs(favs);
        setFavoriteContests(favs.map(f => f.contest.id));
      })
      .catch(() => {
        setFavoriteContests([]);
        setFavoriteContestObjs([]);
      });
  }, [userId]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/contests')
      .then(res => {
        const contests = (res.data.objects || []).filter(c => selectedPlatforms.includes(c.resource));
        const now = new Date();
        const today = now.toDateString();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0);

        const groups = { today: [], tomorrow: [], thisWeek: [], thisMonth: [], nextMonth: [], later: [] };
        contests.forEach(c => {
          const start = new Date(c.start);
          if (start.toDateString() === today) {
            groups.today.push(c);
          } else if (start.toDateString() === tomorrow) {
            groups.tomorrow.push(c);
          } else if (start >= weekStart && start <= weekEnd) {
            groups.thisWeek.push(c);
          } else if (start >= monthStart && start <= monthEnd) {
            groups.thisMonth.push(c);
          } else if (start >= nextMonthStart && start <= nextMonthEnd) {
            groups.nextMonth.push(c);
          } else if (start > nextMonthEnd) {
            groups.later.push(c);
          }
        });
        setGroupedContests(groups);
      })
      .catch(err => console.error('Error loading contests', err));
  }, [selectedPlatforms]);

  const favoriteContest = async (contest) => {
    const key = contest.id;
    if (debounceRef.current[key]) return;
    debounceRef.current[key] = true;
    setFavLoading(key);
    try {
      const res = await axios.post('http://localhost:3001/api/favorites/contest', {
        userId: userId || 'demo',
        contest
      });
      setFavoriteContests(prev => [...prev, key]);
      setFavoriteContestObjs(prev => [...prev, res.data.favorite || { contest }]);
    } catch (err) {
      showToast('Failed to favorite contest', 'error');
    }
    setFavLoading(null);
    setTimeout(() => { debounceRef.current[key] = false; }, 500);
  };

  const removeFavoriteContest = async (contest) => {
    const key = contest.id;
    if (debounceRef.current[key]) return;
    debounceRef.current[key] = true;
    setFavLoading(key);
    try {
      await axios.delete('http://localhost:3001/api/favorites/contest', { data: { userId: userId || 'demo', contest: { id: contest.id } } });
      setFavoriteContests(prev => prev.filter(k => k !== key));
      setFavoriteContestObjs(prev => prev.filter(fav => fav.contest.id !== key));
    } catch (err) {
      setFavoriteContests(prev => prev.filter(k => k !== key));
      setFavoriteContestObjs(prev => prev.filter(fav => fav.contest.id !== key));
      
    }
    setFavLoading(null);
    setTimeout(() => { debounceRef.current[key] = false; }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col items-center pb-20 px-2">
      {/* Fixed navbar at the top, same as CalendarPage */}
      <ContestsNavbar 
        goToHome={goToHome} 
        goToCalendar={goToCalendar} 
        onSignOut={onSignOut} 
        streak={streak} 
        username={username} 
      />
      {/* Add margin to avoid overlap with fixed navbar */}
      <div className="w-full max-w-6xl mx-auto mt-24 mb-6">
        <h2 className="text-5xl font-extrabold text-indigo-900 drop-shadow-lg text-center mb-4 tracking-tight">Upcoming Contests</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {allowedPlatforms.map(p => (
            <label key={p} className={`px-5 py-2 rounded-2xl font-semibold shadow-lg transition cursor-pointer border-2 text-lg ${selectedPlatforms.includes(p) ? 'bg-indigo-700 text-white border-indigo-900 scale-105' : 'bg-white/90 text-indigo-700 border-indigo-200 hover:bg-indigo-100'}`}>
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(p)}
                onChange={e => {
                  setSelectedPlatforms(
                    e.target.checked
                      ? [...selectedPlatforms, p]
                      : selectedPlatforms.filter(x => x !== p)
                  );
                }}
                className="mr-2 accent-indigo-600"
                style={{ verticalAlign: 'middle' }}
              />
              {platformLabels[p]}
            </label>
          ))}
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        {Object.values(groupedContests).every(arr => arr.length === 0) && <p className="text-center text-xl text-indigo-700/80 font-semibold py-12">No contests found.</p>}
        {['today', 'tomorrow', 'thisWeek', 'thisMonth', 'nextMonth', 'later'].map(key => (
          groupedContests[key] && groupedContests[key].length > 0 && (
            <div key={key} className="mb-14">
              <h3 className="text-3xl font-bold text-indigo-800 mb-6 border-b-4 border-indigo-300 pb-2 pl-2 bg-white/70 rounded-xl shadow-md inline-block px-6">
                {key === 'today' && 'Today'}
                {key === 'tomorrow' && 'Tomorrow'}
                {key === 'thisWeek' && 'This Week'}
                {key === 'thisMonth' && 'This Month'}
                {key === 'nextMonth' && 'Next Month'}
                {key === 'later' && 'Later'}
              </h3>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {groupedContests[key].map(c => (
                  <div key={c.id} className="shadow-2xl rounded-3xl bg-white/95 border border-indigo-200 p-7 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-indigo-400 relative min-h-[220px]">
                    <div className="flex items-center gap-3 mb-3 w-full justify-between">
                      <span className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full" style={{background: '#6366f1'}}></span>
                        {platformLabels[c.resource] || c.resource}
                      </span>
                      <button
                        onClick={() => favoriteContests.includes(c.id) ? removeFavoriteContest(c) : favoriteContest(c)}
                        disabled={favLoading === c.id}
                        title={favoriteContests.includes(c.id) ? 'Remove from favorites' : 'Favorite this contest'}
                        className="ml-2 hover:scale-125 transition-transform"
                        style={{ background: 'none', border: 'none', outline: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        {favoriteContests.includes(c.id) ? (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                          </svg>
                        ) : (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="font-serif font-extrabold text-2xl text-indigo-900 mb-2 leading-tight line-clamp-2">{c.event}</div>
                    <div className="text-indigo-600 text-base mb-1 font-medium">Host: {c.host}</div>
                    <div className="text-indigo-700 text-base mb-2 font-semibold">Starts at: {formatDateDDMMYYYY(c.start)} <span className='ml-2'>{new Date(c.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                    <div className="flex gap-3 mt-auto w-full">
                      <a 
                        href={c.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-4 py-1 rounded-xl shadow transition text-sm text-center flex items-center justify-center">
                        View
                      </a>

                      <a 
                        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(c.event)}&dates=${formatDateTimeForCalendar(c.start, c.end)}&details=${encodeURIComponent(c.href)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-1 rounded-xl shadow transition text-sm text-center flex items-center justify-center">
                        Add to Google Calendar
                      </a>
                    </div>  
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
      {toast && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-lg ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{toast.msg}</div>
      )}
    </div>
  );
}

function formatDateTimeForCalendar(start, end) {
  const s = new Date(start).toISOString().replace(/[-:.]/g, '').split('.')[0] + 'Z';
  const e = new Date(end).toISOString().replace(/[-:.]/g, '').split('.')[0] + 'Z';
  return `${s}/${e}`;
}

function formatDateDDMMYYYY(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default ContestListByDay;
