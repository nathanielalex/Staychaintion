import { useAuth, AuthProvider } from './utility/use-auth-client';
import './App.css';
import { backend } from './utility/backend';
import { Principal } from '@dfinity/principal';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Wallet from './pages/Wallet';
import RegisterPage from './pages/RegisterPage';
import RegisterPage2 from './pages/auth/RegisterPage';
import { SetStateAction, useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/Chat";

import AnimatedCursor from 'react-animated-cursor';
import PropertyListPage from './pages/PropertyListPage';
import MainLayout from './pages/layout/MainLayout';
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./assets/house.png";
import Maps from "@/pages/Maps"
import { PropertyFilterProvider } from './context/PropertyFilterContext';

import RegisterFinal from './pages/auth/page';
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
import AdminUsers from './pages/admin/users/page';


// Admin

import OwnerLayout from './pages/owner/layout';
import OwnerDashboard from './pages/owner/page';

import OwnerAnalytics from './pages/owner/analytics/page';
import OwnerProperties from './pages/owner/properties/page';
import OwnerSettings from './pages/owner/settings/page';


// User / Renter

import UserLayout from "./pages/profiles/layout";
import ProfilePage from "./pages/profiles/ProfilePage";

import UserProfileSettings from './pages/profiles/settings/page';
import UserPropertiesPage from './pages/profiles/properties/page';
import UserAnalyticsPage from './pages/profiles/analytics/page';


// AI

import PredictPrice from './pages/ai/PredictPrice';
import PredictPriceArchieved from './pages/ai/Archieved-Predict-Price';
import StayAI from './pages/ai/StayAI';
import RoomClassifier from './pages/ai/RoomClassifier';
import ProtectedRoute from './utility/ProtectedRoute';

import AIFeaturesPage from './pages/ai-page/page';


// Marketing Page

import MarketingGrowthPage from './pages/marketing/page';
import InfluencerAffiliatePage from './pages/influencer/page';
import BlogPage from './pages/blog/page';
import BlogDetailPage from './pages/blog/[id]/page'
import CaseStudyPage from './pages/case-studies/[id]/page';
import InfluencerJoinPage from './pages/influencer/join/page';


// Marketplace Page

import MarketplacePage from './pages/marketplace/page';


// Other Pages

import ComingSoonPage from './pages/coming-soon/page';
import OnboardPage from './pages/Onboard';

// Dark Mode

import { ThemeProvider } from '@/context/ThemeContext';

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

    <ThemeProvider>

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes location={location} key={location.pathname}>

            {/* DEFAULT PAGES SECTION */}

            <Route path="/" element={<OnboardPage />} />

            <Route
              path="/wallet"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Wallet />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/home" element={<HomePage />} /> */}

            {/* <Route path="/register" element={<RegisterPage setIsRegistered={function (value: SetStateAction<boolean>): void {
              throw new Error('Function not implemented.');
            } } />} /> */}

            <Route path="/register" element={<RegisterPage2 />} />

            <Route path="/legal" element={<LegalPage />} />

            <Route path="/chat" element={<ChatPage />} />

            <Route path="/maps" element={<Maps />} />

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

            <Route path="/admin/users" element={<AdminLayout children={<AdminUsers />} />}>
            </Route>


            {/* OWNER PAGES SECTION */}
            
            <Route path="/owner" element={<OwnerLayout children={<OwnerDashboard />} />}>
            </Route>

            <Route path="/owner/analytics" element={<OwnerLayout children={<OwnerAnalytics />} />}>
            </Route>

            <Route path="/owner/properties" element={<OwnerLayout children={<OwnerProperties />} />}>
            </Route>

            <Route path="/owner/settings" element={<OwnerLayout children={<OwnerSettings />} />}>
            </Route>


            {/* USER PROFILE PAGES SECTION */}

            <Route path="/user" element={<UserLayout children={<ProfilePage />} />}>
            </Route>

            <Route path="/user/settings" element={<UserLayout children={<UserProfileSettings />} />}>
            </Route>

            <Route path="/user/properties" element={<UserLayout children={<UserPropertiesPage />} />}>
            </Route>

            <Route path="/user/analytics" element={<UserLayout children={<UserAnalyticsPage />} />}>
            </Route>


            {/* AI PAGES SECTION */}

            <Route element={<MainLayout/>}>
              <Route path="/ai" element={<AIFeaturesPage />} />

              <Route path="/predicts" element={<PredictPrice />} />

              <Route path="/chatbot" element={<StayAI />} />

              <Route path="/predicts-old" element={<PredictPriceArchieved />} />
              
            </Route>

            <Route path="/room-classifier" element={<ComingSoonPage />} />
            

            {/* Other Pages */}
            

            {/* MARKETING PAGES */}

            <Route element={<MainLayout/>}>
              <Route path="/marketing" element={<MarketingGrowthPage />} />
              <Route path="/marketing/influencer" element={<InfluencerAffiliatePage />} />
              <Route path="/marketing/blogs" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/case-studies/:id" element={<CaseStudyPage />} />
              <Route path="/influencer-affiliate/join" element={<InfluencerJoinPage />} />
            </Route>

            {/* MARKETPLACE PAGES */}

            <Route element={<MainLayout/>}>
              <Route path="/marketplace" element={<MarketplacePage />} />
            </Route>

            {/* ERROR PAGE SECTION */}

            <Route path="*" element={<NotFoundPage />} />

          </Routes>

        )}

      </AnimatePresence>

    </ThemeProvider>

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
