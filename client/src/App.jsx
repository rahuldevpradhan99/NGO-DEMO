import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Splash from './pages/Splash';
import LanguageSelect from './pages/LanguageSelect';
import Welcome from './pages/Welcome';
import AuthFlow from './pages/Auth/AuthFlow';
import RoleSelect from './pages/RoleSelect';

import VillagerDashboard from './pages/dashboards/VillagerDashboard';
import VolunteerDashboard from './pages/dashboards/VolunteerDashboard';
import NGODashboard from './pages/dashboards/NGODashboard';
import NGOProposals from './pages/dashboards/NGOProposals';
import MunicipalityDashboard from './pages/dashboards/MunicipalityDashboard';

import ReportProblem from './pages/ReportProblem';
import MapView from './pages/MapView';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';

import Layout from './components/Layout/Layout';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/welcome" />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<AuthFlow />} />
        <Route path="/register" element={<AuthFlow />} />
        <Route path="/otp" element={<AuthFlow />} />
        <Route path="/role-select" element={<RoleSelect />} />

        {/* Protected Routes */}
        <Route path="/dashboard/villager" element={<ProtectedRoute><VillagerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/volunteer" element={<ProtectedRoute><VolunteerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/ngo" element={<ProtectedRoute><NGODashboard /></ProtectedRoute>} />
        <Route path="/dashboard/ngo/proposals" element={<ProtectedRoute><NGOProposals /></ProtectedRoute>} />
        <Route path="/dashboard/municipality" element={<ProtectedRoute><MunicipalityDashboard /></ProtectedRoute>} />
        
        <Route path="/report" element={<ProtectedRoute><ReportProblem /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
