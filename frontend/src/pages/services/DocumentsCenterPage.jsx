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
          <span className="eyebrow"><FileCheck2 size={13} /> Document Vault</span>
          <h1 style={{ color: 'var(--color-deep-navy)', fontSize: '36px', fontWeight: 700, margin: '4px 0 6px 0' }}>Documents Center</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', margin: 0 }}>Manage the documents used across your Indian Drives applications. Ensure all proofs are up to date for faster processing.</p>
        </div>
        <button className="primary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="console-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>5</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>All Documents</div>
        </div>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-teal)' }}>4</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Verified</div>
        </div>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-indigo)' }}>1</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Pending</div>
        </div>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-muted)' }}>0</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Needs Update</div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {documents.map((doc, idx) => (
          <div key={idx} className="card-standard" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-pale-indigo)', color: 'var(--color-primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-indigo)', fontWeight: 700, letterSpacing: '0.6px' }}>{doc.category}</span>
                  <h3 style={{ margin: '4px 0 6px 0', fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{doc.name}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    <span>Uploaded: <strong style={{ color: 'var(--color-text-primary)' }}>{doc.date}</strong></span>
                    <span>Valid Until: <strong style={{ color: 'var(--color-text-primary)' }}>{doc.validUntil}</strong></span>
                  </div>
                </div>
              </div>
              <StatusBadge status={doc.status} text={doc.status} />
            </div>

            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '13px' }}>
                <Eye size={14} /> View
              </button>
              <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '13px' }}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
