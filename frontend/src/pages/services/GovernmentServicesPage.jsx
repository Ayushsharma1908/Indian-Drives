import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Car, RefreshCw, CalendarDays, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../main';

export function GovernmentServicesPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.card1Title', 'Learner Licence'),
      desc: t('services.card1Desc', 'Begin your journey. Apply for a new Learner Licence online with proctored computer test.'),
      btnText: t('services.card1Btn', 'Apply for LL'),
      path: '/ll/intro',
      icon: FileText,
      tag: t('services.card1Tag', 'NEW APPLICANT')
    },
    {
      title: t('services.card2Title', 'Driving Licence'),
      desc: t('services.card2Desc', 'Convert your active Learner Licence to a permanent Driving Licence smartcard.'),
      btnText: t('services.card2Btn', 'Apply for DL'),
      path: '/dl/intro',
      icon: Car,
      tag: t('services.card2Tag', 'PERMANENT')
    },
    {
      title: t('services.card3Title', 'Existing Licence'),
      desc: t('services.card3Desc', 'Renew, request a duplicate, or update your current licence details and address.'),
      btnText: t('services.card3Btn', 'Manage Services'),
      path: '/licence-services',
      icon: RefreshCw,
      tag: t('services.card3Tag', 'SERVICES')
    },
    {
      title: t('services.card4Title', 'Tests & Appointments'),
      desc: t('services.card4Desc', 'Schedule or reschedule your driving tests and physical RTO slot appointments.'),
      btnText: t('services.card4Btn', 'Book Now'),
      path: '/appointments',
      icon: CalendarDays,
      tag: t('services.card4Tag', 'SLOT BOOKING')
    }
  ];

  return (
    <div className="page page-services-figma" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)' }}>
        <div style={{ color: '#e88a2d', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          {t('services.portalAccess', 'PORTAL ACCESS')}
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          {t('services.title', 'Government Services')}
        </h1>
        <p style={{ color: '#476179', fontSize: '16px', margin: 0, lineHeight: 1.5, maxWidth: '680px' }}>
          {t('services.subtitle', 'Access driving licence and transport services in one place. Streamlined for efficiency and ease of use.')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div key={idx} style={{ background: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} />
                  </div>
                  <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#476179', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>{srv.tag}</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#173b57', margin: '0 0 8px 0' }}>{srv.title}</h3>
                <p style={{ color: '#476179', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{srv.desc}</p>
              </div>

              <button
                onClick={() => navigate(srv.path)}
                style={{ background: '#173b57', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', transition: 'all 0.2s ease' }}
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
