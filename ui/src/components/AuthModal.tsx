import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = 'signin' | 'signup';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, authError, clearError } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowForgotPassword(false);
      setMessage('');
      clearError();
    }
  }, [isOpen, clearError]);

  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isOpen, activeTab, showForgotPassword]);

  const handleTabSwitch = (tab: AuthTab) => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
    clearError();
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      await signInWithEmail(email, password);
      onClose();
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      setMessage('Account created! Check your email to verify your account.');
      // Don't close modal immediately, let user see the message
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const renderSignInForm = () => (
    <>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="auth-google-button"
      >
        {loading ? 'Signing in...' : 'Continue with Google'}
      </button>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <form onSubmit={handleEmailSignIn}>
        <div className="auth-form-group">
          <label htmlFor="signin-email">Email</label>
          <input
            ref={emailInputRef}
            id="signin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="auth-submit-button"
          disabled={loading || !email || !password}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="auth-link-button"
          disabled={loading}
        >
          Forgot your password?
        </button>
      </form>
    </>
  );

  const renderSignUpForm = () => (
    <>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="auth-google-button"
      >
        {loading ? 'Signing up...' : 'Continue with Google'}
      </button>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <form onSubmit={handleEmailSignUp}>
        <div className="auth-form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            ref={emailInputRef}
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="auth-submit-button"
          disabled={loading || !email || !password || !confirmPassword}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handlePasswordReset}>
      <p className="auth-forgot-description">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <div className="auth-form-group">
        <label htmlFor="reset-email">Email</label>
        <input
          ref={emailInputRef}
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="auth-form-buttons">
        <button
          type="button"
          onClick={() => setShowForgotPassword(false)}
          className="auth-secondary-button"
          disabled={loading}
        >
          Back to Sign In
        </button>
        <button
          type="submit"
          className="auth-submit-button"
          disabled={loading || !email}
        >
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Authentication"
      className="auth-modal-content"
      overlayClassName="auth-modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="auth-modal-header">
        <button
          onClick={onClose}
          className="auth-close-button"
          disabled={loading}
        >
          ×
        </button>
      </div>

      {!showForgotPassword && (
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('signin')}
            disabled={loading}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('signup')}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      )}

      <div className="auth-modal-body">
        {showForgotPassword ? (
          <>
            <h2>Reset Password</h2>
            {renderForgotPasswordForm()}
          </>
        ) : (
          <>
            <h2>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</h2>
            {activeTab === 'signin' ? renderSignInForm() : renderSignUpForm()}
          </>
        )}

        {(authError || message) && (
          <div className={`auth-message ${authError ? 'error' : 'success'}`}>
            {authError || message}
          </div>
        )}
      </div>
    </Modal>
  );
};