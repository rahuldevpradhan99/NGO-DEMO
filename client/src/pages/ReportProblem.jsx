import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Mic, Send, Image as ImageIcon, X } from 'lucide-react';
import Badge from '../components/Badge/Badge';

const ReportProblem = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    type: '',
    description: '',
    location: '',
    photo: null
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setForm({ ...form, photo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const types = ['garbage', 'plastic', 'dirtyWater', 'deadFish', 'dumping'];

  if (success) {
    return (
      <div className="container screen-padding flex-center" style={{ flexDirection: 'column', textAlign: 'center' }}>
        <div className="animate-slide-up">
          <div style={{ width: '80px', height: '80px', background: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(76, 175, 130, 0.4)' }}>
            <Send size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{t('reportSubmitted')}</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>{t('earnedPoints')}</p>
          
          <div style={{ marginBottom: '3rem' }}>
            <Badge points={50} showName={true} size="lg" />
          </div>

          <button className="btn btn-primary btn-full" onClick={() => navigate('/dashboard/villager')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t('reportProblem')}</h1>

      <form onSubmit={handleSubmit} className="animate-fade-in">
        
        {/* Photo Upload Area */}
        <div className="input-group">
          <label className="input-label">{t('addPhoto')}</label>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            style={{ display: 'none' }} 
          />
          
          <div 
            onClick={() => !form.photo && fileInputRef.current?.click()}
            style={{
              border: form.photo ? 'none' : '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: form.photo ? '0' : '2rem',
              textAlign: 'center',
              background: form.photo ? 'transparent' : 'var(--color-surface)',
              cursor: form.photo ? 'default' : 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {form.photo ? (
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <img src={form.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                <button 
                  type="button"
                  onClick={handleRemovePhoto}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Camera size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.5rem' }} />
                <p className="text-sm text-secondary">Tap to capture or upload</p>
              </>
            )}
          </div>
        </div>

        {/* Problem Type */}
        <div className="input-group">
          <label className="input-label">{t('problemType')}</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {types.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({...form, type})}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  border: `1px solid ${form.type === type ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                  background: form.type === type ? 'var(--color-primary-light)' : 'transparent',
                  color: form.type === type ? '#0A1628' : 'var(--color-text-primary)',
                  fontWeight: form.type === type ? 600 : 400
                }}
              >
                {t(`types.${type}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="input-group">
          <div className="flex-between">
            <label className="input-label">{t('description')}</label>
            <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary-light)', fontSize: '0.75rem' }}>
              <Mic size={14} /> {t('addVoiceNote')}
            </button>
          </div>
          <textarea
            className="input-field"
            rows={4}
            placeholder="Describe the issue in detail..."
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
          ></textarea>
        </div>

        {/* Location */}
        <div className="input-group">
          <label className="input-label">Location</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={20} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: '2.75rem', paddingRight: '6rem' }}
              placeholder="Detecting automatically..."
              readOnly
              value="Kalyani Kere (13.2952, 77.5378)"
            />
            <button type="button" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 600 }}>
              DETECT
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-full" 
          style={{ marginTop: '1rem' }}
          disabled={loading || !form.type || !form.description}
        >
          {loading ? t('loading') : t('submit')}
        </button>
      </form>
    </div>
  );
};

export default ReportProblem;
