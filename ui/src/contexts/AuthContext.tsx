import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  AuthError
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Set up Firebase auth state listener on component mount
  // This automatically handles user state changes (login/logout/refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  const clearError = () => {
    setAuthError(null);
  };

  const handleAuthError = (error: AuthError) => {
    let message = 'An error occurred during authentication.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password.';
        break;
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      default:
        message = error.message;
    }
    
    setAuthError(message);
    console.error('Auth error:', error);
  };

  // Google OAuth sign-in using popup flow
  // Popup is used instead of redirect to avoid third-party cookie issues
  // between localhost development and Firebase auth domain
  const signInWithGoogle = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    try {
      // The auth listener we set up above will automatically fire when this completes
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Automatically send email verification
      await sendEmailVerification(result.user);
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const sendEmailVerificationToUser = async () => {
    if (!user) {
      setAuthError('No user is currently signed in.');
      return;
    }
    
    setAuthError(null);
    try {
      await sendEmailVerification(user);
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  // Sign out the current user
  // The auth listener we set up above will automatically fire and set user to null
  const signOut = async () => {
    setAuthError(null);
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    authError,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    sendEmailVerification: sendEmailVerificationToUser,
    signOut,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
