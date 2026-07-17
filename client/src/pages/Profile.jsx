import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LogOut, Settings, Award, MapPin, Activity, X, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import reportsData from '../data/reports.json';
import { getTier, getNextTier, getProgressToNextTier, BADGES } from '../data/gamification';

const Profile = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showReports, setShowReports] = useState(false);

  if (!user) return null;

  const userReports = reportsData.filter(r => r.userId === user.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDownloadReports = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`Reports by ${user.name}`, 14, 22);
    
    const tableData = userReports.map(r => [
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

    doc.save(`${user.name.replace(' ', '_')}_Reports.pdf`);
  };

  const currentTier = getTier(user.ecoPoints);
  const nextTier = getNextTier(user.ecoPoints);
  const progress = getProgressToNextTier(user.ecoPoints);

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>{t('profile')}</h1>
        <button className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Settings size={20} />
        </button>
      </div>

      {/* User Info Card */}
      <div className="glass-card" style={{ marginBottom: '2rem', textAlign: 'center', paddingTop: '2.5rem', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '-2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          color: 'white',
          fontWeight: 700,
          boxShadow: 'var(--shadow-glow)',
          border: '4px solid var(--color-bg)'
        }}>
          {user.name.charAt(0)}
        </div>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          <MapPin size={14} /> {user.village} • {t(`roles.${user.role}`)}
        </div>

        {/* Tier Progress */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{currentTier.badge}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: currentTier.color }}>{currentTier.name}</div>
                <div className="text-secondary text-xs">{user.ecoPoints} {t('ecoPoints')}</div>
              </div>
            </div>
            
            {nextTier && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{nextTier.name}</div>
                  <div className="text-xs">{nextTier.minPoints}</div>
                </div>
                <span style={{ fontSize: '1.25rem' }}>{nextTier.badge}</span>
              </div>
            )}
          </div>

          {nextTier && (
            <div style={{ width: '100%', height: '6px', background: 'var(--color-surface)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: currentTier.color, borderRadius: '3px' }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => setShowReports(true)}>
          <Activity size={24} color="var(--color-primary-light)" style={{ margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{userReports.length || user.reportsSubmitted}</div>
          <div className="text-secondary text-xs">Reports</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
          <Award size={24} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.badges.length}</div>
          <div className="text-secondary text-xs">Badges Earned</div>
        </div>
      </div>

      {/* Badge Gallery */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t('myBadges')}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {BADGES.map(badge => {
            const isEarned = user.badges.includes(badge.name);
            return (
              <div key={badge.id} style={{ 
                textAlign: 'center', 
                opacity: isEarned ? 1 : 0.3,
                filter: isEarned ? 'none' : 'grayscale(1)',
                cursor: 'pointer'
              }} onClick={() => setSelectedBadge({ ...badge, isEarned })}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: isEarned ? 'var(--color-surface)' : 'transparent',
                  border: isEarned ? '1px solid var(--color-border)' : '1px dashed var(--color-text-muted)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', margin: '0 auto 0.5rem'
                }}>
                  {badge.icon}
                </div>
                <div style={{ fontSize: '0.65rem', lineHeight: 1.2, fontWeight: 500 }}>{badge.name}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Badge Modal */}
      {selectedBadge && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedBadge(null)}>
          <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedBadge(null)}><X /></button>
            </div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: selectedBadge.isEarned ? 1 : 0.5 }}>{selectedBadge.icon}</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{selectedBadge.name}</h2>
            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: selectedBadge.isEarned ? 'rgba(76, 175, 130, 0.2)' : 'rgba(255,255,255,0.1)', color: selectedBadge.isEarned ? 'var(--color-success)' : 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
              {selectedBadge.isEarned ? 'Earned' : 'Locked'}
            </div>
            <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
              {selectedBadge.name === 'First Report' ? 'Submit your very first report to earn this badge.' :
               selectedBadge.name === 'Water Guardian' ? 'Submit 5 valid reports to become a Water Guardian.' :
               selectedBadge.name === 'Eco Warrior' ? 'Participate in a cleaning drive.' : 'Keep contributing to Kalyani Care to unlock this badge!'}
            </p>
          </div>
        </div>
      )}

      {/* Reports Modal */}
      {showReports && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,22,40,0.95)', zIndex: 100, overflowY: 'auto', padding: '2rem' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex-between animate-slide-up" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>My Reports</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={handleDownloadReports}>
                  <Download size={18} /> Download PDF
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => setShowReports(false)}>
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userReports.length > 0 ? userReports.map(report => (
                <div key={report.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem' }}>{report.type.toUpperCase()}</h3>
                    <p className="text-secondary text-sm">{report.location}</p>
                    <p className="text-xs text-muted">{new Date(report.timestamp).toLocaleString()}</p>
                  </div>
                  <div style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: report.status === 'resolved' ? 'rgba(76, 175, 130, 0.2)' : 'rgba(245, 166, 35, 0.2)', color: report.status === 'resolved' ? 'var(--color-success)' : 'var(--color-warning)', fontSize: '0.875rem', fontWeight: 600 }}>
                    {report.status}
                  </div>
                </div>
              )) : (
                <div className="text-center text-muted" style={{ padding: '3rem 0' }}>No reports submitted yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
