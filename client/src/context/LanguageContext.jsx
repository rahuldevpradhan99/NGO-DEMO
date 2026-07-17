import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en';
import kn from '../i18n/kn';
import te from '../i18n/te';

const translations = { en, kn, te };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('kalyani_lang');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('kalyani_lang', lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    // Fallback to English if key is missing in selected language
    if (value === undefined && language !== 'en') {
        let fallbackValue = translations['en'];
        for (const k of keys) {
            if (fallbackValue === undefined) break;
            fallbackValue = fallbackValue[k];
        }
        return fallbackValue || key;
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
