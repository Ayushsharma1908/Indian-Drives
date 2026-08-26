import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, HeartPulse, ShieldCheck, Edit3 } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="page page-profile">
      <div className="services-panel" style={{ padding: '32px', marginBottom: '24px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 800, color: '#000' }}>
              RS
            </div>
            <div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '26px' }}>Rahul Sharma</h1>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', opacity: 0.9, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> +91 98765 43210</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> rahul.sharma@example.in</span>
              </div>
            </div>
          </div>

          <button className="primary-button" style={{ background: '#fff', color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', borderBottom: '1px solid var(--surface-high)', paddingBottom: '12px' }}>
            Personal Information
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>DATE OF BIRTH</div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>14 August 1998 (Age: 28)</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>GENDER</div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>Male</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>BLOOD GROUP</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--danger)' }}>O +ve</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>FATHER / HUSBAND NAME</div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>Ramesh Sharma</div>
            </div>
          </div>
        </div>

        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', borderBottom: '1px solid var(--surface-high)', paddingBottom: '12px' }}>
            Address Details
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>PERMANENT ADDRESS</div>
              <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: '1.5' }}>
                #42, 3rd Cross, 10th Main, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka - 560038
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>VERIFIED IDENTITY PROOF</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ok)' }}>Aadhaar Card (Linked & e-KYC Verified)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
