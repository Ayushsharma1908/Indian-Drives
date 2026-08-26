import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, CalendarDays, MapPin, CreditCard, Clock,
  ArrowRight, ArrowLeft, Download, Check, Truck, Award, Lock, Info, Calendar,
  User, FileText, Home, ExternalLink, Shield, Sparkles, Building2
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

// ----------------------------------------------------------------------
// COMMON DL FLOW TOP STEPPER COMPONENT (1:1 REFERENCE MATCH FROM IMAGE 1)
// ----------------------------------------------------------------------
export function DLFlowHeaderStepper({ currentStep = 1 }) {
  const steps = [
    { num: 1, title: 'Confirm Details', icon: User, label: 'CURRENT STEP' },
    { num: 2, title: 'Documents', icon: FileText },
    { num: 3, title: 'Payment', icon: CreditCard },
    { num: 4, title: 'Driving Test', icon: Car },
    { num: 5, title: 'Licence', icon: ShieldCheck }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '24px 36px',
      marginBottom: '36px',
      boxShadow: '0 2px 12px rgba(0, 37, 66, 0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx + 1 === currentStep;
          const isDone = idx + 1 < currentStep;

          return (
            <React.Fragment key={step.num}>
              {/* Step Item */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isActive ? '#002542' : isDone ? '#002542' : '#f1f5f9',
                  color: isActive ? '#ffffff' : isDone ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '0 0 0 4px rgba(0, 37, 66, 0.15)' : 'none',
                  transition: 'all 0.2s ease'
                }}>
                  {isDone ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: isActive ? 800 : 600, color: isActive ? '#173b57' : '#64748b' }}>
                    {step.title}
                  </div>
                  {isActive && (
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>
                      CURRENT STEP
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: idx + 1 < currentStep ? '#002542' : '#e2e8f0',
                  margin: '0 16px',
                  marginBottom: '24px',
                  transition: 'all 0.2s ease'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. STEP 1: CONTINUE TO YOUR DRIVING LICENCE (VERIFICATION FORM - IMAGE 2)
// ----------------------------------------------------------------------
export function DLIntroPage() {
  const navigate = useNavigate();
  const [llNumber, setLlNumber] = useState('LLA20260012345');
  const [dob, setDob] = useState('1998-08-14');

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/dl/ll-found');
  };

  return (
    <div className="page page-dl-verify" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Centered Modal Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 8px 30px rgba(0, 37, 66, 0.06)',
        width: '100%',
        maxWidth: '480px',
        padding: '40px 36px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
          Continue to your Driving Licence
        </h1>

        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 32px 0', lineHeight: 1.5 }}>
          Enter your Learner Licence details to retrieve your existing information.
        </p>

        <form onSubmit={handleVerify} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Field 1: LL Number */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                LEARNER LICENCE NUMBER
              </label>
              <button
                type="button"
                onClick={() => alert("Your Learner Licence number is printed on your Form 3 digital copy (e.g. LLA20260012345).")}
                style={{ background: 'none', border: 'none', color: '#002542', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                WHERE TO FIND THIS →
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={llNumber}
                onChange={(e) => setLlNumber(e.target.value)}
                placeholder="E.G., LLA20260012345"
                required
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 16px',
                  fontSize: '15px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  color: '#173b57',
                  fontWeight: 600,
                  boxSizing: 'border-box'
                }}
              />
              <FileText size={18} color="#94a3b8" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Field 2: Date of Birth */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: '8px' }}>
              DATE OF BIRTH
            </label>

            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 16px',
                  fontSize: '15px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  color: '#173b57',
                  fontWeight: 600,
                  boxSizing: 'border-box'
                }}
              />
              <Calendar size={18} color="#94a3b8" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ height: '8px' }} />

          {/* Submit Button */}
          <button
            type="submit"
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
            Verify & Continue <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* Footer Security Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px', fontWeight: 600, marginTop: '24px' }}>
        <Lock size={14} /> Secured via National Register
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 2. STEP 2: LEARNER LICENCE FOUND RESULT CARD (IMAGE 3)
// ----------------------------------------------------------------------
export function DLLearnerFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page page-dl-ll-found" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Success Icon */}
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#e0f2fe',
        color: '#0284c7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <Check size={28} strokeWidth={3} />
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
        Learner Licence Found
      </h1>

      <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px 0' }}>
        We found your Learner Licence. Please review the information below.
      </p>

      {/* Main Info Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 6px 24px rgba(0, 37, 66, 0.04)',
        width: '100%',
        maxWidth: '560px',
        padding: '32px',
        marginBottom: '32px'
      }}>
        
        {/* Card Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              LICENCE HOLDER
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#173b57', marginTop: '2px' }}>
              Yanshi Sharma
            </div>
          </div>

          <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7' }} /> Active
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>LL Number</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>LLA20260012345</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Vehicle Class</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Car size={16} /> LMV (Light Motor Vehicle)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Date of Birth</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>14 Aug 1998</div>
          </div>

          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Issue Date</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>12 Jan 2024</div>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Valid Until</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="#dc2626" /> 11 Jul 2024
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => navigate('/dl/start')}
          style={{
            background: '#002542',
            color: '#ffffff',
            border: 'none',
            padding: '16px 28px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
          }}
        >
          Continue to DL Application <ArrowRight size={18} />
        </button>

        <button
          onClick={() => alert("Downloading copy of Learner Licence (PDF)...")}
          style={{
            background: '#ffffff',
            color: '#173b57',
            border: '1px solid #cbd5e1',
            padding: '16px 24px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Download size={18} /> Download Copy
        </button>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 3. STEP 3: DL APPLICATION INTRO & STEPPER HEADER (IMAGE 1)
// ----------------------------------------------------------------------
export function DLStartIntroPage() {
  const navigate = useNavigate();

  return (
    <div className="page page-dl-start" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Header Badge & Titles */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          <ShieldCheck size={14} color="#0284c7" /> LEARNER RECORD RETRIEVED
        </div>

        <h1 style={{ fontSize: '34px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.8px' }}>
          Let's get your Driving Licence application started.
        </h1>

        <p style={{ color: '#64748b', fontSize: '16px', margin: 0, lineHeight: 1.5, maxWidth: '680px' }}>
          Your Learner Licence information has already been retrieved. We'll use it to make this application simpler.
        </p>
      </div>

      {/* Top Horizontal Stepper Track */}
      <DLFlowHeaderStepper currentStep={1} />

      {/* Important Alert Box */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '20px',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#fed7aa',
          color: '#9a3412',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Info size={22} />
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 4px 0' }}>
            Important
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#0369a1', lineHeight: 1.5, fontWeight: 500 }}>
            You don't need to enter your details again unless something needs to be updated. We have pre-filled the application using your existing records to save you time.
          </p>
        </div>

        {/* Faded background icon */}
        <Info size={120} color="#e0f2fe" style={{ position: 'absolute', right: '-20px', bottom: '-30px', opacity: 0.5, pointerEvents: 'none' }} />
      </div>

      {/* Action Buttons Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <button
          onClick={() => navigate('/journey?stage=dl')}
          style={{
            background: '#ffffff',
            color: '#173b57',
            border: '1px solid #cbd5e1',
            padding: '14px 24px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back to DL Dashboard
        </button>

        <button
          onClick={() => navigate('/dl/address')}
          style={{
            background: '#002542',
            color: '#ffffff',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0, 37, 66, 0.15)'
          }}
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 4. STEP 4: CONFIRM YOUR ADDRESS (IMAGE 4)
// ----------------------------------------------------------------------
export function DLConfirmAddressPage() {
  const navigate = useNavigate();
  const [unchanged, setUnchanged] = useState(true);

  return (
    <div className="page page-dl-address" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 2-Column Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '48px', alignItems: 'start', marginBottom: '40px' }}>
        
        {/* Left Column: Heading & Subtext */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
            STEP 3 OF 5
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 16px 0', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Confirm your address
          </h1>

          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: '0 0 32px 0' }}>
            We've retrieved your address from your Learner Licence. Please review the details below to ensure they are still accurate before proceeding.
          </p>

          {/* Decorative Grid Pattern Box */}
          <div style={{
            width: '180px',
            height: '180px',
            border: '2px dashed #cbd5e1',
            borderRadius: '16px',
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.6
          }} />
        </div>

        {/* Right Column: Address Cards & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Current Address Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '12px' }}>
              <MapPin size={20} color="#002542" /> Current Address
            </div>
            <p style={{ margin: 0, fontSize: '15px', color: '#476179', lineHeight: 1.6, paddingLeft: '30px' }}>
              123, Sector 4, MG Road,<br />
              Bengaluru, Karnataka 560034
            </p>
          </div>

          {/* Permanent Address Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '12px' }}>
              <Home size={20} color="#002542" /> Permanent Address
            </div>
            <p style={{ margin: 0, fontSize: '15px', color: '#476179', lineHeight: 1.6, paddingLeft: '30px' }}>
              45, Model Town, Civil Lines,<br />
              New Delhi, Delhi 110009
            </p>
          </div>

          {/* Unchanged Checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: '8px 0', select: 'none' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              background: unchanged ? '#002542' : '#ffffff',
              border: '2px solid #002542',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }} onClick={() => setUnchanged(!unchanged)}>
              {unchanged && <Check size={14} strokeWidth={3} />}
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#173b57' }}>
              My address is unchanged
            </span>
          </label>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button
              onClick={() => navigate('/dl/documents')}
              style={{
                background: '#002542',
                color: '#ffffff',
                border: 'none',
                padding: '16px 28px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
              }}
            >
              Confirm & Continue <ArrowRight size={18} />
            </button>

            <button
              onClick={() => alert("Address update flow initiated. Please provide your updated address proof.")}
              style={{
                background: '#ffffff',
                color: '#173b57',
                border: '1px solid #cbd5e1',
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              Update Address
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 5. STEP 5: YOUR DOCUMENTS ARE ALREADY VERIFIED (IMAGE 5)
// ----------------------------------------------------------------------
export function DLVerifiedDocumentsPage() {
  const navigate = useNavigate();

  const docCards = [
    {
      title: 'Identity Proof',
      icon: FileText,
      detail: 'Aadhaar Card (XXXX XXXX 1234)',
      tag: 'VERIFIED FROM LEARNER LICENCE'
    },
    {
      title: 'Address Proof',
      icon: MapPin,
      detail: 'Passport (Ends in 5678)',
      tag: 'VERIFIED FROM LEARNER LICENCE'
    },
    {
      title: 'Photograph',
      icon: User,
      detail: 'Captured on 12 May 2023',
      tag: 'VERIFIED FROM LEARNER LICENCE'
    },
    {
      title: 'Signature',
      icon: FileText,
      detail: 'Digital upload on file',
      tag: 'VERIFIED FROM LEARNER LICENCE'
    }
  ];

  return (
    <div className="page page-dl-documents" style={{ width: 'min(980px, calc(100% - 48px))', margin: '48px auto', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' }}>
      
      {/* Title & Subtitle */}
      <h1 style={{ fontSize: '34px', fontWeight: 800, color: '#173b57', margin: '0 0 12px 0', letterSpacing: '-0.8px' }}>
        Your documents are already verified
      </h1>

      <p style={{ color: '#64748b', fontSize: '16px', margin: '0 auto 48px auto', maxWidth: '620px', lineHeight: 1.5 }}>
        We'll reuse the documents from your Learner Licence wherever possible, saving you time and effort in your application.
      </p>

      {/* 2x2 Grid of Verified Documents Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
        {docCards.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <div key={idx} style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '28px 32px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
              textAlign: 'left',
              position: 'relative'
            }}>
              {/* Top-right Green Checkmark Circle */}
              <div style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Check size={14} strokeWidth={3} />
              </div>

              {/* Title with Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '16px' }}>
                <Icon size={20} color="#002542" /> {doc.title}
              </div>

              {/* Detail & Bold Verified Tag */}
              <div style={{ fontSize: '14px', color: '#476179', fontWeight: 500, marginBottom: '6px' }}>
                {doc.detail}
              </div>

              <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                {doc.tag}
              </div>
            </div>
          );
        })}
      </div>

      {/* Centered Continue Button */}
      <button
        onClick={() => navigate('/dl/fee-summary')}
        style={{
          background: '#002542',
          color: '#ffffff',
          border: 'none',
          padding: '16px 36px',
          borderRadius: '12px',
          fontWeight: 800,
          fontSize: '15px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(0, 37, 66, 0.2)'
        }}
      >
        Continue to Review <ArrowRight size={18} />
      </button>

    </div>
  );
}

// ----------------------------------------------------------------------
// 6. DL FEE SUMMARY & PAYMENT
// ----------------------------------------------------------------------
export function DLPaymentCheckoutPage() {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);

  return (
    <div className="page page-dl-payment" style={{ width: 'min(640px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)' }}>
        {!paid ? (
          <>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase' }}>
              STEP 4 OF 5 · SECURE CHECKOUT
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#173b57', margin: '8px 0 20px 0' }}>
              Driving Licence Fee Payment
            </h1>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '15px' }}>
                <span>DL Form Fee (Form 7):</span><strong>₹200.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0', fontSize: '15px' }}>
                <span>Automated Track Test Fee:</span><strong>₹300.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0', fontSize: '15px' }}>
                <span>Smartcard Licence Printing:</span><strong>₹200.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', fontSize: '20px', fontWeight: 800, color: '#002542' }}>
                <span>Total Payable Amount:</span><strong>₹700.00</strong>
              </div>
            </div>

            <button
              onClick={() => setPaid(true)}
              style={{ width: '100%', background: '#002542', color: '#ffffff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              Pay ₹700.00 via UPI / Card <CreditCard size={20} />
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0' }}>Payment Successful!</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>
              Transaction ID: <strong>TXN-DL-9844-01X</strong> (Amount Paid: ₹700.00)
            </p>

            <button
              onClick={() => navigate('/dl/test-center')}
              style={{ width: '100%', background: '#002542', color: '#ffffff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              Select Driving Test RTO & Date <CalendarDays size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 7. DL TEST SLOT BOOKING PAGE
// ----------------------------------------------------------------------
export function DLTestSlotBookingPage() {
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState('indiranagar');
  const [selectedDate, setSelectedDate] = useState('2026-10-24');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  return (
    <div className="page page-dl-slot" style={{ width: 'min(860px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase' }}>
          STEP 5 OF 5 · FINAL STEP
        </span>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#173b57', margin: '8px 0 24px 0' }}>
          Book Driving Test Track Slot
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', marginBottom: '14px' }}>1. Choose RTO Test Track</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { id: 'indiranagar', title: 'Indiranagar Automated Track', desc: 'Track 4, Near BDA Complex' },
                { id: 'ecity', title: 'Electronic City RTO Track', desc: 'Phase 1 Transport Complex' }
              ].map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCenter(c.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: selectedCenter === c.id ? '2px solid #002542' : '1px solid #e2e8f0',
                    background: selectedCenter === c.id ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#173b57' }}>{c.title}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', marginBottom: '14px' }}>2. Select Date & Time Slot</h3>
            <input
              type="date"
              className="input-field"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM'].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSlot(s)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: selectedSlot === s ? '2px solid #e88a2d' : '1px solid #cbd5e1',
                    background: selectedSlot === s ? '#fff7ed' : '#ffffff',
                    color: selectedSlot === s ? '#e88a2d' : '#173b57',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/dl/dashboard')}
          style={{ width: '100%', background: '#002542', color: '#ffffff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          Confirm Test Appointment <CheckCircle2 size={20} />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 8. DL DASHBOARD & TEST RESULTS
// ----------------------------------------------------------------------
export function DLDashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-dashboard" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <span className="eye-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>DL APPLICATION HUB</span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '6px 0 0 0' }}>Driving Licence Status</h1>
        </div>
        <StatusBadge status="Scheduled" text="Test Scheduled" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#002542' }}>APT-982-1049</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Appointment Ref</div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#e88a2d' }}>24 Oct 2026</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Test Date</div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#16a34a' }}>10:00 AM</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Time Slot</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button onClick={() => navigate('/dl/test-result')} style={{ background: '#002542', color: '#ffffff', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>
          Preview Test Result Screen
        </button>
        <button onClick={() => navigate('/dl/dispatch')} style={{ background: '#ffffff', color: '#173b57', border: '1px solid #cbd5e1', padding: '14px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
          Preview Smartcard Dispatch
        </button>
      </div>
    </div>
  );
}

export function DrivingTestResultPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-test-result" style={{ width: 'min(680px, calc(100% - 48px))', margin: '48px auto', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <Award size={40} />
        </div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0' }}>Driving Test Passed!</h1>
        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>
          Automated Track Score: <strong>95/100</strong>. Parallel Parking & Gradient Reverse passed cleanly.
        </p>
        <button onClick={() => navigate('/dl/dispatch')} style={{ background: '#002542', color: '#ffffff', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          View Smartcard Dispatch Status <Truck size={18} />
        </button>
      </div>
    </div>
  );
}

export function LicenceDispatchPage() {
  return (
    <div className="page page-dl-dispatch" style={{ width: 'min(680px, calc(100% - 48px))', margin: '48px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#173b57', margin: '0 0 20px 0' }}>Licence Printing & Delivery</h1>
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'grid', gap: '14px', fontSize: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tracking Number:</span><strong>SP-IN9948201IN</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Courier Partner:</span><strong>India Post Speed Post</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Estimated Delivery:</span><strong style={{ color: '#16a34a' }}>28 Oct 2026</strong></div>
        </div>
      </div>
    </div>
  );
}
