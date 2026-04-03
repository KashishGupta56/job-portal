import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import Home from './pages/Home';
import Overview from './pages/dashboard/Overview';
import JobPortal from './pages/JobPortal';
import Preparation from './pages/Preparation';
import DSASection from './pages/DSASection';
import CompanyProcess from './pages/CompanyProcess';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login';
import Register from './pages/Register';

// Prep Subpages
import Aptitude from './pages/prep/Aptitude';
import Technical from './pages/prep/Technical';

import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Landing - Optional direct entry to dashboard for this project */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route path="/*" element={
            <DashboardLayout>
              <Routes>
                <Route path="/dashboard" element={<Overview />} />
                <Route path="/jobs" element={<JobPortal />} />
                <Route path="/prep" element={<Preparation />} />
                <Route path="/dsa" element={<DSASection />} />
                <Route path="/companies" element={<CompanyProcess />} />
                <Route path="/profile" element={<ResumeBuilder />} />
                
                {/* Prep Sections */}
                <Route path="/prep/aptitude" element={<Aptitude />} />
                <Route path="/prep/technical" element={<Technical />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
