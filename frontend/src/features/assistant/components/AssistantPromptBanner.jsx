import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AssistantPromptBanner({ promptText, queryText, badgeText = "AI GUIDE" }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ask?q=${encodeURIComponent(queryText || promptText)}`)}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 37, 66, 0.03)',
        transition: 'all 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#cbd5e1';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 37, 66, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 37, 66, 0.03)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fff7ed', color: '#e88a2d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={14} />
        </div>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '0.6px', textTransform: 'uppercase', marginRight: '8px' }}>
            {badgeText}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#173b57' }}>
            {promptText}
          </span>
        </div>
      </div>

      <div style={{ fontSize: '12px', fontWeight: 700, color: '#002542', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        Ask DriveSeva <ArrowRight size={13} />
      </div>
    </div>
  );
}
