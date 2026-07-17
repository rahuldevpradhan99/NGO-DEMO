import React from 'react';
import { getTier } from '../../data/gamification';

const Badge = ({ points, showName = true, size = 'md' }) => {
  const tier = getTier(points);
  
  const sizes = {
    sm: { icon: '1rem', font: '0.75rem', padding: '0.25rem 0.5rem' },
    md: { icon: '1.25rem', font: '0.875rem', padding: '0.375rem 0.75rem' },
    lg: { icon: '2rem', font: '1.125rem', padding: '0.5rem 1rem' }
  };
  
  const currentSize = sizes[size];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      background: `${tier.color}15`,
      border: `1px solid ${tier.color}30`,
      borderRadius: 'var(--radius-full)',
      padding: currentSize.padding,
      color: tier.color
    }}>
      <span style={{ fontSize: currentSize.icon, lineHeight: 1 }}>{tier.badge}</span>
      {showName && (
        <span style={{ fontSize: currentSize.font, fontWeight: 600 }}>{tier.name}</span>
      )}
    </div>
  );
};

export default Badge;
