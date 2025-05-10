
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  title?: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
    website?: string;
  };
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          // Invalid user data in localStorage
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock login - this would actually call your auth service
      // For demo, we'll create a mock user
      const mockUser: User = {
        id: '123',
        email,
        username: email.split('@')[0],
        displayName: email.split('@')[0],
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      // Mock signup - this would actually call your auth service
      const mockUser: User = {
        id: '123',
        email,
        username,
        displayName: username,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Mock logout
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      throw new Error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      // Mock password reset
      // In a real app, this would trigger a password reset email
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      throw new Error('Password reset request failed');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      // Mock profile update
      if (user) {
        const updatedUser = { ...user, ...data, updatedAt: new Date() };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw new Error('Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, signup, logout, forgotPassword, updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
