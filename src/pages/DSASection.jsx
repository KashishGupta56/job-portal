import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Code2, 
  Star,
  Zap,
  BookOpen,
  HelpCircle,
  Clock,
  Layout,
  Filter,
  Search,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const DSASection = () => {
  const { dsaProgress, updateDsaProgress } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 'DP'];
  
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "50.2%", status: "Done", category: "Array", link: "https://leetcode.com/problems/two-sum/" },
    { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", acceptance: "54.3%", status: "Todo", category: "Array", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { id: 3, title: "Container With Most Water", difficulty: "Medium", acceptance: "54.1%", status: "Todo", category: "Array", link: "https://leetcode.com/problems/container-with-most-water/" },
    { id: 4, title: "Trapping Rain Water", difficulty: "Hard", acceptance: "59.3%", status: "Todo", category: "Array", link: "https://leetcode.com/problems/trapping-rain-water/" },
    { id: 5, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "35.2%", status: "Todo", category: "Array", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    { id: 6, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "33.8%", status: "Todo", category: "String", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { id: 7, title: "Valid Anagram", difficulty: "Easy", acceptance: "63.1%", status: "Todo", category: "String", link: "https://leetcode.com/problems/valid-anagram/" },
    { id: 8, title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: "32.4%", status: "Todo", category: "String", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { id: 9, title: "Add Two Numbers", difficulty: "Medium", acceptance: "40.1%", status: "Done", category: "Linked List", link: "https://leetcode.com/problems/add-two-numbers/" },
    { id: 10, title: "Reverse Linked List", difficulty: "Easy", acceptance: "73.2%", status: "Todo", category: "Linked List", link: "https://leetcode.com/problems/reverse-linked-list/" },
    { id: 11, title: "Merge Two Sorted Lists", difficulty: "Easy", acceptance: "62.5%", status: "Todo", category: "Linked List", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { id: 12, title: "Valid Parentheses", difficulty: "Easy", acceptance: "40.7%", status: "Todo", category: "Stack", link: "https://leetcode.com/problems/valid-parentheses/" },
    { id: 13, title: "Min Stack", difficulty: "Medium", acceptance: "52.3%", status: "Todo", category: "Stack", link: "https://leetcode.com/problems/min-stack/" },
    { id: 14, title: "Daily Temperatures", difficulty: "Medium", acceptance: "66.2%", status: "Todo", category: "Stack", link: "https://leetcode.com/problems/daily-temperatures/" },
    { id: 15, title: "Largest Rectangle in Histogram", difficulty: "Hard", acceptance: "43.1%", status: "Todo", category: "Stack", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    { id: 16, title: "Implement Queue using Stacks", difficulty: "Easy", acceptance: "62.1%", status: "Todo", category: "Queue", link: "https://leetcode.com/problems/implement-queue-using-stacks/" },
    { id: 17, title: "Number of Recent Calls", difficulty: "Easy", acceptance: "73.4%", status: "Todo", category: "Queue", link: "https://leetcode.com/problems/number-of-recent-calls/" },
    { id: 18, title: "Task Scheduler", difficulty: "Medium", acceptance: "57.8%", status: "Todo", category: "Queue", link: "https://leetcode.com/problems/task-scheduler/" },
    { id: 19, title: "Binary Tree Level Order Traversal", difficulty: "Medium", acceptance: "64.1%", status: "Done", category: "Tree", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { id: 20, title: "Maximum Depth of Binary Tree", difficulty: "Easy", acceptance: "73.9%", status: "Todo", category: "Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { id: 21, title: "Lowest Common Ancestor of BST", difficulty: "Medium", acceptance: "61.2%", status: "Todo", category: "Tree", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    { id: 22, title: "Number of Islands", difficulty: "Medium", acceptance: "57.4%", status: "Todo", category: "Graph", link: "https://leetcode.com/problems/number-of-islands/" },
    { id: 23, title: "Clone Graph", difficulty: "Medium", acceptance: "53.1%", status: "Todo", category: "Graph", link: "https://leetcode.com/problems/clone-graph/" },
    { id: 24, title: "Course Schedule", difficulty: "Medium", acceptance: "45.6%", status: "Todo", category: "Graph", link: "https://leetcode.com/problems/course-schedule/" },
    { id: 25, title: "Climbing Stairs", difficulty: "Easy", acceptance: "52.3%", status: "Done", category: "DP", link: "https://leetcode.com/problems/climbing-stairs/" },
    { id: 26, title: "Longest Common Subsequence", difficulty: "Medium", acceptance: "48.9%", status: "Todo", category: "DP", link: "https://leetcode.com/problems/longest-common-subsequence/" },
    { id: 27, title: "Coin Change", difficulty: "Medium", acceptance: "41.2%", status: "Todo", category: "DP", link: "https://leetcode.com/problems/coin-change/" },
    { id: 28, title: "Word Break", difficulty: "Medium", acceptance: "44.7%", status: "Todo", category: "DP", link: "https://leetcode.com/problems/word-break/" },
  ];

  const filteredProblems = activeCategory === 'All' ? problems : problems.filter(p => p.category === activeCategory);

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return '#00b8a3';
    if (diff === 'Medium') return '#ffb800';
    return '#ff375f';
  };

  return (
    <div className="dsa-leet-page">
      <div className="page-header" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="section-title">DSA Master Sheet</h1>
          <p style={{ color: 'var(--text-muted)' }}>The definitive roadmap to mastering algorithms, inspired by high-frequency interview patterns.</p>
        </div>
        <div className="stats-mini glass" style={{ padding: '1rem 2rem', display: 'flex', gap: '2rem', textAlign: 'center' }}>
            <div>
                <h4 style={{ margin: 0, color: '#00b8a3' }}>{problems.filter(p => p.difficulty === 'Easy').length}</h4>
                <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.6 }}>EASY</p>
            </div>
            <div>
                <h4 style={{ margin: 0, color: '#ffb800' }}>{problems.filter(p => p.difficulty === 'Medium').length}</h4>
                <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.6 }}>MEDIUM</p>
            </div>
            <div>
                <h4 style={{ margin: 0, color: '#ff375f' }}>{problems.filter(p => p.difficulty === 'Hard').length}</h4>
                <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.6 }}>HARD</p>
            </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="problem-table-container glass" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--surface-border)' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Problem Set</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filteredProblems.length} questions in {activeCategory}</span>
            </div>
            <div className="search-container" style={{ width: '250px' }}>
                <Search size={16} className="search-icon" />
                <input type="text" placeholder="Search problems..." className="search-input" style={{ fontSize: '0.85rem' }} />
            </div>
        </div>

        <div className="leet-table">
          <div className="table-header" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 150px 150px 100px', padding: '1.2rem 2rem', fontWeight: '500', color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--surface-border)' }}>
            <span>Status</span>
            <span>Title</span>
            <span>Difficulty</span>
            <span>Acceptance</span>
            <span>Link</span>
          </div>

          {filteredProblems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
              <Search size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <p>No problems found. Try adjusting your search term or category.</p>
            </div>
          ) : (
            filteredProblems.map((prob, idx) => (
              <div 
                key={prob.id} 
                className="table-row" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '80px 1fr 150px 150px 100px', 
                  padding: '1.2rem 2rem', 
                  alignItems: 'center',
                  borderBottom: '1px solid var(--surface-border)',
                  transition: '0.2s',
                  background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent'
                }}
              >
                <div>
                  <CheckCircle 
                      size={18} 
                      style={{ 
                          color: dsaProgress[prob.id] === 'Done' ? '#00b8a3' : 'var(--text-muted)', 
                          opacity: dsaProgress[prob.id] === 'Done' ? 1 : 0.3,
                          cursor: 'pointer'
                      }} 
                      onClick={() => updateDsaProgress(prob.id, dsaProgress[prob.id] === 'Done' ? 'Todo' : 'Done')}
                  />
                </div>
                <div style={{ fontWeight: '500' }}>{prob.id}. {prob.title}</div>
                <div style={{ color: getDifficultyColor(prob.difficulty), fontSize: '0.9rem', fontWeight: '600' }}>{prob.difficulty}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{prob.acceptance}</div>
                <div>
                  <a href={prob.link} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                      <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DSASection;