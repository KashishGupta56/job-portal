import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  Code2, 
  Building2, 
  UserCircle, 
  Settings,
  Bell,
  Search,
  CheckSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { userRole, sidebarOpen } = useApp();

  const getNavLinks = () => {
    const common = [
      { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    ];

    if (userRole === 'student') {
      return [
        ...common,
        { to: '/jobs', icon: <Briefcase size={20} />, label: 'Job Portal' },
        { to: '/prep', icon: <BookOpen size={20} />, label: 'Preparation' },
        { to: '/dsa', icon: <Code2 size={20} />, label: 'DSA Sheet' },
        { to: '/companies', icon: <Building2 size={20} />, label: 'Companies' },
        { to: '/profile', icon: <UserCircle size={20} />, label: 'My Profile' },
      ];
    } else if (userRole === 'recruiter') {
      return [
        ...common,
        { to: '/manage-jobs', icon: <Briefcase size={20} />, label: 'Manage Jobs' },
        { to: '/applicants', icon: <UserCircle size={20} />, label: 'Applicants' },
      ];
    }
    return common;
  };

  return (
    <aside className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
      <NavLink to="/" className="sidebar-logo">
        JobStream Pro
      </NavLink>
      <nav className="sidebar-nav">
        {getNavLinks().map((link) => (
          <NavLink 
            key={link.to} 
            to={link.to} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <NavLink to="/settings" className="sidebar-link">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
