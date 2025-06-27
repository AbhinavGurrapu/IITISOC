import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      // Optionally fetch user profile with token
      setUser({ username: localStorage.getItem('username') });
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post('http://localhost:3001/api/auth/login', { username, password });
    setToken(res.data.token);
    setUser({ username });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
