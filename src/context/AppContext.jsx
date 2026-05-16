import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('student');
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [dsaProgress, setDsaProgress] = useState(
    JSON.parse(localStorage.getItem('dsa_progress')) || {}
  );
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Job Alert', message: 'New Frontend Role at Netflix', time: '2h ago', read: false },
    { id: 2, title: 'Prep Tip', message: 'Check out the new DP sheet', time: '5h ago', read: true }
  ]);
  const [theme, setThemeState] = useState(
    localStorage.getItem('theme') || 'dark'
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('dsa_progress', JSON.stringify(dsaProgress));
  }, [dsaProgress]);

  // Theme apply karo jab bhi change ho
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      addNotification('Application Sent', `Successfully applied for job ID: ${jobId}`);
    }
  };

  const updateDsaProgress = (problemId, status) => {
    setDsaProgress(prev => ({
      ...prev,
      [problemId]: status
    }));
  };

  const addNotification = (title, message) => {
    setNotifications(prev => [
      { id: Date.now(), title, message, time: 'Just now', read: false },
      ...prev
    ]);
  };

  const markNotifyRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      userRole, setUserRole,
      savedJobs, toggleSaveJob,
      appliedJobs, applyToJob,
      dsaProgress, updateDsaProgress,
      notifications, addNotification, markNotifyRead,
      theme, setTheme,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);