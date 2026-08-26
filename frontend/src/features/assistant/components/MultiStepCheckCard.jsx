import React from 'react';
import { CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export function MultiStepCheckCard({ checks = [] }) {
  if (!checks || checks.length === 0) return null;

  return (
    <div
      style={{
        marginTop: '12px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0, 37, 66, 0.03)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <ShieldCheck size={16} color="#16805a" />
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#173b57', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Statutory Eligibility Evaluation
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {checks.map((c, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #edf2f7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {c.status === 'verified' ? (
                <CheckCircle2 size={16} color="#16805a" />
              ) : c.status === 'attention' ? (
                <AlertCircle size={16} color="#e88a2d" />
              ) : (
                <Clock size={16} color="#64748b" />
              )}
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#173b57' }}>
                {c.label}
              </span>
            </div>
            {c.note && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: c.status === 'verified' ? '#16805a' : '#64748b',
                  background: c.status === 'verified' ? '#eefbf4' : '#f1f5f9',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap'
                }}
              >
                {c.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
