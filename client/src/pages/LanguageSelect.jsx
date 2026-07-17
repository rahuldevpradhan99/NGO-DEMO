import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { changeLanguage, t } = useLanguage();

  const handleSelect = (lang) => {
    changeLanguage(lang);
    navigate('/welcome');
  };

  const languages = [
    { code: 'en', name: 'English', icon: '🇬🇧' },
    { code: 'kn', name: 'ಕನ್ನಡ', icon: '🟡🔴' },
    { code: 'te', name: 'తెలుగు', icon: '🟢⚪️' },
  ];

  return (
    <div className="container screen-padding flex-center" style={{ flexDirection: 'column' }}>
      
      <div className="text-center animate-slide-up" style={{ width: '100%', maxWidth: '320px' }}>
        <Languages size={48} color="var(--color-primary-light)" style={{ margin: '0 auto 1.5rem' }} />
        
        <h2 style={{ marginBottom: '0.5rem' }}>{t('chooseLanguage')}</h2>
        <p className="text-secondary text-sm" style={{ marginBottom: '2.5rem' }}>
          {t('languageHint')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                animationDelay: `${index * 100}ms`,
                textAlign: 'left'
              }}
              onClick={() => handleSelect(lang.code)}
            >
              <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>{lang.name}</span>
              <span style={{ fontSize: '1.5rem' }}>{lang.icon}</span>
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default LanguageSelect;
