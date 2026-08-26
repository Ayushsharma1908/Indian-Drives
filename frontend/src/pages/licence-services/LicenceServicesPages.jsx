import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  RefreshCw, Copy, Edit3, ShieldCheck, CheckCircle2, FileText, ArrowRight,
  Upload, Clock, Sparkles, MapPin, CalendarDays, Search, HelpCircle, Check,
  Car, Shield, Award, Flag
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

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

// 6. My Journey Speedometer Dashboard (Figma Frame 65:4739)
export function MyJourneyTimelinePage({ initialStage }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryStage = searchParams.get('stage');

  // Stage can be 'll' (0%), 'dl' (62%), or 'completed' (100%)
  const stage = queryStage || initialStage || 'dl';

  const percentage = stage === 'll' ? 0 : stage === 'dl' ? 62 : 100;
  const labelText = stage === 'll' ? 'LL APPLICATION' : stage === 'dl' ? 'DL APPLICATION' : 'DL ISSUED';
  
  // Speedometer Needle Math:
  // Arc angle spans 270° from -135° (left rest pos at 0%) to +135° (right max pos at 100%)
  // At P = 0%, needleAngle = -135° (Rests at 0% mark on the bottom left)
  // At P = 62%, needleAngle = -135 + 0.62 * 270 = +32.4°
  // At P = 100%, needleAngle = +135°
  const needleAngle = -135 + (percentage / 100) * 270;

  // Arc math for gauge
  const radius = 120;
  const cx = 170;
  const cy = 180;

  // Render 11 speedometer dial ticks (0% to 100%)
  const dialTicks = Array.from({ length: 11 }, (_, i) => {
    const val = i * 10;
    const tickAngle = -135 + (val / 100) * 270;
    const rad = (tickAngle * Math.PI) / 180;
    
    // Outer and inner radii for tick lines
    const outerR = 122;
    const innerR = i % 2 === 0 ? 108 : 114;
    const textR = 92;

    const x1 = cx + outerR * Math.cos(rad);
    const y1 = cy + outerR * Math.sin(rad);
    const x2 = cx + innerR * Math.cos(rad);
    const y2 = cy + innerR * Math.sin(rad);

    const tx = cx + textR * Math.cos(rad);
    const ty = cy + textR * Math.sin(rad);

    return { val, x1, y1, x2, y2, tx, ty, isMajor: i % 2 === 0 };
  });

  return (
    <div className="page page-journey-figma" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Title Header */}
      <div>
        <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0', letterSpacing: '-1.2px', textTransform: 'uppercase' }}>
          YOUR DRIVING JOURNEY
        </h1>
        <p style={{ color: '#476179', fontSize: '16px', margin: 0 }}>
          Real-time automotive speedometer dashboard & milestone tracker.
        </p>
      </div>

      {/* Main 2-Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Automotive Car Speedometer Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px 28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            AUTOMOTIVE DASHBOARD GAUGE
          </div>

          {/* SVG Speedometer Dial Cluster */}
          <div style={{ position: 'relative', width: '340px', height: '310px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="340" height="310" viewBox="0 0 340 310">
              <defs>
                {/* Metallic Chrome Dial Outer Gradient */}
                <linearGradient id="dialRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#173b57" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                {/* Saffron Gauge Arc Gradient */}
                <linearGradient id="gaugeArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e88a2d" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>

                {/* Center Hub Metallic Cap */}
                <radialGradient id="needleCapGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="70%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
              </defs>

              {/* Dial Background Arc Track */}
              <path
                d="M 85.1 264.9 A 120 120 0 1 1 254.9 264.9"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Progress Color Arc Track */}
              <path
                d="M 85.1 264.9 A 120 120 0 1 1 254.9 264.9"
                fill="none"
                stroke="url(#gaugeArcGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="565.48"
                strokeDashoffset={565.48 - (percentage / 100) * 565.48}
                style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />

              {/* Speedometer Dial Ticks & Speed Digits */}
              {dialTicks.map(t => (
                <g key={t.val}>
                  <line
                    x1={t.x1}
                    y1={t.y1}
                    x2={t.x2}
                    y2={t.y2}
                    stroke={t.isMajor ? '#173b57' : '#94a3b8'}
                    strokeWidth={t.isMajor ? 3 : 1.5}
                    strokeLinecap="round"
                  />
                  {t.isMajor && (
                    <text
                      x={t.tx}
                      y={t.ty}
                      fill="#476179"
                      fontSize="11"
                      fontWeight="800"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {t.val}
                    </text>
                  )}
                </g>
              ))}

              {/* 4 Major Milestone Node Labels around Dial */}
              <g transform="translate(68, 276)">
                <circle r="6" fill={stage === 'll' ? '#e88a2d' : '#16a34a'} />
                <text x="0" y="16" fill="#173b57" fontSize="10" fontWeight="800" textAnchor="middle">START (0%)</text>
              </g>

              <g transform="translate(68, 80)">
                <circle r="6" fill={stage !== 'll' ? '#16a34a' : '#cbd5e1'} />
                <text x="-10" y="-12" fill="#173b57" fontSize="10" fontWeight="800" textAnchor="end">LL ISSUED</text>
              </g>

              <g transform="translate(272, 80)">
                <circle r="6" fill={stage === 'dl' ? '#e88a2d' : stage === 'completed' ? '#16a34a' : '#cbd5e1'} />
                <text x="10" y="-12" fill="#173b57" fontSize="10" fontWeight="800" textAnchor="start">DL TEST</text>
              </g>

              <g transform="translate(272, 276)">
                <circle r="6" fill={stage === 'completed' ? '#16a34a' : '#cbd5e1'} />
                <text x="0" y="16" fill="#94a3b8" fontSize="10" fontWeight="800" textAnchor="middle">DL ISSUED (100%)</text>
              </g>

              {/* ROTATING SPEEDOMETER NEEDLE / ARROW */}
              <g
                transform={`rotate(${needleAngle}, ${cx}, ${cy})`}
                style={{ transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                {/* Shadow */}
                <polygon
                  points="170,88 175,182 165,182"
                  fill="rgba(0,0,0,0.2)"
                  transform="rotate(4, 170, 180)"
                />
                {/* Needle Blade */}
                <polygon
                  points="170,72 176,180 164,180"
                  fill="#e88a2d"
                />
                {/* Needle Tip Accent */}
                <polygon
                  points="170,72 173,110 167,110"
                  fill="#ffffff"
                />
              </g>

              {/* Speedometer Pivot Center Cap */}
              <circle cx={cx} cy={cy} r="16" fill="url(#needleCapGradient)" stroke="#ffffff" strokeWidth="2.5" boxShadow="0 4px 10px rgba(0,0,0,0.3)" />
              <circle cx={cx} cy={cy} r="5" fill="#e88a2d" />

              {/* LCD Odometer Digital Reading Box at Dial Base */}
              <rect x="120" y="222" width="100" height="38" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <text x="170" y="246" fill="#e88a2d" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="monospace" letterSpacing="1px">
                {percentage}%
              </text>
            </svg>
          </div>

          {/* Speedometer Status Banner below dial */}
          <div style={{ width: '100%', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: percentage === 0 ? '#e88a2d' : '#16a34a', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>
                {percentage === 0 ? 'SPEEDOMETER REST POSITION (0%)' : `SPEEDOMETER GAUGING (${percentage}%)`}
              </span>
            </div>

            <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#476179', padding: '4px 10px', borderRadius: '6px', fontWeight: 800 }}>
              {labelText}
            </span>
          </div>

        </div>

        {/* Right Column Sidebar Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: YOUR NEXT STEP */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#173b57' }}>
              <span style={{ color: '#e88a2d', fontSize: '18px' }}>✪</span> YOUR NEXT STEP
            </div>
            <p style={{ fontSize: '14px', color: '#476179', margin: 0, lineHeight: 1.5 }}>
              {stage === 'll'
                ? 'Begin your Learner Licence application. Upload your Aadhaar identity proof and complete the online traffic rules test.'
                : 'Complete your DL application. Your Learner Licence has been issued. You can now continue with your Driving Licence application.'}
            </p>
            <button
              onClick={() => navigate(stage === 'll' ? '/ll/intro' : '/dl/intro')}
              style={{
                width: '100%',
                background: '#173b57',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {stage === 'll' ? 'Start LL application' : 'Continue application'} <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2: Journey Checklist */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#173b57', margin: 0 }}>
              Journey Checklist
            </h3>

            {stage === 'll' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff7ed', border: '2px solid #e88a2d', color: '#e88a2d', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>
                    ⊙
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>Aadhaar Identity Verification</div>
                    <div style={{ fontSize: '12px', color: '#e88a2d', fontWeight: 600 }}>Ready to start</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>
                    <Clock size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>LL Computer Exam</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Not started</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>
                    <Clock size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>Learner Licence Issuance</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Pending</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>Learner Licence Issued</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Completed on 12 Aug 2026</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>Medical Certificate Uploaded</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Verified</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff7ed', border: '2px solid #e88a2d', color: '#e88a2d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>
                    ⊙
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>DL Application Form</div>
                    <div style={{ fontSize: '12px', color: '#e88a2d', fontWeight: 600 }}>In progress</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: GOVERNMENT RECORD */}
          <div style={{ background: '#eef2f6', borderRadius: '16px', padding: '18px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Shield size={20} color="#476179" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#476179', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                GOVERNMENT RECORD
              </span>
              <span style={{ fontSize: '12px', color: '#476179', lineHeight: 1.5 }}>
                {stage === 'll'
                  ? 'LL Application Status: Not Started · Ready to Begin'
                  : 'DL Application Status: Under Review · Last updated: 25 Aug 2026 · 4:32 PM'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
