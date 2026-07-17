import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Award } from 'lucide-react';

import usersData from '../data/users.json';
import { getTier } from '../data/gamification';

const Leaderboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('allTime'); // thisWeek, thisMonth, allTime

  // Sort users dynamically based on timeframe
  const getSortKey = () => {
    if (timeframe === 'thisWeek') return 'weeklyPoints';
    if (timeframe === 'thisMonth') return 'monthlyPoints';
    return 'ecoPoints';
  };

  const sortKey = getSortKey();

  const sortedUsers = [...usersData]
    .filter(u => (u.role === 'villager' || u.role === 'volunteer') && u[sortKey] !== undefined)
    .sort((a, b) => b[sortKey] - a[sortKey]);

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Trophy size={24} color="#F5A623" />;
      case 1: return <Medal size={24} color="#B0BEC5" />;
      case 2: return <Award size={24} color="#CD7F32" />;
      default: return <span style={{ fontWeight: 600, color: 'var(--color-text-muted)', width: '24px', textAlign: 'center', display: 'inline-block' }}>{index + 1}</span>;
    }
  };

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Trophy color="var(--color-warning)" />
        {t('leaderboard')}
      </h1>

      {/* Timeframe selector */}
      <div style={{ display: 'flex', background: 'var(--color-surface)', borderRadius: 'var(--radius-full)', padding: '0.25rem', marginBottom: '2rem' }}>
        {['thisWeek', 'thisMonth', 'allTime'].map(tf => (
          <button
            key={tf}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 500,
              background: timeframe === tf ? 'var(--color-primary-light)' : 'transparent',
              color: timeframe === tf ? '#0A1628' : 'var(--color-text-secondary)',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setTimeframe(tf)}
          >
            {t(tf)}
          </button>
        ))}
      </div>

      {/* Current User Rank highlight (if they are in top 100) */}
      {user && (user.role === 'villager' || user.role === 'volunteer') && (
        <div className="glass-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(20, 189, 235, 0.1), transparent)', border: '1px solid var(--color-primary-light)' }}>
          <div className="flex-between">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                #{sortedUsers.findIndex(u => u.id === user.id) + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem' }}>You</h3>
                <p className="text-secondary text-xs">{user[sortKey] || user.ecoPoints} {t('ecoPoints')}</p>
              </div>
            </div>
            <div style={{ fontSize: '1.5rem' }}>
              {getTier(user.ecoPoints).badge}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sortedUsers.map((u, index) => (
          <div 
            key={u.id} 
            className="glass-panel hover:bg-surface-hover" 
            style={{ 
              padding: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              border: u.id === user?.id ? '1px solid var(--color-primary-light)' : '1px solid var(--color-border)',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/user/${u.id}`)}
          >
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {getRankIcon(index)}
              
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'white', fontWeight: 600 }}>
                {u.name.charAt(0)}
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.125rem' }}>
                  {u.id === user?.id ? 'You' : u.name}
                </h3>
                <p className="text-secondary text-xs">{u.village}</p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>{u[sortKey]}</div>
              <div style={{ fontSize: '1.25rem' }}>{getTier(u.ecoPoints).badge}</div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Leaderboard;
