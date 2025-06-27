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
    console.log("useAuth login called with:", { email, password });
    console.log("Firebase auth available:", !!auth);
    
    // If Firebase is not available, use demo authentication
    if (!auth) {
      console.log("Using demo authentication");
      const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS];
      console.log("Demo user found:", demoUser);
      
      if (demoUser && demoUser.password === password) {
        console.log("Demo login successful");
        const user: AppUser = {
          uid: demoUser.uid,
          email: email,
          role: demoUser.role,
          name: demoUser.name
        };
        setUser(user);
        return true;
      } else {
        console.log("Demo login failed - invalid credentials");
        return false;
      }
    }

    // Use Firebase authentication
    try {
      console.log("Attempting Firebase login");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase login successful");
      return true;
    } catch (error) {
      console.error("Firebase login error:", error);
      return false;
    }
  };

  const logout = async () => {
    if (!auth) {
      console.log("Demo logout");
      setUser(null);
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
      case 'add_video':
      case 'edit_video':
        return user.role === 'admin' || user.role === 'editor';
      case 'delete_news':
      case 'delete_game':
      case 'delete_video':
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