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
import MyProfile from './pages/MyProfile';
import FavouritesPage from './pages/FavouritesPage';

function App() {
  const [page, setPage] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    return savedUsername ? 'home' : 'first';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [signupFlow, setSignupFlow] = useState(false);
  const isFirstRender = useRef(true);

  // ✅ Read ?name=xyz from URL and set user
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) {
      localStorage.setItem('name', name);
      localStorage.setItem('username', name);
      setUsername(name);
      setPage('home');
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
    setSignupFlow(false);
    setPage('home');
  };

  const handleSignUp = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
    setSignupFlow(true);
    setPage('personalinfo');
  };

  const handlePersonalInfoSubmit = (info) => {
    setPersonalInfo(info);
    localStorage.setItem('personalInfo', JSON.stringify(info));
    setPage('home');
    setSignupFlow(false);
  };

  const goToHome = () => setPage('home');
  const goToFirstPage = () => setPage('first');
  const goToCalendar = () => setPage('calendar');
  const goToPractice = () => setPage('practice');
  const goToProfile = () => setPage('profile');

  useEffect(() => {
    if (isFirstRender.current) {
      window.history.replaceState({ page }, '');
      isFirstRender.current = false;
    } else {
      window.history.pushState({ page }, '');
    }
  }, [page]);

  useEffect(() => {
    const onPopState = (event) => {
      const statePage = event.state?.page;
      if (!statePage) return;
      if (statePage === 'signin' || statePage === 'signup') {
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
