import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType } from '../types';
import { v4 as uuidv4 } from '../utils/uuid';
import { sampleUsers } from '../data/sampleUsers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const BASE_URL = 'http://localhost:8020'; // or your backend server


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const getUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch("http://localhost:8020/user/getall");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users: User[] = await response.json();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };
  

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update user in users list
    const users = await getUsers();
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8020/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
  
      if (!response.ok) {
        // Unauthorized or not found
        return false;
      }
  
      const user = await response.json(); // full user object returned from backend
  
      const userWithDefaults = {
        ...user,
        createdAt: user.createdAt || new Date().toISOString()
      };
  
      setUser(userWithDefaults);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithDefaults));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = await getUsers();
    
    if (users.some((u: User) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      password,
      isArtist: false,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    getUsers
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};