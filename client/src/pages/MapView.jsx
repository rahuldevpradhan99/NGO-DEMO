import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import pondsData from '../data/ponds.json';
import { useLanguage } from '../context/LanguageContext';

// Fix Leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getMarkerColor = (status) => {
  switch(status) {
    case 'good': return '#4CAF82';
    case 'moderate': return '#F5A623';
    case 'critical': return '#E91E63';
    default: return '#14BDEB';
  }
};

const MapView = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // all, critical, good
  const center = [12.9716, 77.5946]; // Bangalore center

  const filteredPonds = pondsData.filter(pond => {
    if (filter === 'all') return true;
    return pond.status === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <div className="screen-padding" style={{ paddingBottom: '1rem', flexShrink: 0 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('mapView')}</h1>
        
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }} className="no-scrollbar">
          <button 
            className={`btn btn-secondary ${filter === 'all' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)', background: filter === 'all' ? 'var(--color-primary-light)' : 'var(--color-surface)', color: filter === 'all' ? '#0A1628' : 'white', whiteSpace: 'nowrap' }}
            onClick={() => setFilter('all')}
          >
            {t('allPonds')}
          </button>
          <button 
            className={`btn btn-secondary ${filter === 'critical' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)', background: filter === 'critical' ? 'var(--color-danger)' : 'var(--color-surface)', color: filter === 'critical' ? 'white' : 'white', whiteSpace: 'nowrap' }}
            onClick={() => setFilter('critical')}
          >
            {t('criticalPonds')}
          </button>
          <button 
            className={`btn btn-secondary ${filter === 'good' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)', background: filter === 'good' ? 'var(--color-success)' : 'var(--color-surface)', color: filter === 'good' ? 'white' : 'white', whiteSpace: 'nowrap' }}
            onClick={() => setFilter('good')}
          >
            {t('goodPonds')}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer 
          center={center} 
          zoom={12} 
          style={{ height: '100%', width: '100%', zIndex: 1 }}
          zoomControl={true}
        >
          {/* Dark Mode Map Tiles (CartoDB Dark Matter) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredPonds.map(pond => (
            <React.Fragment key={pond.id}>
              {/* Heatmap-like circle indicating area/influence */}
              <Circle 
                center={[pond.lat, pond.lng]} 
                radius={800} 
                pathOptions={{ 
                  color: getMarkerColor(pond.status),
                  fillColor: getMarkerColor(pond.status),
                  fillOpacity: 0.2,
                  weight: 1
                }} 
              />
              
              <Marker position={[pond.lat, pond.lng]}>
                <Popup className="dark-popup">
                  <div style={{ padding: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#333', marginBottom: '0.25rem' }}>{pond.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>{pond.village} • Health: {pond.healthIndex}/100</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 500, color: getMarkerColor(pond.status) }}>
                      <span>Status: {pond.status.toUpperCase()}</span>
                      <span>Reports: {pond.reportsCount}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
        
        {/* Custom CSS to fix popup in dark theme constraints */}
        <style>{`
          .leaflet-popup-content-wrapper { border-radius: 8px; }
          .leaflet-container { background: var(--color-bg); }
          .leaflet-control-attribution { display: none; }
        `}</style>
      </div>
    </div>
  );
};

export default MapView;
