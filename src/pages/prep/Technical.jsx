import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Terminal, 
  Database, 
  Network, 
  Settings, 
  HelpCircle,
  FileText,
  Search,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const Technical = () => {
  const [activeTab, setActiveTab] = useState('OS');

  const technicalData = {
    'OS': {
      title: 'Operating Systems',
      icon: <Settings className="icon-gradient" />,
      topics: [
        { id: 1, title: 'Process vs Thread', type: 'Question', status: 'Completed' },
        { id: 2, title: 'Memory Management', type: 'Notes', status: 'In Progress' },
        { id: 3, title: 'Deadlock Handling', type: 'Interview', status: 'Pending' },
        { id: 4, title: 'CPU Scheduling', type: 'MCQs', status: 'Completed' }
      ]
    },
    'DBMS': {
      title: 'Database Management',
      icon: <Database className="icon-gradient" />,
      topics: [
        { id: 1, title: 'SQL Joins Explained', type: 'Notes', status: 'Completed' },
        { id: 2, title: 'Normalization Normal Forms', type: 'Notes', status: 'In Progress' },
        { id: 3, title: 'Indexing Techniques', type: 'Interview', status: 'Pending' }
      ]
    },
    'CN': {
      title: 'Computer Networks',
      icon: <Network className="icon-gradient" />,
      topics: [
        { id: 1, title: 'OSI Model Layers', type: 'Notes', status: 'Completed' },
        { id: 2, title: 'TCP vs UDP', type: 'Interview', status: 'Completed' },
        { id: 3, title: 'DNS Architecture', type: 'Question', status: 'Pending' }
      ]
    },
    'OOPS': {
      title: 'Object Oriented Programming',
      icon: <Terminal className="icon-gradient" />,
      topics: [
        { id: 1, title: 'Four Pillars of OOPS', type: 'Interview', status: 'Completed' },
        { id: 2, title: 'Polymorphism Types', type: 'Notes', status: 'In Progress' },
        { id: 3, title: 'Virtual Functions', type: 'Question', status: 'In Progress' }
      ]
    }
  };

  return (
    <div className="technical-prep-page">
      <div className="page-header" style={{ marginBottom: '3rem' }}>
        <h1 className="section-title">Technical Preparation</h1>
        <p style={{ color: 'var(--text-muted)' }}>Core CS Subjects: OS, DBMS, Networking, and OOPS interview notes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {Object.keys(technicalData).map(key => (
          <div 
            key={key} 
            onClick={() => setActiveTab(key)}
            className={`glass ${activeTab === key ? 'active-topic' : ''} prep-card`}
            style={{ 
              padding: '1.5rem', 
              cursor: 'pointer', 
              transition: '0.3s',
              textAlign: 'center',
              border: activeTab === key ? '1px solid var(--primary)' : '1px solid var(--glass-border)'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {technicalData[key].icon}
            </div>
            <h4 style={{ margin: 0 }}>{technicalData[key].title}</h4>
            <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {technicalData[key].topics.filter(t => t.status === 'Completed').length} / {technicalData[key].topics.length} Completed
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        <div className="topics-list-container glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>{technicalData[activeTab].title} Modules</h2>
            <div className="search-container" style={{ width: '250px' }}>
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search topics..." className="search-input" style={{ fontSize: '0.85rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {technicalData[activeTab].topics.map(topic => (
              <div key={topic.id} style={{ 
                padding: '1.5rem', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--surface-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="badge badge-success" style={{ padding: '0.4rem', borderRadius: '8px' }}>
                        {topic.type === 'Notes' ? <FileText size={18} /> : 
                         topic.type === 'Question' ? <HelpCircle size={18} /> : 
                         topic.type === 'Interview' ? <BookOpen size={18} /> : 
                         <CheckCircle2 size={18} />}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{topic.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Type: {topic.type}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span className={`badge ${topic.status === 'Completed' ? 'badge-success' : topic.status === 'In Progress' ? 'badge-warning' : 'badge-danger'}`}>
                        {topic.status}
                    </span>
                    <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                        <ArrowRight size={18} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="interview-insight glass" style={{ padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <HelpCircle size={24} style={{ color: 'var(--primary)' }} /> Quick Interview MCQ
            </h3>
            <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontWeight: '600', marginBottom: '1.5rem' }}>Which of the following is NOT a fundamental feature of Object-Oriented Programming (OOPS)?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {['Encapsulation', 'Polymorphism', 'Inheritance', 'Concurrency'].map((opt, i) => (
                        <div key={i} className="glass" style={{ padding: '1rem', fontSize: '0.9rem', cursor: 'pointer', transition: '0.2s' }}>
                            {opt}
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                View Master Interview Questions
            </button>
        </div>
      </div>
    </div>
  );
};

export default Technical;
