import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Splash = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if language is already selected, else go to language selection
      const savedLang = localStorage.getItem('kalyani_lang');
      if (savedLang) {
        navigate('/welcome');
      } else {
        navigate('/language');
      }
    }, 2500); // 2.5 seconds splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container flex-center" style={{ background: 'var(--color-bg)' }}>
      <div className="text-center animate-slide-up">
        <div style={{
          width: '100px', height: '100px', 
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Droplets size={50} color="white" />
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          {t('appName')}
        </h1>
        <p className="text-secondary text-sm delay-200 animate-fade-in">
          {t('tagline')}
        </p>
      </div>
    </div>
  );
};

export default Splash;
