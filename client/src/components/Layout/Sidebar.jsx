import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Droplets, Home, Map as MapIcon, PlusCircle, Trophy, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  
  if (!user) return null;

  const getNavItems = () => {
    const base = [
      { id: 'dashboard', icon: Home, path: `/dashboard/${user.role}`, label: t('dashboard') || 'Dashboard' },
      { id: 'map', icon: MapIcon, path: '/map', label: t('mapView') || 'Map View' }
    ];

    if (user.role === 'villager' || user.role === 'volunteer') {
      base.push({ id: 'report', icon: PlusCircle, path: '/report', label: t('reportProblem') || 'Report Problem' });
      base.push({ id: 'leaderboard', icon: Trophy, path: '/leaderboard', label: t('leaderboard') || 'Leaderboard' });
    }

    base.push({ id: 'profile', icon: User, path: '/profile', label: t('profile') || 'Profile' });
    
    return base;
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="app-sidebar">
      <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate(`/dashboard/${user.role}`)}>
        <Droplets size={32} color="var(--color-primary-light)" />
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', color: 'white' }} className="sidebar-text">
          {t('appName') || 'Kalyani Care'}
        </span>
      </div>

      <nav style={{ flex: 1, padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.id === 'dashboard' && location.pathname.startsWith('/dashboard'));
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                background: isActive ? 'rgba(20, 189, 235, 0.1)' : 'transparent',
                transition: 'all 0.2s ease',
                width: '100%',
                textAlign: 'left'
              }}
              className="sidebar-link hover:bg-surface-hover"
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ fontSize: '1rem', fontWeight: isActive ? 600 : 500 }} className="sidebar-text">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <div style={{ padding: '2rem 1rem' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-danger)',
            width: '100%',
            textAlign: 'left',
            background: 'rgba(233, 30, 99, 0.05)',
            border: '1px solid rgba(233, 30, 99, 0.1)'
          }}
          className="hover:bg-surface-hover"
        >
          <LogOut size={24} />
          <span style={{ fontSize: '1rem', fontWeight: 500 }} className="sidebar-text">
            {t('logout') || 'Logout'}
          </span>
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-text { display: none; }
          .app-sidebar { align-items: center; }
          .sidebar-link { justify-content: center; padding: 1rem 0; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
