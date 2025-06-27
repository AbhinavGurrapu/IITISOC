import React, { useEffect, useState } from 'react';
import axios from 'axios';

const tags = [
  'dp', 'math', 'greedy', 'graphs', 'implementation', 'strings', 'binary search', 'brute force', 'data structures', 'sortings', 'trees', 'number theory', 'combinatorics', 'dfs and similar', 'constructive algorithms', 'two pointers', 'bitmasks', 'dsu', 'geometry', 'shortest paths', 'probabilities', 'hashing', 'games', 'flows', 'interactive', 'matrices', 'fft', 'ternary search', 'meet-in-the-middle', 'string suffix structures', '2-sat', 'chinese remainder theorem', 'schedules', 'divide and conquer', 'expression parsing', 'graph matchings', 'flows', 'bitmasks', 'dsu', 'geometry', 'shortest paths', 'probabilities', 'hashing', 'games', 'flows', 'interactive', 'matrices', 'fft', 'ternary search', 'meet-in-the-middle', 'string suffix structures', '2-sat', 'chinese remainder theorem', 'schedules', 'divide and conquer', 'expression parsing', 'graph matchings'
];

function PracticeProblems({ userId }) {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [favLoading, setFavLoading] = useState(null);

  useEffect(() => {
    // Example: Fetch from Codeforces API (can add more sources)
    axios.get('https://codeforces.com/api/problemset.problems')
      .then(res => setProblems(res.data.result.problems))
      .catch(() => setProblems([]));
  }, []);

  const filtered = problems.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.contestId + '').includes(search)) &&
    (!tag || (p.tags && p.tags.includes(tag)))
  );

  const favoriteProblem = async (problem) => {
    setFavLoading(problem.contestId + '-' + problem.index);
    try {
      await axios.post('http://localhost:3001/api/favorites/problem', {
        userId: userId || 'demo',
        problem
      });
      alert('Problem added to favorites!');
    } catch (err) {
      alert('Failed to favorite problem');
    }
    setFavLoading(null);
  };

  return (
    <div>
      <h2>Practice Problems (Codeforces Example)</h2>
      <input placeholder="Search by name or ID" value={search} onChange={e => setSearch(e.target.value)} />
      <select value={tag} onChange={e => setTag(e.target.value)}>
        <option value="">All Tags</option>
        {tags.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <ul>
        {filtered.slice(0, 50).map(p => (
          <li key={p.contestId + '-' + p.index}>
            <button
              style={{ color: 'red', fontSize: '1.2em', marginRight: 8 }}
              onClick={() => favoriteProblem(p)}
              disabled={favLoading === (p.contestId + '-' + p.index)}
              title="Favorite this problem"
            >
              {favLoading === (p.contestId + '-' + p.index) ? '❤️‍🔥' : '❤️'}
            </button>
            <a href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`} target="_blank" rel="noopener noreferrer">
              [{p.contestId}{p.index}] {p.name}
            </a>
            {p.rating && <span> | Difficulty: {p.rating}</span>}
            {p.tags && <span> | Tags: {p.tags.join(', ')}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PracticeProblems;
