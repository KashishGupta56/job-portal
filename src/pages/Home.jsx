import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, BookOpen, Building2, Code2,
  TrendingUp, ArrowRight, Sparkles, Users,
  BarChart3, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="container hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Elevate Your Career Path
          </div>

          <h1 className="hero-title">
            Your Future Starts<br />
            <span className="hero-title-accent">With Preparation.</span>
          </h1>

          <p className="hero-desc">
            A comprehensive job portal and interview preparation platform
            designed to help you land your dream tech role.
          </p>

          <div className="hero-actions">
            <Link to="/jobs" className="btn-cta btn-cta-primary">
              <Briefcase size={18} />
              Browse Jobs
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <Link to="/prep" className="btn-cta btn-cta-outline">
              <BookOpen size={18} />
              Start Preparation
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">10k+</span>
              <span className="hero-stat-label">Jobs Listed</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">50+</span>
              <span className="hero-stat-label">Top Companies</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">200+</span>
              <span className="hero-stat-label">DSA Problems</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">5k+</span>
              <span className="hero-stat-label">Success Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section container">
        <div className="section-header">
          <span className="section-eyebrow">Everything you need</span>
          <h2 className="section-heading">Tools to Help You Succeed</h2>
          <p className="section-sub">
            From job discovery to interview mastery — all in one place.
          </p>
        </div>

        <div className="features-grid">
          <Link to="/prep" className="feature-card">
            <div className="feature-icon icon-purple">
              <TrendingUp size={22} />
            </div>
            <h3 className="feature-title">Preparation Modules</h3>
            <p className="feature-desc">
              Master Aptitude, DSA, Technical, and HR rounds with curated
              notes and practice problems.
            </p>
            <span className="feature-link">
              Explore <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/companies" className="feature-card">
            <div className="feature-icon icon-teal">
              <Building2 size={22} />
            </div>
            <h3 className="feature-title">Hiring Process</h3>
            <p className="feature-desc">
              Detailed insights into exam patterns, syllabus, and eligibility
              for top tech companies.
            </p>
            <span className="feature-link">
              Explore <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/dsa" className="feature-card">
            <div className="feature-icon icon-amber">
              <Code2 size={22} />
            </div>
            <h3 className="feature-title">The DSA Sheet</h3>
            <p className="feature-desc">
              A dedicated topic-wise prep sheet from basics to advanced.
              Track your progress daily.
            </p>
            <span className="feature-link">
              Explore <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/jobs" className="feature-card">
            <div className="feature-icon icon-blue">
              <Briefcase size={22} />
            </div>
            <h3 className="feature-title">Job Portal</h3>
            <p className="feature-desc">
              Direct access to thousands of listings from top-tier companies.
              Tailored recommendations.
            </p>
            <span className="feature-link">
              Explore <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* ── WHY JOBSTREAM ── */}
      <section className="why-section">
        <div className="container why-inner">
          <div className="why-text">
            <span className="section-eyebrow">Why JobStream Pro?</span>
            <h2 className="section-heading" style={{ textAlign: 'left', maxWidth: '420px' }}>
              Built for serious job seekers
            </h2>
            <p className="section-sub" style={{ textAlign: 'left', maxWidth: '400px' }}>
              We combine job discovery with deep preparation tools so you
              don't just apply — you get hired.
            </p>
            <ul className="why-list">
              {[
                'Company-specific preparation guides',
                'Real interview questions from top firms',
                'Progress tracking across all modules',
                'Daily DSA streaks and reminders',
              ].map((item) => (
                <li key={item} className="why-item">
                  <CheckCircle2 size={16} className="why-check" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/prep" className="btn-cta btn-cta-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>

          <div className="why-cards">
            <div className="why-metric-card">
              <BarChart3 size={26} style={{ color: 'var(--primary)' }} />
              <div className="why-metric-num">94%</div>
              <div className="why-metric-label">Interview success rate among prepared users</div>
            </div>
            <div className="why-metric-card why-metric-accent">
              <Users size={26} style={{ color: 'var(--secondary)' }} />
              <div className="why-metric-num">5k+</div>
              <div className="why-metric-label">Developers landed their dream job this year</div>
            </div>
            <div className="why-metric-card">
              <Sparkles size={26} style={{ color: 'var(--accent)' }} />
              <div className="why-metric-num">200+</div>
              <div className="why-metric-label">Curated DSA problems, company-wise</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section container">
        <div className="cta-inner glass">
          <div className="cta-glow" />
          <h2 className="cta-title">Ready to Land Your Dream Job?</h2>
          <p className="cta-sub">
            Join thousands of tech professionals who've accelerated their
            careers with JobStream Pro.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/jobs" className="btn-cta btn-cta-primary">
              <Briefcase size={18} /> Browse Jobs <ArrowRight size={16} />
            </Link>
            <Link to="/prep" className="btn-cta btn-cta-outline">
              <BookOpen size={18} /> Start Preparing
            </Link>
          </div>
        </div>
      </section>

      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <Footer />
    </div>
  );
};

export default Home;