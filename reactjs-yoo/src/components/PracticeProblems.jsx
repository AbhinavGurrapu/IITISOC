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

const platformLinks = {
  gfg: 'https://practice.geeksforgeeks.org/explore',
  codechef: 'https://www.codechef.com/practice',
  atcoder: 'https://atcoder.jp/contests/',
  hackerrank: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript',
};

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

  useEffect(() => {
    async function fetchProblemsOrContests() {
      setLoading(true);
      setError('');
      setProblems([]);
      setContests([]);
      try {
        if (platform === 'clist') {
          // Fetch contests from clist.by
          const res = await axios.get(
            `https://clist.by/api/v3/contest/?username=${CLIST_USERNAME}&api_key=${CLIST_API_KEY}&resource=codeforces.com,leetcode.com,atcoder.jp,codechef.com,geeksforgeeks.org,hackerrank.com&order_by=-start`
          );
          setContests(res.data.objects || []);
        } else if (platform === 'codeforces') {
          const res = await axios.get('https://codeforces.com/api/problemset.problems');
          setProblems(res.data.result.problems);
        } else if (platform === 'leetcode') {
          try {
            const res = await axios.get('https://leetcode-api-faisalshohag.vercel.app/leetcode/problems');
            if (res.data && Array.isArray(res.data.problems) && res.data.problems.length > 0) {
              setProblems(res.data.problems);
            } else {
              setError('LeetCode problems are currently unavailable. Please try again later.');
            }
          } catch (err) {
            setError('Failed to fetch LeetCode problems. The LeetCode API may be down.');
          }
        } else if (platform === 'gfg') {
          setProblems([]);
        } else if (platform === 'codechef') {
          setProblems([]);
        } else if (platform === 'atcoder') {
          setProblems([]);
        } else if (platform === 'hackerrank') {
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
    setFavLoading(platform + '-' + (problem.contestId || problem.questionId || problem.title));
    try {
      await axios.post('http://localhost:3001/api/favorites/problem', {
        userId: userId || 'demo',
        problem: { ...problem, platform },
      });
      alert('Problem added to favorites!');
    } catch (err) {
      alert('Failed to favorite problem');
    }
    setFavLoading(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 pb-10 flex flex-col">
      <div className="mt-4"></div>
      <ContestsNavbar
        goToHome={goToHome}
        goToCalendar={goToCalendar}
        onSignOut={() => {
                setPage('first');
                setPersonalInfo(null);
                localStorage.removeItem('personalInfo');
              }}
        streak={streak}
        username={username}
      />
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
        {(platform === 'codeforces' || platform === 'leetcode') && (
          <ul className="divide-y divide-indigo-100 mt-4">
            {filtered.slice(0, 50).map(p => (
              <li key={platform + '-' + (p.contestId || p.questionId || p.title)} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <button
                  className="text-2xl mr-2 hover:scale-110 transition"
                  style={{ color: 'red' }}
                  onClick={() => favoriteProblem(p)}
                  disabled={favLoading === (platform + '-' + (p.contestId || p.questionId || p.title))}
                  title="Favorite this problem"
                >
                  {favLoading === (platform + '-' + (p.contestId || p.questionId || p.title)) ? '❤️‍🔥' : '❤️'}
                </button>
                {platform === 'codeforces' ? (
                  <a
                    href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-indigo-800 hover:underline"
                  >
                    [{p.contestId}{p.index}] {p.name}
                  </a>
                ) : platform === 'leetcode' ? (
                  <a
                    href={`https://leetcode.com/problems/${p.titleSlug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-indigo-800 hover:underline"
                  >
                    [{p.questionId}] {p.title}
                  </a>
                ) : null}
                <div className="text-sm text-indigo-700/80">
                  {platform === 'codeforces' && p.rating && <span>Difficulty: {p.rating} | </span>}
                  {platform === 'leetcode' && p.difficulty && <span>Difficulty: {p.difficulty} | </span>}
                  {platform === 'codeforces' && p.tags && <span>Tags: {p.tags.join(', ')}</span>}
                  {platform === 'leetcode' && p.topicTags && <span>Tags: {p.topicTags.join(', ')}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
        {(platform === 'gfg' || platform === 'codechef' || platform === 'atcoder' || platform === 'hackerrank') && !loading && !error && (
          <div className="text-center text-indigo-700 mt-8">
            <p className="mb-4">No public API for this platform. Please visit their practice page:</p>
            <a
              href={platformLinks[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-2 rounded-xl shadow transition text-lg"
            >
              Go to {platforms.find(p => p.key === platform).name} Practice
            </a>
          </div>
        )}
        {filtered.length === 0 && (platform === 'codeforces' || platform === 'leetcode') && !loading && !error && (
          <div className="text-center text-indigo-700 mt-8">No problems found for the selected filters.</div>
        )}
        {platform === 'clist' && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">Upcoming Contests</h3>
            <ul className="divide-y divide-indigo-100">
              {contests.map(contest => (
                <li key={contest.id} className="py-4">
                  <a
                    href={contest.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-indigo-800 hover:underline"
                  >
                    {contest.event} ({contest.resource.name})<br />
                    <span className="text-sm text-indigo-700/80">
                      Start: {contest.start} | Duration: {contest.duration}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Floating Streak Card at Bottom Right */}
      <div className="fixed bottom-10 right-8 z-50 bg-indigo-700 border border-indigo-300 shadow-2xl rounded-2xl flex items-center gap-2 px-6 py-3 text-white font-bold text-lg backdrop-blur-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Streak: {streak}</span>
      </div>
    </div>
  );
}

export default PracticeProblems;
