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
      setUser(session?.user ?? null);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon">J</span>
          <span className="nav-logo-text">Job<span>Stream</span></span>
        </Link>

        {/* Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/"         className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/jobs"     className={({ isActive }) => isActive ? 'active' : ''}>Jobs</NavLink></li>
          <li><NavLink to="/prep"     className={({ isActive }) => isActive ? 'active' : ''}>Preparation</NavLink></li>
          <li><NavLink to="/companies"className={({ isActive }) => isActive ? 'active' : ''}>Companies</NavLink></li>
          <li><NavLink to="/dsa"      className={({ isActive }) => isActive ? 'active' : ''}>DSA Prep</NavLink></li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {user ? (
            <button className="nav-btn-ghost" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="nav-btn-ghost" onClick={() => navigate('/login')}>Sign in</button>
              <button className="nav-btn-solid" onClick={() => navigate('/register')}>Get Started</button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;