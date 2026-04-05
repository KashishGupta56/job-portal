import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Moon, Sun, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { theme, setTheme, notifications, markNotifyRead, sidebarOpen, setSidebarOpen } = useApp();
  const [showNotify, setShowNotify] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single()
        if (profile?.full_name) {
          setUserName(profile.full_name)
        } else {
          setUserName(session.user.email.split('@')[0])
        }
      }
    }
    fetchUser()
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.6rem' }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search jobs, preparatory modules, companies..." 
            className="search-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="btn btn-outline"
          style={{ padding: '0.6rem' }}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.6rem', position: 'relative' }}
            onClick={() => setShowNotify(!showNotify)}
          >
            <Bell size={20} />
            {notifications.some(n => !n.read) && (
              <span style={{ 
                position: 'absolute', top: '5px', right: '5px', 
                width: '10px', height: '10px', 
                background: '#ef4444', borderRadius: '50%',
                border: '2px solid var(--surface)'
              }}></span>
            )}
          </button>
          
          {showNotify && (
            <div className="glass" style={{ 
              position: 'absolute', top: '100%', right: 0, 
              width: '320px', marginTop: '1rem', padding: '1rem',
              zIndex: 1002, maxHeight: '400px', overflowY: 'auto'
            }}>
              <h4 style={{ marginBottom: '1rem' }}>Notifications</h4>
              {notifications.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No new alerts</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotifyRead(n.id)}
                      style={{ 
                        padding: '0.8rem', borderRadius: '8px', 
                        background: n.read ? 'transparent' : 'rgba(99, 102, 241, 0.1)',
                        cursor: 'pointer'
                      }}
                    >
                      <h5 style={{ fontSize: '0.95rem', margin: 0 }}>{n.title}</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>{n.message}</p>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <div 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.8rem', 
              cursor: 'pointer', padding: '0.4rem 1rem', borderRadius: '12px' 
            }} 
            className="glass"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              background: 'var(--primary)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center' 
            }}>
              <User size={18} />
            </div>
            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{userName}</span>
            <ChevronDown size={16} />
          </div>

          {showUserMenu && (
            <div className="glass" style={{
              position: 'absolute', top: '110%', right: 0,
              width: '180px', padding: '0.5rem',
              zIndex: 1002, borderRadius: '12px'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: '0.8rem', padding: '0.75rem 1rem',
                  background: 'transparent', border: 'none',
                  color: '#ef4444', cursor: 'pointer',
                  borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;