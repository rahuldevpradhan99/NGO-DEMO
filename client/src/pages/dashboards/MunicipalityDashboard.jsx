import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Activity, ShieldAlert, CheckCircle2, FileWarning, Download } from 'lucide-react';
import pondsData from '../../data/ponds.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MunicipalityDashboard = () => {
  const { t } = useLanguage();
  
  // Sort ponds by lowest health index
  const criticalPonds = [...pondsData].sort((a, b) => a.healthIndex - b.healthIndex).slice(0, 3);

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('BBMP Water Division Report', 14, 22);
    
    doc.setFontSize(14);
    doc.text('Critical Action Required', 14, 35);
    
    const tableData = criticalPonds.map(p => [p.name, p.village, p.healthIndex.toString(), p.reportsCount.toString()]);
    
    doc.autoTable({
      startY: 40,
      head: [['Lake Name', 'Location', 'Health Index', 'Active Reports']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [233, 30, 99] }
    });

    doc.save('BBMP_Water_Report.pdf');
  };

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>BBMP Water Division</h1>
          <p className="text-secondary text-sm">Official Control Panel</p>
        </div>
        <button 
          className="btn btn-secondary" 
          style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
          onClick={handleDownloadReport}
        >
          <Download size={20} color="var(--color-primary-light)" />
        </button>
      </div>

      {/* Action required alerts */}
      <div style={{ background: 'rgba(233, 30, 99, 0.1)', borderLeft: '4px solid var(--color-danger)', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <ShieldAlert color="var(--color-danger)" />
        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-danger)', marginBottom: '0.25rem' }}>Critical Action Required</h3>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Bellandur Kere pollution index has exceeded threshold (92). Immediate dispatch needed.</p>
        </div>
      </div>

      {/* Fleet & Workforce */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Active Workers</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>42<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/50</span></div>
        </div>
        <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Dispatched Vehicles</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>12<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/15</span></div>
        </div>
      </div>

      {/* Critical Ponds List */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Critical Water Bodies</h2>
          <span className="text-primary-light text-sm" style={{ cursor: 'pointer' }}>View Map</span>
        </div>
        
        {criticalPonds.map(pond => (
          <div key={pond.id} className="glass-panel" style={{ padding: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: 'rgba(233, 30, 99, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <Activity color="var(--color-danger)" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{pond.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 600 }}>Health: {pond.healthIndex}</span>
              </div>
              <p className="text-secondary text-xs">{pond.village} • {pond.reportsCount} active reports</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Approvals */}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Pending Approvals</h2>
        
        <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
          <FileWarning color="var(--color-warning)" size={24} style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Fund Release: Agara Cleanup</h3>
            <p className="text-secondary text-xs" style={{ marginBottom: '1rem' }}>Requested by GreenRoots Foundation. Amount: ₹25,000.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary" style={{ padding: '0.375rem 1rem', fontSize: '0.75rem' }}>Approve</button>
              <button className="btn btn-secondary" style={{ padding: '0.375rem 1rem', fontSize: '0.75rem' }}>Review Details</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MunicipalityDashboard;
