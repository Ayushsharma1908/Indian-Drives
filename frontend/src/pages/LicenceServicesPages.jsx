import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RefreshCw, Copy, Edit3, ShieldCheck, CheckCircle2, FileText, ArrowRight,
  Upload, Clock, Sparkles, MapPin, CalendarDays, Search, HelpCircle
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

// 1. Licence Services Hub (68:8231)
export function LicenceServicesHubPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-licence-services" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)' }}>
        <div style={{ color: '#e88a2d', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          LICENCE MAINTENANCE
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          Licence Services
        </h1>
        <p style={{ color: '#476179', fontSize: '16px', margin: 0, lineHeight: 1.5 }}>
          Manage, renew, request a duplicate, or update address on your existing Driving Licence.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        {[
          { title: 'Renew Driving Licence', desc: 'Apply for licence renewal before or after expiry date.', path: '/renew-licence', icon: RefreshCw },
          { title: 'Duplicate Driving Licence', desc: 'Request a fresh smartcard if lost, damaged, or stolen.', path: '/duplicate-licence', icon: Copy },
          { title: 'Update Address / Name', desc: 'Update address or personal details on your DL.', path: '/update-licence', icon: Edit3 },
          { title: 'Manage Digital Wallet DL', desc: 'View verified digital driving licence smartcard.', path: '/manage-licence', icon: ShieldCheck }
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ background: '#eef6ff', color: '#173b57', padding: '12px', borderRadius: '12px', width: 'fit-content', marginBottom: '16px' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700, color: '#173b57' }}>{s.title}</h3>
                <p style={{ color: '#476179', fontSize: '14px', margin: 0 }}>{s.desc}</p>
              </div>

              <button
                onClick={() => navigate(s.path)}
                style={{ marginTop: '20px', background: '#173b57', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
              >
                Open Service <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. Manage Driving Licence (Figma 68:8323)
export function ManageDrivingLicencePage() {
  const navigate = useNavigate();
  const [dlNo, setDlNo] = useState('');
  const [verified, setVerified] = useState(false);

  return (
    <div className="page page-manage-dl-figma" style={{ width: 'min(900px, calc(100% - 48px))', margin: '40px auto' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 37, 66, 0.05)' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f0ff', color: '#002542', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
          <ShieldCheck size={14} color="#002542" /> SECURE VERIFICATION PORTAL
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: 700, color: '#002542', margin: '0 0 12px 0', letterSpacing: '-1px' }}>
          Manage your Driving Licence
        </h1>
        <p style={{ color: '#5a7184', fontSize: '16px', margin: '0 0 32px 0', lineHeight: 1.5 }}>
          Enter your licence details to access services related to your existing licence.
        </p>

        {!verified ? (
          <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b5c', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Driving Licence Number
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. KA-01-20230004567"
                value={dlNo}
                onChange={(e) => setDlNo(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', fontSize: '16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b5c', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="input-field"
                  defaultValue="1998-08-14"
                  style={{ width: '100%', padding: '14px 16px', fontSize: '16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  onClick={() => setVerified(true)}
                  style={{ width: '100%', background: '#002542', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  Verify Licence <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#914d00', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              <HelpCircle size={16} /> Where can I find my DL number?
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, #002542 0%, #0f172a 100%)', color: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,37,66,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <span style={{ color: '#e88a2d', fontSize: '12px', fontWeight: 800 }}>UNION OF INDIA • TRANSPORT DEPARTMENT</span>
                  <h2 style={{ margin: '4px 0 0 0', fontSize: '22px', fontWeight: 800 }}>DRIVING LICENCE</h2>
                </div>
                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '6px', height: 'fit-content' }}>FORM 7 SMARTCARD</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                <div style={{ background: '#fff', padding: '12px', borderRadius: '12px', textAlign: 'center', color: '#000' }}>
                  <div style={{ width: '80px', height: '80px', background: '#cbd5e1', borderRadius: '8px', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>Photo</div>
                  <div style={{ fontSize: '11px', fontWeight: 800 }}>KA-01-20230004567</div>
                </div>

                <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                  <div><span style={{ opacity: 0.7 }}>Name:</span> <strong>RAHUL SHARMA</strong></div>
                  <div><span style={{ opacity: 0.7 }}>DOB:</span> <strong>14-08-1998</strong> • Blood: <strong>O+</strong></div>
                  <div><span style={{ opacity: 0.7 }}>Vehicles Authorized:</span> <strong>MCWG, LMV</strong></div>
                  <div><span style={{ opacity: 0.7 }}>Issue Date:</span> <strong>26-08-2023</strong> • Valid Till: <strong>25-08-2043</strong></div>
                  <div><span style={{ opacity: 0.7 }}>Issuing RTO:</span> <strong>KA-01 (BENGALURU EAST)</strong></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/update-licence')} className="secondary-button" style={{ flex: 1 }}>Update Address</button>
              <button onClick={() => navigate('/renew-licence')} className="secondary-button" style={{ flex: 1 }}>Renew Licence</button>
              <button onClick={() => navigate('/duplicate-licence')} className="secondary-button" style={{ flex: 1 }}>Request Duplicate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Update Licence Details (68:7741 / 68:7578)
export function UpdateLicenceDetailsPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page page-update-dl" style={{ width: 'min(700px, calc(100% - 48px))', margin: '40px auto' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        {!submitted ? (
          <>
            <span className="eye-badge"><Edit3 size={14} /> ADDRESS & DETAILS UPDATE</span>
            <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0', color: '#173b57' }}>Update Licence Details</h1>
            <p style={{ color: '#476179', fontSize: '14px', marginBottom: '24px' }}>Provide updated address along with valid proof document.</p>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px', color: '#173b57' }}>New Street Address</label>
                <input className="input-field" defaultValue="#99, 10th Main, HSR Layout Sector 1, Bengaluru" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px', color: '#173b57' }}>Pin Code</label>
                  <input className="input-field" defaultValue="560102" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px', color: '#173b57' }}>Proof Document</label>
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
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#173b57' }}>Update Request Submitted!</h2>
            <p style={{ color: '#476179', fontSize: '14px', marginBottom: '24px' }}>Reference Number: <strong>REQ-ADDR-99182</strong></p>
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
    <div className="page page-renew-dl" style={{ width: 'min(700px, calc(100% - 48px))', margin: '40px auto' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        {!submitted ? (
          <>
            <span className="eye-badge"><RefreshCw size={14} /> LICENCE RENEWAL</span>
            <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0', color: '#173b57' }}>Renew Driving Licence</h1>
            <p style={{ color: '#476179', fontSize: '14px', marginBottom: '24px' }}>Submit Form 1A Medical Certificate for DL renewal extension.</p>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Licence Number:</span><strong>KA01 2023 0004567</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Renewal Fee:</span><strong>₹400.00</strong></div>
            </div>

            <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => setSubmitted(true)}>
              Submit Renewal Application & Pay ₹400
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#173b57' }}>Renewal Request Submitted!</h2>
            <p style={{ color: '#476179', fontSize: '14px', marginBottom: '24px' }}>Reference Number: <strong>REN-KA01-44102</strong></p>
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
    <div className="page page-duplicate-dl" style={{ width: 'min(700px, calc(100% - 48px))', margin: '40px auto' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <span className="eye-badge"><Copy size={14} /> DUPLICATE SMARTCARD</span>
        <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0', color: '#173b57' }}>Request Duplicate Licence</h1>
        <p style={{ color: '#476179', fontSize: '14px', marginBottom: '24px' }}>Select reason for duplicate smartcard request (Lost, Damaged, or Stolen).</p>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {['Smartcard Lost / Missing (FIR Copy Required)', 'Smartcard Damaged / Unreadable Chip', 'Stolen Smartcard'].map((r, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: '#f8fafc', borderRadius: '10px', cursor: 'pointer' }}>
              <input type="radio" name="reason" defaultChecked={i === 0} />
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#173b57' }}>{r}</span>
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

// 6. My Journey Timeline (65:4739)
export function MyJourneyTimelinePage() {
  return (
    <div className="page page-journey" style={{ width: 'min(900px, calc(100% - 48px))', margin: '40px auto' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <span className="eye-badge"><Sparkles size={14} /> USER TIMELINE</span>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#173b57', margin: '8px 0' }}>My Driving Journey</h1>
        <p style={{ color: '#476179', fontSize: '15px', marginBottom: '24px' }}>Complete history of your Indian Drives interactions and active credentials.</p>

        <div style={{ display: 'grid', gap: '20px' }}>
          {[
            { date: '26 Aug 2026', title: 'Permanent DL Application Initiated', desc: 'Fee paid and automated test slot booked for 24 Oct 2026.' },
            { date: '12 Jun 2026', title: 'Learner Licence Exam Passed (18/20)', desc: 'Issued active LL #KA01/2026/009182 valid for 6 months.' },
            { date: '10 Feb 2024', title: 'Aadhaar e-KYC Identity Verification', desc: 'Digital profile verified successfully.' }
          ].map((j, i) => (
            <div key={i} style={{ borderLeft: '3px solid #173b57', paddingLeft: '16px' }}>
              <div style={{ fontSize: '12px', color: '#e88a2d', fontWeight: 800 }}>{j.date}</div>
              <h4 style={{ margin: '4px 0', fontSize: '16px', color: '#173b57' }}>{j.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#476179' }}>{j.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
