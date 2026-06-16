import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function TrendingRoles({ apiUrl }) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${apiUrl}/api/trending-roles`)
      .then(res => setRoles(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  if (loading) return <div className="text-slate-400">Loading trending roles...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="text-red-500" size={32} /> Top 5 Trending Roles
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roles}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="role" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
            <Bar dataKey="search_count" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{role.role}</h3>
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                #{idx + 1}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">Search Volume</p>
                <p className="text-2xl font-bold text-blue-400">{role.search_count.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-slate-400 text-sm">Growth Rate</p>
                <p className="text-xl font-bold text-green-400">↑ {role.growth_percentage}%</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Average Salary</p>
                <p className="text-xl font-bold text-yellow-400">₹{(role.avg_salary / 100000).toFixed(1)}L+</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Top Companies Hiring</p>
                <div className="flex flex-wrap gap-2">
                  {role.top_companies.map((company, i) => (
                    <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3">💡 Market Insight</h3>
        <p className="text-slate-300">
          Full Stack Engineers and Data Scientists are showing the highest growth, with a 35% increase in job postings over the last 30 days. Python developers remain in constant high demand with an average salary of ₹12L+.
        </p>
      </div>
    </div>
  );
}
