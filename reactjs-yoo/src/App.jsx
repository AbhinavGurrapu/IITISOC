import { useState } from 'react';
import FirstPage from './pages/FirstPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import ContestListByDay from './components/ContestListByDay';
import FavoriteContests from './components/FavoriteContests';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Footer from './components/Footer';
import ContestsNavbar from './components/ContestsNavbar';

function App() {
  const [page, setPage] = useState('first');
  const [username, setUsername] = useState('');

  const handleLogin = (name) => {
    setUsername(name);
    setPage('home');
  };

  // Expose setPage globally for navbar navigation
  if (typeof window !== 'undefined') {
    window.setPage = setPage;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {page === 'first' && (
        <FirstPage
          goToSignIn={() => setPage('signin')}
          goToSignUp={() => setPage('signup')}
          goToHome={() => setPage('home')}
        />
      )}
      {page === 'signin' && (
        <SignIn
          onLogin={handleLogin}
          goToSignUp={() => setPage('signup')}
          goToFirstPage={() => setPage('first')}
        />
      )}
      {page === 'signup' && (
        <SignUp
          onSignUp={handleLogin}
          goToSignIn={() => setPage('signin')}
          goToFirstPage={() => setPage('first')}
        />
      )}
      {page === 'home' && (
        <HomePage
          username={username}
          onSignOut={() => setPage('first')}
          goToCalendar={() => setPage('calendar')}
          goToHome={() => setPage('home')}
          goToFirstPage={() => setPage('first')}
        />
      )}
      {page === 'calendar' && (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col">
          <ContestsNavbar
            goToHome={() => setPage('home')}
            goToCalendar={() => setPage('calendar')}
            onSignOut={() => setPage('first')}
            streak={0} // Optionally pass streak if available
            username={username}
          />
          <div className="pt-28">
            <CalendarPage goToHome={() => setPage('home')} goToFirstPage={() => setPage('home')} />
          </div>
        </div>
      )}
      {page === 'contests' && (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col">
          <ContestsNavbar
            goToHome={() => setPage('home')}
            goToCalendar={() => setPage('calendar')}
            onSignOut={() => setPage('first')}
            streak={0} // Optionally pass streak if available
            username={username}
          />
          <div className="pt-28">
            <button
              className="absolute top-8 left-8 bg-white/40 hover:bg-white/70 text-indigo-700 rounded-full p-2 shadow-lg z-50 transition"
              onClick={() => setPage('home')}
              aria-label="Go Back"
              style={{backdropFilter: 'blur(6px)'}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <ContestListByDay userId={username || 'demo'} />
            <FavoriteContests userId={username || 'demo'} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
