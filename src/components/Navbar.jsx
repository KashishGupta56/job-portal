import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { supabase } from '../supabase';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">JobStream</Link>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/jobs" className={({ isActive }) => isActive ? 'active' : ''}>Jobs</NavLink></li>
          <li><NavLink to="/prep" className={({ isActive }) => isActive ? 'active' : ''}>Preparation</NavLink></li>
          <li><NavLink to="/companies" className={({ isActive }) => isActive ? 'active' : ''}>Companies</NavLink></li>
          <li><NavLink to="/dsa" className={({ isActive }) => isActive ? 'active' : ''}>DSA Prep</NavLink></li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
          )}
        </div>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;