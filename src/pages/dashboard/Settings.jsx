import React, { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Shield, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Settings = () => {
  const { theme, setTheme } = useApp();
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', icon: <User size={18} />, label: 'Profile Settings' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'security', icon: <Lock size={18} />, label: 'Security' },
    { id: 'appearance', icon: <Palette size={18} />, label: 'Appearance' },
    { id: 'privacy', icon: <Shield size={18} />, label: 'Privacy' },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Settings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Manage your account preferences</p>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        
        {/* Left Menu */}
        <div className="glass" style={{ padding: '1rem', borderRadius: '16px', height: 'fit-content' }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem', padding: '0.75rem 1rem',
                background: activeSection === section.id ? 'var(--primary-glow)' : 'transparent',
                border: activeSection === section.id ? '1px solid var(--primary)' : '1px solid transparent',
                color: activeSection === section.id ? 'var(--primary)' : 'var(--text-main)',
                cursor: 'pointer', borderRadius: '10px',
                fontSize: '0.875rem', fontWeight: '500',
                marginBottom: '0.25rem', transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {section.icon}
                {section.label}
              </div>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
          
          {activeSection === 'profile' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Profile Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                  <input type="text" placeholder="Your full name" className="search-input" style={{ width: '100%', padding: '0.8rem 1rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <input type="email" placeholder="Your email" className="search-input" style={{ width: '100%', padding: '0.8rem 1rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Bio</label>
                  <textarea placeholder="Tell us about yourself..." style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--surface-hover)', border: '1px solid var(--surface-border)', borderRadius: '12px', color: 'var(--text-main)', fontSize: '0.9rem', minHeight: '100px', resize: 'vertical', outline: 'none' }} />
                </div>
                <button className="btn btn-primary" style={{ width: 'fit-content' }}>Save Changes</button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Notification Preferences</h3>
              {[
                { label: 'Job Alerts', desc: 'Get notified about new job postings' },
                { label: 'Application Updates', desc: 'Status updates on your applications' },
                { label: 'DSA Reminders', desc: 'Daily practice reminders' },
                { label: 'Newsletter', desc: 'Weekly career tips and insights' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--surface-border)' }}>
                  <div>
                    <p style={{ fontWeight: '500', margin: 0 }}>{item.label}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{item.desc}</p>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', inset: 0, background: 'var(--primary)', borderRadius: '24px', transition: '0.2s' }} />
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Security Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Current Password</label>
                  <input type="password" placeholder="••••••••" className="search-input" style={{ width: '100%', padding: '0.8rem 1rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>New Password</label>
                  <input type="password" placeholder="••••••••" className="search-input" style={{ width: '100%', padding: '0.8rem 1rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="search-input" style={{ width: '100%', padding: '0.8rem 1rem' }} />
                </div>
                <button className="btn btn-primary" style={{ width: 'fit-content' }}>Update Password</button>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Appearance</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Choose your theme</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setTheme('dark')}
                  style={{
                    padding: '1rem 2rem', borderRadius: '12px', cursor: 'pointer',
                    border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                    background: theme === 'dark' ? 'var(--primary-glow)' : 'var(--surface-hover)',
                    color: theme === 'dark' ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: '600', fontSize: '0.875rem'
                  }}
                >
                  🌙 Dark Mode
                </button>
                <button
                  onClick={() => setTheme('light')}
                  style={{
                    padding: '1rem 2rem', borderRadius: '12px', cursor: 'pointer',
                    border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                    background: theme === 'light' ? 'var(--primary-glow)' : 'var(--surface-hover)',
                    color: theme === 'light' ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: '600', fontSize: '0.875rem'
                  }}
                >
                  ☀️ Light Mode
                </button>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Privacy Settings</h3>
              {[
                { label: 'Public Profile', desc: 'Allow recruiters to find your profile' },
                { label: 'Show Online Status', desc: 'Let others see when you are active' },
                { label: 'Data Analytics', desc: 'Help improve the platform with usage data' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--surface-border)' }}>
                  <div>
                    <p style={{ fontWeight: '500', margin: 0 }}>{item.label}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{item.desc}</p>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', inset: 0, background: 'var(--primary)', borderRadius: '24px', transition: '0.2s' }} />
                  </label>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;