import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ContestsNavbar from './ContestsNavbar';

const tags = [
  'dp', 'math', 'greedy', 'graphs', 'implementation', 'strings', 'binary search', 'brute force', 'data structures', 'sortings', 'trees', 'number theory', 'combinatorics', 'dfs and similar', 'constructive algorithms', 'two pointers', 'bitmasks', 'dsu', 'geometry', 'shortest paths', 'probabilities', 'hashing', 'games', 'flows', 'interactive', 'matrices', 'fft', 'ternary search', 'meet-in-the-middle', 'string suffix structures', '2-sat', 'chinese remainder theorem', 'schedules', 'divide and conquer', 'expression parsing', 'graph matchings'
];

const platforms = [
  { name: 'Codeforces', key: 'codeforces' },
  { name: 'LeetCode', key: 'leetcode' },
  { name: 'GeeksforGeeks', key: 'gfg' },
  { name: 'CodeChef', key: 'codechef' },
  { name: 'AtCoder', key: 'atcoder' },
  { name: 'HackerRank', key: 'hackerrank' },
];

const CLIST_USERNAME = 'Parthu';
const CLIST_API_KEY = '0b2000fe1d0c548f5343e6720c8f92a0648f6377';

function PracticeProblems({ userId, goToHome, goToCalendar, onSignOut, username }) {
  const [platform, setPlatform] = useState('codeforces');
  const [problems, setProblems] = useState([]);
  const [contests, setContests] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [favLoading, setFavLoading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favoriteProblems, setFavoriteProblems] = useState([]);
  const [favoriteProblemObjs, setFavoriteProblemObjs] = useState([]); // store full favorite objects from backend
  const [toast, setToast] = useState(null); // For showing error/success messages
  const debounceRef = useRef({}); // To debounce rapid clicks

<<<<<<< HEAD
  // User-specific streak and solvedDates
  const [streak, setStreak] = useState(0);
  const [solvedDates, setSolvedDates] = useState([]);

  // Helper to get user-specific keys
  const getStreakKey = () => `streak_${username || userId || 'demo'}`;
  const getSolvedDatesKey = () => `solvedDates_${username || userId || 'demo'}`;

  // Load streak and solvedDates for this user on mount
  useEffect(() => {
    const savedStreak = Number(localStorage.getItem(getStreakKey()) || 0);
    setStreak(savedStreak);
    const savedDates = JSON.parse(localStorage.getItem(getSolvedDatesKey()) || '[]');
    setSolvedDates(savedDates);
  }, [username, userId]);

=======
>>>>>>> 7229398d119405bf722fb0963152658ea6faf8d6
  // Helper to get unique key and id for a problem
  const getProblemKey = (p) => {
    if ((p.platform || platform) === 'codeforces') {
      return `cf-${p.contestId}-${p.index}`;
    } else if ((p.platform || platform) === 'leetcode') {
      return `lc-${p.questionId}-${p.titleSlug}`;
    } else {
      return `${p.platform || platform}-${p.title || p.name || p.id}`;
    }
  };
  const getProblemId = (p) => {
    if ((p.platform || platform) === 'codeforces') {
      return `cf-${p.contestId}-${p.index}`;
    } else if ((p.platform || platform) === 'leetcode') {
      return `lc-${p.questionId}-${p.titleSlug || ''}`;
    } else {
      return `${p.platform || platform}-${p.title || p.name || p.id}`;
    }
  };

  useEffect(() => {
    async function fetchFavorites() {
      if (!userId) return;
      try {
        const res = await axios.get('http://localhost:3001/api/favorites/problem', {
          params: { userId: userId || 'demo' }
        });
        if (Array.isArray(res.data)) {
          setFavoriteProblemObjs(res.data); // store full objects
          setFavoriteProblems(res.data.map(fav => getProblemKey(fav.problem || fav)));
        } else {
          setFavoriteProblems([]);
          setFavoriteProblemObjs([]);
        }
      } catch (e) {
        setFavoriteProblems([]);
        setFavoriteProblemObjs([]);
      }
    }
    fetchFavorites();
  }, [userId, platform]);

  useEffect(() => {
    async function fetchProblemsOrContests() {
      setLoading(true);
      setError('');
      setProblems([]);
      setContests([]);
      try {
        if (platform === 'clist') {
          const res = await axios.get(
            `https://clist.by/api/v3/contest/?username=${CLIST_USERNAME}&api_key=${CLIST_API_KEY}&resource=codeforces.com,leetcode.com,atcoder.jp,codechef.com,geeksforgeeks.org,hackerrank.com&order_by=-start`
          );
          setContests(res.data.objects || []);
        } else if (platform === 'codeforces') {
          const res = await axios.get('https://codeforces.com/api/problemset.problems');
          setProblems(res.data.result.problems);
        } else {
          setProblems([]);
        }
      } catch (e) {
        setError('Failed to fetch data.');
      }
      setLoading(false);
    }
    fetchProblemsOrContests();
  }, [platform]);

  const filtered = problems.filter(p => {
    if (platform === 'codeforces') {
      return (!search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.contestId + '').includes(search)) &&
        (!tag || (p.tags && p.tags.includes(tag)));
    } else if (platform === 'leetcode') {
      return (!search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.questionId + '').includes(search)) &&
        (!tag || (p.topicTags && p.topicTags.some(t => t.toLowerCase().includes(tag.toLowerCase()))));
    }
    return true;
  });

  // Show toast for 2s
  const showToast = (msg, type = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  };

  const favoriteProblem = async (problem) => {
    const key = getProblemKey({ ...problem, platform });
    const id = getProblemId({ ...problem, platform });
    let link = '';
    if ((problem.platform || platform) === 'codeforces') {
      link = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
    } else if ((problem.platform || platform) === 'leetcode') {
      link = `https://leetcode.com/problems/${problem.titleSlug}/`;
    } else if ((problem.platform || platform) === 'gfg') {
      link = problem.url || '';
    } else if ((problem.platform || platform) === 'codechef') {
      link = problem.url || '';
    } else if ((problem.platform || platform) === 'atcoder') {
      link = problem.url || '';
    } else if ((problem.platform || platform) === 'hackerrank') {
      link = problem.url || '';
    }
    if (debounceRef.current[key]) return; // Prevent rapid double clicks
    debounceRef.current[key] = true;
    setFavLoading(key);
    try {
      const res = await axios.post('http://localhost:3001/api/favorites/problem', {
        userId: userId || 'demo',
        problem: { ...problem, platform, id, link },
      });
      setFavoriteProblems(prev => [...prev, key]);
      // Add to favoriteProblemObjs for immediate UI update
      setFavoriteProblemObjs(prev => [...prev, res.data || { problem: { ...problem, platform, id, link } }]);
    } catch (err) {
      showToast('Failed to favorite problem', 'error');
    }
    setFavLoading(null);
    setTimeout(() => { debounceRef.current[key] = false; }, 500);
  };

  const removeFavoriteProblem = async (problem) => {
    const key = getProblemKey({ ...problem, platform });
    if (debounceRef.current[key]) return;
    debounceRef.current[key] = true;
    // Always use getProblemId for removal, fallback to favObj if available
    let id = getProblemId({ ...problem, platform });
    const favObj = favoriteProblemObjs.find(fav => getProblemKey(fav.problem || fav) === key);
    if (favObj && (favObj.problem?.id || favObj.id)) {
      id = favObj.problem?.id || favObj.id;
    }
    setFavLoading(key);
    try {
      await axios.delete('http://localhost:3001/api/favorites/problem', {
        data: { userId: userId || 'demo', problem: { ...problem, platform, id } }
      });
      setFavoriteProblems(prev => prev.filter(k => k !== key));
      setFavoriteProblemObjs(prev => prev.filter(fav => getProblemKey(fav.problem || fav) !== key));
    } catch (err) {
      // Always update UI state, even on error, to avoid stuck red heart
      setFavoriteProblems(prev => prev.filter(k => k !== key));
      setFavoriteProblemObjs(prev => prev.filter(fav => getProblemKey(fav.problem || fav) !== key));
    }
    setFavLoading(null);
    setTimeout(() => { debounceRef.current[key] = false; }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 pb-10 flex flex-col">
      <ContestsNavbar 
        goToHome={goToHome} 
        goToCalendar={goToCalendar} 
        onSignOut={() => {
          // Only clear user info, do NOT remove streak or solvedDates
          localStorage.removeItem('personalInfo');
          localStorage.removeItem('username');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('currentPage');
          if (onSignOut) onSignOut();
          if (window.setPage) window.setPage('first');
        }}
        username={username} 
      />
      <div className="mb-10"></div>
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mt-20 border border-indigo-900/40">
        <h2 className="text-3xl font-bold text-indigo-100 mb-6 text-center">Practice Problems</h2>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {platforms.map(p => (
            <button
              key={p.key}
              className={`px-5 py-2 rounded-xl font-semibold border transition shadow-sm ${platform === p.key ? 'bg-indigo-700 text-yellow-300 border-indigo-900' : 'bg-white/10 text-indigo-200 border-indigo-700 hover:bg-indigo-900/40'}`}
              onClick={() => setPlatform(p.key)}
            >
              {p.name}
            </button>
          ))}
        </div>
        {/* One button to go to the selected platform's practice problems page, placed below platform buttons */}
        {platform !== 'codeforces' && (
          <div className="flex justify-center mb-6">
            <a
              href={
                platform === 'leetcode' ? 'https://leetcode.com/problemset/all/' :
                platform === 'gfg' ? 'https://practice.geeksforgeeks.org/explore' :
                platform === 'codechef' ? 'https://www.codechef.com/practice' :
                platform === 'atcoder' ? 'https://atcoder.jp/contests/' :
                platform === 'hackerrank' ? 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript' :
                '#'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-indigo-700 text-yellow-300 font-semibold text-sm shadow hover:bg-indigo-900 border border-indigo-900 transition"
              title={`Go to ${platforms.find(p => p.key === platform)?.name || ''} practice problems page`}
            >
              Go to {platforms.find(p => p.key === platform)?.name} Problems
            </a>
          </div>
        )}
        {(platform === 'codeforces' ) && (
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
            <input
              className="border border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Search by name or ID"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border border-indigo-700 bg-gray-900/60 text-indigo-100 rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={tag}
              onChange={e => setTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}
        {loading && <div className="text-center text-indigo-200 font-semibold">Loading problems...</div>}
        {error && <div className="text-center text-red-400 font-semibold">{error}</div>}

        <ul className="divide-y divide-indigo-900/30 mt-4">
          {filtered.slice(0, 50).map(p => {
            const key = getProblemKey({ ...p, platform });
            const isFavorite = favoriteProblems.includes(key);
            return (
              <li key={key} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <button
                  className={`text-2xl transition transform hover:scale-110 ${favLoading === key ? 'animate-ping' : ''}`}
                  style={{
                    color: isFavorite ? 'red' : 'white',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (isFavorite) {
                      removeFavoriteProblem(p);
                    } else {
                      favoriteProblem(p);
                    }
                  }}
                  disabled={favLoading === key}
                  title={isFavorite ? 'Remove from favorites' : 'Favorite this problem'}
                >
                  {isFavorite ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                    </svg>
                  )}
                </button>

                <a
                  href={platform === 'codeforces'
                    ? `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`
                    : `https://leetcode.com/problems/${p.titleSlug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo-100 hover:underline"
                >
                  {platform === 'codeforces'
                    ? `[${p.contestId}${p.index}] ${p.name}`
                    : `[${p.questionId}] ${p.title}`}
                </a>
                <div className="text-sm text-indigo-300">
                  {platform === 'codeforces' && p.rating && <span>Difficulty: {p.rating} | </span>}
                  {platform === 'leetcode' && p.difficulty && <span>Difficulty: {p.difficulty} | </span>}
                  {platform === 'codeforces' && p.tags && <span>Tags: {p.tags.join(', ')}</span>}
                  {platform === 'leetcode' && p.topicTags && <span>Tags: {p.topicTags.join(', ')}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {toast && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-lg ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{toast.msg}</div>
      )}
    </div>
  );
}

export default PracticeProblems;
