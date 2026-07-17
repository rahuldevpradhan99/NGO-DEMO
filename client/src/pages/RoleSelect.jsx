import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { User, HeartHandshake, Building2, Landmark } from 'lucide-react';

const RoleSelect = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { updateRole } = useAuth();

  const handleSelectRole = async (role) => {
    // Save to context (and Firestore if connected)
    await updateRole(role, { village: 'Bengaluru' });
    navigate(`/dashboard/${role}`);
  };

  const roles = [
    { id: 'villager', icon: User, color: '#14BDEB' },
    { id: 'volunteer', icon: HeartHandshake, color: '#4CAF82' },
    { id: 'ngo', icon: Building2, color: '#F5A623' },
    { id: 'municipality', icon: Landmark, color: '#E91E63' }
  ];

  return (
    <div className="container screen-padding flex-center" style={{ flexDirection: 'column' }}>
      
      <div className="animate-slide-up" style={{ width: '100%', maxWidth: '360px' }}>
        <h2 className="text-center" style={{ marginBottom: '0.5rem' }}>
          {t('selectYourRole')}
        </h2>
        <p className="text-center text-secondary text-sm" style={{ marginBottom: '2.5rem' }}>
          {t('roleHint')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                className="glass-card"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1.25rem',
                  textAlign: 'left',
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => handleSelectRole(role.id)}
              >
                <div style={{ 
                  background: `${role.color}20`, 
                  padding: '0.75rem', 
                  borderRadius: '50%',
                  color: role.color
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                    {t(`roles.${role.id}`)}
                  </h3>
                  <p className="text-secondary text-xs">
                    {t(`roleDesc.${role.id}`)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

    </div>
  );
};

export default RoleSelect;
