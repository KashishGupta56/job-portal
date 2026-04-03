import React from 'react';
import { 
  Building2, 
  Search, 
  CheckCircle, 
  ClipboardList, 
  MapPin, 
  Users,
  Star,
  BookOpen,
  Zap,
  LayoutDashboard
} from 'lucide-react';

const CompanyProcess = () => {
  const companies = [
    {
      id: 1,
      name: "Amazon",
      location: "Seattle & Worldwide",
      rating: "4.8",
      process: ["Online Assessment", "Technical Round 1", "Technical Round 2", "Bar Raiser", "HR Discussion"],
      pattern: "Total 4 rounds (Online + 3 Technical). Focus on Leadership Principles and Problem Solving.",
      syllabus: ["DSA", "System Design", "Operating Systems", "Networking"],
      eligibility: "60% or above in 10th, 12th, and Graduation (B.E/B.Tech, MCA, M.Tech)",
      package: "₹18 - ₹45 LPA"
    },
    {
      id: 2,
      name: "Flipkart",
      location: "Bangalore, India",
      rating: "4.5",
      process: ["Programming Round", "Technical Interview 1", "Machine Coding Round", "Hiring Manager Round"],
      pattern: "Emphasis on Machine Coding and System Design expertise.",
      syllabus: ["Problem Solving", "LLD (Low Level Design)", "OOPS Concepts"],
      eligibility: "B.Tech/M.Tech with strong algorithm knowledge.",
      package: "₹20 - ₹50 LPA"
    },
    {
        id: 3,
        name: "Google",
        location: "California & Worldwide",
        rating: "4.9",
        process: ["Phone Screen", "Multiple Coding Rounds", "Googliness & Leadership", "HR Round"],
        pattern: "Strict on Algorithm complexity and clean code practices.",
        syllabus: ["Advanced DSA", "Distributed Systems", "Scaling Techniques"],
        eligibility: "Degree in CS or related field; high problem-solving skills.",
        package: "₹30 - ₹60 LPA"
    }
  ];

  return (
    <div className="company-process-page container" style={{ paddingBottom: '4rem' }}>
      <div className="page-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="section-title">Hiring Process Insights</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '1.5rem auto' }}>
          Get detailed information on the recruitment process, syllabus, and eligibility criteria of the world's most desired tech companies.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <div className="search-bar glass" style={{ width: '400px', padding: '0.8rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Search size={22} style={{ color: 'var(--text-muted)' }} />
                <input 
                    type="text" 
                    placeholder="Search company..." 
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', width: '100%', outline: 'none' }} 
                />
            </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {companies.map(company => (
          <div key={company.id} className="company-details-card glass" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={40} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2.2rem' }}>{company.name}</h2>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> {company.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={18} fill="var(--accent)" stroke="var(--accent)" /> {company.rating}</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Typical Package</span>
                <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{company.package}</h3>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                  <Users size={20} /> Recruitment Rounds
                </h4>
                <div className="process-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {company.process.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                      <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                  <ClipboardList size={20} /> Exam Pattern & Syllabus
                </h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{company.pattern}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {company.syllabus.map((s, idx) => (
                    <span key={idx} style={{ padding: '0.3rem 0.8rem', background: 'var(--primary-glow)', borderRadius: '8px', border: '1px solid var(--primary)', fontSize: '0.8rem' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                  <CheckCircle size={20} /> Eligibility Criteria
                </h4>
                <p style={{ color: 'var(--text-muted)' }}>{company.eligibility}</p>
                <div style={{ marginTop: '2rem' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>View Full Profile <Zap size={18} style={{ marginLeft: '10px' }} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProcess;
