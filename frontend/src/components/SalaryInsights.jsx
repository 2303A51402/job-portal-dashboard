import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function SalaryInsights({ apiUrl }) {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/salary-insights`)
      .then(res => setInsights(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  if (loading) return <div className="text-slate-400">Loading salary data...</div>;

  const roles = [...new Set(insights.map(i => i.role))];
  const selectedRoleData = selectedRole ? insights.filter(i => i.role === selectedRole) : insights.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">💰 Salary By Experience Level</h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {roles.slice(0, 4).map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedRole === role
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={selectedRoleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="experience_level" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
            <Legend />
            <Bar dataKey="salary_min" fill="#06B6D4" />
            <Bar dataKey="avg_salary" fill="#10B981" />
            <Bar dataKey="salary_max" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedRoleData.slice(0, 4).map((item, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">{item.experience_level}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Min Salary:</span>
                <span className="text-cyan-400 font-bold">₹{(item.salary_min/100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg Salary:</span>
                <span className="text-green-400 font-bold">₹{(item.avg_salary/100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Max Salary:</span>
                <span className="text-yellow-400 font-bold">₹{(item.salary_max/100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="text-slate-400">Market Demand:</span>
                <span className="text-red-400 font-bold">{item.market_demand}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
