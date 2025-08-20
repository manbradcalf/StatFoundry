import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";

export const LoginButton: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div>
      <button className="login-button" onClick={handleClick}>
        {user ? "Logout" : "Login"}
      </button>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </div>
  );
};
