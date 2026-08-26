import React from 'react';
import {
  ArrowRight,
  FileText,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Car,
  Shield,
  Compass,
  FilePlus,
  FileCheck,
  Calendar,
  CalendarCheck,
  Clock,
  Award,
  Activity,
  RefreshCw,
  Copy,
  Edit3,
  Folder,
  Receipt,
  Bell,
  HelpCircle,
  CheckSquare
} from 'lucide-react';

const ICONS = {
  FileText,
  ArrowRight,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Car,
  Shield,
  Compass,
  FilePlus,
  FileCheck,
  Calendar,
  CalendarCheck,
  Clock,
  Award,
  Activity,
  RefreshCw,
  Copy,
  Edit3,
  Folder,
  Receipt,
  Bell,
  HelpCircle,
  CheckSquare
};

export function ActionCard({ action, onExecute }) {
  if (!action) return null;

  const IconComponent = ICONS[action.icon] || ArrowRight;

  return (
    <div
      style={{
        marginTop: '12px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        boxShadow: '0 2px 8px rgba(0, 37, 66, 0.04)',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#173b57',
            flexShrink: 0
          }}
        >
          <IconComponent size={18} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            RECOMMENDED ACTION
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {action.label}
          </div>
          {action.description && (
            <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {action.description}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onExecute(action)}
        style={{
          background: '#002542',
          border: 'none',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 700,
          padding: '10px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(0, 37, 66, 0.15)',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#0a3a60';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#002542';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {action.shortLabel || action.label} <ArrowRight size={14} />
      </button>
    </div>
  );
}
