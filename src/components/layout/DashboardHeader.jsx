import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Moon, Sun, ChevronDown, Menu, X, LogOut, Settings, UserCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { theme, setTheme, notifications, markNotifyRead, sidebarOpen, setSidebarOpen } = useApp();
  const [showNotify, setShowNotify] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const notifyRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUserEmail(session.user.email)
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
      if (notifyRef.current && !notifyRef.current.contains(e.target)) setShowNotify(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="dashboard-header" style={{ overflow: 'visible' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            width: '40px', height: '40px',
            borderRadius: '10px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-hover)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div ref={notifyRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowNotify(!showNotify); setShowUserMenu(false); }}
            style={{
              width: '40px', height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--surface-border)',
              background: 'var(--surface-hover)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', transition: 'all 0.2s'
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px',
                background: '#ef4444', borderRadius: '50%',
                border: '2px solid var(--background)'
              }} />
            )}
          </button>

          {showNotify && (
            <div className="glass" style={{
              position: 'absolute', top: 'calc(100% + 10px)', right: 0,
              width: '340px', zIndex: 9999,
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid var(--surface-border)'
            }}>
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--surface-border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Notifications</span>
                {unreadCount > 0 && (
                  <span style={{
                    background: 'rgba(99,102,241,0.15)', color: 'var(--primary)',
                    fontSize: '0.75rem', fontWeight: '600',
                    padding: '2px 8px', borderRadius: '999px'
                  }}>{unreadCount} new</span>
                )}
              </div>
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotifyRead(n.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderBottom: '1px solid var(--surface-border)',
                        background: n.read ? 'transparent' : 'rgba(99,102,241,0.05)',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{n.title}</span>
                        {!n.read && <span style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginTop: '4px', flexShrink: 0 }} />}
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>{n.message}</p>
                      <span style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.25rem', display: 'block' }}>{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotify(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.4rem 0.75rem 0.4rem 0.4rem',
              borderRadius: '12px',
              border: '1px solid var(--surface-border)',
              background: 'var(--surface-hover)',
              color: 'var(--text-main)',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: '700', color: 'white', flexShrink: 0
            }}>
              {initials}
            </div>
            <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>{userName}</span>
            <ChevronDown size={14} style={{ opacity: 0.6 }} />
          </button>

          {showUserMenu && (
            <div className="glass" style={{
              position: 'absolute', top: 'calc(100% + 10px)', right: 0,
              width: '220px', zIndex: 9999,
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid var(--surface-border)'
            }}>
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--surface-border)',
                background: 'rgba(99,102,241,0.05)'
              }}>
                <p style={{ fontWeight: '600', fontSize: '0.875rem', margin: 0 }}>{userName}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '2px 0 0' }}>{userEmail}</p>
              </div>

              <div style={{ padding: '0.5rem' }}>
                <button
                  onClick={() => { navigate('/dashboard/profile'); setShowUserMenu(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.75rem', padding: '0.65rem 0.75rem',
                    background: 'transparent', border: 'none',
                    color: 'var(--text-main)', cursor: 'pointer',
                    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <UserCircle size={16} style={{ opacity: 0.7 }} />
                  My Profile
                </button>

                <button
                  onClick={() => { navigate('/dashboard/settings'); setShowUserMenu(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.75rem', padding: '0.65rem 0.75rem',
                    background: 'transparent', border: 'none',
                    color: 'var(--text-main)', cursor: 'pointer',
                    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Settings size={16} style={{ opacity: 0.7 }} />
                  Settings
                </button>

                <div style={{ height: '1px', background: 'var(--surface-border)', margin: '0.5rem 0' }} />

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.75rem', padding: '0.65rem 0.75rem',
                    background: 'transparent', border: 'none',
                    color: '#ef4444', cursor: 'pointer',
                    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;