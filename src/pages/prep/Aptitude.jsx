import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle, ArrowRight, Clock, Star, Zap } from 'lucide-react';

const Aptitude = () => {
    const [activeSection, setActiveSection] = useState('Quant');
    
    const sections = ['Quant', 'Logical', 'Verbal'];
    
    const aptitudeData = {
        'Quant': [
            { id: 1, title: 'Number Systems', examples: 5, status: 'Completed' },
            { id: 2, title: 'Permutations & Combinations', examples: 12, status: 'In Progress' },
            { id: 3, title: 'Probability', examples: 8, status: 'Pending' },
            { id: 4, title: 'Time, Speed & Distance', examples: 15, status: 'In Progress' }
        ],
        'Logical': [
            { id: 1, title: 'Coding-Decoding', examples: 4, status: 'Completed' },
            { id: 2, title: 'Blood Relations', examples: 6, status: 'Completed' },
            { id: 3, title: 'Direction Sense', examples: 5, status: 'Pending' }
        ],
        'Verbal': [
            { id: 1, title: 'Reading Comprehension', examples: 3, status: 'In Progress' },
            { id: 2, title: 'Sentence Correction', examples: 10, status: 'Completed' }
        ]
    };

    return (
        <div className="aptitude-page">
            <div className="page-header" style={{ marginBottom: '3rem' }}>
                <h1 className="section-title">Aptitude Preparation</h1>
                <p style={{ color: 'var(--text-muted)' }}>Master Quantitative, Logical Reasoning, and Verbal Ability rounds.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                {sections.map(section => (
                    <button 
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`btn ${activeSection === section ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {section} Ability
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div className="topics-list glass" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.4rem' }}>{activeSection} Modules</h2>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{aptitudeData[activeSection].length} Topics Found</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {aptitudeData[activeSection].map(topic => (
                            <div key={topic.id} style={{ 
                                padding: '1.5rem', 
                                borderRadius: '12px', 
                                background: 'rgba(255,255,255,0.03)', 
                                border: '1px solid var(--surface-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{topic.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{topic.examples} Examples • Video + Practice</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <span className={`badge ${topic.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                                        {topic.status}
                                    </span>
                                    <button className="btn btn-outline" style={{ padding: '0.6rem' }}>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="daily-quiz glass" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: 'var(--primary-glow)', 
                        color: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Clock size={35} />
                    </div>
                    <h2>Daily Practice Quiz</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>Testing your {activeSection} skills with 10 questions in 15 minutes.</p>
                    
                    <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <Star size={20} style={{ color: '#fbbf24' }} fill="#fbbf24" />
                            <span style={{ fontWeight: '600' }}>Top Score: 9/10</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Zap size={20} style={{ color: '#22d3ee' }} fill="#22d3ee" />
                            <span style={{ fontWeight: '600' }}>Avg. Time: 8m 42s</span>
                        </div>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Start Quiz Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Aptitude;
