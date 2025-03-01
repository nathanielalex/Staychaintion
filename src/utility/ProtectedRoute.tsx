import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated, navigate to the login page
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);  // Re-run effect if isAuthenticated or navigate changes

  // If not authenticated, we don't render the protected content
  if (!isAuthenticated) {
    return null;
  }

  // Render children (protected content) if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
