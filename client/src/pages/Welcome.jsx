import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Droplets } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="container screen-padding" style={{ 
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="animate-slide-up">
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Droplets size={32} color="var(--color-primary-light)" />
            <h1 className="text-gradient" style={{ fontSize: '2rem' }}>{t('appName')}</h1>
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', lineHeight: '1.3' }}>
            {t('welcomeBack')}
          </h2>
          <p className="text-secondary">
            {t('welcomeSub')}
          </p>
        </div>

      </div>

      <div className="animate-slide-up delay-200" style={{ paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button 
          className="btn btn-primary btn-full"
          onClick={() => navigate('/login')}
        >
          {t('login')}
        </button>
        
        <button 
          className="btn btn-secondary btn-full"
          onClick={() => navigate('/register')}
        >
          {t('register')}
        </button>

        <button 
          className="btn text-muted"
          style={{ marginTop: '0.5rem', width: '100%' }}
          onClick={() => navigate('/dashboard/villager')} // Shortcut for demo
        >
          {t('continueAsGuest')}
        </button>

        <div className="text-center text-xs text-warning mt-4">
          {t('demoMode')}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
