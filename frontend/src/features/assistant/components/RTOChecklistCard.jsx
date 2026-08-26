import React, { useState } from 'react';
import { CheckSquare, Square, Info } from 'lucide-react';

export function RTOChecklistCard({ checklist = [] }) {
  const [checkedItems, setCheckedItems] = useState({});

  if (!checklist || checklist.length === 0) return null;

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquare size={16} color="#e88a2d" />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#173b57', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            RTO Visit Checklist
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#64748b' }}>
          Interactive Checklist
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {checklist.map((item, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: isDone ? '#f0fdf4' : '#f8fafc',
                border: isDone ? '1px solid #bbf7d0' : '1px solid #edf2f7',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ marginTop: '2px', color: isDone ? '#16805a' : '#94a3b8' }}>
                {isDone ? <CheckSquare size={16} /> : <Square size={16} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isDone ? '#16805a' : '#173b57',
                    textDecoration: isDone ? 'line-through' : 'none'
                  }}
                >
                  {item.text}
                </span>
                {item.note && (
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {item.note}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '6px', background: '#fffbeb', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#92400e' }}>
        <Info size={14} flexShrink={0} />
        <span>RTO officials will inspect original documents and vehicle fitness on track arrival.</span>
      </div>
    </div>
  );
}
