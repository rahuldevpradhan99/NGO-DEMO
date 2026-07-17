import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Badge from '../../components/Badge/Badge';
import ReportCard from '../../components/ReportCard/ReportCard';
import { PlusCircle, MapPin, Award, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Mock data import
import reportsData from '../../data/reports.json';
import pondsData from '../../data/ponds.json';

const VillagerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Filter reports for this user
  const allMyReports = reportsData.filter(r => r.userId === user?.id || r.submittedBy === user?.id);
  const myReports = allMyReports.slice(0, 3);

  const nearbyPonds = pondsData.filter(p => p.status === 'critical').slice(0, 2);

  const handleDownloadReports = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`Reports by ${user?.name || 'User'}`, 14, 22);
    
    const tableData = allMyReports.map(r => [
      r.id, 
      r.type, 
      r.location, 
      new Date(r.timestamp).toLocaleDateString(), 
      r.status
    ]);

    doc.autoTable({
      startY: 35,
      head: [['Report ID', 'Type', 'Location', 'Date', 'Status']],
      body: tableData,
      theme: 'grid'
    });

    doc.save(`${user?.name?.replace(' ', '_') || 'Dashboard'}_Reports.pdf`);
  };

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      
      {/* Hero Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
          Hello, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-secondary text-sm">
          {user?.village}
        </p>
      </div>

      {/* Stats Card */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="text-secondary text-xs" style={{ marginBottom: '0.25rem' }}>{t('ecoPoints')}</p>
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-primary-light)' }}>
            {user?.ecoPoints}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Badge points={user?.ecoPoints || 0} size="lg" />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid-2">
        {/* Left Column: Reports */}
        <div>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>{t('myReports')}</h2>
              <button 
                onClick={handleDownloadReports} 
                style={{ padding: '0.25rem', color: 'var(--color-primary-light)', background: 'rgba(20, 189, 235, 0.1)', borderRadius: 'var(--radius-sm)' }}
                title="Download Reports"
              >
                <Download size={16} />
              </button>
            </div>
            <span className="text-primary-light text-sm" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              {t('viewAll')} ({allMyReports.length})
            </span>
          </div>
          
          {myReports.length > 0 ? (
            myReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))
          ) : (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p className="text-muted">{t('noData')}</p>
            </div>
          )}
        </div>

        {/* Right Column: Actions & Nearby */}
        <div>
          {/* Quick Actions */}
          <div style={{ marginBottom: '2.5rem' }}>
            <button 
              className="btn btn-primary btn-full"
              style={{ padding: '1rem', fontSize: '1.125rem' }}
              onClick={() => navigate('/report')}
            >
              <PlusCircle size={24} />
              {t('reportProblem')}
            </button>
          </div>

          {/* Nearby Ponds */}
          <div>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>{t('nearbyPonds')}</h2>
              <span className="text-primary-light text-sm" style={{ cursor: 'pointer' }} onClick={() => navigate('/map')}>
                {t('viewAll')}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {nearbyPonds.map((pond) => (
                <div key={pond.id} className="glass-panel hover:bg-surface-hover" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/map')}>
                  <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {pond.image ? (
                      <img src={pond.image} alt={pond.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <MapPin color="var(--color-primary-light)" />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{pond.name}</h3>
                    <p className="text-secondary text-xs" style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>{pond.status}</p>
                    <div style={{ width: '100%', height: '6px', background: 'var(--color-surface)', borderRadius: '3px' }}>
                      <div style={{ width: `${pond.pollutionIndex}%`, height: '100%', background: 'var(--color-warning)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VillagerDashboard;
