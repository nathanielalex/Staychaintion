import { useAuth, AuthProvider } from './utility/use-auth-client';
import LoggedOut from './pages/LoggedOut';
import './App.css';
import { backend } from './utility/backend';
import { Principal } from '@dfinity/principal';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';

function App() {
  const auth = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Guard to prevent destructuring before the hook is ready
  if (!auth) return null;

  const { isAuthenticated, principal } = auth;

  useEffect(() => {
    const checkIfRegistered = async () => {
      if (isAuthenticated && principal) {
        try {
          // Convert string principal to Principal object
          const principalObj = Principal.fromText(principal);

          // Call the backend to check registration
          const result = await backend.hasProfile(principalObj);
          setIsRegistered(result);
        } catch (error) {
          console.error('Error checking registration:', error);
        }
      }
      setLoading(false);
    };

    if (isAuthenticated && principal) {
      checkIfRegistered();
    } else {
      setLoading(false); // Ensure loading state is turned off if not authenticated
    }
  }, [isAuthenticated, principal]);

  if (loading) {
    // You can display a loading spinner or placeholder here
    return <div>Loading...</div>;
  }

  return (
    <main id="pageContent">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <LoggedOut />}
          />
          <Route
            path="/home"
            element={
              isAuthenticated && isRegistered ? (
                <HomePage />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated && !isRegistered ? (
                <RegisterPage setIsRegistered={setIsRegistered} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
