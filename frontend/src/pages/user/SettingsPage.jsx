import React, { useState } from 'react';
import { Settings, Shield, Bell, Languages, Moon, Lock, Smartphone, Check } from 'lucide-react';
import { useLanguage } from '../../main';
import { INDIAN_LANGUAGES } from '../../components/layout/LanguageSelector';

export function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [savedNotice, setSavedNotice] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="page page-settings">
      <div className="page-header">
        <span className="eye-badge"><Settings size={14} /> {t('settings.eyebrow', 'PREFERENCES')}</span>
        <h1>{t('settings.title', 'Account & System Settings')}</h1>
        <p>{t('settings.subtitle', 'Manage security settings, notifications, language choices, and portal preferences.')}</p>
      </div>

      <div style={{ display: 'grid', gap: '20px', maxWidth: '800px' }}>
        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', color: '#102d43' }}>
            <Languages size={20} color="#0284c7" /> {t('settings.languageTitle', 'Preferred Language')}
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
            {t('settings.languageDesc', 'Select the language for all application forms, RTO notifications, and AI assistant chats.')}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <select
              className="input-field"
              style={{ maxWidth: '340px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600 }}
              value={language}
              onChange={handleLanguageChange}
            >
              {INDIAN_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.code === 'en' ? 'English' : `${lang.nativeName} (${lang.name})`}
                </option>
              ))}
            </select>

            {savedNotice && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#16a34a', fontWeight: 700 }}>
                <Check size={16} /> {t('common.save', 'Preferences updated')}
              </span>
            )}
          </div>
        </div>

        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', color: '#102d43' }}>
            <Bell size={20} color="#ea580c" /> Notifications & Alerts
          </h3>

          <div style={{ display: 'grid', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#102d43' }}>SMS & WhatsApp Test Slot Reminders</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Receive instant reminders 24h before scheduled RTO driving tests.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#102d43' }}>Email Application Status Updates</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Receive email alerts when RTO officers approve or update your application.</div>
              </div>
            </label>
          </div>
        </div>

        <div className="services-panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', color: '#102d43' }}>
            <Lock size={20} color="#16a34a" /> Security & Aadhaar e-KYC
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>Manage 2-Factor Authentication and linked DigiLocker accounts.</p>
          <button className="secondary-button" style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, cursor: 'pointer' }}>
            Configure Security Pin
          </button>
        </div>
      </div>
    </div>
  );
}
