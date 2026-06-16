import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function SearchAnalytics({ apiUrl }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${apiUrl}/api/search-analytics`)
      .then(res => setAnalytics(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  if (loading) return <div className="text-slate-400">Loading analytics...</div>;
  if (!analytics) return null;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">🔍 Total Job Searches</h3>
          <p className="text-4xl font-bold text-blue-400">{analytics.total_searches.toLocaleString()}</p>
          <p className="text-slate-400 text-sm mt-2">searches in the last 30 days</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">🔥 Trending Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {analytics.trending_keywords.map((keyword, idx) => (
              <span key={idx} className="bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm">
                #{idx + 1} {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">📍 Top Locations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.top_locations}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="location" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
            <Bar dataKey="searches" fill="#06B6D4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">💼 Most Searched Roles</h3>
        <div className="space-y-3">
          {analytics.top_roles.map((role, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-slate-300">{idx + 1}. {role.role}</span>
              <div className="flex items-center gap-3">
                <div className="w-48 bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(role.searches / Math.max(...analytics.top_roles.map(r => r.searches))) * 100}%` }}
                  ></div>
                </div>
                <span className="text-blue-400 font-bold w-20 text-right">{role.searches.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
