import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Droplets, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      background: 'var(--color-glass)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 40
    }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        onClick={() => navigate(`/dashboard/${user?.role}`)}
      >
        <Droplets size={24} color="var(--color-primary-light)" />
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.25rem' }}>
          Kalyani Care
        </span>
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '0.25rem', 
            background: 'var(--color-surface)', padding: '0.25rem 0.75rem', 
            borderRadius: 'var(--radius-full)', fontSize: '0.875rem'
          }}>
            <span style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>{user.ecoPoints}</span>
            <span className="text-secondary">pts</span>
          </div>
          
          <button style={{ position: 'relative' }}>
            <Bell size={20} color="var(--color-text-secondary)" />
            <span style={{
              position: 'absolute',
              top: '-2px', right: '-2px',
              width: '8px', height: '8px',
              background: 'var(--color-danger)',
              borderRadius: '50%'
            }}></span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
