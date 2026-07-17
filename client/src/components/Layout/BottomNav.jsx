import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Map as MapIcon, PlusCircle, Trophy, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  if (!user) return null;

  const getNavItems = () => {
    const base = [
      { id: 'dashboard', icon: Home, path: `/dashboard/${user.role}`, label: 'Home' },
      { id: 'map', icon: MapIcon, path: '/map', label: 'Map' }
    ];

    if (user.role === 'villager' || user.role === 'volunteer') {
      base.push({ id: 'report', icon: PlusCircle, path: '/report', label: 'Report' });
      base.push({ id: 'leaderboard', icon: Trophy, path: '/leaderboard', label: 'Rank' });
    }

    base.push({ id: 'profile', icon: User, path: '/profile', label: 'Profile' });
    
    return base;
  };

  const navItems = getNavItems();

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--color-glass)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom))',
      zIndex: 50
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.id === 'dashboard' && location.pathname.startsWith('/dashboard'));
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
              transition: 'all 0.2s ease',
              transform: isActive ? 'translateY(-2px)' : 'none'
            }}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 600 : 400 }}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  );
};

export default BottomNav;
