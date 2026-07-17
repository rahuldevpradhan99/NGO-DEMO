import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, X, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import initialProposalsData from '../../data/proposals.json';

const NGOProposals = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState(initialProposalsData);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleApprove = () => {
    setProposals(prev => prev.map(p => 
      p.id === selectedProposal.id ? { ...p, status: 'funded' } : p
    ));
    setSelectedProposal(null);
  };

  const handleDownloadProposals = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('NGO Project Proposals - Kalyani Care', 14, 22);
    
    const tableData = proposals.map(p => [
      p.id, 
      p.title, 
      p.budget, 
      p.duration, 
      p.status.toUpperCase()
    ]);

    doc.autoTable({
      startY: 35,
      head: [['ID', 'Project Title', 'Budget', 'Duration', 'Status']],
      body: tableData,
      theme: 'grid'
    });

    doc.save('NGO_Project_Proposals.pdf');
  };

  return (
    <div className="screen-padding" style={{ paddingBottom: '2rem' }}>
      
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={() => navigate(-1)} style={{ padding: '0.5rem', marginLeft: '-0.5rem' }}>
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0' }}>Project Proposals</h1>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          onClick={handleDownloadProposals}
        >
          <Download size={18} /> <span className="hide-mobile">Download PDF</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {proposals.map(proposal => (
          <div key={proposal.id} className="glass-panel animate-slide-up" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>{proposal.title}</h2>
              <div style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: proposal.status === 'funded' ? 'rgba(76, 175, 130, 0.2)' : 'rgba(20, 189, 235, 0.2)', color: proposal.status === 'funded' ? 'var(--color-success)' : 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 600 }}>
                {proposal.status.toUpperCase()}
              </div>
            </div>
            
            <p className="text-secondary" style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {proposal.impact.length > 80 ? proposal.impact.substring(0, 80) + '...' : proposal.impact}
            </p>

            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '0.25rem' }}>Amount</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{proposal.budget}</div>
              </div>
            </div>
            
            <button 
              className="btn btn-secondary btn-full" 
              style={{ marginTop: '1.5rem' }}
              onClick={() => setSelectedProposal(proposal)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Proposal Modal */}
      {selectedProposal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedProposal(null)}>
          <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Proposal Details</h2>
              <button onClick={() => setSelectedProposal(null)}><X /></button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{selectedProposal.title}</h3>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: selectedProposal.status === 'funded' ? 'rgba(76, 175, 130, 0.2)' : 'rgba(20, 189, 235, 0.2)', color: selectedProposal.status === 'funded' ? 'var(--color-success)' : 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                {selectedProposal.status.toUpperCase()}
              </div>
              <p className="text-secondary" style={{ lineHeight: '1.6' }}>{selectedProposal.impact}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '0.25rem' }}>Requested Amount</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>{selectedProposal.budget}</div>
              </div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '0.25rem' }}>Timeline</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedProposal.duration}</div>
              </div>
            </div>

            {selectedProposal.status === 'open' && (
              <button className="btn btn-primary btn-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }} onClick={handleApprove}>
                <CheckCircle size={20} /> Approve & Release Funds
              </button>
            )}
            {selectedProposal.status === 'funded' && (
              <button className="btn btn-secondary btn-full" disabled style={{ opacity: 0.5 }}>
                Funds Already Released
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default NGOProposals;
