import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ minHeight: '100%' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <div className="mobile-only-nav">
        <BottomNav />
      </div>
      <style>{`
        .mobile-only-nav { display: none; }
        @media (max-width: 768px) {
          .mobile-only-nav { display: block; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
