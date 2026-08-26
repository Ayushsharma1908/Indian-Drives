import React, { useContext } from 'react';
import { Settings, Shield, Bell, Languages, Moon, Lock, Smartphone } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="page page-settings">
      <div className="page-header">
        <span className="eye-badge"><Settings size={14} /> PREFERENCES</span>
        <h1>Account & System Settings</h1>
        <p>Manage security settings, notifications, language choices, and portal preferences.</p>
      </div>

      <div style={{ display: 'grid', gap: '20px', maxWidth: '800px' }}>
        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Languages size={20} color="var(--primary)" /> Preferred Language
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>Select the language for all application forms, RTO notifications, and AI assistant chats.</p>

          <select className="input-field" style={{ maxWidth: '300px' }} defaultValue="en">
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
        </div>

        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="var(--saffron)" /> Notifications & Alerts
          </h3>

          <div style={{ display: 'grid', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>SMS & WhatsApp Test Slot Reminders</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Receive instant reminders 24h before scheduled RTO driving tests.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Email Application Status Updates</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Receive email alerts when RTO officers approve or update your application.</div>
              </div>
            </label>
          </div>
        </div>

        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={20} color="var(--ok)" /> Security & Aadhaar e-KYC
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>Manage 2-Factor Authentication and linked DigiLocker accounts.</p>
          <button className="secondary-button">Configure Security Pin</button>
        </div>
      </div>
    </div>
  );
}
