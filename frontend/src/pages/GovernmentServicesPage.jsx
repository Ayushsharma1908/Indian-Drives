import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, FileCheck2, Car, CalendarDays, RefreshCw, FileText, ArrowRight } from 'lucide-react';

export function GovernmentServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Learner Licence',
      desc: 'Begin your journey. Apply for a new Learner Licence online with proctored computer test.',
      btnText: 'Apply for LL',
      path: '/ll/intro',
      icon: FileCheck2,
      tag: 'NEW APPLICANT'
    },
    {
      title: 'Driving Licence',
      desc: 'Convert your active Learner Licence to a permanent Driving Licence smartcard.',
      btnText: 'Apply for DL',
      path: '/dl/intro',
      icon: Car,
      tag: 'PERMANENT'
    },
    {
      title: 'Existing Licence Services',
      desc: 'Renew, request a duplicate, or update your current licence details and address.',
      btnText: 'Manage Services',
      path: '/licence-services',
      icon: RefreshCw,
      tag: 'SERVICES'
    },
    {
      title: 'Tests & Appointments',
      desc: 'Schedule or reschedule your driving tests and physical RTO slot appointments.',
      btnText: 'Book Now',
      path: '/appointments',
      icon: CalendarDays,
      tag: 'SLOT BOOKING'
    }
  ];

  return (
    <div className="page page-services">
      <div className="page-header">
        <span className="eye-badge"><ShieldCheck size={14} /> PORTAL ACCESS</span>
        <h1>Government Services</h1>
        <p>Access driving licence and transport services in one place. Streamlined for efficiency and ease of use.</p>
      </div>

      <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div key={idx} className="services-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ background: '#e0f2fe', color: 'var(--primary)', padding: '12px', borderRadius: '12px' }}>
                    <Icon size={28} />
                  </div>
                  <span style={{ fontSize: '11px', background: 'var(--surface-mid)', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>{srv.tag}</span>
                </div>
                <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>{srv.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5' }}>{srv.desc}</p>
              </div>

              <button
                className="primary-button"
                style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => navigate(srv.path)}
              >
                {srv.btnText} <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
