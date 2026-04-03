import React from 'react';
import { 
  FileText, 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code,
  Layout,
  Star,
  Zap
} from 'lucide-react';

const ResumeBuilder = () => {
  return (
    <div className="resume-builder container" style={{ paddingBottom: '4rem' }}>
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">ATS-Ready Resume Builder</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '1rem auto' }}>
          Create a professional tech resume that gets you through the screening process. Choose from top templates designed for engineers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
        <div className="resume-templates glass" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Layout size={24} /> Recommended Templates
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <div className="template-card glass" style={{ padding: '1rem', border: '2px solid var(--primary)' }}>
              <div style={{ background: '#2d3748', height: '240px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={60} style={{ opacity: 0.3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>The Minimalist</h4>
                <Star size={18} fill="var(--accent)" stroke="var(--accent)" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Perfect for SDE roles and freshers.</p>
            </div>

            <div className="template-card glass" style={{ padding: '1rem' }}>
              <div style={{ background: '#2d3748', height: '240px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={60} style={{ opacity: 0.3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Modern Engineer</h4>
                <Zap size={18} fill="var(--secondary)" stroke="var(--secondary)" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Great for data scientists and leads.</p>
            </div>
          </div>
        </div>

        <aside className="resume-steps glass" style={{ padding: '2rem', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '2rem' }}>Quick Steps</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>1</div>
              <div>
                <h4 style={{ fontSize: '1rem' }}>Import Information</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sync your LinkedIn or Github profiles.</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>2</div>
              <div>
                <h4 style={{ fontSize: '1rem' }}>Choose Template</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select from over 50+ professional designs.</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>3</div>
              <div>
                <h4 style={{ fontSize: '1rem' }}>Expert Review</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Get AI-driven feedback to improve ATS score.</p>
              </div>
            </li>
          </ul>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '3rem' }}>
            Build My Resume <Download size={18} style={{ marginLeft: '10px' }} />
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ResumeBuilder;
