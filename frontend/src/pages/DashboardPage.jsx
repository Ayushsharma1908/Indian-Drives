import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileCheck2, Car, CalendarDays, CreditCard, ShieldCheck,
  ArrowRight, Clock, CheckCircle2, Sparkles, AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page page-dashboard">
      <div className="services-panel" style={{ padding: '28px', marginBottom: '24px', background: 'linear-gradient(135deg, #00253e 0%, #173b57 100%)', color: '#fff', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ color: 'var(--saffron)', fontSize: '12px', fontWeight: 800 }}>WELCOME BACK</span>
            <h1 style={{ margin: '4px 0 6px 0', fontSize: '28px' }}>Hello, Rahul Sharma 👋</h1>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>Your Learner Licence is active. You are eligible to book your permanent DL test slot.</p>
          </div>
          <button className="primary-button" style={{ background: 'var(--saffron)', color: '#000', fontWeight: 800, padding: '10px 20px' }} onClick={() => navigate('/dl/intro')}>
            Book DL Driving Test <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="console-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--ok)' }}>1 Active</span>
          <span className="stat-label">Learner Licence</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--saffron)' }}>24 Oct 2026</span>
          <span className="stat-label">Next RTO Test</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">5</span>
          <span className="stat-label">Verified Documents</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--primary)' }}>₹0.00</span>
          <span className="stat-label">Pending Dues</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        <div className="services-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Active Credentials</h3>
            <StatusBadge status="Verified" text="Verified" />
          </div>

          <div style={{ background: 'var(--surface-low)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#dcfce7', color: 'var(--ok)', padding: '10px', borderRadius: '10px' }}>
                <FileCheck2 size={24} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '15px' }}>Learner Licence (LL)</h4>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>NO: <strong>KA01/2026/009182</strong></div>
              </div>
            </div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--outline)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
              <span>Valid From: 26 Aug 2026</span>
              <span style={{ color: 'var(--ok)', fontWeight: 700 }}>Valid Until: 26 Feb 2027</span>
            </div>
          </div>
        </div>

        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button className="secondary-button" style={{ padding: '12px', textAlign: 'left' }} onClick={() => navigate('/dl/intro')}>
              <Car size={18} color="var(--primary)" />
              <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '6px' }}>Apply for DL</div>
            </button>
            <button className="secondary-button" style={{ padding: '12px', textAlign: 'left' }} onClick={() => navigate('/appointments')}>
              <CalendarDays size={18} color="var(--saffron)" />
              <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '6px' }}>My Appointments</div>
            </button>
            <button className="secondary-button" style={{ padding: '12px', textAlign: 'left' }} onClick={() => navigate('/documents')}>
              <FileCheck2 size={18} color="var(--ok)" />
              <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '6px' }}>Document Vault</div>
            </button>
            <button className="secondary-button" style={{ padding: '12px', textAlign: 'left' }} onClick={() => navigate('/ask')}>
              <Sparkles size={18} color="#9333ea" />
              <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '6px' }}>Ask AI Helper</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
