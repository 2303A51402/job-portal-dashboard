import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Briefcase, DollarSign, Target } from 'lucide-react';

export default function Dashboard({ apiUrl }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashRes, trendsRes] = await Promise.all([
          axios.get(`${apiUrl}/api/dashboard`),
          axios.get(`${apiUrl}/api/market-trends`)
        ]);
        setDashboardData(dashRes.data);
        setMarketTrends(trendsRes.data.trends || []);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  if (loading) return <div className="text-center py-12 text-slate-400">Loading dashboard...</div>;
  if (error) return <div className="text-center py-12 text-red-400">{error}</div>;
  if (!dashboardData) return null;

  const MetricCard = ({ icon: Icon, label, value, subtext, color }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value.toLocaleString()}</p>
          {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
        </div>
        <Icon className={`${color} opacity-20`} size={40} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard 
          icon={Briefcase} 
          label="Jobs Available" 
          value={dashboardData.total_jobs_available}
          color="text-blue-400"
        />
        <MetricCard 
          icon={TrendingUp} 
          label="New Today" 
          value={dashboardData.new_jobs_today}
          color="text-green-400"
        />
        <MetricCard 
          icon={DollarSign} 
          label="Avg Salary" 
          value={dashboardData.avg_salary_offered}
          color="text-yellow-400"
          subtext="₹ per annum"
        />
        <MetricCard 
          icon={Target} 
          label="Companies Hiring" 
          value={dashboardData.companies_actively_hiring}
          color="text-purple-400"
        />
        <MetricCard 
          icon={Users} 
          label="Active Seekers" 
          value={dashboardData.job_seekers_active}
          color="text-pink-400"
        />
      </div>

      {/* Market Trends Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">📈 30-Day Market Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Legend />
            <Line type="monotone" dataKey="total_jobs" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="avg_salary" stroke="#10B981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* New Jobs vs Salary Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">📊 Daily New Jobs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marketTrends.slice(-15)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
              <Bar dataKey="new_jobs" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">💼 Market Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Full-time Positions</span>
              <span className="text-blue-400 font-bold">65%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-slate-300">Contract/Freelance</span>
              <span className="text-purple-400 font-bold">20%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-slate-300">Part-time/Internship</span>
              <span className="text-pink-400 font-bold">15%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">🔍 Key Insights</h3>
        <ul className="space-y-2 text-slate-300">
          <li>✓ Job market shows 12% growth this month with {dashboardData.new_jobs_today} new positions daily</li>
          <li>✓ Average salary for mid-level roles: ₹{dashboardData.avg_salary_offered.toLocaleString()}</li>
          <li>✓ Bangalore dominates with 35% of all job listings</li>
          <li>✓ Python developers have highest demand (4,500+ active listings)</li>
          <li>✓ Remote positions account for 28% of total listings</li>
        </ul>
      </div>
    </div>
  );
}
