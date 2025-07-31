import { useAuth } from "../contexts/AuthContext";

export const LoginButton: React.FC = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  const handleClick = () => {
    if (user) {
      signOut();
    } else {
      signInWithGoogle();
    }
  };

  return (
    <div>
      <button className="login-button" onClick={handleClick}>
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
};
