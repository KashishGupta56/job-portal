import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  BookOpen,
  Building2,
  CheckCircle,
  Code2,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-section container">
        <div className="hero-content">
          <span className="hero-subtitle">Elevate Your Career Path</span>
          <h1 className="hero-title">Your Future Starts <br /><span style={{color: 'var(--primary)'}}>With Preparation.</span></h1>
          <p style={{ maxWidth: '700px', margin: '1.5rem auto 3rem', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            A comprehensive job portal and interview preparation platform designed to help you land your dream tech role.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/jobs" className="btn btn-primary">
              <Briefcase size={20} /> Browse Jobs
            </Link>
            <Link to="/prep" className="btn btn-outline">
              <BookOpen size={20} /> Start Preparation
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Everything You Need To Succeed</h2>
        <div className="grid">
          <Link to="/prep" className="prep-card glass">
            <TrendingUp size={40} className="icon-gradient" />
            <h3>Preparation Modules</h3>
            <p>Master Aptitude, DSA, Technical, and HR rounds with curated notes and practice problems.</p>
          </Link>

          <Link to="/companies" className="prep-card glass">
            <Building2 size={40} className="icon-gradient" />
            <h3>Hiring Process</h3>
            <p>Detailed insights into exam patterns, syllabus, and eligibility for top tech companies.</p>
          </Link>

          <Link to="/dsa" className="prep-card glass">
            <Code2 size={40} className="icon-gradient" />
            <h3>The DSA Sheet</h3>
            <p>A dedicated topic-wise prep sheet from basics to advanced. Track your progress daily.</p>
          </Link>

          <Link to="/jobs" className="prep-card glass">
            <Briefcase size={40} className="icon-gradient" />
            <h3>Job Portal</h3>
            <p>Direct access to thousands of listings from top-tier companies. Tailored recommendations.</p>
          </Link>
        </div>
      </section>

      <section className="stats-section container glass" style={{ marginTop: '6rem', padding: '4rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: '3rem', color: 'var(--primary)' }}>50+</h2>
          <p style={{ color: 'var(--text-muted)' }}>Top Companies</p>
        </div>
        <div>
          <h2 style={{ fontSize: '3rem', color: 'var(--secondary)' }}>200+</h2>
          <p style={{ color: 'var(--text-muted)' }}>DSA Problems</p>
        </div>
        <div>
          <h2 style={{ fontSize: '3rem', color: 'var(--accent)' }}>10k+</h2>
          <p style={{ color: 'var(--text-muted)' }}>Jobs Listed</p>
        </div>
        <div>
          <h2 style={{ fontSize: '3rem', color: 'var(--primary)' }}>5k+</h2>
          <p style={{ color: 'var(--text-muted)' }}>Success Stories</p>
        </div>
      </section>

      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <Footer />
    </div>
  );
};

export default Home;