import { useAuth, AuthProvider } from './utility/use-auth-client';
import LoggedOut from './pages/LoggedOut';
import './App.css';
import { backend } from './utility/backend';
import { Principal } from '@dfinity/principal';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RegisterPage2 from './pages/auth/RegisterPage';
import { SetStateAction, useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/Chat";
import ProfilePage from "./pages/profiles/ProfilePage";
import AnimatedCursor from 'react-animated-cursor';
import PropertyListPage from './pages/PropertyListPage';
import MainLayout from './pages/layout/MainLayout';
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./assets/house.png";
import Maps from "@/pages/Maps"
import { PropertyFilterProvider } from './context/PropertyFilterContext';

import LegalPage from './pages/legal/page';

import ContactPage from './pages/contact/page';

import TeamPage from './pages/TeamPage';
import PropertiesPage from './pages/properties/page';
import PropertyDetailPage from './pages/properties/[id]/page';

// Admin

import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Page';

import AdminAnalytics from './pages/admin/analytics/page';
import AdminProperties from './pages/admin/properties/page';


// AI

import PredictPrice from './pages/ai/PredictPrice';
import StayAI from './pages/ai/StayAI';
import RoomClassifier from './pages/ai/RoomClassifier';
import ProtectedRoute from './utility/ProtectedRoute';


const pageVariants = {

  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  
};



const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex justify-center items-center bg-white z-50"
    >
      <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
    </motion.div>
  );
};

const AnimatedRoutes = () => {

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  return (

    <>

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes location={location} key={location.pathname}>

            {/* DEFAULT PAGES SECTION */}

            <Route path="/" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}><LoggedOut /></motion.div>} />

            <Route
              path="/home"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/home" element={<HomePage />} /> */}

            <Route path="/register" element={<RegisterPage setIsRegistered={function (value: SetStateAction<boolean>): void {
              throw new Error('Function not implemented.');
            } } />} />

            <Route path="/register2" element={<RegisterPage2 />} />

            <Route path="/legal" element={<LegalPage />} />

            {/* MAIN PAGES SECTION */}

            <Route element={<MainLayout/>}>
              <Route path="/list" element={
                <PropertyFilterProvider>
                  <PropertyListPage/>
                </PropertyFilterProvider>
              } />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/teams" element={<TeamPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/details" element={<PropertyDetailPage />} />
            </Route>

              {/* ADMIN PAGES SECTION */}
            
            <Route path="/admin" element={<AdminLayout children={<AdminDashboard />} />}>
            </Route>

            <Route path="/admin/analytics" element={<AdminLayout children={<AdminAnalytics />} />}>
            </Route>

            <Route path="/admin/properties" element={<AdminLayout children={<AdminProperties />} />}>
            </Route>

            <Route path="/chat" element={<ChatPage />} />

            <Route path="/profiles" element={<ProfilePage />} />

            <Route path="/maps" element={<Maps />} />

            {/* AI PAGES SECTION */}

            <Route path="/predicts" element={<PredictPrice />} />

            <Route path="/chatbot" element={<StayAI />} />

            <Route path="/room-classifier" element={<RoomClassifier />} />

            {/* ERROR PAGE SECTION */}

            <Route path="*" element={<NotFoundPage />} />

          </Routes>

        )}

      </AnimatePresence>

    </>

  );

};

function App() {

  const auth = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  if (!auth) return null;

  const { isAuthenticated, principal } = auth;

  useEffect(() => {
    const checkIfRegistered = async () => {
      if (isAuthenticated && principal) {
        try {
          // const principalObj = Principal.fromText(principal);
          // const principalObj = principal;
          const result = await backend.hasProfile(principal);
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
      setLoading(false);
    }
  }, [isAuthenticated, principal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <main id="pageContent">
      <BrowserRouter>
        <ToastContainer />
        <AnimatedCursor />
        <AnimatedRoutes />
      </BrowserRouter>
    </main>

  );

}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
