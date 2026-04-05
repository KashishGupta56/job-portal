import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Briefcase,
  Filter, DollarSign, Building2, Clock, Bookmark
} from 'lucide-react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [toast, setToast] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // User session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  // Fetch already applied jobs
  useEffect(() => {
    if (!user) return;
    const fetchApplied = async () => {
      const { data } = await supabase
        .from('applications')
        .select('job_id')
        .eq('user_id', user.id);
      if (data) setAppliedJobs(data.map(a => a.job_id));
    };
    fetchApplied();
  }, [user]);

  // Apply function
  const applyToJob = async (jobId) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (appliedJobs.includes(jobId)) {
      setToast({ type: 'warning', msg: 'You have already applied for this position.' });
      return;
    }

    const { error } = await supabase
      .from('applications')
      .insert({ job_id: jobId, user_id: user.id, status: 'pending' });

    if (!error) {
      setAppliedJobs([...appliedJobs, jobId]);
      setToast({ type: 'success', msg: 'Application submitted successfully! We\'ll be in touch soon.' });
    } else {
      setToast({ type: 'error', msg: 'Something went wrong. Please try again.' });
    }
  };

  const filteredJobs = jobs.filter(j =>
    j.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentJob = filteredJobs[selectedJob] ?? filteredJobs[0] ?? null;

  // Toast color helper
  const toastColors = {
    success: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', text: '#10b981' },
    warning: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#f59e0b' },
    error:   { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.35)',  text: '#ef4444' },
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)' }}>
      <Briefcase size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
      <p>Loading opportunities...</p>
    </div>
  );

  return (
    <div className="job-portal-container">

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          background: toastColors[toast.type].bg,
          border: `1px solid ${toastColors[toast.type].border}`,
          color: toastColors[toast.type].text,
          fontWeight: '500',
          fontSize: '0.9rem',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          animation: 'fadeDown 0.3s ease',
          maxWidth: '360px',
          lineHeight: '1.5'
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── LOGIN MODAL ── */}
      {showLoginPrompt && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              borderRadius: '18px',
              padding: '2.5rem',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              width: '60px', height: '60px', borderRadius: '14px',
              background: 'var(--primary-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
              border: '1px solid var(--primary)'
            }}>
              <Briefcase size={26} style={{ color: 'var(--primary)' }} />
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Login Required</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: '1.65' }}>
              Please log in to apply for this position and track your applications.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-outline"
                onClick={() => setShowLoginPrompt(false)}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => { setShowLoginPrompt(false); navigate('/login'); }}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SEARCH BAR ── */}
      <div className="search-shelf glass" style={{
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search by job title, company, or skills..."
            className="search-input"
            style={{ paddingLeft: '3rem', width: '100%', height: '48px' }}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setSelectedJob(0); }}
          />
        </div>
        <button className="btn btn-outline" style={{ height: '48px', gap: '8px' }}>
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* ── NO JOBS IN DB ── */}
      {jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <Briefcase size={52} style={{ marginBottom: '1.25rem', opacity: 0.25 }} />
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>No Positions Available</h3>
          <p style={{ fontSize: '0.9rem' }}>There are currently no job listings. Please check back later.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: '1.5rem',
          height: 'calc(100vh - 250px)'
        }}>

          {/* ── LEFT: JOB LIST ── */}
          <div className="glass" style={{ overflowY: 'auto', padding: '0.5rem', borderRadius: '16px' }}>

            {filteredJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                <Search size={36} style={{ marginBottom: '1rem', opacity: 0.25 }} />
                <h4 style={{ marginBottom: '0.4rem', color: 'var(--text-main)' }}>No Results Found</h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>
                  No jobs matched "<strong style={{ color: 'var(--text-main)' }}>{searchTerm}</strong>".<br />
                  Try a different keyword.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-outline"
                  style={{ marginTop: '1rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              filteredJobs.map((job, idx) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(idx)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--surface-border)',
                    background: selectedJob === idx ? 'var(--primary-glow)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      width: '44px', height: '44px',
                      background: 'var(--surface)',
                      borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '700', fontSize: '1.1rem',
                      border: '1px solid var(--surface-border)',
                      flexShrink: 0,
                      color: selectedJob === idx ? 'var(--primary)' : 'var(--text-main)'
                    }}>
                      {job.company?.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontSize: '0.95rem', marginBottom: '0.2rem',
                        color: selectedJob === idx ? 'var(--primary)' : 'var(--text-main)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {job.title}
                      </h4>
                      <p style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                        {job.company}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {job.location}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.72rem', color: 'var(--accent)',
                          background: 'rgba(34,211,238,0.08)',
                          padding: '2px 8px', borderRadius: '20px',
                          border: '1px solid rgba(34,211,238,0.2)'
                        }}>
                          {job.job_type}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── RIGHT: JOB DETAIL ── */}
          <div className="glass" style={{ overflowY: 'auto', padding: '2.5rem', borderRadius: '16px' }}>
            {currentJob ? (
              <>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{
                      width: '72px', height: '72px',
                      background: 'var(--surface)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem', fontWeight: '700',
                      border: '1px solid var(--surface-border)',
                      flexShrink: 0
                    }}>
                      {currentJob.company?.charAt(0)}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                        {currentJob.title}
                      </h2>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Building2 size={14} /> {currentJob.company}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={14} /> {currentJob.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={14} /> {currentJob.job_type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button style={{
                    background: 'transparent',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '8px', padding: '8px',
                    cursor: 'pointer', color: 'var(--text-muted)',
                    flexShrink: 0
                  }}>
                    <Bookmark size={18} />
                  </button>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500',
                    background: 'rgba(34,211,238,0.08)', color: 'var(--accent)',
                    border: '1px solid rgba(34,211,238,0.2)'
                  }}>{currentJob.job_type}</span>
                  <span style={{
                    padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500',
                    background: 'rgba(99,102,241,0.08)', color: 'var(--primary)',
                    border: '1px solid rgba(99,102,241,0.2)'
                  }}>{currentJob.location}</span>
                  {currentJob.salary && (
                    <span style={{
                      padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500',
                      background: 'rgba(168,85,247,0.08)', color: 'var(--secondary)',
                      border: '1px solid rgba(168,85,247,0.2)'
                    }}>{currentJob.salary}</span>
                  )}
                </div>

                {/* Apply Button */}
                <button
                  disabled={appliedJobs.includes(currentJob.id)}
                  onClick={() => applyToJob(currentJob.id)}
                  className="btn btn-primary"
                  style={{
                    width: '100%', justifyContent: 'center',
                    height: '50px', fontSize: '1rem', marginBottom: '2.5rem',
                    opacity: appliedJobs.includes(currentJob.id) ? 0.7 : 1,
                    cursor: appliedJobs.includes(currentJob.id) ? 'default' : 'pointer'
                  }}
                >
                  {appliedJobs.includes(currentJob.id) ? '✓ Application Submitted' : 'Apply Now'}
                </button>

                {/* About Role */}
                <section style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: '600' }}>
                    About This Role
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '0.93rem' }}>
                    {currentJob.description}
                  </p>
                </section>

                {/* Info Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px' }}>
                    <p style={{
                      fontSize: '0.72rem', color: 'var(--text-muted)',
                      marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em'
                    }}>
                      Compensation
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: '600', color: 'var(--accent)' }}>
                      <DollarSign size={17} /> {currentJob.salary}
                    </div>
                  </div>
                  <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px' }}>
                    <p style={{
                      fontSize: '0.72rem', color: 'var(--text-muted)',
                      marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em'
                    }}>
                      Employment Type
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: '600', color: 'var(--secondary)' }}>
                      <Briefcase size={17} /> {currentJob.job_type}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '8rem', color: 'var(--text-muted)' }}>
                <Briefcase size={52} style={{ marginBottom: '1.25rem', opacity: 0.2 }} />
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Select a Position</h3>
                <p style={{ fontSize: '0.9rem' }}>Choose a job from the list to view details and apply.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;