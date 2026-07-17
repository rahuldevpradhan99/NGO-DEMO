import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Badge from '../../components/Badge/Badge';
import ReportCard from '../../components/ReportCard/ReportCard';
import { MapPin, Camera, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import reportsData from '../../data/reports.json';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Tasks assigned to volunteers (status: In Progress)
  const assignedTasks = reportsData.filter(r => r.status === 'In Progress');

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
          Hello, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-secondary text-sm">
          {user?.village} Volunteer
        </p>
      </div>

      {/* Gamification Stats */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div>
            <p className="text-secondary text-xs" style={{ marginBottom: '0.25rem' }}>{t('ecoPoints')}</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-primary-light)' }}>
              {user?.ecoPoints}
            </div>
          </div>
          <div>
            <p className="text-secondary text-xs" style={{ marginBottom: '0.25rem' }}>Drives</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-success)' }}>
              {user?.cleaningDrives || 8}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Badge points={user?.ecoPoints || 1200} size="md" />
          </div>
        </div>
      </div>

      {/* Assigned Tasks */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t('assignedTasks')}</h2>
        
        {assignedTasks.slice(0,2).map(task => (
          <div key={task.id} className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)', fontWeight: 600 }}>{t('types.plastic') || task.type}</span>
              <span className="text-secondary text-xs">{new Date(task.timestamp).toLocaleDateString()}</span>
            </div>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{task.description}</p>
            
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                <MapPin size={14} /> Hessarghatta Lake
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                onClick={() => alert("Simulating upload flow...")}
              >
                <Camera size={14} /> Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Drives */}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t('cleaningDrives')}</h2>
        
        <div className="glass-panel" style={{ padding: '1rem', borderLeft: '3px solid var(--color-primary-light)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Weekend Mega Cleanup</h3>
          <p className="text-secondary text-sm" style={{ marginBottom: '0.75rem' }}>Agara Lake • Sunday, 7:00 AM</p>
          <div className="flex-between">
            <div style={{ display: 'flex', gap: '-10px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-primary-dark)', border: '2px solid var(--color-bg)', display: 'inline-block', marginLeft: i > 1 ? '-8px' : 0 }}></div>
              ))}
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem', lineHeight: '24px' }}>+24 joined</span>
            </div>
            <button style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle size={16} /> Joined
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VolunteerDashboard;
