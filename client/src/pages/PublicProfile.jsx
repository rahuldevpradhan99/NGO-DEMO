import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Activity, MapPin } from 'lucide-react';

import usersData from '../data/users.json';
import { getTier, BADGES } from '../data/gamification';

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = usersData.find(u => u.id === id);

  if (!user) {
    return (
      <div className="screen-padding text-center">
        <h2 style={{ marginTop: '4rem' }}>User not found</h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>Go Back</button>
      </div>
    );
  }

  const currentTier = getTier(user.ecoPoints);

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '0.5rem', marginLeft: '-0.5rem' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '1.25rem', marginLeft: '0.5rem' }}>Public Profile</h1>
      </div>

      <div className="glass-card animate-slide-up" style={{ marginBottom: '2rem', textAlign: 'center', paddingTop: '2.5rem', position: 'relative' }}>
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
          <MapPin size={14} /> {user.village} • {user.role?.toUpperCase()}
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>{currentTier.badge}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: currentTier.color }}>{currentTier.name}</div>
            <div className="text-secondary text-sm">Lifetime Score: {user.ecoPoints} EP</div>
          </div>
        </div>
      </div>

      <div className="grid-2 animate-slide-up" style={{ gap: '1rem', marginBottom: '2rem', animationDelay: '0.1s' }}>
        <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
          <Activity size={24} color="var(--color-primary-light)" style={{ margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.reportsSubmitted || 0}</div>
          <div className="text-secondary text-xs">Reports</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
          <Award size={24} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.badges?.length || 0}</div>
          <div className="text-secondary text-xs">Badges Earned</div>
        </div>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Earned Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {BADGES.map(badge => {
            const isEarned = user.badges?.includes(badge.name);
            if (!isEarned) return null;
            return (
              <div key={badge.id} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
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
          {(!user.badges || user.badges.length === 0) && (
            <div className="text-muted text-sm" style={{ gridColumn: 'span 4', textAlign: 'center', padding: '1rem 0' }}>
              No badges earned yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
