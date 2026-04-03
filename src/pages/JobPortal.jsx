import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Briefcase, Bookmark, Share2,
  Filter, DollarSign, Building2
} from 'lucide-react';
import { supabase } from '../supabase';

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // User check karo
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  // Jobs load karo Supabase se
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Error:', error)
      } else {
        setJobs(data)
      }
      setLoading(false)
    }
    fetchJobs()
  }, [])

  // Apply karo
  const applyToJob = async (jobId) => {
    if (!user) {
      alert('Pehle login karo!')
      return
    }
    const { error } = await supabase
      .from('applications')
      .insert({ job_id: jobId, user_id: user.id, status: 'pending' })

    if (!error) {
      setAppliedJobs([...appliedJobs, jobId])
      alert('Apply ho gaya! ✅')
    }
  }

  const filteredJobs = jobs.filter(j =>
    j.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentJob = filteredJobs[selectedJob] || filteredJobs[0]

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
      Loading jobs...
    </div>
  )

  return (
    <div className="job-portal-container">
      <div className="search-shelf glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by title, company, or skills..."
            className="search-input"
            style={{ paddingLeft: '3rem', width: '100%', height: '50px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline" style={{ height: '50px' }}><Filter size={18} /> Filters</button>
      </div>

      {jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <Briefcase size={50} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>Abhi koi job nahi hai</h3>
          <p>Pehli job add karo!</p>
        </div>
      ) : (
        <div className="portal-split-view" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1.5rem', height: 'calc(100vh - 250px)' }}>
          <div className="jobs-sidebar-list glass" style={{ overflowY: 'auto', padding: '0.5rem' }}>
            {filteredJobs.map((job, idx) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(idx)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--surface-border)',
                  background: selectedJob === idx ? 'var(--primary-glow)' : 'transparent',
                  transition: '0.2s'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{
                    width: '45px', height: '45px', background: 'var(--surface)', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                    border: '1px solid var(--surface-border)', fontSize: '1.2rem'
                  }}>
                    {job.company?.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem', color: selectedJob === idx ? 'var(--primary)' : 'inherit' }}>{job.title}</h4>
                    <p style={{ fontSize: '0.85rem', fontWeight: '500' }}>{job.company}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{job.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{job.job_type}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="job-detail-panel glass" style={{ overflowY: 'auto', padding: '2.5rem' }}>
            {currentJob ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--surface)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                      {currentJob.company?.charAt(0)}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{currentJob.title}</h2>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Building2 size={16} /> {currentJob.company}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16} /> {currentJob.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                  <button
                    disabled={appliedJobs.includes(currentJob.id)}
                    onClick={() => applyToJob(currentJob.id)}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {appliedJobs.includes(currentJob.id) ? '✅ Applied' : 'Apply Now'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <section>
                    <h3 style={{ marginBottom: '1rem' }}>About the Job</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{currentJob.description}</p>
                  </section>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '1.5rem' }}>
                      <h4 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Salary</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <DollarSign size={20} /> {currentJob.salary}
                      </div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem' }}>
                      <h4 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Job Type</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <Briefcase size={20} /> {currentJob.job_type}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '10rem' }}>
                <h3>Job select karo</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobPortal;