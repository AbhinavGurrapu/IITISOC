import React, { useState, useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import FirstPage from './pages/FirstPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CalendarPage from './pages/CalendarPage';
import ContestListByDay from './components/ContestListByDay';
import PersonalInfo from './pages/PersonalInfo';
import PracticeProblems from './components/PracticeProblems';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Footer from './components/Footer';
import ContestsNavbar from './components/ContestsNavbar';
import MyProfile from './pages/MyProfile'; // Import MyProfile component
import FavouritesPage from './pages/FavouritesPage'; // Import FavouritesPage component
import axios from 'axios';

function App() {
  const [page, setPage] = useState(() => {
    // Always restore the last visited page from localStorage, default to 'first' if not set
    return localStorage.getItem('currentPage') || 'first';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [signupFlow, setSignupFlow] = useState(false); // Track if user is in signup flow
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || '';
  });
  const [userDetails, setUserDetails] = useState(null);
  const isFirstRender = useRef(true);

  const handleLogin = (name, email) => {
    setUsername(name);
    setUserEmail(email);
    localStorage.setItem('username', name); // Save username to localStorage
    localStorage.setItem('userEmail', email);
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
        statePage === 'contests' ||
        statePage === 'favourites'
      ) {
        setPage('home');
      } else {
        setPage(statePage);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Fetch user details from backend when profile page is loaded
  useEffect(() => {
    if (page === 'profile' && userEmail) {
      axios.get(`http://localhost:3001/api/user/email/${userEmail}`)
        .then(res => setUserDetails(res.data))
        .catch(() => setUserDetails(null));
    }
  }, [page, userEmail]);

  // On mount, check for OAuth redirect params and auto-login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const name = params.get('name');
    if (email && name) {
      handleLogin(name, email);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Persist the current page in localStorage on every page change
  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

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
          personalInfo={userDetails || {}}
          onEditInfo={(info) => {
            setUserDetails(info);
            localStorage.setItem('personalInfo', JSON.stringify(info));
          }}
        />
      )}
      {page === 'calendar' && (
        <div className="top-0 bg-gradient-to-br from-sky-400 via-indigo-300 to-emerald-200 flex flex-col">
          <div className="pt-0">
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
          <div className="pt-0">
            
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