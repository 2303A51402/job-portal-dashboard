import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TrendingRoles from './components/TrendingRoles';
import SalaryInsights from './components/SalaryInsights';
import SearchAnalytics from './components/SearchAnalytics';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiHealth, setApiHealth] = useState('checking');

  useEffect(() => {
    // Check API health on mount
    axios.get(`${API_BASE_URL}/api/health`)
      .then(() => setApiHealth('healthy'))
      .catch(() => setApiHealth('error'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                📊 Job Market Analytics
              </h1>
              <p className="text-slate-400 text-sm mt-1">Real-time insights into job trends and salary data</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              apiHealth === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {apiHealth === 'healthy' ? '🟢 API Connected' : '🔴 API Error'}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: '📈 Dashboard', icon: '📊' },
              { id: 'trending', label: '🔥 Trending Roles', icon: '📈' },
              { id: 'salary', label: '💰 Salary Insights', icon: '💵' },
              { id: 'analytics', label: '📉 Search Analytics', icon: '🔍' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard apiUrl={API_BASE_URL} />}
        {activeTab === 'trending' && <TrendingRoles apiUrl={API_BASE_URL} />}
        {activeTab === 'salary' && <SalaryInsights apiUrl={API_BASE_URL} />}
        {activeTab === 'analytics' && <SearchAnalytics apiUrl={API_BASE_URL} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-slate-400 text-sm">
            <p>Job Portal Analytics Dashboard v1.0.0 | Built with React + FastAPI</p>
            <p className="mt-2">Tracks 10,000+ job listings | Updates hourly | Real-time market insights</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
