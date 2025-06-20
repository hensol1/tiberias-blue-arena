import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'user';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // בדוק אם יש משתמש מחובר ב-localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    // כאן תוכל להוסיף לוגיקת אימות אמיתית
    // כרגע נשתמש בסיסמאות פשוטות לצורך הדגמה
    
    const adminCredentials = {
      username: 'admin',
      password: 'admin123'
    };
    
    const editorCredentials = {
      username: 'editor',
      password: 'editor123'
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      const user: User = {
        id: '1',
        name: 'מנהל מערכת',
        role: 'admin'
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } else if (username === editorCredentials.username && password === editorCredentials.password) {
      const user: User = {
        id: '2',
        name: 'עורך תוכן',
        role: 'editor'
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    switch (permission) {
      case 'add_news':
        return user.role === 'admin' || user.role === 'editor';
      case 'edit_news':
        return user.role === 'admin' || user.role === 'editor';
      case 'delete_news':
        return user.role === 'admin';
      case 'manage_users':
        return user.role === 'admin';
      default:
        return false;
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  };
}; 