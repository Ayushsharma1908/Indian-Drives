import React, { useState } from 'react';
import { CircleHelp, Search, ChevronDown, ChevronUp, FileText, MessageSquare, PhoneCall } from 'lucide-react';

export function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { name: 'Learner Licence', desc: 'Application process, eligibility criteria, and mandatory LL test guidelines.', count: '12 Articles' },
    { name: 'Driving Licence', desc: 'Permanent licence, renewals, address change, and international driving permits.', count: '18 Articles' },
    { name: 'Documents', desc: 'Required identity, address, and medical proofs for various applications.', count: '8 Articles' },
    { name: 'Payments', desc: 'Fee structures, payment methods, transaction failures, and refund policies.', count: '10 Articles' },
    { name: 'Appointments', desc: 'Booking slots, rescheduling, cancellations, and RTO visit procedures.', count: '14 Articles' },
  ];

  const faqs = [
    { q: 'How do I take the Learner Licence computer test online?', a: 'You can attempt the LL test directly from our LL Assessment Cockpit page using your computer or mobile camera for proctored identity verification.' },
    { q: 'What is the validity period of a Learner Licence?', a: 'A Learner Licence is valid for 6 months from the date of issue. You can apply for a permanent Driving Licence after 30 days of holding an LL.' },
    { q: 'What documents are accepted as valid proof of address?', a: 'Aadhaar Card, Passport, Voter ID Card, Recent Utility Bill (Electricity/Water within 3 months), or Registered Rent Agreement.' }
  ];

  return (
    <div className="page page-help">
      <div className="page-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 32px auto' }}>
        <span className="eye-badge"><CircleHelp size={14} /> SUPPORT CENTER</span>
        <h1>How can we help you today?</h1>
        <p>Search our knowledge base or browse help topics by category below.</p>
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--muted)' }} />
          <input
            type="text"
            className="search-input"
            placeholder="Search help topics, RTO rules, document requirements..."
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '12px', border: '1px solid var(--outline)', fontSize: '15px' }}
          />
        </div>
      </div>

      <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Browse by Category</h2>
      <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '32px' }}>
        {categories.map((cat, idx) => (
          <div key={idx} className="services-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--saffron)', marginBottom: '4px' }}>{cat.count}</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{cat.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>{cat.desc}</p>
          </div>
        ))}
      </div>

      <div className="services-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '20px', margin: '0 0 16px 0' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid var(--surface-high)', borderRadius: '10px', overflow: 'hidden' }}>
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'var(--surface-low)',
                  border: 'none',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFaq === idx && (
                <div style={{ padding: '16px', background: '#fff', fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
