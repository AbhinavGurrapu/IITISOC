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
        />
      )}
      {page === 'signup' && (
        <SignUp
          onSignUp={handleLogin}
          goToSignIn={() => setPage('signin')}
        />
      )}
      {page === 'home' && (
        <HomePage
          username={username}
          onSignOut={() => setPage('first')}
          goToCalendar={() => setPage('calendar')}
          {...(username && { goToHome: () => setPage('home') })}
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
            <CalendarPage goToHome={() => setPage('home')} />
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
            <ContestListByDay userId={username || 'demo'} />
            <FavoriteContests userId={username || 'demo'} />
          </div>
        </div>
      )}
      <Footer />
      {/* Add a button to navigate to contests page for demo */}
      {/* <button onClick={() => setPage('contests')} style={{position:'fixed',bottom:80,right:30,zIndex:1000,background:'#6366f1',color:'white',padding:'12px 24px',borderRadius:12}}>Show Contests</button> */}
    </div>
  );
}

export default App;
