import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ReportCard = ({ report, pondName }) => {
  const { t } = useLanguage();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'var(--color-success)';
      case 'In Progress': return 'var(--color-warning)';
      default: return 'var(--color-danger)';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'Resolved': return 'rgba(76, 175, 130, 0.1)';
      case 'In Progress': return 'rgba(245, 166, 35, 0.1)';
      default: return 'rgba(233, 30, 99, 0.1)';
    }
  };

  const statusKey = report.status === 'In Progress' ? 'inProgress' : report.status.toLowerCase();

  return (
    <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
      <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-primary-light)'
        }}>
          {t(`types.${report.type.replace(/\s+/g, '').toLowerCase()}`) || report.type}
        </div>
        <div style={{
          background: getStatusBg(report.status),
          color: getStatusColor(report.status),
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          {t(`status.${statusKey}`) || report.status}
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.4 }}>
        {report.description}
      </p>

      <div className="flex-between text-muted text-xs">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={14} />
          {pondName || 'Kalyani Kere'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={14} />
          {new Date(report.timestamp).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
