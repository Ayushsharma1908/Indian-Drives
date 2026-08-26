import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  RefreshCw, Copy, Edit3, ShieldCheck, CheckCircle2, FileText, ArrowRight,
  Upload, Clock, Sparkles, MapPin, CalendarDays, Search, HelpCircle, Check,
  Car, Shield, Award, Flag, User, CreditCard, Lock, AlertCircle, FileCheck, X
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

// ----------------------------------------------------------------------
// 1. LICENCE SERVICES HUB PAGE (1:1 IMAGE 1 MATCH)
// ----------------------------------------------------------------------
export function LicenceServicesHubPage() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'renew',
      title: 'Renew Driving Licence',
      desc: 'Renew your licence and continue driving legally.',
      buttonText: 'Renew Licence →',
      path: '/renew-licence',
      icon: RefreshCw
    },
    {
      id: 'duplicate',
      title: 'Duplicate Driving Licence',
      desc: 'Request a duplicate licence if your licence is lost or damaged.',
      buttonText: 'Get Duplicate →',
      path: '/duplicate-licence',
      icon: FileText
    },
    {
      id: 'update',
      title: 'Update Licence Details',
      desc: 'Update eligible personal or licence information.',
      buttonText: 'Update Details →',
      path: '/update-licence',
      icon: Edit3
    }
  ];

  return (
    <div className="page page-licence-services" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Page Title Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.8px' }}>
          How can we help with your licence?
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
          Choose a service for your existing Driving Licence.
        </p>
      </div>

      {/* 3 Service Cards Grid (1:1 Image 1) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              onClick={() => navigate(s.path)}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '36px 32px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, boxShadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 37, 66, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 37, 66, 0.03)';
              }}
            >
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#173b57',
                  marginBottom: '24px'
                }}>
                  <Icon size={22} strokeWidth={2.2} />
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.3px' }}>
                  {s.title}
                </h3>

                <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 28px 0', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>

              <div style={{
                color: '#b45309',
                fontSize: '14px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {s.buttonText}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 2. MANAGE DRIVING LICENCE VERIFICATION PAGE (1:1 IMAGE 2 MATCH)
// ----------------------------------------------------------------------
export function ManageDrivingLicencePage() {
  const navigate = useNavigate();
  const [dlNo, setDlNo] = useState('');
  const [dob, setDob] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/licence-verified');
  };

  return (
    <div className="page page-manage-dl" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '48px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Centered Verification Card */}
      <div style={{
        maxWidth: '540px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '28px',
        padding: '44px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 40px rgba(0, 37, 66, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Soft Decorative Watermark Circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: '#f0f9ff',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: '#e0f2fe',
            color: '#0369a1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <CreditCard size={22} />
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
            Manage your Driving Licence
          </h2>

          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 32px 0', lineHeight: 1.5 }}>
            Enter your licence details to access services related to your existing licence.
          </p>

          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#173b57', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '8px' }}>
                Driving Licence Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. KA-01-20230004567"
                  value={dlNo}
                  onChange={(e) => setDlNo(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    fontSize: '15px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    color: '#173b57',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <CreditCard size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#173b57', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '8px' }}>
                Date of Birth
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="mm/dd/yyyy"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    fontSize: '15px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    color: '#173b57',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <CalendarDays size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <button
                type="submit"
                style={{
                  background: '#002542',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
                }}
              >
                Verify Licence <ArrowRight size={16} />
              </button>

              <a
                href="#help"
                onClick={(e) => { e.preventDefault(); alert("You can find your DL number printed on the front of your physical Driving Licence smartcard or DigiLocker copy."); }}
                style={{ fontSize: '13px', color: '#b45309', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <HelpCircle size={15} /> Where can I find my DL number?
              </a>
            </div>

          </form>

        </div>
      </div>

      {/* Footer Tag */}
      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <Lock size={12} /> SECURE VERIFICATION PORTAL
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 3. LICENCE FOUND PAGE (1:1 IMAGE 3 MATCH)
// ----------------------------------------------------------------------
export function LicenceFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page page-licence-found" style={{ width: 'min(900px, calc(100% - 48px))', margin: '48px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Banner Title */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          background: '#002542',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 800,
          padding: '4px 12px',
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          <Check size={12} strokeWidth={3} /> VERIFICATION COMPLETE
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: 0, letterSpacing: '-0.8px' }}>
          Driving Licence Found
        </h1>
      </div>

      {/* Main Licence Found Card (1:1 Image 3) */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 6px 24px rgba(0, 37, 66, 0.04)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '36px' }}>
          
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            
            {/* Passport Photo Box */}
            <div style={{
              width: '120px',
              height: '140px',
              borderRadius: '16px',
              background: '#cbd5e1',
              overflow: 'hidden',
              flexShrink: 0,
              border: '2px solid #e2e8f0'
            }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Rajesh Kumar Sharma"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Main Info Block */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Full Name</div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#173b57', margin: '2px 0 16px 0' }}>
                    Rajesh Kumar Sharma
                  </h2>
                </div>

                <span style={{
                  background: '#e0f2fe',
                  color: '#0369a1',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  🛡️ Active Status
                </span>
              </div>

              {/* DL Number Monospace Box */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Driving Licence Number</div>
                <div style={{
                  background: '#e0f2fe',
                  color: '#002542',
                  fontSize: '20px',
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  marginTop: '4px',
                  display: 'inline-block'
                }}>
                  MH-01-2015-0034921
                </div>
              </div>
            </div>

          </div>

          {/* Details Row Divider */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '24px',
            marginTop: '32px',
            paddingTop: '28px',
            borderTop: '1px solid #f1f5f9'
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Vehicle Classes</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ background: '#f1f5f9', color: '#173b57', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '8px' }}>MCWG</span>
                <span style={{ background: '#f1f5f9', color: '#173b57', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '8px' }}>LMV</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Issue Date</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>22 Oct 2015</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Expiry Date</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>21 Oct 2035</div>
            </div>
          </div>

        </div>

        {/* Bottom Light Blue Bar */}
        <div style={{
          background: '#e0f2fe',
          padding: '20px 36px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '13px', color: '#0369a1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>ℹ️</span> Data verified securely via Central Repository
          </div>

          <button
            onClick={() => navigate('/licence-services')}
            style={{
              background: '#002542',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
            }}
          >
            View Available Services <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 4. RENEW DRIVING LICENCE PAGE (1:1 IMAGE 4 MATCH)
// ----------------------------------------------------------------------
export function RenewDrivingLicencePage() {
  const navigate = useNavigate();

  return (
    <div className="page page-renew-dl" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#173b57', margin: 0, letterSpacing: '-0.8px' }}>
            Renew your Driving Licence
          </h1>
          <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '16px', textTransform: 'uppercase' }}>
            ✓ ELIGIBLE FOR RENEWAL
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Your current licence is nearing its expiration date. Review your details and complete the renewal process.
        </p>
      </div>

      {/* Main 2-Column Grid (1:1 Image 4) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Current Licence Details Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <User size={18} color="#002542" /> Current Licence Details
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 36px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Licence Number</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>KA-01-2023004</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Holder Name</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>Arjun Sharma</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Vehicle Classes</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>MCWG, LMV</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Date of Expiry</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#dc2626', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    15 Nov 2024 ⚠️
                  </div>
                </div>
              </div>
            </div>

            {/* Smartcard Watermark Graphic */}
            <div style={{
              width: '100px',
              height: '64px',
              borderRadius: '12px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              flexShrink: 0
            }}>
              <CreditCard size={32} />
            </div>
          </div>

          {/* Renewal Checklist Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 20px 0' }}>
              Renewal Checklist
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#173b57', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="#16a34a" />
                Medical Certificate (Form 1A) uploaded and verified.
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#173b57', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="#16a34a" />
                No pending traffic challans found against this licence.
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                Complete fee payment (pending).
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Payment Summary Card (1:1 Image 4) */}
        <div style={{
          background: '#f0f9ff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e0f2fe',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: '#002542',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <FileText size={24} />
            </div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369a1', letterSpacing: '1px', textTransform: 'uppercase' }}>
              PAYMENT SUMMARY
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>
              <span>Renewal Fee</span>
              <strong style={{ color: '#173b57' }}>₹200.00</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
              <span>Processing Fee</span>
              <strong style={{ color: '#173b57' }}>₹50.00</strong>
            </div>

            <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Total Amount</span>
              <strong style={{ fontSize: '24px', fontWeight: 800, color: '#002542' }}>₹250.00</strong>
            </div>
          </div>

          <button
            onClick={() => alert("Processing licence renewal payment of ₹250...")}
            style={{
              width: '100%',
              background: '#002542',
              color: '#ffffff',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
            }}
          >
            Continue Renewal <ArrowRight size={18} />
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Lock size={12} /> SECURE ENCRYPTED TRANSACTION
          </div>
        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 5. UPDATE LICENCE DETAILS PAGE (1:1 IMAGE 5 MATCH)
// ----------------------------------------------------------------------
export function UpdateLicenceDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="page page-update-dl" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Header Tag & Title */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ background: '#f1f5f9', color: '#173b57', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          📄 DL SERVICE
        </span>
        <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#173b57', margin: '8px 0 8px 0', letterSpacing: '-0.8px' }}>
          Update your licence details
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Select the fields you need to update below. We will require supporting documentation for any changes to your official records.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* STEP 1: What needs updating? */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#002542', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                1
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                What needs updating?
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {/* Option 1: Name (Selected) */}
              <div style={{
                background: '#fffbeb',
                border: '2px solid #b45309',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '18px', height: '18px', borderRadius: '50%', background: '#b45309', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>✓</div>
                <User size={22} color="#b45309" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Name</div>
              </div>

              {/* Option 2: Address */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <MapPin size={22} color="#64748b" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>Address</div>
              </div>

              {/* Option 3: Contact Details (Selected) */}
              <div style={{
                background: '#fffbeb',
                border: '2px solid #b45309',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '18px', height: '18px', borderRadius: '50%', background: '#b45309', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>✓</div>
                <CreditCard size={22} color="#b45309" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Contact Details</div>
              </div>
            </div>
          </div>

          {/* STEP 2: Enter new details */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#002542', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                2
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                Enter new details
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Name Field Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ background: '#f0f9ff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e0f2fe' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>CURRENT RECORD</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '4px' }}>FULL NAME</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', marginTop: '2px' }}>Arjun Kumar Sharma</div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#173b57', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    NEW FULL NAME
                  </label>
                  <input
                    type="text"
                    defaultValue="Arjun Sharma"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      color: '#173b57',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Contact Details Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ background: '#f0f9ff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e0f2fe' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>CURRENT RECORD</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '4px' }}>PHONE NUMBER</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>+91 98765 43210</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '8px' }}>EMAIL ADDRESS</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>arjun.s@oldemail.com</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#173b57', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      NEW PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      defaultValue="+91 91234 56789"
                      style={{ width: '100%', padding: '10px 14px', fontSize: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#173b57', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      NEW EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      defaultValue="arjun.sharma@newemail.com"
                      style={{ width: '100%', padding: '10px 14px', fontSize: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 3: Upload Proof */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#002542', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                3
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                Upload Proof
              </h3>
            </div>

            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>
              Please upload valid government-issued documents supporting the requested changes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* Dropzone Box */}
              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                background: '#fafbfc'
              }}>
                <FileText size={28} color="#94a3b8" style={{ margin: '0 auto 10px auto' }} />
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Proof of Name Change</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 14px 0' }}>PDF, JPG up to 5MB</div>
                <button style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', color: '#173b57' }}>
                  Browse Files
                </button>
              </div>

              {/* Uploaded Document Card */}
              <div style={{
                background: '#f0f9ff',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #e0f2fe',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#b45309', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>Aadhar_Card_Updated.pdf</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>1.2 MB • Uploaded ✓</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '4px', background: '#cbd5e1', borderRadius: '2px', marginTop: '16px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: '#b45309' }} />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column Summary Card (1:1 Image 5) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Header ID Graphic Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '20px',
            padding: '20px 24px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                APPLICATION ID
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                UP-829-XL
              </div>
            </div>
            <CreditCard size={36} color="#94a3b8" />
          </div>

          {/* Summary Box */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', margin: '0 0 20px 0' }}>
              Summary
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Updates Selected</span>
                <strong style={{ color: '#173b57' }}>2 Fields</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Documents Required</span>
                <strong style={{ color: '#173b57' }}>1 Uploaded</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Processing Fee</span>
                <strong style={{ color: '#173b57' }}>₹200.00</strong>
              </div>
            </div>

            {/* Info callout */}
            <div style={{ background: '#f0f9ff', borderRadius: '12px', padding: '14px', border: '1px solid #e0f2fe', fontSize: '12px', color: '#0369a1', lineHeight: 1.4, marginBottom: '24px' }}>
              ℹ Changes usually take 3-5 working days to reflect in the digital database after RTO approval.
            </div>

            <button
              onClick={() => alert("Update request submitted for RTO verification.")}
              style={{
                width: '100%',
                background: '#002542',
                color: '#ffffff',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
              }}
            >
              Submit Update <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Lock size={12} /> SECURE MINISTRY PORTAL
          </div>

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 6. DUPLICATE DRIVING LICENCE PAGE
// ----------------------------------------------------------------------
export function DuplicateDrivingLicencePage() {
  const navigate = useNavigate();

  return (
    <div className="page page-duplicate-dl" style={{ width: 'min(900px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 37, 66, 0.04)' }}>
        
        <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '16px', textTransform: 'uppercase' }}>
          📄 DUPLICATE SMARTCARD
        </span>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '12px 0 8px 0', letterSpacing: '-0.8px' }}>
          Request Duplicate Licence
        </h1>

        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>
          Select the reason for duplicate smartcard request (Lost, Damaged, or Stolen).
        </p>

        <div style={{ display: 'grid', gap: '14px', marginBottom: '28px' }}>
          {[
            'Smartcard Lost / Missing (FIR Copy Required)',
            'Smartcard Damaged / Unreadable Chip',
            'Stolen Smartcard'
          ].map((r, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>
              <input type="radio" name="reason" defaultChecked={i === 0} style={{ width: '18px', height: '18px' }} />
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#173b57' }}>{r}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => alert("Duplicate smartcard application submitted cleanly. Fee: ₹500.")}
          style={{
            width: '100%',
            background: '#002542',
            color: '#ffffff',
            border: 'none',
            padding: '16px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
          }}
        >
          Request Duplicate Smartcard (Fee: ₹500) →
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
