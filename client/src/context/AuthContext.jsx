import { createContext, useContext, useState } from 'react';
import { authApi } from '../api.js';

const TOKEN_KEY = 'sjt_token';
const USER_KEY = 'sjt_user';

const AuthContext = createContext(null);

function readStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(readStoredUser());

  const persistAuth = (payload) => {
    const nextToken = payload?.token || '';
    const nextUser = {
      _id: payload?._id,
      name: payload?.name,
      email: payload?.email,
    };

    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    persistAuth(response);
    return response;
  };

  const register = async (payload) => {
    const response = await authApi.register(payload);
    persistAuth(response);
    return response;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken('');
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
