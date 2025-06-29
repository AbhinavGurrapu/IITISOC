import React, { useState, useRef, useEffect } from 'react';

function ContestsNavbar({ goToHome, goToCalendar, onSignOut, streak, username }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1250 : false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Example contest data for today (replace with real API logic)
  useEffect(() => {
    // Simulate: contest list for today (should be fetched from backend or API)
    const today = new Date().toISOString().split('T')[0];
    // Example: contests array, replace with real fetch
    const contestsToday = [
      { name: 'LeetCode Weekly', time: '8:00 PM', link: 'https://leetcode.com/contest/' },
      // Add more contests for today if needed
    ];
    setNotifications(contestsToday.length > 0 ? contestsToday : []);
    // Check localStorage for notification viewed state
    const viewed = localStorage.getItem('notificationViewed');
    setHasUnread(contestsToday.length > 0 && viewed !== today);
  }, []);

  // When notification dropdown is opened, mark as read globally
  useEffect(() => {
    if (showNotifications) {
      setHasUnread(false);
      // Mark as viewed for today in localStorage
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('notificationViewed', today);
    }
  }, [showNotifications]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1250);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (dropdownOpen || showNotifications || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, showNotifications, mobileMenuOpen]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] z-50 bg-indigo-700 h-16 flex justify-between px-2 shadow-xl rounded-2xl items-center border border-indigo-200">
      <p className="ml-4 text-2xl sm:text-4xl font-serif font-semibold text-white cursor-pointer" onClick={goToHome}>
        CodeBlitz
      </p>
      {/* Hamburger for mobile (if width < 1300px) */}
      {isMobile ? (
        <div className="flex items-center gap-2">
          <button
            className="focus:outline-none p-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {mobileMenuOpen && (
            <div ref={mobileMenuRef} className="absolute top-16 right-2 w-48 bg-white rounded-xl shadow-lg border border-indigo-200 z-50 animate-fade-in flex flex-col py-2">
              <button className="px-4 py-2 text-indigo-700 text-left hover:bg-indigo-100" onClick={() => { window.setPage && window.setPage('contests'); setMobileMenuOpen(false); }}>Compete</button>
              <button className="px-4 py-2 text-indigo-700 text-left hover:bg-indigo-100" onClick={() => { window.setPage && window.setPage('practice'); setMobileMenuOpen(false); }}>Practice</button>
              <button className="px-4 py-2 text-indigo-700 text-left hover:bg-indigo-100" onClick={() => { window.setPage && window.setPage('favourites'); setMobileMenuOpen(false); }}>Favourites</button>
              <button className="px-4 py-2 text-indigo-700 text-left hover:bg-indigo-100" onClick={() => { goToCalendar(); setMobileMenuOpen(false); }}>My Calendar</button>
              <button className="px-4 py-2 text-indigo-700 text-left hover:bg-indigo-100" onClick={() => { window.setPage && window.setPage('profile'); setMobileMenuOpen(false); }}>Profile</button>
              <button className="px-4 py-2 text-red-600 text-left hover:bg-red-100" onClick={() => { onSignOut(); setMobileMenuOpen(false); }}>Sign Out</button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <ul className="flex justify-end items-center gap-2">
            <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('contests')}>Compete</li>
            <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('practice')}>Practice</li>
            <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={() => window.setPage && window.setPage('favourites')}>Favourites</li>
            <li className="cursor-pointer px-5 py-4 hover:bg-indigo-600 rounded-xl text-white transition" onClick={goToCalendar}>My Calendar</li>
            {/* Profile dropdown here (rightmost) */}
            <div className="relative flex items-center ml-4" ref={dropdownRef}>
              {/* Notification Bell - smaller and left of profile */}
              <div className="relative flex items-center">
                <button
                  className="focus:outline-none mr-2"
                  onClick={() => setShowNotifications((v) => !v)}
                  aria-label="Notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-lg">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {hasUnread && (
                    <span className="absolute top-0 left-3.5 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-indigo-200 z-50 animate-fade-in p-4">
                    <h4 className="font-bold text-indigo-700 mb-2">Today's Contests</h4>
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-sm">No contests today.</p>
                    ) : (
                      <ul className="text-indigo-800 text-sm">
                        {notifications.map((n, i) => (
                          <li key={i} className="mb-2 last:mb-0">
                            <a href={n.link} target="_blank" rel="noreferrer" className="underline font-semibold hover:text-indigo-600">{n.name}</a>
                            <span className="ml-2 text-xs text-gray-500">{n.time}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl shadow transition focus:outline-none ml-2"
                onClick={() => setDropdownOpen((open) => !open)}
                type="button"
              >
                <i className="fa-solid fa-user"></i>
                <span className="hidden sm:inline">{username || 'Profile'}</span>
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-indigo-200 z-50 animate-fade-in"
                  style={{
                    top: '100%',
                    left: 'auto',
                    right: 0,
                    minWidth: '11rem',
                    maxHeight: '60vh',
                    overflowY: 'auto',
                  }}
                >
                  <ul className="py-2 text-gray-800">
                    <li className="px-4 py-2 hover:bg-indigo-100 cursor-pointer" onClick={() => window.setPage && window.setPage('profile')}>My Profile</li>
                    <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer" onClick={onSignOut}>
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ContestsNavbar;