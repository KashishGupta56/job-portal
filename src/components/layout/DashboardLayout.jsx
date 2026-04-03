import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { useApp } from '../../context/AppContext';

const DashboardLayout = ({ children }) => {
  const { theme } = useApp();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <DashboardHeader />
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
