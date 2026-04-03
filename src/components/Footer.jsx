import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Code, ExternalLink, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo-desc">
            <Link to="/" className="logo">JobStream</Link>
            <p>Elevate your career with path-defining job opportunities and the most comprehensive interview preparation tools.</p>
            <div className="social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Globe size={20} />
              <ExternalLink size={20} />
              <Code size={20} />
              <Mail size={20} />
            </div>
          </div>

          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/jobs">Job Portal</Link></li>
              <li><Link to="/companies">Company Hiring</Link></li>
              <li><Link to="/prep">Interview Prep</Link></li>
              <li><Link to="/resume">Resume Builder</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/dsa">DSA Sheet</Link></li>
              <li><Link to="/aptitude">Aptitude Prep</Link></li>
              <li><Link to="/technical">Technical Notes</Link></li>
              <li><Link to="/hr">HR Interview</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 JobStream Pro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
