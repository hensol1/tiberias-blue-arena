import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

interface AppUser {
  uid: string;
  email: string | null;
  name: string;
  role: 'admin' | 'editor' | 'user';
}

const mapFirebaseUserToAppUser = (firebaseUser: FirebaseUser): AppUser => {
  const email = firebaseUser.email || '';
  let role: 'admin' | 'editor' | 'user' = 'user';
  let name = 'משתמש אורח';

  if (email === 'admin@tiberias.com') {
    role = 'admin';
    name = 'מנהל מערכת';
  } else if (email === 'editor@tiberias.com') {
    role = 'editor';
    name = 'עורך תוכן';
  }

  return { uid: firebaseUser.uid, email, role, name };
};

// Demo users for when Firebase is not available
const DEMO_USERS = {
  'admin@tiberias.com': {
    password: 'admin123',
    role: 'admin' as const,
    name: 'מנהל מערכת',
    uid: 'demo-admin-uid'
  },
  'editor@tiberias.com': {
    password: 'editor123',
    role: 'editor' as const,
    name: 'עורך תוכן',
    uid: 'demo-editor-uid'
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase auth is available
    if (!auth) {
      console.warn("Firebase auth not available - running in demo mode");
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUserToAppUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!auth) {
      console.warn("Firebase auth not available - login failed");
      return false;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Firebase login error:", error);
      return false;
    }
  };

  const logout = async () => {
    if (!auth) {
      console.warn("Firebase auth not available - logout failed");
      return;
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase logout error:", error);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    switch (permission) {
      case 'add_news':
      case 'edit_news':
      case 'add_game':
      case 'edit_game':
        return user.role === 'admin' || user.role === 'editor';
      case 'delete_news':
      case 'delete_game':
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