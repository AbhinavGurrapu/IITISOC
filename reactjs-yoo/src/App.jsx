import React, { useState, useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import FirstPage from './pages/FirstPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CalendarPage from './pages/CalendarPage';
import ContestListByDay from './components/ContestListByDay';
import FavoriteContests from './components/FavoriteContests';
import PersonalInfo from './pages/PersonalInfo';
import PracticeProblems from './components/PracticeProblems';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Footer from './components/Footer';
import ContestsNavbar from './components/ContestsNavbar';
import MyProfile from './pages/MyProfile'; // Import MyProfile component
import FavouritesPage from './pages/FavouritesPage'; // Import FavouritesPage component

function App() {
  const [page, setPage] = useState(() => {
    // Check if user is already logged in
    const savedUsername = localStorage.getItem('username');
    return savedUsername ? 'home' : 'home';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [signupFlow, setSignupFlow] = useState(false); // Track if user is in signup flow
  const isFirstRender = useRef(true);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name); // Save username to localStorage
    setSignupFlow(false); // Not in signup flow, so skip PersonalInfo
    setPage('home');
  };

  const handleSignUp = (name) => {
    setUsername(name);
    localStorage.setItem('username', name); // Save username to localStorage
    setSignupFlow(true); // In signup flow, require PersonalInfo
    setPage('personalinfo');
  };

  const handlePersonalInfoSubmit = (info) => {
    setPersonalInfo(info);
    localStorage.setItem('personalInfo', JSON.stringify(info));
    setPage('home');
    setSignupFlow(false); // Reset after info is filled
  };

  // Navigation functions
  const goToHome = () => setPage('home');
  const goToFirstPage = () => setPage('first');
  const goToCalendar = () => setPage('calendar');
  const goToPractice = () => setPage('practice');
  const goToProfile = () => setPage('profile');

  // Sync page state with browser history
  useEffect(() => {
    if (isFirstRender.current) {
      window.history.replaceState({ page }, '');
      isFirstRender.current = false;
    } else {
      window.history.pushState({ page }, '');
    }
  }, [page]);

  // Listen for browser back/forward
  useEffect(() => {
    const onPopState = (event) => {
      const statePage = event.state?.page;
      if (!statePage) return;
      // Custom back logic
      if ((statePage === 'signin' || statePage === 'signup')) {
        setPage('first');
      } else if (
        statePage === 'calendar' ||
        statePage === 'practice' ||
        statePage === 'contests'
      ) {
        setPage('home');
      } else {
        setPage(statePage);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Make setPage globally accessible for legacy code
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
          onSignUp={handleSignUp}
          goToSignIn={() => setPage('signin')}
          goToFirstPage={() => setPage('first')}
        />
      )}
      {page === 'personalinfo' && signupFlow && (
        <PersonalInfo onSubmit={handlePersonalInfoSubmit} />
      )}
      {page === 'home' && (
        <HomePage
          username={username}
          onSignOut={() => {
            setUsername('');
            setPage('first');
            setPersonalInfo(null);
            localStorage.removeItem('personalInfo');
            localStorage.removeItem('username');
          }}
          goToCalendar={() => setPage('calendar')}
          goToHome={() => setPage('home')}
          goToFirstPage={() => setPage('first')}
          goToProfile={() => setPage('profile')}
        />
      )}
      {page === 'profile' && (
        <MyProfile
          username={username}
          goToHome={() => setPage('home')}
          personalInfo={personalInfo || {}}
          onEditInfo={(info) => {
            setPersonalInfo(info);
            localStorage.setItem('personalInfo', JSON.stringify(info));
          }}
        />
      )}
      {page === 'calendar' && (
        <div className="top-0 bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col">
          <div className="pt-4">
            <CalendarPage 
              goToHome={() => setPage('home')} 
              goToFirstPage={() => setPage('home')} 
              goToCalendar={() => setPage('calendar')}
              onSignOut={() => {
                setUsername('');
                setPage('first');
                setPersonalInfo(null);
                localStorage.removeItem('personalInfo');
                localStorage.removeItem('username');
              }}
              streak={0}
              username={username}
            />
          </div>
        </div>
      )}
      {page === 'contests' && (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col">
          <div className="pt-4">
            
            <ContestListByDay 
              userId={username || 'demo'}
              goToHome={() => setPage('home')}
              goToCalendar={() => setPage('calendar')}
              onSignOut={() => {
                setUsername('');
                setPage('first');
                setPersonalInfo(null);
                localStorage.removeItem('personalInfo');
                localStorage.removeItem('username');
              }}
              streak={0}
              username={username}
            />
            <FavoriteContests userId={username || 'demo'} />
          </div>
        </div>
      )}
      {page === 'practice' && (
        <PracticeProblems
          userId={username || 'demo'}
          username={username}
          goToHome={goToHome}
          goToFirstPage={goToFirstPage}
          goToCalendar={goToCalendar}
        />
      )}
      {page === 'favourites' && (
        <FavouritesPage
          userId={username || 'demo'}
          goToHome={goToHome}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;