import React from 'react';
import { BookOpen, Code, Terminal, MessageCircle, ArrowRight, CheckCircle2, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Preparation = () => {
  const tracks = [
    {
      title: "Numerical Ability",
      icon: <BookOpen className="icon-gradient" size={40} />,
      description: "Master Quantitative and Logical Reasoning with 500+ curated problems.",
      path: "/prep/aptitude",
      modules: 12,
      completed: 8,
      accent: 'var(--primary)'
    },
    {
      title: "Data Structures & Algos",
      icon: <Code className="icon-gradient" size={40} />,
      description: "Master high-frequency interview questions and advanced algorithmic patterns.",
      path: "/dsa",
      modules: 45,
      completed: 12,
      accent: 'var(--accent)'
    },
    {
      title: "Core CS Engineering",
      icon: <Terminal className="icon-gradient" size={40} />,
      description: "OS, DBMS, Computer Networks, and OOPS interview-ready notes.",
      path: "/prep/technical",
      modules: 20,
      completed: 5,
      accent: 'var(--secondary)'
    },
    {
      title: "HR & Communications",
      icon: <MessageCircle className="icon-gradient" size={40} />,
      description: "Behavioral coaching, common HR questions, and interview strategy.",
      path: "/prep/hr",
      modules: 10,
      completed: 2,
      accent: '#fbbf24'
    }
  ];

  return (
    <div className="prep-tracks-page">
      <div className="page-header" style={{ marginBottom: '4rem' }}>
        <h1 className="section-title">Interview Readiness Center</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px' }}>
          Select a master track to begin your preparation. All materials are updated weekly to match the current trends in tech interviews.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
        {tracks.map((track, idx) => (
          <div key={idx} className="glass track-card" style={{ padding: '3rem', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '20px', background: `${track.accent}15`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                {track.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.6rem' }}>{track.title}</h2>
                    <span style={{ fontSize: '0.85rem', color: track.accent, fontWeight: '600' }}>{Math.round((track.completed / track.modules) * 100)}% DONE</span>
                </div>
                <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem', lineHeight: '1.6' }}>{track.description}</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="progress-bar" style={{ flex: 1, height: '8px' }}>
                        <div className="progress-fill" style={{ width: `${(track.completed / track.modules) * 100}%`, background: track.accent }}></div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} /> {track.completed} Modules</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Zap size={16} /> Fast Track</span>
                    </div>
                    <Link to={track.path} className="btn btn-primary">
                        Enter Track <ArrowRight size={18} />
                    </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="extra-resources glass" style={{ marginTop: '6rem', padding: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem' }}>Learning Resources</h2>
            <button className="btn btn-outline">Explore All Libs</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            <div className="resource-col">
                <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Top Practice Problems</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <li>Striver’s SDE Sheet - (Notes + 180 Problems)</li>
                    <li>Love Babbar 450 DSA - (Comprehensive Guide)</li>
                    <li>Blind 75 Curated Set - (High Frequency)</li>
                </ul>
            </div>
            <div className="resource-col">
                <h4 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>CS Concepts Compendium</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <li>DBMS SQL Query Practice - (Top 50 Queries)</li>
                    <li>OS Process Management - (Simplified Notes)</li>
                    <li>Networking Rapid Revision - (Exam Point)</li>
                </ul>
            </div>
            <div className="resource-col">
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>HR & Behavioral Rounds</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <li>STAR Method Guide - (Interview Strategy)</li>
                    <li>Top 20 HR Questions - (Handy Templates)</li>
                    <li>Resume Optimization Tips - (ATS Checker)</li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Preparation;
