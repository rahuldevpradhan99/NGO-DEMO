import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Users, AlertTriangle, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const NGODashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const issueData = [
    { name: 'Garbage', value: 35 },
    { name: 'Plastic', value: 25 },
    { name: 'Sewage', value: 20 },
    { name: 'Dumping', value: 15 },
    { name: 'Other', value: 5 },
  ];
  const COLORS = ['#F5A623', '#E91E63', '#14BDEB', '#4CAF82', '#B0BEC5'];

  const monthlyData = [
    { name: 'Jan', reports: 40, resolved: 24 },
    { name: 'Feb', reports: 30, resolved: 13 },
    { name: 'Mar', reports: 55, resolved: 38 },
    { name: 'Apr', reports: 45, resolved: 43 },
    { name: 'May', reports: 60, resolved: 50 },
    { name: 'Jun', reports: 80, resolved: 65 },
  ];

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('NGO Analytics Report - Kalyani Care', 14, 22);
    
    doc.setFontSize(14);
    doc.text('Key Metrics', 14, 35);
    doc.setFontSize(10);
    doc.text('Total Reports: 248', 14, 45);
    doc.text('Resolved: 185 (74%)', 14, 52);
    doc.text('Active Volunteers: 1,204', 14, 59);

    doc.setFontSize(14);
    doc.text('Issue Breakdown', 14, 75);
    const issueTable = issueData.map(d => [d.name, `${d.value}%`]);
    doc.autoTable({
      startY: 80,
      head: [['Issue Type', 'Percentage']],
      body: issueTable,
      theme: 'grid'
    });

    doc.save('NGO_Analytics_Report.pdf');
  };

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Analytics Hub</h1>
          <p className="text-secondary text-sm">Karnataka Region Overview</p>
        </div>
        <button 
          className="btn btn-secondary" 
          style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
          onClick={handleDownloadReport}
        >
          <Download size={20} color="var(--color-primary-light)" />
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <AlertTriangle size={20} color="var(--color-danger)" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>248</div>
          <div className="text-secondary text-xs">Total Reports</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <Droplets size={20} color="var(--color-success)" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>185</div>
          <div className="text-secondary text-xs">Resolved (74%)</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <Users size={20} color="var(--color-primary-light)" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1,204</div>
          <div className="text-secondary text-xs">Active Volunteers</div>
        </div>
        <div 
          className="glass-panel" 
          style={{ padding: '1rem', background: 'linear-gradient(135deg, rgba(20, 189, 235, 0.1), rgba(13, 115, 119, 0.2))', border: '1px solid var(--color-primary-light)', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard/ngo/proposals')}
        >
          <h3 style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--color-primary-light)' }}>Sponsor a Pond</h3>
          <p className="text-xs" style={{ marginBottom: '0.5rem' }}>Fund a cleaning drive</p>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, textDecoration: 'underline' }}>View Proposals →</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-2" id="ngo-charts-container">
        <div className="glass-card" style={{ padding: '1.5rem 1rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Resolution Trend</h2>
          <div style={{ height: '200px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#fff', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#fff', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#0A1628', border: '1px solid #14BDEB' }} />
                <Bar dataKey="reports" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#14BDEB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem 1rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Issue Breakdown</h2>
          <div style={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={issueData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                  {issueData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: '50%', paddingLeft: '1rem' }}>
              {issueData.map((entry, index) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[index], marginRight: '0.5rem' }}></span>
                  <span className="text-secondary" style={{ flex: 1 }}>{entry.name}</span>
                  <span style={{ fontWeight: 600 }}>{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NGODashboard;
