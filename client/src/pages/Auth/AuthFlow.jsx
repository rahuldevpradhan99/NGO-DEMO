import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import usersData from '../../data/users.json';

const AuthFlow = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { mockLogin, user } = useAuth();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Enter a valid 10-digit number');
      return;
    }
    setError('');
    setLoading(true);

    // Mock API delay
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Find if the number belongs to a predefined user
    const predefinedUser = usersData.find(u => u.mobile === mobile);
    const expectedOtp = predefinedUser && predefinedUser.otp ? predefinedUser.otp : '123456';
    
    // Mock Verification
    setTimeout(() => {
      if (otp === expectedOtp) {
        const mUser = mockLogin(mobile);
        navigate(mUser.role ? `/dashboard/${mUser.role}` : '/role-select');
      } else {
        setError(`Invalid OTP code. Please use ${expectedOtp}`);
        setLoading(false);
      }
    }, 800);
  };

  // Listen for user changes to redirect appropriately
  useEffect(() => {
    if (user && !loading) {
      if (user.role) {
        navigate(`/dashboard/${user.role}`);
      } else {
        navigate('/role-select');
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="auth-container screen-padding">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => step === 'otp' ? setStep('phone') : navigate('/welcome')} style={{ padding: '0.5rem', marginLeft: '-0.5rem' }}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="animate-slide-up">
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          {step === 'phone' ? 'Continue with Phone' : t('verifyOTP')}
        </h2>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>
          {step === 'phone' ? t('enterMobile') : `${t('otpSentTo')} +91 ${mobile}`}
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(233, 30, 99, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP}>
            <div className="input-group">
              <label className="input-label">{t('mobileNumber')}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }}>
                  +91
                </span>
                <input 
                  type="tel" 
                  className="input-field" 
                  style={{ paddingLeft: '3rem' }}
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0,10))}
                  autoFocus
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full" 
              style={{ marginTop: '1rem' }}
              disabled={loading || mobile.length < 10}
            >
              {loading ? t('loading') : t('sendOTP')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
             <div className="input-group" style={{ textAlign: 'center' }}>
              <ShieldCheck size={48} color="var(--color-primary-light)" style={{ margin: '0 auto 1rem' }} />
              <input 
                type="text" 
                className="input-field" 
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem', padding: '0.75rem' }}
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full" 
              disabled={loading || otp.length < 6}
            >
              {loading ? t('loading') : t('verifyOTP')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;
