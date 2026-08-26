import React from 'react';
import { Bell, CheckCircle2, CalendarDays, FileCheck2, ShieldAlert, Check } from 'lucide-react';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'DL Application Submitted',
      time: '2 Hours Ago',
      desc: 'Your application for a new Driving Licence has been successfully submitted and is pending verification by RTO officials.',
      appNo: 'APP NO: 4899201',
      unread: true,
      icon: FileCheck2
    },
    {
      id: 2,
      title: 'Driving Test Booked',
      time: '5 Hours Ago',
      desc: 'Your driving test has been scheduled for Oct 24, 2024 at 10:00 AM. Please ensure you arrive 15 minutes early with original documents.',
      appNo: 'LOCATION: RTO Indiranagar Track 4',
      unread: true,
      icon: CalendarDays
    },
    {
      id: 3,
      title: 'Learner Licence Verified',
      time: '2 Days Ago',
      desc: 'Congratulations! Your Learner Licence test score (18/20) was verified and your LL certificate is ready for download.',
      appNo: 'LL NO: KA01/2026/009182',
      unread: false,
      icon: CheckCircle2
    }
  ];

  return (
    <div className="page page-notifications">
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="eye-badge"><Bell size={14} /> ACTIVITY STREAM</span>
          <h1>Notifications Center</h1>
          <p>Stay updated about your applications, appointments, and licences.</p>
        </div>
        <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Check size={14} /> Mark all as read
        </button>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {notifications.map(n => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="services-panel"
              style={{
                padding: '20px',
                borderLeft: n.unread ? '4px solid var(--saffron)' : '1px solid var(--outline)',
                background: n.unread ? '#fff' : 'var(--surface-low)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '12px', borderRadius: '12px', height: 'fit-content' }}>
                  <Icon size={22} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{n.title}</h3>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{n.time}</span>
                  </div>

                  <p style={{ margin: '4px 0 10px 0', fontSize: '14px', color: 'var(--text)', lineHeight: '1.5' }}>{n.desc}</p>

                  <span style={{ fontSize: '11px', background: 'var(--surface-mid)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {n.appNo}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
