import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, CalendarDays, MapPin, CreditCard, Clock,
  ArrowRight, ArrowLeft, Download, Check, Truck, Award, Lock, Info, Calendar,
  User, FileText, Home, ExternalLink, Shield, Sparkles, Building2, HelpCircle
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { centralDataStore } from '../../data/centralDataStore';
import { getStoredUserProfile } from '../../data/userProfileData';
import { UnifiedStageStepper } from '../../components/ui/UnifiedStageStepper';

import { useLanguage } from '../../main';

// ----------------------------------------------------------------------
// COMMON DL FLOW TOP STEPPER COMPONENT (1:1 REFERENCE MATCH FROM IMAGE 1)
// ----------------------------------------------------------------------
export function DLFlowHeaderStepper({ currentStep = 1 }) {
  const steps = [
    { id: 'details', num: 1, title: 'Confirm Details', icon: User, path: '/dl/documents' },
    { id: 'documents', num: 2, title: 'Documents', icon: FileText, path: '/dl/documents' },
    { id: 'payment', num: 3, title: 'Payment', icon: CreditCard, path: '/dl/fee-summary' },
    { id: 'test', num: 4, title: 'Driving Test', icon: Car, path: '/dl/test-slot' },
    { id: 'licence', num: 5, title: 'Licence', icon: ShieldCheck, path: '/dl/dispatch' }
  ];

  return (
    <UnifiedStageStepper
      steps={steps}
      currentStepIndex={currentStep - 1}
      flowName="DRIVING LICENCE FLOW"
    />
  );
}

// ----------------------------------------------------------------------
// 1. STEP 1: CONTINUE TO YOUR DRIVING LICENCE (VERIFICATION FORM - IMAGE 2)
// ----------------------------------------------------------------------
export function DLIntroPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
          {t('dlFlow.introTitle')}
        </h1>

        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 32px 0', lineHeight: 1.5 }}>
          {t('dlFlow.introSub')}
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
  const { t } = useLanguage();
  const profile = getStoredUserProfile();

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
        {t('dlFlow.learnerFoundTitle') || 'Learner Licence Found'}
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
              {profile.fullName}
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
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>{profile.llNumber}</div>
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
  const { t } = useLanguage();

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
// 4. STEP 4: CONFIRM / UPDATE YOUR ADDRESS (IMAGE 4)
// ----------------------------------------------------------------------
export function DLConfirmAddressPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [unchanged, setUnchanged] = useState(true);

  // Editable Address Form State
  const [flatNo, setFlatNo] = useState('123, Sector 4, MG Road');
  const [area, setArea] = useState('Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('560034');
  const [docUploaded, setDocUploaded] = useState(true);

  const handleSaveUpdatedAddress = (e) => {
    e.preventDefault();
    setUnchanged(false);
    setIsEditing(false);
    alert("Updated address saved successfully! Proceeding to document verification.");
    navigate('/dl/documents');
  };

  return (
    <div className="page page-dl-address" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {!isEditing ? (
        /* NORMAL CONFIRM ADDRESS VIEW (IMAGE 4) */
        <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '48px', alignItems: 'start', marginBottom: '40px' }}>
          
          {/* Left Column: Heading & Subtext */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
              STEP 3 OF 5
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 16px 0', letterSpacing: '-1px', lineHeight: 1.1 }}>
              Confirm your address
            </h1>

            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: '0' }}>
            </p>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                  <MapPin size={20} color="#002542" /> Current Address
                </div>
                {!unchanged && (
                  <span style={{ background: '#fff7ed', color: '#e88a2d', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px' }}>
                    Updated Address
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '15px', color: '#476179', lineHeight: 1.6, paddingLeft: '30px' }}>
                {flatNo}, {area},<br />
                {city}, {stateName} {pincode}
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
                onClick={() => setIsEditing(true)}
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
      ) : (
        /* INTERACTIVE UPDATE ADDRESS SCREEN / FORM */
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '36px 40px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)',
          maxWidth: '780px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            STEP 3 OF 5 · UPDATE DISPATCH ADDRESS
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0' }}>
            Update Your Dispatch Address
          </h2>

          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 28px 0', lineHeight: 1.5 }}>
            Provide your new address details along with a valid address proof for official Smartcard licence delivery.
          </p>

          <form onSubmit={handleSaveUpdatedAddress} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                HOUSE / FLAT NO. & BUILDING NAME
              </label>
              <input
                type="text"
                value={flatNo}
                onChange={(e) => setFlatNo(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                STREET / ROAD / AREA
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                CITY / DISTRICT
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                STATE
              </label>
              <select
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', fontWeight: 600, boxSizing: 'border-box', background: '#fff' }}
              >
                <option value="Karnataka">Karnataka</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                PINCODE
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#173b57', fontWeight: 600, boxSizing: 'border-box' }}
              />
            </div>

            {/* Document Proof Upload Box */}
            <div style={{ gridColumn: 'span 2', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '14px', padding: '20px', textAlign: 'center', marginTop: '8px' }}>
              <MapPin size={24} color="#002542" style={{ margin: '0 auto 8px auto' }} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>
                Upload Updated Address Proof
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 12px 0' }}>
                Aadhaar Update Receipt, Electricity Bill, Bank Passbook, or Registered Rent Agreement (PDF / JPG up to 5MB)
              </div>
              <div style={{ background: '#dcfce7', color: '#16a34a', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} strokeWidth={3} /> Address_Proof_Updated.pdf Attached
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '16px', marginTop: '12px' }}>
              <button
                type="submit"
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
                Save Updated Address & Continue <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
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
                Cancel / Use Original Address
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------------------------
// 5. STEP 5: YOUR DOCUMENTS ARE ALREADY VERIFIED (IMAGE 5)
// ----------------------------------------------------------------------
export function DLVerifiedDocumentsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
// 6. DL FEE SUMMARY & PAYMENT (1:1 LL PAYMENT MATCH)
// ----------------------------------------------------------------------
export function DLPaymentCheckoutPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [paid, setPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'

  // UPI State
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiMode, setUpiMode] = useState('apps'); // 'apps' | 'id' | 'qr'

  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardErrors, setCardErrors] = useState({});

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('hdfc');
  const [customBank, setCustomBank] = useState('');

  // Successful receipt metadata
  const [receiptMeta, setReceiptMeta] = useState(null);

  // Card Number Formatter
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
    if (cardErrors.number) setCardErrors(prev => ({ ...prev, number: null }));
  };

  // Expiry Formatter
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
    if (cardErrors.expiry) setCardErrors(prev => ({ ...prev, expiry: null }));
  };

  // CVV Formatter
  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCvv(val);
    if (cardErrors.cvv) setCardErrors(prev => ({ ...prev, cvv: null }));
  };

  const handleProcessPayment = () => {
    let methodDisplay = 'UPI (Google Pay)';

    if (paymentMethod === 'upi') {
      if (upiMode === 'id') {
        if (!upiId.trim() || !upiId.includes('@')) {
          alert('Please enter a valid UPI ID (e.g. yourname@okhdfcbank)');
          return;
        }
        methodDisplay = `UPI (${upiId})`;
      } else if (upiMode === 'qr') {
        methodDisplay = 'UPI (QR Code Scan)';
      } else {
        const appNames = { gpay: 'Google Pay', phonepe: 'PhonePe', paytm: 'Paytm', bhim: 'BHIM UPI' };
        methodDisplay = `UPI (${appNames[selectedUpiApp] || 'Google Pay'})`;
      }
    } else if (paymentMethod === 'card') {
      const errs = {};
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 16) errs.number = 'Enter a valid 16-digit card number';
      if (!cardName.trim()) errs.name = 'Cardholder name is required';
      if (cardExpiry.length < 5) errs.expiry = 'MM/YY required';
      if (cardCvv.length < 3) errs.cvv = '3-digit CVV required';

      if (Object.keys(errs).length > 0) {
        setCardErrors(errs);
        return;
      }
      const last4 = cleanNum.slice(-4);
      methodDisplay = `Credit/Debit Card (ending in •••• ${last4})`;
    } else if (paymentMethod === 'netbanking') {
      const bankNames = {
        sbi: 'State Bank of India',
        hdfc: 'HDFC Bank',
        icici: 'ICICI Bank',
        axis: 'Axis Bank',
        pnb: 'Punjab National Bank',
        kotak: 'Kotak Mahindra Bank'
      };
      methodDisplay = `Net Banking (${customBank || bankNames[selectedBank] || 'HDFC Bank'})`;
    }

    const txnId = `DS-PAY-${Math.floor(1000 + Math.random() * 9000)}-DL`;
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setReceiptMeta({
      txnId,
      date: now,
      method: methodDisplay,
      amount: '₹700.00',
      appId: 'IND-2026-98124'
    });

    centralDataStore.createPayment({
      title: 'Driving Licence Application & Test Fee',
      amount: 700,
      purpose: 'DL Application Fee',
      method: methodDisplay,
      breakdown: [
        { label: 'DL Form Fee (Form 7)', fee: '₹200.00' },
        { label: 'Automated Track Test Fee', fee: '₹300.00' },
        { label: 'Smartcard Licence Printing', fee: '₹200.00' }
      ]
    });

    setPaid(true);
  };

  // SUCCESS SCREEN WITH COOL CELEBRATION ANIMATION
  if (paid) {
    return (
      <div className="page page-dl-payment-success" style={{ width: 'min(760px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '44px 36px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(16, 45, 67, 0.08)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* Animated Ambient Sparkles */}
          <div style={{ position: 'absolute', top: '24px', left: '20%', color: 'var(--color-saffron)' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '40px', right: '22%', color: 'var(--color-teal)' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '90px', left: '15%', color: 'var(--color-indigo)' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '100px', right: '16%', color: 'var(--color-warm-amber)' }} className="payment-sparkle">✦</div>

          {/* Animated Success Checkmark Badge with Concentric Ripples */}
          <div
            className="payment-success-badge-anim"
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <div className="payment-checkmark-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={48} strokeWidth={2.6} />
            </div>
          </div>

          <div style={{ display: 'inline-block', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>
            GOVERNMENT PAYMENT VERIFIED ✓
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#102D43', margin: '0 0 8px 0', letterSpacing: '-0.6px' }}>
            {t('dlFlow.paymentSuccessTitle') || 'Payment Successful!'}
          </h1>

          <p style={{ color: '#607083', fontSize: '15px', margin: '0 auto 32px auto', maxWidth: '520px', lineHeight: 1.5 }}>
            Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.
          </p>

          {/* Detailed Receipt Card */}
          <div style={{ background: 'var(--color-bg)', borderRadius: '20px', border: '1px solid var(--color-border)', padding: '28px', marginBottom: '32px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-deep-navy)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                OFFICIAL TRANSACTION RECEIPT
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                RECEIPT ID: <strong style={{ color: 'var(--color-text-primary)' }}>{receiptMeta?.txnId || 'DS-PAY-9844-DL'}</strong>
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px 28px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transaction ID</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '4px' }}>{receiptMeta?.txnId || 'DS-PAY-9844-DL'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Time</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '4px' }}>{receiptMeta?.date || 'Just now'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Application Number</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '4px' }}>{receiptMeta?.appId || 'IND-2026-98124'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Mode Used</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '4px' }}>{receiptMeta?.method || 'UPI (Google Pay)'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Amount Paid</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-deep-navy)', marginTop: '2px' }}>₹700.00</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gateway Status</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} /> VERIFIED & CREDITED
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/dl/test-center')}
              className="primary-button"
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Select Driving Test RTO & Slot <ArrowRight size={18} />
            </button>

            <button
              onClick={() => window.print()}
              className="secondary-button"
              style={{
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Download size={16} /> Print / Save Receipt
            </button>
          </div>

        </div>
      </div>
    );
  }

  // MAIN CHECKOUT FORM SCREEN
  return (
    <div className="page page-dl-payment" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-saffron)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
            STEP 4 OF 5 · SECURE PAYMENT
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-deep-navy)', margin: 0, letterSpacing: '-0.5px' }}>
            Secure Payment
          </h1>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Application ID: <strong style={{ color: 'var(--color-deep-navy)' }}>IND-2026-98124</strong> • Jamshedpur RTO (JH-05)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ background: '#ffffff', border: '1px solid var(--color-border)', color: 'var(--color-deep-navy)', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            🔒 256-bit Encrypted
          </span>
          <span style={{ background: 'var(--color-pale-teal)', color: 'var(--color-teal)', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
            RTO Verified Gateway
          </span>
        </div>
      </div>

      {/* 2-Column Checkout Layout */}
      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '36px', alignItems: 'start', marginBottom: '32px' }}>
        
        {/* Left Column: Payment Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-deep-navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            SELECT PAYMENT METHOD
          </span>

          {/* Option 1: UPI */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: paymentMethod === 'upi' ? '2px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: paymentMethod === 'upi' ? '0 4px 16px rgba(16, 45, 67, 0.08)' : 'none',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setPaymentMethod('upi')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paymentMethod === 'upi' ? '5px solid var(--color-deep-navy)' : '2px solid var(--color-border)', boxSizing: 'border-box' }} />
                ⚡ Instant UPI (GPay, PhonePe, Paytm, BHIM)
              </div>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px' }}>
                FASTEST
              </span>
            </div>

            {paymentMethod === 'upi' && (
              <div style={{ paddingLeft: '30px', marginTop: '16px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
                
                {/* Mode Switcher: Apps vs Custom ID vs QR Code */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setUpiMode('apps')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: upiMode === 'apps' ? '1px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                      background: upiMode === 'apps' ? 'var(--color-deep-navy)' : '#ffffff',
                      color: upiMode === 'apps' ? '#ffffff' : 'var(--color-text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    UPI Apps
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiMode('id')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: upiMode === 'id' ? '1px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                      background: upiMode === 'id' ? 'var(--color-deep-navy)' : '#ffffff',
                      color: upiMode === 'id' ? '#ffffff' : 'var(--color-text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    UPI ID / VPA
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiMode('qr')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: upiMode === 'qr' ? '1px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                      background: upiMode === 'qr' ? 'var(--color-deep-navy)' : '#ffffff',
                      color: upiMode === 'qr' ? '#ffffff' : 'var(--color-text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    Scan QR
                  </button>
                </div>

                {upiMode === 'apps' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {[
                      { id: 'gpay', label: 'Google Pay', badge: 'GPay' },
                      { id: 'phonepe', label: 'PhonePe', badge: 'PhonePe' },
                      { id: 'paytm', label: 'Paytm', badge: 'Paytm' },
                      { id: 'bhim', label: 'BHIM UPI', badge: 'BHIM' }
                    ].map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedUpiApp(app.id)}
                        style={{
                          background: selectedUpiApp === app.id ? 'var(--color-pale-indigo)' : '#ffffff',
                          border: selectedUpiApp === app.id ? '2px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                          padding: '12px 8px',
                          borderRadius: '10px',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>{app.badge}</div>
                        <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{app.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {upiMode === 'id' && (
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      ENTER YOUR VPA / UPI ID
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="e.g. username@okhdfcbank"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                        }}
                        style={{ flex: 1, padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-navy)', boxSizing: 'border-box' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (upiId.includes('@')) setUpiVerified(true);
                          else alert('Enter a valid UPI ID (e.g. mobile@upi)');
                        }}
                        className="secondary-button"
                        style={{ padding: '12px 18px', fontSize: '13px', fontWeight: 700 }}
                      >
                        {upiVerified ? '✓ Verified' : 'Verify'}
                      </button>
                    </div>
                    {upiVerified && (
                      <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, marginTop: '6px' }}>
                        ✓ Verified: Yanshi Chauhan (HDFC Bank)
                      </div>
                    )}
                  </div>
                )}

                {upiMode === 'qr' && (
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'inline-block', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--color-deep-navy)" strokeWidth="1.5">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="3" height="3" />
                        <rect x="18" y="14" width="3" height="3" />
                        <rect x="14" y="18" width="7" height="3" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '8px' }}>
                      Scan QR using any UPI App (GPay, Paytm, PhonePe, Cred)
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Option 2: Credit / Debit Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: paymentMethod === 'card' ? '2px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: paymentMethod === 'card' ? '0 4px 16px rgba(16, 45, 67, 0.08)' : 'none',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setPaymentMethod('card')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paymentMethod === 'card' ? '5px solid var(--color-deep-navy)' : '2px solid var(--color-border)', boxSizing: 'border-box' }} />
                💳 Credit / Debit Card (Visa, Mastercard, RuPay)
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                All Cards Accepted
              </span>
            </div>

            {paymentMethod === 'card' && (
              <div style={{ paddingLeft: '30px', marginTop: '16px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', display: 'grid', gap: '14px' }}>
                
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    CARD NUMBER
                  </label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• ••••"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.number ? '1px solid var(--color-error)' : '1px solid var(--color-border)', fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-navy)', boxSizing: 'border-box' }}
                  />
                  {cardErrors.number && <div style={{ fontSize: '11.5px', color: 'var(--color-error)', marginTop: '4px' }}>{cardErrors.number}</div>}
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    NAME ON CARD
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. YANSHI CHAUHAN"
                    value={cardName}
                    onChange={(e) => {
                      setCardName(e.target.value.toUpperCase());
                      if (cardErrors.name) setCardErrors(prev => ({ ...prev, name: null }));
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.name ? '1px solid var(--color-error)' : '1px solid var(--color-border)', fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-navy)', boxSizing: 'border-box' }}
                  />
                  {cardErrors.name && <div style={{ fontSize: '11.5px', color: 'var(--color-error)', marginTop: '4px' }}>{cardErrors.name}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      EXPIRY DATE
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.expiry ? '1px solid var(--color-error)' : '1px solid var(--color-border)', fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-navy)', boxSizing: 'border-box' }}
                    />
                    {cardErrors.expiry && <div style={{ fontSize: '11.5px', color: 'var(--color-error)', marginTop: '4px' }}>{cardErrors.expiry}</div>}
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      value={cardCvv}
                      onChange={handleCvvChange}
                      maxLength={3}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.cvv ? '1px solid var(--color-error)' : '1px solid var(--color-border)', fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-navy)', boxSizing: 'border-box' }}
                    />
                    {cardErrors.cvv && <div style={{ fontSize: '11.5px', color: 'var(--color-error)', marginTop: '4px' }}>{cardErrors.cvv}</div>}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Option 3: Net Banking */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: paymentMethod === 'netbanking' ? '2px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: paymentMethod === 'netbanking' ? '0 4px 16px rgba(16, 45, 67, 0.08)' : 'none',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setPaymentMethod('netbanking')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paymentMethod === 'netbanking' ? '5px solid var(--color-deep-navy)' : '2px solid var(--color-border)', boxSizing: 'border-box' }} />
                🏛 Net Banking (All Indian Banks)
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                Instant Gateway
              </span>
            </div>

            {paymentMethod === 'netbanking' && (
              <div style={{ paddingLeft: '30px', marginTop: '16px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
                
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  POPULAR BANKS
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
                  {[
                    { id: 'hdfc', name: 'HDFC Bank' },
                    { id: 'sbi', name: 'State Bank of India' },
                    { id: 'icici', name: 'ICICI Bank' },
                    { id: 'axis', name: 'Axis Bank' },
                    { id: 'kotak', name: 'Kotak Bank' },
                    { id: 'pnb', name: 'Punjab National Bank' }
                  ].map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        setSelectedBank(b.id);
                        setCustomBank('');
                      }}
                      style={{
                        padding: '12px 10px',
                        borderRadius: '10px',
                        border: selectedBank === b.id && !customBank ? '2px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                        background: selectedBank === b.id && !customBank ? 'var(--color-pale-indigo)' : '#ffffff',
                        textAlign: 'center',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: 'var(--color-deep-navy)',
                        cursor: 'pointer'
                      }}
                    >
                      {b.name}
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    OR SELECT OTHER INDIAN BANK
                  </label>
                  <select
                    value={customBank}
                    onChange={(e) => {
                      setCustomBank(e.target.value);
                      setSelectedBank('');
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '14px', background: '#ffffff', color: 'var(--color-deep-navy)', boxSizing: 'border-box' }}
                  >
                    <option value="">-- Choose from 30+ other banks --</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="Union Bank of India">Union Bank of India</option>
                    <option value="IndusInd Bank">IndusInd Bank</option>
                    <option value="IDBI Bank">IDBI Bank</option>
                    <option value="YES Bank">YES Bank</option>
                    <option value="Federal Bank">Federal Bank</option>
                    <option value="Indian Bank">Indian Bank</option>
                    <option value="Bank of India">Bank of India</option>
                    <option value="Central Bank of India">Central Bank of India</option>
                  </select>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Right Column: Payment Summary */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid var(--color-border)', boxShadow: '0 4px 16px rgba(16, 45, 67, 0.04)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-deep-navy)', margin: '0 0 20px 0' }}>
            Payment Summary
          </h3>

          <div style={{ display: 'grid', gap: '12px', fontSize: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>DL Form Fee (Form 7)</span>
              <strong style={{ color: 'var(--color-deep-navy)' }}>₹200.00</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Automated Track Test Fee</span>
              <strong style={{ color: 'var(--color-deep-navy)' }}>₹300.00</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Smartcard Licence Printing</span>
              <strong style={{ color: 'var(--color-deep-navy)' }}>₹200.00</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-deep-navy)' }}>Total Amount</span>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-deep-navy)', letterSpacing: '-0.5px' }}>₹700.00</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProcessPayment}
            className="primary-button"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            {paymentMethod === 'upi' ? '🔒 PAY ₹700.00 VIA UPI' : paymentMethod === 'card' ? '🔒 PAY ₹700.00 WITH CARD' : '🔒 PROCEED TO BANK (₹700.00)'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> 100% Secure & Govt. Approved Transaction
          </div>
        </div>

      </div>

      {/* Bottom Navigation Links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/dl/documents')}
          className="secondary-button"
          style={{ padding: '8px 16px', fontSize: '13.5px' }}
        >
          ← Cancel & Return
        </button>

        <button
          onClick={() => alert("Connecting to 24x7 RTO Citizen Support...")}
          style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <HelpCircle size={16} /> Need Help?
        </button>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 7A. DL TEST CENTRE SELECTION PAGE (1:1 IMAGE 2 MATCH)
// ----------------------------------------------------------------------
export function DLTestCenterSelectionPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCenter, setSelectedCenter] = useState('sarai');
  const [searchQuery, setSearchQuery] = useState('');

  const centers = [
    {
      id: 'sarai',
      name: 'Sarai Kale Khan RTO',
      distance: '3.2km away',
      slots: ['12 Oct', '14 Oct']
    },
    {
      id: 'vasant',
      name: 'Vasant Vihar Test Track',
      distance: '5.8km away',
      slots: ['Checking slots...']
    },
    {
      id: 'dwarka',
      name: 'Dwarka Sector 22',
      distance: '12.4km away',
      slots: ['18 Oct']
    }
  ];

  return (
    <div className="page page-dl-center-select" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            LOCATION SELECTION
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.8px' }}>
            {t('dlFlow.centerTitle') || 'Select a Test Centre'}
          </h1>
        </div>
        
        <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '420px', margin: 0, textAlign: 'right', lineHeight: 1.5 }}>
          Find the most convenient location for your practical driving test. Availability is updated in real-time.
        </p>
      </div>

      {/* Main 2-Column Grid (Left: List, Right: Map Preview) */}
      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Search & Test Center Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by area or pin code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  color: '#173b57',
                  boxSizing: 'border-box',
                  background: '#ffffff'
                }}
              />
              <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }}>🔍</span>
            </div>
            
            <button style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '12px', color: '#173b57', cursor: 'pointer' }}>
              ⚙️
            </button>
          </div>

          {/* Test Center Cards Stack */}
          {centers.map((c) => {
            const isSelected = selectedCenter === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCenter(c.id)}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  border: isSelected ? '2px solid #002542' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 6px 20px rgba(0, 37, 66, 0.08)' : '0 2px 10px rgba(0, 37, 66, 0.02)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isSelected && (
                  <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#002542', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.5px' }}>
                    Selected
                  </span>
                )}

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
                  {c.name}
                </h3>

                <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                  <MapPin size={14} color="#002542" /> {c.distance}
                </div>

                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Earliest Availability
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: isSelected ? '20px' : '0' }}>
                  {c.slots.map((s, idx) => (
                    <span key={idx} style={{ background: '#f0f9ff', color: '#0369a1', padding: '6px 14px', borderRadius: '16px', fontSize: '13px', fontWeight: 700 }}>
                      {s}
                    </span>
                  ))}
                </div>

                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/dl/test-slot');
                    }}
                    style={{
                      width: '100%',
                      background: '#002542',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(0, 37, 66, 0.2)'
                    }}
                  >
                    Confirm Selection <Check size={16} strokeWidth={3} />
                  </button>
                )}
              </div>
            );
          })}

        </div>

        {/* Right Column: High-Res Map Preview Card (Image 2) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)',
          height: '540px',
          position: 'relative'
        }}>
          {/* Simulated Map Canvas */}
          <div style={{
            width: '100%',
            height: '100%',
            background: '#eef2f6',
            backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Map Road Vectors */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
              <path d="M 0 120 Q 300 200 600 80" stroke="#ffffff" strokeWidth="24" fill="none" />
              <path d="M 180 0 Q 220 300 350 540" stroke="#ffffff" strokeWidth="20" fill="none" />
              <path d="M 0 380 Q 250 350 600 420" stroke="#ffffff" strokeWidth="16" fill="none" />
            </svg>

            {/* Selected Location Pin */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '48%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10
            }}>
              <div style={{
                background: '#002542',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(0, 37, 66, 0.3)',
                whiteSpace: 'nowrap',
                marginBottom: '6px'
              }}>
                📍 {centers.find(c => c.id === selectedCenter)?.name || 'Sarai Kale Khan RTO'}
              </div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e88a2d', border: '3px solid #ffffff', boxShadow: '0 0 0 4px rgba(232, 138, 45, 0.4)' }} />
            </div>

            {/* Other RTO Pins */}
            <div style={{ position: 'absolute', top: '25%', left: '20%', transform: 'translate(-50%, -50%)', opacity: 0.6 }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#002542', border: '2px solid #ffffff' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#476179' }}>Vasant Vihar</span>
            </div>

            <div style={{ position: 'absolute', top: '70%', left: '75%', transform: 'translate(-50%, -50%)', opacity: 0.6 }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#002542', border: '2px solid #ffffff' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#476179' }}>Dwarka Sec 22</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 7B. DL TEST SLOT BOOKING PAGE — CAR-SEAT SHAPED LAYOUT (1:1 IMAGE 1 MATCH)
// ----------------------------------------------------------------------
export function DLTestSlotBookingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDay, setSelectedDay] = useState('28');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');

  // Days options (Image 1)
  const days = [
    { day: 'MON', date: '25' },
    { day: 'TUE', date: '26' },
    { day: 'WED', date: '27' },
    { day: 'THU', date: '28' },
    { day: 'FRI', date: '29' },
    { day: 'SAT', date: '30' }
  ];

  // Car Seat Styled Slot Options (Image 1)
  const slots = [
    { time: '09:00 AM', status: 'booked' },
    { time: '10:00 AM', status: 'few', tag: 'FEW' },
    { time: '10:30 AM', status: 'available' },
    { time: '11:00 AM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '03:00 PM', status: 'booked' }
  ];

  return (
    <div className="page page-dl-slot-booking" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '32px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1:1 Horizontal Header Progress Stepper Track (Image 1 Header) */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '16px 28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {[
          { label: 'APPLICATION', icon: Check, done: true },
          { label: 'DOCUMENTS', icon: Check, done: true },
          { label: 'PAYMENT', icon: Check, done: true },
          { label: 'LL ASSESSMENT', icon: Check, done: true },
          { label: 'DRIVING TEST', icon: Car, active: true },
          { label: 'LICENCE', icon: ShieldCheck, done: false }
        ].map((st, idx, arr) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: st.active ? '#e88a2d' : st.done ? '#16a34a' : '#f1f5f9',
                color: st.active || st.done ? '#ffffff' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 800
              }}>
                <st.icon size={14} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: st.active ? 800 : 700, color: st.active ? '#173b57' : st.done ? '#16a34a' : '#94a3b8', letterSpacing: '0.5px' }}>
                {st.label}
              </span>
            </div>
            {idx < arr.length - 1 && (
              <div style={{ flex: 1, height: '2px', background: st.done ? '#16a34a' : '#e2e8f0', margin: '0 12px' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Sub-step indicator */}
      <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
        01 DATE &gt; <span style={{ color: '#002542' }}>02 SLOT</span> &gt; 03 REVIEW &gt; 04 CONFIRM
      </div>

      {/* Horizontal Date Selection Bar */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '28px' }}>
        {days.map((d) => {
          const isActive = selectedDay === d.date;
          return (
            <div
              key={d.date}
              onClick={() => setSelectedDay(d.date)}
              style={{
                background: isActive ? '#002542' : '#ffffff',
                color: isActive ? '#ffffff' : '#173b57',
                borderRadius: '16px',
                padding: '14px 22px',
                textAlign: 'center',
                border: isActive ? 'none' : '1px solid #e2e8f0',
                boxShadow: isActive ? '0 4px 14px rgba(0, 37, 66, 0.2)' : 'none',
                cursor: 'pointer',
                minWidth: '64px',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 800, opacity: isActive ? 0.8 : 0.6, letterSpacing: '0.5px' }}>
                {d.day}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, marginTop: '2px' }}>
                {d.date}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column Layout */}
      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: CAR SEAT SHAPED LAYOUT CARD (1:1 IMAGE 1) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 6px 24px rgba(0, 37, 66, 0.04)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
            Select a Test Slot
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 32px 0' }}>
            Choose your preferred seat and time for the practical driving test.
          </p>

          {/* STYLIZED CAR VAN/BUS OUTLINE CONTAINER */}
          <div style={{
            width: '320px',
            margin: '0 auto 28px auto',
            border: '4px solid #e2e8f0',
            borderRadius: '40px',
            padding: '32px 24px',
            background: '#fafbfc',
            position: 'relative',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
          }}>
            {/* Simulated Car Wheels/Side Handles */}
            <div style={{ position: 'absolute', top: '60px', left: '-12px', width: '12px', height: '36px', background: '#cbd5e1', borderRadius: '6px 0 0 6px' }} />
            <div style={{ position: 'absolute', top: '60px', right: '-12px', width: '12px', height: '36px', background: '#cbd5e1', borderRadius: '0 6px 6px 0' }} />
            <div style={{ position: 'absolute', bottom: '60px', left: '-12px', width: '12px', height: '36px', background: '#cbd5e1', borderRadius: '6px 0 0 6px' }} />
            <div style={{ position: 'absolute', bottom: '60px', right: '-12px', width: '12px', height: '36px', background: '#cbd5e1', borderRadius: '0 6px 6px 0' }} />

            {/* 2x3 Car Seat Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>
              {slots.map((s, idx) => {
                const isSelected = selectedSlot === s.time;
                const isBooked = s.status === 'booked';
                const isFew = s.status === 'few';

                return (
                  <div
                    key={idx}
                    onClick={() => !isBooked && setSelectedSlot(s.time)}
                    style={{
                      position: 'relative',
                      background: isSelected ? '#002542' : isBooked ? '#f1f5f9' : '#ffffff',
                      color: isSelected ? '#ffffff' : isBooked ? '#94a3b8' : '#173b57',
                      border: isSelected
                        ? '3px solid #002542'
                        : isFew
                        ? '2px solid #f59e0b'
                        : '1px solid #cbd5e1',
                      borderRadius: '16px 16px 12px 12px', // Seat shape curve!
                      padding: '24px 12px 14px 12px',
                      textAlign: 'center',
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      boxShadow: isSelected ? '0 6px 18px rgba(0, 37, 66, 0.25)' : '0 2px 6px rgba(0,0,0,0.03)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Car Seat Top Headrest Tab */}
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '10px',
                      borderRadius: '6px 6px 0 0',
                      background: isSelected ? '#001a30' : isBooked ? '#e2e8f0' : '#e2e8f0'
                    }} />

                    {/* FEW Badge */}
                    {isFew && (
                      <span style={{ position: 'absolute', top: '-12px', right: '10px', background: '#fef3c7', color: '#b45309', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', border: '1px solid #f59e0b' }}>
                        FEW
                      </span>
                    )}

                    {/* Booked Cross Icon */}
                    {isBooked ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '14px', color: '#94a3b8' }}>✕</span>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}>{s.time}</span>
                      </div>
                    ) : isSelected ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <Check size={16} color="#e88a2d" strokeWidth={3} />
                        <span style={{ fontSize: '14px', fontWeight: 800 }}>{s.time}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: 800 }}>{s.time}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seat Status Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', fontWeight: 700, color: '#476179' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1px solid #cbd5e1', background: '#fff' }} /> Available
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#002542' }} /> Selected
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f1f5f9' }} /> Booked
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1.5px solid #f59e0b', background: '#fff' }} /> Few Slots
            </div>
          </div>

        </div>

        {/* Right Column: Map Snippet & Appointment Summary (1:1 IMAGE 1) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* RTO Map Snippet */}
          <div style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ height: '120px', background: '#e0e7ff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#002542', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>
                📍 Sarai Kale Khan RTO
              </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>Sarai Kale Khan RTO</div>
              <div style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 8px 0' }}>Driving Test Centre, Sakchi, New Delhi 110013</div>
              <a href="#map" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', fontWeight: 800, color: '#002542', textDecoration: 'none' }}>
                View Location →
              </a>
            </div>
          </div>

          {/* Appointment Summary Card */}
          <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '2px' }}>
              Appointment Summary
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
              Application #IND-4492
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={18} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>DATE</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>{selectedDay} August 2026</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={18} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>TIME</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>{selectedSlot}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>LOCATION</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Sarai Kale Khan RTO</div>
                </div>
              </div>

              {/* Vehicle Class Box */}
              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Car size={20} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>VEHICLE CLASS</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>LMV — Car</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Based on your application</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                centralDataStore.bookAppointment({
                  date: `${selectedDay} October 2026`,
                  time: selectedSlot,
                  slot: selectedSlot,
                  location: 'Jamshedpur RTO Test Track, Sakchi (JH-05)'
                });
                navigate('/dl/appointment-fixed');
              }}
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
              Confirm Test Slot <ArrowRight size={18} />
            </button>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', margin: '12px 0 0 0' }}>
              Please arrive 15 minutes before your slot.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 7C. APPOINTMENT FIXED SUCCESS PAGE
// ----------------------------------------------------------------------
export function DLAppointmentFixedPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    localStorage.setItem('last_processed_flow', 'dl_appointment');
    localStorage.setItem('last_processed_title', 'DL Practical Test Slot Fixed');
  }, []);

  return (
    <div className="page page-dl-appointment-fixed" style={{ width: 'min(760px, calc(100% - 48px))', margin: '48px auto', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '44px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)' }}>
        
        {/* Success Icon */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: '#dcfce7',
          color: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          boxShadow: '0 0 0 8px #f0fdf4'
        }}>
          <CheckCircle2 size={46} strokeWidth={2.5} />
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          {t('dlFlow.fixedTitle') || 'Driving Test Appointment Fixed!'} 🚗
        </h1>

        <p style={{ color: '#64748b', fontSize: '15px', margin: '0 auto 32px auto', maxWidth: '520px', lineHeight: 1.5 }}>
          Your practical driving test appointment has been officially confirmed and registered with the RTO. Your appointment pass has been issued.
        </p>

        {/* Appointment Details Card */}
        <div style={{ background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px', marginBottom: '28px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#002542', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              OFFICIAL RTO APPOINTMENT PASS
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} /> CONFIRMED
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Appointment Ref</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>APT-982-1049</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>RTO Test Center</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57', marginTop: '4px' }}>Sarai Kale Khan RTO</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Scheduled Date</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57', marginTop: '4px' }}>28 August 2026</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Reporting Time</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#e88a2d', marginTop: '4px' }}>10:30 AM (Slot 2)</div>
            </div>
          </div>
        </div>

        {/* WHAT TO CARRY TO THE RTO TEST TRACK SECTION */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          marginBottom: '32px',
          textAlign: 'left',
          boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 800, color: '#e88a2d', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            📋 MANDATORY CHECKLIST
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
            What to Carry to the RTO Test Track
          </h3>

          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            Bring all original documents and vehicle paperwork to avoid disqualification on test day.
          </p>

          {/* Checklist Items Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            
            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #f1f5f9', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                1
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Original Learner Licence (LL)</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Physical hard copy or DigiLocker verified copy.</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #f1f5f9', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                2
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Printed Appointment Pass & Fee Receipt</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Pass (APT-982-1049) & ₹700 Fee Receipt.</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #f1f5f9', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                3
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Original Govt Photo ID Proof</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Aadhaar Card, Passport, or Voter ID Card.</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #f1f5f9', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                4
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Test Vehicle Papers (RC & PUC)</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Valid RC, Insurance policy & PUC Certificate.</div>
              </div>
            </div>

          </div>

          {/* Important Advisory Note */}
          <div style={{ background: '#fff7ed', borderRadius: '14px', padding: '14px 18px', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px' }}>⏰</span>
            <div style={{ fontSize: '12px', color: '#9a3412', fontWeight: 600, lineHeight: 1.4 }}>
              <strong>Important Note:</strong> Please report at least 15 minutes before your slot time (<strong>10:30 AM</strong>). Make sure your test vehicle has red <strong>'L'</strong> plates attached to both front and rear.
            </div>
          </div>
        </div>

        {/* Primary Navigation Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: '#002542',
            color: '#ffffff',
            border: 'none',
            padding: '16px 36px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(0, 37, 66, 0.25)'
          }}
        >
          Go to Dashboard <ArrowRight size={20} />
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
  const { t } = useLanguage();
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

// ----------------------------------------------------------------------
// 8B. DRIVING TEST RESULT PAGE (1:1 REFERENCE IMAGE MATCH)
export function DrivingTestResultPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);

  // Auto-process timeline to Step 3 (Dispatch & Tracking) in 1 second
  useEffect(() => {
    localStorage.setItem('last_processed_flow', 'dl_passed');
    localStorage.setItem('last_processed_title', 'Driving Licence Exam Passed');

    const timer = setTimeout(() => {
      setActiveStep(3);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page page-dl-test-result" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1. TOP GREEN BANNER CONTAINER */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '24px',
        padding: '40px 48px',
        border: '1px solid #bbf7d0',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '640px', zIndex: 1 }}>
          <div style={{
            background: '#ffffff',
            color: '#16a34a',
            fontSize: '11px',
            fontWeight: 800,
            padding: '6px 14px',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.1)'
          }}>
            <Check size={14} strokeWidth={3} /> STAGE 4 COMPLETED
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#173b57', margin: '0 0 12px 0', letterSpacing: '-1px', lineHeight: 1.15 }}>
            Congratulations!<br />
            You've passed your driving test.
          </h1>

          <p style={{ color: '#476179', fontSize: '16px', margin: 0, lineHeight: 1.6 }}>
            Your skill test results have been verified and submitted for official approval. You are one step closer to receiving your permanent driving licence.
          </p>
        </div>

        {/* Right Circular Vector Illustration */}
        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0, 37, 66, 0.06)',
          zIndex: 1
        }}>
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '8px solid #e0f2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Check size={68} color="#002542" strokeWidth={3.5} />
          </div>
          {/* Accent Dots */}
          <div style={{ position: 'absolute', top: '16px', right: '28px', width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ position: 'absolute', bottom: '24px', right: '12px', width: '12px', height: '12px', borderRadius: '50%', background: '#002542' }} />
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Official Test Result Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                  Official Test Result
                </h3>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: '4px' }}>
                  APPLICATION NO: DS-MH12-883492
                </div>
              </div>

              <span style={{
                background: '#16a34a',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 800,
                padding: '6px 16px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.5px'
              }}>
                ✓ PASSED
              </span>
            </div>

            {/* Result Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingBottom: '28px', borderBottom: '1px solid #f1f5f9', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Date of Test</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>Oct 24, 2026</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Test Location</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>Pune RTO (MH-12)</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Vehicle Class Approved</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#f1f5f9', color: '#173b57', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '8px' }}>LMV</span>
                  <span style={{ background: '#f1f5f9', color: '#173b57', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '8px' }}>MCWG</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Inspector Remarks</div>
                <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#476179', marginTop: '4px' }}>
                  "Satisfactory control and traffic awareness."
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => alert("Loading digital licence preview...")}
                style={{
                  flex: 1,
                  background: '#002542',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)'
                }}
              >
                🪪 View Digital Preview
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: '#ffffff',
                  color: '#173b57',
                  border: '1px solid #cbd5e1',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Collect Physical Documents Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Map Thumbnail */}
            <div style={{
              width: '100px',
              height: '80px',
              borderRadius: '12px',
              background: '#e0e7ff',
              backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
              backgroundSize: '12px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '20px' }}>📍</span>
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginBottom: '4px' }}>
                Collect physical documents if applicable
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
                Please ensure you have collected any original documents submitted during the physical verification before leaving the premises.
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: "What happens next?" Timeline Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '24px' }}>
            <span>⚡</span> What happens next?
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', marginBottom: '28px' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', top: '16px', bottom: '16px', left: '15px', width: '2px', background: activeStep >= 3 ? '#bbf7d0' : '#e2e8f0', zIndex: 0, transition: 'all 0.5s ease' }} />

            {/* Step 1: Licence Approval */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: activeStep >= 3 ? '#16a34a' : '#002542',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 800,
                fontSize: '12px',
                transition: 'all 0.5s ease'
              }}>
                {activeStep >= 3 ? <Check size={16} strokeWidth={3} /> : '1'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>Licence Approval</div>
                  <span style={{
                    background: activeStep >= 3 ? '#dcfce7' : '#e0f2fe',
                    color: activeStep >= 3 ? '#15803d' : '#0369a1',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    transition: 'all 0.5s ease'
                  }}>
                    {activeStep >= 3 ? '✓ Approved' : 'In Progress'}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                  RTO officer reviewed and approved test results.
                </div>
              </div>
            </div>

            {/* Step 2: Smart Card Printing */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1, opacity: activeStep >= 3 ? 1 : 0.6, transition: 'all 0.5s ease' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: activeStep >= 3 ? '#16a34a' : '#f1f5f9',
                color: activeStep >= 3 ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 800,
                fontSize: '12px',
                transition: 'all 0.5s ease'
              }}>
                {activeStep >= 3 ? <Check size={16} strokeWidth={3} /> : '2'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>Smart Card Printing</div>
                  {activeStep >= 3 && (
                    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                      ✓ Printed
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                  Physical smartcard printed & chip encoded.
                </div>
              </div>
            </div>

            {/* Step 3: Dispatch & Tracking */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1, opacity: activeStep >= 3 ? 1 : 0.6, transition: 'all 0.5s ease' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: activeStep >= 3 ? '#002542' : '#f1f5f9',
                color: activeStep >= 3 ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 800,
                fontSize: '12px',
                transition: 'all 0.5s ease'
              }}>
                3
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>Dispatch & Tracking</div>
                  {activeStep >= 3 && (
                    <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                      In Progress
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                  Handed over to India Post. Tracking ID assigned.
                </div>
              </div>
            </div>

            {/* Step 4: Home Delivery */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1, opacity: 0.6 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '12px' }}>
                4
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>Home Delivery</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                  Delivered to your registered address via Speed Post.
                </div>
              </div>
            </div>

          </div>

          {/* Action Button: View Order -> opens Dispatch & Live Tracking Page */}
          <button
            onClick={() => navigate('/dl/dispatch')}
            style={{
              width: '100%',
              background: '#002542',
              color: '#ffffff',
              border: 'none',
              padding: '16px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(0, 37, 66, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            View Order <ArrowRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 8C. LICENCE SMARTCARD DISPATCH & LIVE TRACKING (1:1 MATCH)
// ----------------------------------------------------------------------
export function LicenceDispatchPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="page page-dl-dispatch" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1. HEADER SECTION */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          background: '#e0f2fe',
          color: '#0369a1',
          fontSize: '11px',
          fontWeight: 800,
          padding: '6px 14px',
          borderRadius: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0284c7' }} /> LIVE TRACKING
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          Your Driving Licence is on its way <span style={{ fontSize: '32px' }}>📦</span>
        </h1>

        <p style={{ color: '#64748b', fontSize: '15px', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Your licence has been dispatched via Speed Post and is currently out for delivery. It should reach you today by 5:00 PM.
        </p>
      </div>

      {/* 2. MAIN 2-COLUMN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Tracking ID Header Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                TRACKING ID
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0284c7', marginTop: '4px', letterSpacing: '0.5px' }}>
                IN123456789IN
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🚚</span> India Post - Speed Post
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{
                background: '#e0f2fe',
                color: '#0369a1',
                fontSize: '12px',
                fontWeight: 800,
                padding: '6px 16px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                📦 Out for Delivery
              </span>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                Updated: 10 mins ago
              </div>
            </div>
          </div>

          {/* Journey Progress Timeline Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                Journey Progress
              </h3>
              <span style={{
                background: '#e0f2fe',
                color: '#0369a1',
                fontSize: '12px',
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: '16px'
              }}>
                ETA: Today
              </span>
            </div>

            {/* Stepper Vertical List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
              
              {/* Stepper Track Line */}
              <div style={{
                position: 'absolute',
                top: '20px',
                bottom: '20px',
                left: '15px',
                width: '2px',
                background: '#cbd5e1',
                zIndex: 0
              }} />

              {/* Step 1: Printed */}
              <div style={{ display: 'flex', gap: '20px', zIndex: 1, alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#002542',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>Printed</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>RTO Pune, Maharashtra</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Oct 24, 10:30 AM</div>
                </div>
              </div>

              {/* Step 2: Dispatched */}
              <div style={{ display: 'flex', gap: '20px', zIndex: 1, alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#002542',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>Dispatched</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Pune GPO Sort Facility</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Oct 24, 04:15 PM</div>
                </div>
              </div>

              {/* Step 3: In Transit */}
              <div style={{ display: 'flex', gap: '20px', zIndex: 1, alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#002542',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>In Transit</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Arrived at Mumbai Hub</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Oct 25, 02:45 AM</div>
                </div>
              </div>

              {/* Step 4: Out for Delivery (ACTIVE STEP) */}
              <div style={{ display: 'flex', gap: '20px', zIndex: 1, alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '3px solid #002542',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#002542' }} />
                </div>

                {/* Highlighted Container for Active Step */}
                <div style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '1.5px solid #002542',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: '0 4px 14px rgba(0, 37, 66, 0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>Out for Delivery</div>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                      Active
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#173b57', marginTop: '6px' }}>
                    Out with delivery agent Ramesh (98765XXXXX)
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Oct 25, 08:30 AM • Andheri West Post Office
                  </div>
                </div>
              </div>

              {/* Step 5: Delivered (INACTIVE) */}
              <div style={{ display: 'flex', gap: '20px', zIndex: 1, alignItems: 'flex-start', opacity: 0.5 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '2px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#64748b' }}>Delivered</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Awaiting delivery scan</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Current Location Map Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)',
            position: 'relative'
          }}>
            {/* High Resolution Interactive Map Canvas */}
            <div style={{
              height: '220px',
              background: '#bae6fd',
              backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 1.5px)',
              backgroundSize: '14px 14px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Map Road Network Visual Elements */}
              <div style={{ position: 'absolute', width: '100%', height: '8px', background: '#ffffff', top: '90px', transform: 'rotate(-12deg)' }} />
              <div style={{ position: 'absolute', height: '100%', width: '8px', background: '#ffffff', left: '140px', transform: 'rotate(25deg)' }} />
              
              {/* Pulse Pin Marker */}
              <div style={{
                position: 'relative',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#002542',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 37, 66, 0.3)',
                zIndex: 2
              }}>
                <MapPin size={18} />
              </div>
            </div>

            {/* Floating Location Details Box */}
            <div style={{ padding: '16px 20px', background: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Current Location</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Andheri West, Mumbai</div>
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#173b57', marginBottom: '16px' }}>
              <MapPin size={16} color="#002542" /> Delivery Address
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginBottom: '6px' }}>
                Rajesh Kumar Verma
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                A-402, Sunshine Apartments,<br />
                Lokhandwala Complex, Andheri West,<br />
                Mumbai, Maharashtra 400053
              </div>

              <button
                onClick={() => alert("Reported address issue to India Post helpline.")}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  color: '#173b57',
                  border: '1px solid #e2e8f0',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                🛡️ Report Address Issue
              </button>
            </div>
          </div>

          {/* Need Help Card */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '24px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#173b57', marginBottom: '8px' }}>
              🎧 Need help?
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              If your delivery is delayed or you have questions about the process, our support team is here to assist.
            </p>

            <button
              onClick={() => navigate('/ask-aiva')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0284c7',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Contact Support <ArrowRight size={15} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
