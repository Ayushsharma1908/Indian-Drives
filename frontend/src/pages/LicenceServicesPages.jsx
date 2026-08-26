import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RefreshCw, Copy, Edit3, ShieldCheck, CheckCircle2, FileText, ArrowRight,
  Upload, Clock, Sparkles, MapPin, CalendarDays, Check
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

// 1. Licence Services Hub (68:8231)
export function LicenceServicesHubPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-licence-services">
      <div className="page-header">
        <span className="eye-badge"><RefreshCw size={14} /> LICENCE MAINTENANCE</span>
        <h1>Licence Services</h1>
        <p>Manage, renew, request a duplicate, or update address on your existing Driving Licence.</p>
      </div>

      <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {[
          { title: 'Renew Driving Licence', desc: 'Apply for licence renewal before or after expiry date.', path: '/renew-licence', icon: RefreshCw },
          { title: 'Duplicate Driving Licence', desc: 'Request a fresh smartcard if lost, damaged, or stolen.', path: '/duplicate-licence', icon: Copy },
          { title: 'Update Address / Name', desc: 'Update address or personal details on your DL.', path: '/update-licence', icon: Edit3 },
          { title: 'Manage Digital Wallet DL', desc: 'View verified digital driving licence smartcard.', path: '/manage-licence', icon: ShieldCheck }
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="services-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '12px', borderRadius: '10px', width: 'fit-content', marginBottom: '16px' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{s.desc}</p>
              </div>

              <button className="primary-button" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => navigate(s.path)}>
                Open Service <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. Manage Driving Licence & Verified Card (68:8323 / 68:8411)
export function ManageDrivingLicencePage() {
  const navigate = useNavigate();
  return (
    <div className="page page-manage-dl">
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="eye-badge"><ShieldCheck size={14} /> DIGITAL WALLET</span>
          <h1>Manage Driving Licence</h1>
          <p>Official digital smartcard recognized under IT Act & Central Motor Vehicle Rules.</p>
        </div>
        <StatusBadge status="Verified" text="Active Driving Licence" />
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #0f172a 100%)', color: '#fff', padding: '32px', borderRadius: '20px', boxShadow: 'var(--shadow)', maxWidth: '750px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <span style={{ color: 'var(--saffron)', fontSize: '12px', fontWeight: 800 }}>UNION OF INDIA • TRANSPORT DEPARTMENT</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '22px' }}>DRIVING LICENCE</h2>
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '6px', height: 'fit-content' }}>FORM 7 SMARTCARD</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div style={{ background: '#fff', padding: '12px', borderRadius: '12px', textAlign: 'center', color: '#000' }}>
            <div style={{ width: '90px', height: '90px', background: '#cbd5e1', borderRadius: '8px', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>Photo</div>
            <div style={{ fontSize: '11px', fontWeight: 800 }}>KA01 2026 0098412</div>
          </div>

          <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
            <div><span style={{ opacity: 0.7 }}>Name:</span> <strong>RAHUL SHARMA</strong></div>
            <div><span style={{ opacity: 0.7 }}>DOB:</span> <strong>14-08-1998</strong> • Blood: <strong>O+</strong></div>
            <div><span style={{ opacity: 0.7 }}>Vehicles Authorized:</span> <strong>MCWG, LMV</strong></div>
            <div><span style={{ opacity: 0.7 }}>Issue Date:</span> <strong>26-08-2026</strong> • Valid Till: <strong>25-08-2046</strong></div>
            <div><span style={{ opacity: 0.7 }}>Issuing RTO:</span> <strong>KA-01 (BENGALURU EAST)</strong></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="secondary-button" onClick={() => navigate('/update-licence')}>Update Address</button>
        <button className="secondary-button" onClick={() => navigate('/renew-licence')}>Renew Licence</button>
        <button className="secondary-button" onClick={() => navigate('/duplicate-licence')}>Request Duplicate</button>
      </div>
    </div>
  );
}

// 3. Update Licence Details (68:7741 / 68:7578)
export function UpdateLicenceDetailsPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page page-update-dl">
      <div className="services-panel" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
        {!submitted ? (
          <>
            <span className="eye-badge"><Edit3 size={14} /> ADDRESS & DETAILS UPDATE</span>
            <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0' }}>Update Licence Details</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Provide updated address along with valid proof document.</p>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>New Street Address</label>
                <input className="input-field" defaultValue="#99, 10th Main, HSR Layout Sector 1, Bengaluru" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Pin Code</label>
                  <input className="input-field" defaultValue="560102" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
                </div>
                <div>
                  <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Proof Document</label>
                  <input type="file" className="input-field" style={{ width: '100%', padding: '6px', fontSize: '12px' }} />
                </div>
              </div>
            </div>

            <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => setSubmitted(true)}>
              Submit Update Request (Fee: ₹250)
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Update Request Submitted!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Reference Number: <strong>REQ-ADDR-99182</strong></p>
            <button className="primary-button" onClick={() => navigate('/manage-licence')}>Back to Licence Wallet</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Renew Driving Licence (68:8091 / 68:7670)
export function RenewDrivingLicencePage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page page-renew-dl">
      <div className="services-panel" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
        {!submitted ? (
          <>
            <span className="eye-badge"><RefreshCw size={14} /> LICENCE RENEWAL</span>
            <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0' }}>Renew Driving Licence</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Submit Form 1A Medical Certificate for DL renewal extension.</p>

            <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Licence Number:</span><strong>KA01 2026 0098412</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Renewal Fee:</span><strong>₹400.00</strong></div>
            </div>

            <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => setSubmitted(true)}>
              Submit Renewal Application & Pay ₹400
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Renewal Request Submitted!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Reference Number: <strong>REN-KA01-44102</strong></p>
            <button className="primary-button" onClick={() => navigate('/manage-licence')}>Back to Licence Wallet</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 5. Duplicate Driving Licence (68:7959)
export function DuplicateDrivingLicencePage() {
  const navigate = useNavigate();
  return (
    <div className="page page-duplicate-dl">
      <div className="services-panel" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
        <span className="eye-badge"><Copy size={14} /> DUPLICATE SMARTCARD</span>
        <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0' }}>Request Duplicate Licence</h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Select reason for duplicate smartcard request (Lost, Damaged, or Stolen).</p>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {['Smartcard Lost / Missing (FIR Copy Required)', 'Smartcard Damaged / Unreadable Chip', 'Stolen Smartcard'].map((r, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--surface-low)', borderRadius: '10px', cursor: 'pointer' }}>
              <input type="radio" name="reason" defaultChecked={i === 0} />
              <span style={{ fontWeight: 700, fontSize: '14px' }}>{r}</span>
            </label>
          ))}
        </div>

        <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => navigate('/manage-licence')}>
          Request Duplicate Smartcard (Fee: ₹500)
        </button>
      </div>
    </div>
  );
}

// 6. My Journey Timeline (65:4739) & Review Application Form (65:5544)
export function MyJourneyTimelinePage() {
  return (
    <div className="page page-journey">
      <div className="page-header">
        <span className="eye-badge"><Sparkles size={14} /> USER TIMELINE</span>
        <h1>My Driving Journey</h1>
        <p>Complete history of your Indian Drives interactions and active credentials.</p>
      </div>

      <div className="services-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gap: '20px' }}>
          {[
            { date: '26 Aug 2026', title: 'Permanent DL Application Initiated', desc: 'Fee paid and automated test slot booked for 24 Oct 2026.' },
            { date: '12 Jun 2026', title: 'Learner Licence Exam Passed (18/20)', desc: 'Issued active LL #KA01/2026/009182 valid for 6 months.' },
            { date: '10 Feb 2024', title: 'Aadhaar e-KYC Identity Verification', desc: 'Digital profile verified successfully.' }
          ].map((j, i) => (
            <div key={i} style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--saffron)', fontWeight: 800 }}>{j.date}</div>
              <h4 style={{ margin: '4px 0', fontSize: '16px' }}>{j.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>{j.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
