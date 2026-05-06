import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';
import { supabase } from './supabase';

// Pages
import Home from './pages/Home';
import Overview from './pages/dashboard/Overview';
import Settings from './pages/dashboard/Settings';
import JobPortal from './pages/JobPortal';
import Preparation from './pages/Preparation';
import DSASection from './pages/DSASection';
import CompanyProcess from './pages/CompanyProcess';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

// Prep Subpages
import Aptitude from './pages/prep/Aptitude';
import Technical from './pages/prep/Technical';

import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)',
        color: 'var(--text-main)'
      }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Dashboard Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<Overview />} />
                  <Route path="/jobs" element={<JobPortal />} />
                  <Route path="/prep" element={<Preparation />} />
                  <Route path="/dsa" element={<DSASection />} />
                  <Route path="/companies" element={<CompanyProcess />} />
                  <Route path="/profile" element={<ResumeBuilder />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/prep/aptitude" element={<Aptitude />} />
                  <Route path="/prep/technical" element={<Technical />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;