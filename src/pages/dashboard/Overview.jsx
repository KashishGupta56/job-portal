import React, { useState, useEffect } from 'react';
import { 
  Briefcase, BookOpen, Code2, ArrowUpRight, 
  TrendingUp, Award, Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const { appliedJobs, dsaProgress } = useApp();
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single()
        
        setUser({ 
          ...session.user, 
          full_name: profile?.full_name || null
        })
      }

      const { data: jobsData } = await supabase
        .from('jobs')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false })
      
      if (jobsData) setJobs(jobsData)
    }
    fetchData()
  }, [])

  const stats = [
    { title: 'Jobs Applied', value: appliedJobs.length, icon: <Briefcase />, color: '#6366f1' },
    { title: 'Course Progress', value: '45%', icon: <BookOpen />, color: '#a855f7' },
    { title: 'DSA Problems', value: Object.keys(dsaProgress).length, icon: <Code2 />, color: '#22d3ee' },
    { title: 'Leaderboard', value: '#12', icon: <Award />, color: '#10b981' },
  ];

  return (
    <div className="overview-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
            Good Afternoon, {user?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your placements today.</p>
        </div>
        <button className="btn btn-primary" style={{ position: 'relative', zIndex: 1 }}>
          <TrendingUp size={18} /> Resume Journey
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '12px', 
              background: `${stat.color}15`, color: stat.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{stat.title}</p>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="recent-apps glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem' }}>Recommended Jobs</h3>
            <span 
              onClick={() => navigate('/jobs')}
              style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
            >
              View All
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Abhi koi job nahi hai
              </p>
            ) : (
              jobs.map((job, idx) => (
                <div key={idx} style={{ 
                  padding: '1.2rem', borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.03)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: '1px solid var(--surface-border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ 
                      width: '40px', height: '40px', background: 'var(--primary-glow)', 
                      borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 'bold', fontSize: '1.1rem'
                    }}>
                      {job.company?.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', margin: 0 }}>{job.title} - {job.company}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                        {job.location} • {job.salary}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight 
                    size={20} 
                    style={{ color: 'var(--text-muted)', cursor: 'pointer' }} 
                    onClick={() => navigate('/jobs')}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="prep-progress glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
            Daily Streak <Zap size={20} style={{ color: '#fbbf24', marginLeft: '0.5rem' }} />
          </h3>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h1 style={{ fontSize: '4rem', color: '#fbbf24', margin: 0 }}>12</h1>
            <p style={{ color: 'var(--text-muted)' }}>Days in a row!</p>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              <span>DSA Challenges</span>
              <span style={{ color: 'var(--primary)' }}>8/15</span>
            </div>
            <div className="progress-bar" style={{ height: '8px' }}>
              <div className="progress-fill" style={{ width: '53%' }}></div>
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              <span>Technical Notes</span>
              <span style={{ color: 'var(--accent)' }}>3/10</span>
            </div>
            <div className="progress-bar" style={{ height: '8px' }}>
              <div className="progress-fill" style={{ width: '30%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;import React, { useState, useEffect } from 'react';
import { 
  Briefcase, BookOpen, Code2, ArrowUpRight, 
  TrendingUp, Award, Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const { appliedJobs, dsaProgress } = useApp();
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single()
        
        setUser({ 
          ...session.user, 
          full_name: profile?.full_name || null
        })
      }

      const { data: jobsData } = await supabase
        .from('jobs')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false })
      
      if (jobsData) setJobs(jobsData)
    }
    fetchData()
  }, [])

  const stats = [
    { title: 'Jobs Applied', value: appliedJobs.length, icon: <Briefcase />, color: '#6366f1' },
    { title: 'Course Progress', value: '45%', icon: <BookOpen />, color: '#a855f7' },
    { title: 'DSA Problems', value: Object.keys(dsaProgress).length, icon: <Code2 />, color: '#22d3ee' },
    { title: 'Leaderboard', value: '#12', icon: <Award />, color: '#10b981' },
  ];

  return (
    <div className="overview-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
            Good Afternoon, {user?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your placements today.</p>
        </div>
        <button className="btn btn-primary" style={{ position: 'relative', zIndex: 1 }}>
          <TrendingUp size={18} /> Resume Journey
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '12px', 
              background: `${stat.color}15`, color: stat.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{stat.title}</p>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="recent-apps glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem' }}>Recommended Jobs</h3>
            <span 
              onClick={() => navigate('/jobs')}
              style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
            >
              View All
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                Abhi koi job nahi hai
              </p>
            ) : (
              jobs.map((job, idx) => (
                <div key={idx} style={{ 
                  padding: '1.2rem', borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.03)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: '1px solid var(--surface-border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ 
                      width: '40px', height: '40px', background: 'var(--primary-glow)', 
                      borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 'bold', fontSize: '1.1rem'
                    }}>
                      {job.company?.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', margin: 0 }}>{job.title} - {job.company}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                        {job.location} • {job.salary}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight 
                    size={20} 
                    style={{ color: 'var(--text-muted)', cursor: 'pointer' }} 
                    onClick={() => navigate('/jobs')}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="prep-progress glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
            Daily Streak <Zap size={20} style={{ color: '#fbbf24', marginLeft: '0.5rem' }} />
          </h3>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h1 style={{ fontSize: '4rem', color: '#fbbf24', margin: 0 }}>12</h1>
            <p style={{ color: 'var(--text-muted)' }}>Days in a row!</p>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              <span>DSA Challenges</span>
              <span style={{ color: 'var(--primary)' }}>8/15</span>
            </div>
            <div className="progress-bar" style={{ height: '8px' }}>
              <div className="progress-fill" style={{ width: '53%' }}></div>
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
              <span>Technical Notes</span>
              <span style={{ color: 'var(--accent)' }}>3/10</span>
            </div>
            <div className="progress-bar" style={{ height: '8px' }}>
              <div className="progress-fill" style={{ width: '30%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview ; 