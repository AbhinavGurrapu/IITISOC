import { useEffect, useState } from 'react';
import axios from 'axios';

function ContestList({ userId }) {
  const [contests, setContests] = useState([]);
  const [favLoading, setFavLoading] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/contests')
      .then(res => setContests(res.data.objects))
      .catch(err => console.error('Error loading contests', err));
  }, []);

  const favoriteContest = async (contest) => {
    setFavLoading(contest.id);
    try {
      await axios.post('http://localhost:3001/api/favorites/contest', {
        userId: userId || 'demo', // Replace with real userId in production
        contest
      });
      alert('Contest added to favorites!');
    } catch (err) {
      alert('Failed to favorite contest');
    }
    setFavLoading(null);
  };

  return (
    <div>
      <h2>Upcoming Contests</h2>
      <ul>
        {contests.map(c => (
          <li key={c.id}>
            <button
              style={{ color: 'red', fontSize: '1.2em', marginRight: 8 }}
              onClick={() => favoriteContest(c)}
              disabled={favLoading === c.id}
              title="Favorite this contest"
            >
              {favLoading === c.id ? '❤️‍🔥' : '❤️'}
            </button>
            <strong>{c.event}</strong> - {c.resource.name} <br />
            Starts at: {new Date(c.start).toLocaleString()} <br />
            <a href={c.href} target="_blank" rel="noopener noreferrer">View</a> |{' '}
            <a href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(c.event)}&dates=${formatDateTimeForCalendar(c.start, c.end)}&details=${encodeURIComponent(c.href)}`} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDateTimeForCalendar(start, end) {
  const s = new Date(start).toISOString().replace(/[-:.]/g, '').split('.')[0] + 'Z';
  const e = new Date(end).toISOString().replace(/[-:.]/g, '').split('.')[0] + 'Z';
  return `${s}/${e}`;
}

export default ContestList;
