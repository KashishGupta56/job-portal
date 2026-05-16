import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Search, Bell, Moon, Sun, ChevronDown,
  Menu, X, LogOut, Settings, UserCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { theme, setTheme, notifications, markNotifyRead, sidebarOpen, setSidebarOpen } = useApp();
  const [showNotify, setShowNotify]     = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName]         = useState('User');
  const [userEmail, setUserEmail]       = useState('');
  const [notifyPos, setNotifyPos]       = useState({ top: 0, right: 0 });
  const [userMenuPos, setUserMenuPos]   = useState({ top: 0, right: 0 });

  const navigate     = useNavigate();
  const userMenuRef  = useRef(null);
  const notifyRef    = useRef(null);
  const userBtnRef   = useRef(null);
  const notifyBtnRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email);
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();
        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else {
          setUserName(session.user.email.split('@')[0]);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target) &&
          userBtnRef.current  && !userBtnRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target) &&
          notifyBtnRef.current && !notifyBtnRef.current.contains(e.target)) {
        setShowNotify(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const openNotify = () => {
    if (notifyBtnRef.current) {
      const rect = notifyBtnRef.current.getBoundingClientRect();
      setNotifyPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
    setShowNotify(prev => !prev);
    setShowUserMenu(false);
  };

  const openUserMenu = () => {
    if (userBtnRef.current) {
      const rect = userBtnRef.current.getBoundingClientRect();
      setUserMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
    setShowUserMenu(prev => !prev);
    setShowNotify(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const initials    = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="dashboard-header">

      {/* Left — Sidebar toggle + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            width: '40px', height: '40px', borderRadius: '10px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-hover)',
            color: 'var(--text-main)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div style={{ position: 'relative', width: '380px' }}>
          <Search size={16} style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)',
          }} />
          <input
            type="text"
            placeholder="Search jobs, modules, companies..."
            style={{
              width: '100%',
              padding: '0.6rem 1rem 0.6rem 2.8rem',
              background: 'var(--surface-hover)',
              border: '1px solid var(--surface-border)',
              borderRadius: '10px',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Right — Theme, Notifications, User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            width: '40px', height: '40px', borderRadius: '10px',
            border: '1px solid var(--surface-border)',
            background: 'var(--surface-hover)',
            color: 'var(--text-main)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            ref={notifyBtnRef}
            onClick={openNotify}
            style={{
              width: '40px', height: '40px', borderRadius: '10px',
              border: '1px solid var(--surface-border)',
              background: 'var(--surface-hover)',
              color: 'var(--text-main)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px',
                background: '#ef4444', borderRadius: '50%',
              }} />
            )}
          </button>

          {/* ✅ PORTAL — document.body mein render hoga, koi bhi parent affect nahi karega */}
          {showNotify && createPortal(
            <div
              ref={notifyRef}
              style={{
                position: 'fixed',
                top: notifyPos.top,
                right: notifyPos.right,
                width: '320px',
                zIndex: 999999,
                borderRadius: '16px',
                border: '1px solid var(--surface-border)',
                background: 'rgba(10, 15, 30, 0.97)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--surface-border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem' }}>Notifications</p>
                {unreadCount > 0 && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <p style={{ padding: '1.5rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.88rem' }}>
                    No notifications yet
                  </p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotifyRead(n.id)}
                      style={{
                        padding: '0.9rem 1.25rem',
                        borderBottom: '1px solid var(--surface-border)',
                        cursor: 'pointer',
                        background: n.read ? 'transparent' : 'rgba(108,99,255,0.05)',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '0.88rem' }}>{n.title}</p>
                        {!n.read && (
                          <span style={{
                            width: '7px', height: '7px',
                            background: 'var(--primary)', borderRadius: '50%',
                            flexShrink: 0, marginTop: '4px',
                          }} />
                        )}
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.message}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{n.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>,
            document.body
          )}
        </div>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <button
            ref={userBtnRef}
            onClick={openUserMenu}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.4rem 0.75rem 0.4rem 0.4rem',
              borderRadius: '12px',
              border: '1px solid var(--surface-border)',
              background: 'var(--surface-hover)',
              color: 'var(--text-main)', cursor: 'pointer',
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: '700', fontSize: '0.85rem',
            }}>
              {initials}
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{userName}</span>
            <ChevronDown size={14} />
          </button>

          {/* ✅ PORTAL — document.body mein render hoga */}
          {showUserMenu && createPortal(
            <div
              ref={userMenuRef}
              style={{
                position: 'fixed',
                top: userMenuPos.top,
                right: userMenuPos.right,
                width: '240px',
                zIndex: 999999,
                borderRadius: '16px',
                border: '1px solid var(--surface-border)',
                background: 'rgba(10, 15, 30, 0.97)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                <p style={{ margin: 0, fontWeight: '600' }}>{userName}</p>
                <p style={{ marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{userEmail}</p>
              </div>

              <div style={{ padding: '0.5rem' }}>
                {[
                  { icon: <UserCircle size={16} />, label: 'My Profile', path: '/profile' },
                  { icon: <Settings   size={16} />, label: 'Settings',   path: '/settings' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { navigate(item.path); setShowUserMenu(false); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      gap: '0.75rem', padding: '0.75rem',
                      border: 'none', background: 'transparent',
                      cursor: 'pointer', borderRadius: '10px',
                      color: 'var(--text-main)', fontSize: '0.9rem',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}

                <div style={{ height: '1px', background: 'var(--surface-border)', margin: '0.5rem 0' }} />

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.75rem', padding: '0.75rem',
                    border: 'none', background: 'transparent',
                    cursor: 'pointer', borderRadius: '10px',
                    color: '#ef4444', fontSize: '0.9rem',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>,
            document.body
          )}
        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;