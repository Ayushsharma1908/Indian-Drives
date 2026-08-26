import React from 'react';
import { FileCheck2, Upload, FileText, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Eye, Download } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

export function DocumentsCenterPage() {
  const documents = [
    { name: 'Aadhaar Card (Ends in 4920)', category: 'Identity Proof', date: '12 Oct 2023', validUntil: 'Permanent', status: 'Verified' },
    { name: 'PAN Card', category: 'Identity Proof', date: '15 Jan 2024', validUntil: 'Permanent', status: 'Verified' },
    { name: 'Electricity Bill (Recent)', category: 'Address Proof', date: '01 Aug 2026', validUntil: '01 Nov 2026', status: 'Verified' },
    { name: 'Medical Certificate (Form 1A)', category: 'Health & Fitness', date: '20 Aug 2026', validUntil: '20 Aug 2027', status: 'Pending' },
    { name: 'Passport Size Photo & Signature', category: 'Biometric Proof', date: '10 Feb 2024', validUntil: 'Permanent', status: 'Verified' },
  ];

  return (
    <div className="page page-documents">
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="eye-badge"><FileCheck2 size={14} /> Document Vault</span>
          <h1>Documents Center</h1>
          <p>Manage the documents used across your Indian Drives applications. Ensure all proofs are up to date for faster processing.</p>
        </div>
        <button className="primary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="console-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <span className="stat-num">5</span>
          <span className="stat-label">All Documents</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--ok)' }}>4</span>
          <span className="stat-label">Verified</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--saffron)' }}>1</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--danger)' }}>0</span>
          <span className="stat-label">Needs Update</span>
        </div>
      </div>

      <div className="service-cards">
        {documents.map((doc, idx) => (
          <div key={idx} className="services-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '12px', borderRadius: '10px' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>{doc.category}</span>
                  <h3 style={{ margin: '4px 0 8px 0', fontSize: '16px' }}>{doc.name}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--muted)' }}>
                    <span>Uploaded: <strong>{doc.date}</strong></span>
                    <span>Valid Until: <strong>{doc.validUntil}</strong></span>
                  </div>
                </div>
              </div>
              <StatusBadge status={doc.status} text={doc.status} />
            </div>

            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--surface-high)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}>
                <Eye size={14} /> View
              </button>
              <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
