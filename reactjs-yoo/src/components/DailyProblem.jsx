import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DailyProblem({ userId }) {
  const [problem, setProblem] = useState(null);
  const [solved, setSolved] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Pick a random problem from Codeforces for demo
    axios.get('https://codeforces.com/api/problemset.problems')
      .then(res => {
        const all = res.data.result.problems;
        const today = new Date().toISOString().split('T')[0];
        const idx = today.split('-').reduce((a, b) => a + parseInt(b), 0) % all.length;
        setProblem(all[idx]);
        setSolved(localStorage.getItem('dailySolved') === today);
        setStreak(Number(localStorage.getItem('streak') || 0));
      });
  }, []);

  const markSolved = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!solved) {
      setSolved(true);
      localStorage.setItem('dailySolved', today);
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('streak', newStreak);
    }
  };

  return (
    <div style={{ margin: 24, padding: 16, border: '1px solid #ddd', borderRadius: 12, background: '#f8fafc' }}>
      <h3>Daily Problem</h3>
      {problem ? (
        <>
          <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target="_blank" rel="noopener noreferrer">
            [{problem.contestId}{problem.index}] {problem.name}
          </a>
          <br />
          {problem.rating && <span>Difficulty: {problem.rating}</span>}
          <br />
          <button
            onClick={markSolved}
            disabled={solved}
            style={{ marginTop: 8, background: solved ? '#aaa' : '#22c55e', color: 'white', padding: '6px 16px', borderRadius: 8 }}
          >
            {solved ? 'Solved Today!' : 'Mark as Solved'}
          </button>
          <div style={{ marginTop: 8, color: '#f59e42', fontWeight: 'bold' }}>Streak: {streak}</div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default DailyProblem;
