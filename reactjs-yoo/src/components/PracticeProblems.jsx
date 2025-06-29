import React, { useEffect, useState } from 'react';
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

function PracticeProblems({ userId, goToHome, goToCalendar, onSignOut, streak, username }) {
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
        } else if (platform === 'leetcode') {
          const res = await axios.get('https://leetcode-api-faisalshohag.vercel.app/leetcode/problems');
          if (res.data && Array.isArray(res.data.problems)) {
            setProblems(res.data.problems);
          } else {
            setError('LeetCode problems are currently unavailable.');
          }
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

  const favoriteProblem = async (problem) => {
    const key = getProblemKey({ ...problem, platform });
    const id = getProblemId({ ...problem, platform });
    setFavLoading(key);
    try {
      await axios.post('http://localhost:3001/api/favorites/problem', {
        userId: userId || 'demo',
        problem: { ...problem, platform, id },
      });
      setFavoriteProblems(prev => [...prev, key]);
    } catch (err) {
      alert('Failed to favorite problem');
    }
    setFavLoading(null);
  };

  const removeFavoriteProblem = async (problem) => {
    const key = getProblemKey({ ...problem, platform });
    // Find the favorite object for this problem
    const favObj = favoriteProblemObjs.find(fav => getProblemKey(fav.problem || fav) === key);
    const id = favObj ? favObj.problem?.id || favObj.id : getProblemId({ ...problem, platform });
    setFavLoading(key);
    try {
      await axios.delete('http://localhost:3001/api/favorites/problem', {
        data: { userId: userId || 'demo', problem: { ...problem, platform, id } }
      });
      setFavoriteProblems(prev => prev.filter(k => k !== key));
      setFavoriteProblemObjs(prev => prev.filter(fav => getProblemKey(fav.problem || fav) !== key));
    } catch (err) {
      alert('Failed to remove favorite');
    }
    setFavLoading(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 pb-10 flex flex-col">
      <ContestsNavbar goToHome={goToHome} goToCalendar={goToCalendar} onSignOut={onSignOut} streak={streak} username={username} />
      <div className="mb-10"></div>
      <div className="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-xl p-6 mt-20">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Practice Problems</h2>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {platforms.map(p => (
            <button
              key={p.key}
              className={`px-5 py-2 rounded-xl font-semibold border transition shadow-sm ${platform === p.key ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100'}`}
              onClick={() => setPlatform(p.key)}
            >
              {p.name}
            </button>
          ))}
        </div>
        {(platform === 'codeforces' || platform === 'leetcode') && (
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
            <input
              className="border border-indigo-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Search by name or ID"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border border-indigo-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={tag}
              onChange={e => setTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}
        {loading && <div className="text-center text-indigo-700 font-semibold">Loading problems...</div>}
        {error && <div className="text-center text-red-600 font-semibold">{error}</div>}

        <ul className="divide-y divide-indigo-100 mt-4">
          {filtered.slice(0, 50).map(p => {
            const key = getProblemKey({ ...p, platform });
            const isFavorite = favoriteProblems.includes(key);
            return (
              <li key={key} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <button
                  className={`text-2xl transition transform hover:scale-110 ${favLoading === key ? 'animate-ping' : ''}`}
                  style={{
                    color: isFavorite ? 'red' : 'black',
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
                  className="font-semibold text-indigo-800 hover:underline"
                >
                  {platform === 'codeforces'
                    ? `[${p.contestId}${p.index}] ${p.name}`
                    : `[${p.questionId}] ${p.title}`}
                </a>
                <div className="text-sm text-indigo-700/80">
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

      <div className="fixed bottom-10 right-8 z-50 bg-indigo-700 border border-indigo-300 shadow-2xl rounded-2xl flex items-center gap-2 px-6 py-3 text-white font-bold text-lg backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Streak: {streak}</span>
      </div>
    </div>
  );
}

export default PracticeProblems;
