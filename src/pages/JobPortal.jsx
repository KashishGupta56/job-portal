import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Briefcase, Bookmark,
  Filter, DollarSign, Building2, Clock
} from 'lucide-react';
import { supabase } from '../supabase';

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

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

  const applyToJob = async (jobId) => {
    if (!user) {
      alert('Please log in to apply for this position.');
      return;
    }
    const { error } = await supabase
      .from('applications')
      .insert({ job_id: jobId, user_id: user.id, status: 'pending' });

    if (!error) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert('Application submitted successfully!');
    }
  };

  const filteredJobs = jobs.filter(j =>
    j.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentJob = filteredJobs[selectedJob] ?? filteredJobs[0] ?? null;

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
      <Briefcase size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
      <p>Loading opportunities...</p>
    </div>
  );

  return (
    <div className="job-portal-container">

      {/* Search Bar */}
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedJob(0);
            }}
          />
        </div>
        <button className="btn btn-outline" style={{ height: '48px', gap: '8px' }}>
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* No jobs in database */}
      {jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <Briefcase size={52} style={{ marginBottom: '1.25rem', opacity: 0.25 }} />
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>No Positions Available</h3>
          <p style={{ fontSize: '0.9rem' }}>There are currently no job listings. Please check back later.</p>
        </div>
      ) : (
        <div className="portal-split-view" style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: '1.5rem',
          height: 'calc(100vh - 250px)'
        }}>

          {/* Left: Job List */}
          <div className="jobs-sidebar-list glass" style={{ overflowY: 'auto', padding: '0.5rem' }}>

            {/* No search results */}
            {filteredJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                <Search size={36} style={{ marginBottom: '1rem', opacity: 0.25 }} />
                <h4 style={{ marginBottom: '0.4rem', color: 'var(--text-main)' }}>No Results Found</h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  No jobs matched "<strong>{searchTerm}</strong>".<br />
                  Try a different keyword or clear the search.
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem' }}>
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

          {/* Right: Job Detail */}
          <div className="job-detail-panel glass" style={{ overflowY: 'auto', padding: '2.5rem' }}>
            {currentJob ? (
              <>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{
                      width: '72px', height: '72px',
                      background: 'var(--surface)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem', fontWeight: '700',
                      border: '1px solid var(--surface-border)'
                    }}>
                      {currentJob.company?.charAt(0)}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                        {currentJob.title}
                      </h2>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Building2 size={14} /> {currentJob.company}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <MapPin size={14} /> {currentJob.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={14} /> {currentJob.job_type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button style={{
                    background: 'transparent', border: '1px solid var(--surface-border)',
                    borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'var(--text-muted)'
                  }}>
                    <Bookmark size={18} />
                  </button>
                </div>

                {/* Apply Button */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <button
                    disabled={appliedJobs.includes(currentJob.id)}
                    onClick={() => applyToJob(currentJob.id)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', height: '48px', fontSize: '1rem' }}
                  >
                    {appliedJobs.includes(currentJob.id) ? '✓ Application Submitted' : 'Apply Now'}
                  </button>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <section>
                    <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: '600' }}>
                      About This Role
                    </h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '0.93rem' }}>
                      {currentJob.description}
                    </p>
                  </section>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Compensation
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '600', color: 'var(--accent)' }}>
                        <DollarSign size={18} /> {currentJob.salary}
                      </div>
                    </div>
                    <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Employment Type
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '600', color: 'var(--secondary)' }}>
                        <Briefcase size={18} /> {currentJob.job_type}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '8rem', color: 'var(--text-muted)' }}>
                <Briefcase size={52} style={{ marginBottom: '1.25rem', opacity: 0.2 }} />
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Select a Position
                </h3>
                <p style={{ fontSize: '0.9rem' }}>
                  Choose a job from the list to view details and apply.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;