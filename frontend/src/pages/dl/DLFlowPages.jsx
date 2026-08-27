import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, CalendarDays, MapPin, CreditCard, Clock,
  ArrowRight, ArrowLeft, Download, Check, Truck, Award, Lock, Info, Calendar,
  User, FileText, Home, ExternalLink, Shield, Sparkles, Building2, HelpCircle,
  Search, Navigation, Compass, LocateFixed, SlidersHorizontal, Settings,
  Smartphone,
  Edit3, AlertCircle, X, ChevronRight, Filter, CheckCircle
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
              {/* <Calendar size={18} color="#94a3b8" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} /> */}
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
  const profile = centralDataStore.getUserProfile() || {};
  const savedDraft = centralDataStore.getDraftForm('dl_address');
  const [isEditing, setIsEditing] = useState(false);
  const [unchanged, setUnchanged] = useState(true);

  // Editable Address Form State
  const [flatNo, setFlatNo] = useState(savedDraft.flatNo || profile.streetAddress || 'Flat 402, Green Park Heights');
  const [area, setArea] = useState(savedDraft.area || profile.district || 'Sakchi');
  const [city, setCity] = useState(savedDraft.city || profile.city || 'Jamshedpur');
  const [stateName, setStateName] = useState(savedDraft.stateName || profile.state || 'Jharkhand');
  const [pincode, setPincode] = useState(savedDraft.pincode || profile.pincode || '831001');
  const [docUploaded, setDocUploaded] = useState(true);

  const handleSaveUpdatedAddress = (e) => {
    e.preventDefault();
    setUnchanged(false);
    setIsEditing(false);
    const fullAddr = `${flatNo}, ${area}, ${city}, ${stateName} - ${pincode}`;
    const addressObj = {
      flatNo,
      area,
      city,
      stateName,
      pincode,
      fullAddress: fullAddr,
      type: 'Updated Dispatch Address',
      recipientName: profile.name || 'Yanshi Chauhan',
      mobile: profile.mobile || '+91 98765 43210'
    };
    centralDataStore.saveDraftForm('dl_address', addressObj);
    centralDataStore.updateUserProfile({
      streetAddress: `${flatNo}, ${area}`,
      city,
      state: stateName,
      pincode,
      fullAddress: fullAddr
    });
    navigate('/dl/documents');
  };

  const handleConfirmAddressAndContinue = () => {
    const fullAddr = `${flatNo}, ${area}, ${city}, ${stateName} - ${pincode}`;
    const addressObj = {
      flatNo,
      area,
      city,
      stateName,
      pincode,
      fullAddress: fullAddr,
      type: unchanged ? 'Learner Licence Registered Address' : 'Updated Dispatch Address',
      recipientName: profile.name || 'Yanshi Chauhan',
      mobile: profile.mobile || '+91 98765 43210'
    };
    centralDataStore.saveDraftForm('dl_address', addressObj);
    navigate('/dl/documents');
  };

  return (
    <div className="page page-dl-address" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {!isEditing ? (
        /* NORMAL CONFIRM ADDRESS VIEW: ONE CLEAN VERIFIED ADDRESS CARD */
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
              We've retrieved your registered address from your Learner Licence. Please review the details below before booking your Driving Test.
            </p>
          </div>

          {/* Right Column: Address Card & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Single Verified Address Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '28px 32px',
              border: '2px solid #002542',
              boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                  <MapPin size={22} color="#e88a2d" /> Registered Address
                </div>

                <span style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '14px', letterSpacing: '0.4px' }}>
                  ● Verified from LL Record
                </span>
              </div>

              <div style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#173b57' }}>
                  {flatNo}, {area}
                </div>
                <div style={{ fontSize: '15px', color: '#476179', fontWeight: 600 }}>
                  {city}, {stateName} – {pincode}
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                  District: Udham Singh Nagar · Kumaon Division
                </div>
              </div>
            </div>

            {/* Unchanged Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: '4px 0', userSelect: 'none' }}>
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
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <button
                onClick={handleConfirmAddressAndContinue}
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

  // Gateway Processing State Machine: 'idle' | 'connecting' | 'challenge' | 'verifying' | 'success'
  const [gatewayStage, setGatewayStage] = useState('idle');
  const [gatewayTimer, setGatewayTimer] = useState(299); // 4:59 countdown
  const [otpValue, setOtpValue] = useState('123456');
  const [otpTimer, setOtpTimer] = useState(59);
  const [showPrintModal, setShowPrintModal] = useState(false);

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

  // Countdown timer for Gateway Challenge
  useEffect(() => {
    let interval = null;
    if (gatewayStage === 'challenge') {
      interval = setInterval(() => {
        setGatewayTimer((prev) => (prev > 0 ? prev - 1 : 0));
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gatewayStage]);

  // Card Brand Detection
  const getCardBrand = (num) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return { brand: 'Visa', color: '#1a1f71' };
    if (/^(5[1-5]|2[2-7])/.test(clean)) return { brand: 'MasterCard', color: '#eb001b' };
    if (/^(60|65|81|82)/.test(clean)) return { brand: 'RuPay', color: '#097939' };
    if (/^(34|37)/.test(clean)) return { brand: 'Amex', color: '#006fcf' };
    return { brand: 'Debit/Credit Card', color: '#002542' };
  };

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

  // Step 1: Initiate Payment Gateway
  const handleInitiatePayment = () => {
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
      const brand = getCardBrand(cardNumber).brand;
      const last4 = cleanNum.slice(-4);
      methodDisplay = `${brand} Card (•••• ${last4})`;
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

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const txnId = `DS-PAY-${randomSuffix}-DL`;
    const utr = `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const grn = `GRN-2026-UK-${randomSuffix}`;
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const meta = {
      txnId,
      utr,
      grn,
      date: now,
      method: methodDisplay,
      amount: '₹700.00',
      appId: 'IND-2026-98124'
    };

    setReceiptMeta(meta);
    setGatewayStage('connecting');
    setGatewayTimer(299);
    setOtpTimer(59);

    // Transition to Gateway Challenge
    setTimeout(() => {
      setGatewayStage('challenge');
    }, 900);
  };

  // Step 2: Complete Gateway Verification & Settlement
  const handleAuthorizeGatewayPayment = () => {
    setGatewayStage('verifying');

    setTimeout(() => {
      if (receiptMeta) {
        centralDataStore.createPayment({
          title: 'Driving Licence Application & Practical Test Fee',
          amount: 700,
          purpose: 'DL Application Fee',
          method: receiptMeta.method,
          appId: receiptMeta.appId,
          breakdown: [
            { label: 'DL Form Fee (Form 7)', fee: '₹200.00' },
            { label: 'Automated Track Test Fee', fee: '₹300.00' },
            { label: 'Smartcard Licence Printing', fee: '₹200.00' }
          ]
        });
      }

      setGatewayStage('success');
      setPaid(true);
    }, 1400);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // SUCCESS SCREEN WITH OFFICIAL GOVERNMENT RECEIPT
  if (paid) {
    return (
      <div className="page page-dl-payment-success" style={{ width: 'min(820px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '44px 36px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(16, 45, 67, 0.08)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* Animated Ambient Sparkles */}
          <div style={{ position: 'absolute', top: '24px', left: '20%', color: '#e88a2d' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '40px', right: '22%', color: '#0d9488' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '90px', left: '15%', color: '#4f46e5' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '100px', right: '16%', color: '#f59e0b' }} className="payment-sparkle">✦</div>

          {/* Animated Success Checkmark Badge */}
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
              margin: '0 auto 20px auto',
              boxShadow: '0 0 0 10px rgba(220, 252, 231, 0.5)'
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
            {t('dlFlow.paymentSuccessTitle') || 'Payment Successful & Verified!'}
          </h1>

          <p style={{ color: '#607083', fontSize: '15px', margin: '0 auto 32px auto', maxWidth: '540px', lineHeight: 1.5 }}>
            {t('dlFlow.paymentSuccessSub') || 'Your fee has been received and credited to the Transport Department account. Your practical driving test booking is now unlocked.'}
          </p>

          {/* Detailed Official Transaction Receipt Card */}
          <div style={{ background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px', marginBottom: '32px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#002542', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>
                  ₹
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#002542', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  OFFICIAL TREASURY E-RECEIPT
                </span>
              </div>

              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>
                RECEIPT ID: <strong style={{ color: '#002542' }}>{receiptMeta?.txnId || 'DS-PAY-6173-DL'}</strong>
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px 28px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transaction ID</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#102D43', marginTop: '4px', fontFamily: 'monospace' }}>{receiptMeta?.txnId || 'DS-PAY-6173-DL'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Time</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#102D43', marginTop: '4px' }}>{receiptMeta?.date || 'Just now'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Application Number</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#102D43', marginTop: '4px' }}>{receiptMeta?.appId || 'IND-2026-98124'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Mode Used</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#102D43', marginTop: '4px' }}>{receiptMeta?.method || 'UPI (Google Pay)'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Amount Paid</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#102D43', marginTop: '2px' }}>₹700.00</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gateway Status</div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#16a34a', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} /> VERIFIED & CREDITED TO TREASURY
                </div>
              </div>
            </div>

            {/* Fee Breakdown Details */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #cbd5e1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12.5px' }}>
              <div style={{ color: '#64748b' }}>Form 7 Fee: <strong style={{ color: '#002542' }}>₹200.00</strong></div>
              <div style={{ color: '#64748b' }}>Test Track Fee: <strong style={{ color: '#002542' }}>₹300.00</strong></div>
              <div style={{ color: '#64748b' }}>Smartcard Fee: <strong style={{ color: '#002542' }}>₹200.00</strong></div>
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
                gap: '8px',
                background: '#002542',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 37, 66, 0.2)'
              }}
            >
              Select Driving Test RTO & Slot <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setShowPrintModal(true)}
              className="secondary-button"
              style={{
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#002542',
                cursor: 'pointer'
              }}
            >
              <Download size={16} /> Print / Save Receipt
            </button>
          </div>

        </div>

        {/* PRINTABLE OFFICIAL E-CHALLAN MODAL */}
        {showPrintModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 37, 66, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              width: 'min(640px, 100%)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #002542', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    GOVERNMENT OF INDIA · MINISTRY OF ROAD TRANSPORT & HIGHWAYS
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#002542', margin: '4px 0 0 0' }}>
                    Official Payment & Fee Receipt (Form 7)
                  </h2>
                </div>
                <button onClick={() => setShowPrintModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#64748b', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px', marginBottom: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <div><strong>Application No:</strong> IND-2026-98124</div>
                <div><strong>Date & Time:</strong> {receiptMeta?.date || 'Today'}</div>
                <div><strong>Treasury Ref (GRN):</strong> {receiptMeta?.grn || 'GRN-2026-UK-98124'}</div>
                <div><strong>Bank UTR / Ref:</strong> {receiptMeta?.utr || 'UTR928471928471'}</div>
                <div><strong>Applicant Name:</strong> Yanshi Chauhan</div>
                <div><strong>Licence Type:</strong> Driving Licence (MCWG + LMV)</div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ background: '#002542', color: '#ffffff', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px' }}>Service Head / Description</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 12px' }}>Issue of Driving Licence (Form 7)</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>₹200.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 12px' }}>Automated Driving Test Track (ADTT) Fee</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>₹300.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 12px' }}>Smartcard Licence Personalization & Dispatch</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>₹200.00</td>
                  </tr>
                  <tr style={{ background: '#f1f5f9', fontWeight: 800 }}>
                    <td style={{ padding: '12px' }}>Total Amount Paid (Verified & Credited)</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontSize: '16px', color: '#002542' }}>₹700.00</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginBottom: '24px' }}>
                This is a digitally signed and verified government electronic receipt. No physical signature required under Section 65B of the Indian Evidence Act.
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowPrintModal(false)} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontWeight: 700 }}>
                  Close
                </button>
                <button onClick={() => window.print()} style={{ padding: '10px 22px', borderRadius: '8px', border: 'none', background: '#002542', color: '#ffffff', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={15} /> Print / Save as PDF
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // REAL GATEWAY PROCESSING MODAL (FOR ALL PAYMENT METHODS)
  const renderGatewayModal = () => {
    if (gatewayStage === 'idle') return null;

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 24, 44, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: 'min(480px, 100%)',
          padding: '32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          position: 'relative'
        }}>
          
          {/* STAGE 1: CONNECTING TO GATEWAY */}
          {gatewayStage === 'connecting' && (
            <div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #e2e8f0', borderTopColor: '#002542', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px auto' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#102D43', margin: '0 0 8px 0' }}>
                Connecting to Secure Bank Gateway...
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                Establishing 256-bit SSL encrypted connection with Treasury Payment Server.
              </p>
            </div>
          )}

          {/* STAGE 2: GATEWAY CHALLENGE (BY PAYMENT METHOD) */}
          {gatewayStage === 'challenge' && paymentMethod === 'upi' && (
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#002542', color: '#ffffff', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>UPI</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#102D43' }}>NPCI Bharat Payment</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#e88a2d' }}>⏱ {formatTimer(gatewayTimer)}</span>
              </div>

              {upiMode === 'qr' ? (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#102D43', margin: '0 0 6px 0' }}>
                    Scan QR to Pay ₹700.00
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                    Open Google Pay, PhonePe, Paytm or BHIM on your phone
                  </p>

                  <div style={{ display: 'inline-block', background: '#ffffff', padding: '16px', borderRadius: '16px', border: '2px solid #002542', marginBottom: '16px' }}>
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#002542" strokeWidth="1.8">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="3" height="3" />
                      <rect x="18" y="14" width="3" height="3" />
                      <rect x="14" y="18" width="7" height="3" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '2px solid #bae6fd' }}>
                    <Smartphone size={32} />
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#102D43', margin: '0 0 6px 0' }}>
                    Approve Payment on Your UPI App
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                    We've sent a payment request of <strong>₹700.00</strong> to <strong>{upiMode === 'id' ? upiId : (selectedUpiApp.toUpperCase() + ' UPI')}</strong>. Please open the app and enter your UPI PIN.
                  </p>

                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12.5px', color: '#64748b', marginBottom: '20px' }}>
                    Payee: <strong>PARIVAHAN - TRANSPORT DEPT (GOI)</strong><br />
                    Amount: <strong style={{ color: '#16a34a', fontSize: '15px' }}>₹700.00</strong>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'grid', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleAuthorizeGatewayPayment}
                  style={{
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  <CheckCircle2 size={16} /> Simulate Approve in UPI App (✓)
                </button>

                <button
                  type="button"
                  onClick={() => setGatewayStage('idle')}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer', padding: '6px' }}
                >
                  Cancel Transaction
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: 3D SECURE OTP CHALLENGE (FOR CARDS) */}
          {gatewayStage === 'challenge' && paymentMethod === 'card' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '18px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#002542' }}>
                  🏦 Bank 3D Secure 2.0 Verification
                </span>
                <span style={{ fontSize: '11px', background: '#f0fdf4', color: '#16a34a', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                  🔒 Verified by Visa/RuPay
                </span>
              </div>

              <div style={{ textAlign: 'left', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', marginBottom: '16px' }}>
                <div>Merchant: <strong>Ministry of Road Transport & Highways</strong></div>
                <div>Amount: <strong style={{ color: '#002542', fontSize: '15px' }}>₹700.00</strong></div>
                <div>Card: <strong>{getCardBrand(cardNumber).brand} (•••• {cardNumber.replace(/\s/g, '').slice(-4) || '8910'})</strong></div>
              </div>

              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0' }}>
                Enter the 6-digit OTP sent to your registered mobile number ending in <strong>•••• 8124</strong>:
              </p>

              <div style={{ marginBottom: '18px' }}>
                <input
                  type="text"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '200px',
                    textAlign: 'center',
                    letterSpacing: '8px',
                    fontSize: '22px',
                    fontWeight: 800,
                    padding: '10px',
                    borderRadius: '10px',
                    border: '2px solid #002542',
                    boxSizing: 'border-box',
                    color: '#002542'
                  }}
                  autoFocus
                />
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 700 }} onClick={() => setOtpTimer(59)}>Resend OTP</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleAuthorizeGatewayPayment}
                  style={{
                    background: '#002542',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 37, 66, 0.2)'
                  }}
                >
                  Submit OTP & Pay ₹700.00
                </button>

                <button
                  type="button"
                  onClick={() => setGatewayStage('idle')}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: NETBANKING GATEWAY OVERLAY */}
          {gatewayStage === 'challenge' && paymentMethod === 'netbanking' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '18px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#002542' }}>
                  🏛 {customBank || 'HDFC Bank'} Internet Banking
                </span>
                <span style={{ fontSize: '11px', background: '#f0fdf4', color: '#16a34a', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                  256-Bit SSL
                </span>
              </div>

              <div style={{ textAlign: 'left', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', marginBottom: '20px' }}>
                <div style={{ marginBottom: '6px' }}>Account Holder: <strong>YANSHI CHAUHAN</strong></div>
                <div style={{ marginBottom: '6px' }}>Debited Account: <strong>Savings A/C ••••••••4091</strong></div>
                <div style={{ marginBottom: '6px' }}>Payment Purpose: <strong>Driving Licence Application & Test Fee</strong></div>
                <div>Amount: <strong style={{ color: '#002542', fontSize: '16px' }}>₹700.00</strong></div>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleAuthorizeGatewayPayment}
                  style={{
                    background: '#002542',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 37, 66, 0.2)'
                  }}
                >
                  Confirm & Authorize Payment (₹700.00)
                </button>

                <button
                  type="button"
                  onClick={() => setGatewayStage('idle')}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: VERIFYING WITH TREASURY */}
          {gatewayStage === 'verifying' && (
            <div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #bbf7d0', borderTopColor: '#16a34a', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px auto' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#102D43', margin: '0 0 8px 0' }}>
                Verifying with State Treasury...
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                Confirming transaction settlement with RBI Bharat BillPay & issuing official receipt.
              </p>
            </div>
          )}

        </div>
      </div>
    );
  };

  // MAIN CHECKOUT FORM SCREEN
  return (
    <div className="page page-dl-payment" style={{ width: 'min(1080px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Interactive Payment Gateway Modal */}
      {renderGatewayModal()}
      
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
            onClick={handleInitiatePayment}
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
              marginBottom: '16px',
              cursor: 'pointer'
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
// 7A. DL TEST CENTRE SELECTION PAGE (NATIONWIDE RTOs, PIN/CITY/STATE SEARCH & MAP SYNC)
// ----------------------------------------------------------------------
export function DLTestCenterSelectionPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Read confirmed registered address from Step 3 (DL Confirm Address) or profile
  const [addressData, setAddressData] = useState(() => {
    const draft = centralDataStore.getDraftForm('dl_address');
    if (draft && (draft.city || draft.fullAddress)) return draft;
    const profile = getStoredUserProfile();
    if (profile && (profile.city || profile.streetAddress)) {
      return {
        flatNo: profile.streetAddress || '28-A ROYAL ENCLAVE',
        area: profile.district || 'KASHIPUR',
        city: profile.city || 'Kashipur',
        stateName: profile.state || 'Uttarakhand',
        pincode: profile.pincode || '244713',
        fullAddress: profile.fullAddress || `28-A ROYAL ENCLAVE, KASHIPUR, UTTARAKHAND 244713`
      };
    }
    return {
      flatNo: '28-A ROYAL ENCLAVE',
      area: 'KASHIPUR',
      city: 'Kashipur',
      stateName: 'Uttarakhand',
      pincode: '244713',
      fullAddress: '28-A ROYAL ENCLAVE , KASHIPUR , UTTARAKHAND , 244713'
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);

  // Edit Address Form State
  const [editFlat, setEditFlat] = useState(addressData.flatNo || '');
  const [editArea, setEditArea] = useState(addressData.area || '');
  const [editCity, setEditCity] = useState(addressData.city || 'Kashipur');
  const [editPin, setEditPin] = useState(addressData.pincode || '244713');

  // Comprehensive Nationwide RTO Automated Driving Test Track (ADTT) Database
  const NATIONWIDE_RTO_DATABASE = [
    // --- UTTARAKHAND / KASHIPUR & REGIONAL TEST TRACKS ---
    {
      id: 'uk-kashipur',
      name: 'ARTO Kashipur Driving Test Track (UK-18)',
      rtoCode: 'UK-18',
      area: 'Ramnagar Road, Kashipur',
      city: 'Kashipur',
      state: 'Uttarakhand',
      pin: '244713',
      pinPrefix: '244',
      address: 'ARTO Office & Testing Ground, Near Mandi Samiti, Ramnagar Road, Kashipur, Udham Singh Nagar, Uttarakhand 244713',
      lat: 29.2245,
      lng: 78.9690,
      slots: ['12 Oct', '14 Oct']
    },
    {
      id: 'uk-ramnagar',
      name: 'ARTO Ramnagar Test Track (UK-19)',
      rtoCode: 'UK-19',
      area: 'Kashipur-Ramnagar Highway, Ramnagar',
      city: 'Ramnagar',
      state: 'Uttarakhand',
      pin: '244715',
      pinPrefix: '244',
      address: 'ARTO Office, Near Degree College, Ramnagar, Nainital, Uttarakhand 244715',
      lat: 29.3950,
      lng: 79.1260,
      slots: ['13 Oct', '15 Oct']
    },
    {
      id: 'up-moradabad',
      name: 'RTO Moradabad Automated Track (UP-21)',
      rtoCode: 'UP-21',
      area: 'Majhola, Delhi Road, Moradabad',
      city: 'Moradabad',
      state: 'Uttar Pradesh',
      pin: '244001',
      pinPrefix: '244',
      address: 'Regional Transport Office, Transport Nagar, Majhola, Moradabad, Uttar Pradesh 244001',
      lat: 28.8386,
      lng: 78.7733,
      slots: ['14 Oct', '16 Oct']
    },
    {
      id: 'uk-rudrapur',
      name: 'RTO Rudrapur Automated Facility (UK-06)',
      rtoCode: 'UK-06',
      area: 'Kichha Bypass Road, Rudrapur',
      city: 'Rudrapur',
      state: 'Uttarakhand',
      pin: '263153',
      pinPrefix: '263',
      address: 'District Transport Office, Kichha Bypass Road, Rudrapur, Uttarakhand 263153',
      lat: 28.9800,
      lng: 79.4000,
      slots: ['15 Oct', '16 Oct']
    },
    {
      id: 'uk-haldwani',
      name: 'ARTO Haldwani Automated Track (UK-04)',
      rtoCode: 'UK-04',
      area: 'Transport Nagar, Haldwani',
      city: 'Haldwani',
      state: 'Uttarakhand',
      pin: '263139',
      pinPrefix: '263',
      address: 'Sub-Regional Transport Office, Bareilly Road, Haldwani, Uttarakhand 263139',
      lat: 29.2183,
      lng: 79.5130,
      slots: ['14 Oct', '17 Oct']
    },
    {
      id: 'uk-dehradun',
      name: 'RTO Dehradun Central Track (UK-07)',
      rtoCode: 'UK-07',
      area: 'Transport Nagar, Dehradun',
      city: 'Dehradun',
      state: 'Uttarakhand',
      pin: '248001',
      pinPrefix: '248',
      address: 'Transport Nagar, Saharanpur Road, Dehradun, Uttarakhand 248001',
      lat: 30.2925,
      lng: 77.9930,
      slots: ['16 Oct', '19 Oct']
    },

    // --- KARNATAKA / BENGALURU ---
    {
      id: 'blr-indiranagar',
      name: 'Indiranagar Automated Test Track (ADTT)',
      rtoCode: 'KA-03',
      area: 'Indiranagar, East Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560038',
      pinPrefix: '560',
      address: '100 Feet Road, Near CMH Hospital, Indiranagar, Bengaluru, Karnataka 560038',
      lat: 12.9784,
      lng: 77.6408,
      slots: ['12 Oct', '14 Oct']
    },
    {
      id: 'blr-koramangala',
      name: 'Koramangala RTO (KA-01)',
      rtoCode: 'KA-01',
      area: 'Koramangala, South-East Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560034',
      pinPrefix: '560',
      address: '80 Feet Road, 3rd Block, Koramangala, Bengaluru, Karnataka 560034',
      lat: 12.9345,
      lng: 77.6266,
      slots: ['15 Oct', '16 Oct']
    },
    {
      id: 'blr-jayanagar',
      name: 'Jayanagar Automated Test Track (KA-05)',
      rtoCode: 'KA-05',
      area: 'Jayanagar, South Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560011',
      pinPrefix: '560',
      address: '4th Block, 9th Main Road, Jayanagar, Bengaluru, Karnataka 560011',
      lat: 12.9250,
      lng: 77.5838,
      slots: ['14 Oct', '17 Oct']
    },
    {
      id: 'blr-yeshwanthpur',
      name: 'Yeshwanthpur RTO Facility (KA-04)',
      rtoCode: 'KA-04',
      area: 'Yeshwanthpur, North-West Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560022',
      pinPrefix: '560',
      address: 'Near Yeshwanthpur Metro Station, Tumkur Road, Bengaluru, Karnataka 560022',
      lat: 13.0285,
      lng: 77.5458,
      slots: ['18 Oct', '20 Oct']
    },
    {
      id: 'blr-ecity',
      name: 'Electronic City Automated Track (KA-51)',
      rtoCode: 'KA-51',
      area: 'Electronic City, South Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560100',
      pinPrefix: '560',
      address: 'Phase 1, Hosur Road, Electronic City, Bengaluru, Karnataka 560100',
      lat: 12.8452,
      lng: 77.6602,
      slots: ['16 Oct', '19 Oct']
    },

    // --- DELHI NCR ---
    {
      id: 'dl-sarai',
      name: 'Sarai Kale Khan RTO (ADTT)',
      rtoCode: 'DL-06',
      area: 'Sarai Kale Khan, South-East Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pin: '110013',
      pinPrefix: '110',
      address: 'Near ISBT Sarai Kale Khan, Ring Road, New Delhi, 110013',
      lat: 28.5892,
      lng: 77.2588,
      slots: ['12 Oct', '14 Oct']
    },
    {
      id: 'dl-vasant',
      name: 'Vasant Vihar Automated Test Track',
      rtoCode: 'DL-03',
      area: 'Vasant Vihar, South Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pin: '110057',
      pinPrefix: '110',
      address: 'Sub-Divisional Complex, Outer Ring Rd, Vasant Vihar, New Delhi, 110057',
      lat: 28.5583,
      lng: 77.1637,
      slots: ['15 Oct', '16 Oct']
    },
    {
      id: 'dl-dwarka',
      name: 'Dwarka Sector 22 RTO Track',
      rtoCode: 'DL-09',
      area: 'Dwarka Sector 22, South-West Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pin: '110075',
      pinPrefix: '110',
      address: 'Sector 22, Near Sector 21 Metro Station, Dwarka, New Delhi, 110075',
      lat: 28.5562,
      lng: 77.0544,
      slots: ['18 Oct', '20 Oct']
    },
    {
      id: 'dl-mayur',
      name: 'Mayur Vihar Phase 1 ADTT',
      rtoCode: 'DL-07',
      area: 'Mayur Vihar, East Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pin: '110091',
      pinPrefix: '110',
      address: 'Mayur Vihar Phase 1, Near Pocket 1 Metro, New Delhi, 110091',
      lat: 28.6089,
      lng: 77.2942,
      slots: ['15 Oct', '17 Oct']
    },
    {
      id: 'dl-rohini',
      name: 'Rohini Sector 16 Test Center',
      rtoCode: 'DL-11',
      area: 'Rohini, North-West Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pin: '110089',
      pinPrefix: '110',
      address: 'Sector 16, Institutional Area, Rohini, New Delhi, 110089',
      lat: 28.7324,
      lng: 77.1189,
      slots: ['19 Oct', '21 Oct']
    },
    {
      id: 'dl-janakpuri',
      name: 'Janakpuri District Transport Office',
      rtoCode: 'DL-04',
      area: 'Janakpuri, West Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pin: '110058',
      pinPrefix: '110',
      address: 'Near District Centre, Janakpuri, New Delhi, 110058',
      lat: 28.6219,
      lng: 77.0878,
      slots: ['14 Oct', '17 Oct']
    },

    // --- MAHARASHTRA / MUMBAI & PUNE ---
    {
      id: 'mum-andheri',
      name: 'Andheri RTO Automated Track (MH-02)',
      rtoCode: 'MH-02',
      area: 'Andheri West, Western Suburbs',
      city: 'Mumbai',
      state: 'Maharashtra',
      pin: '400053',
      pinPrefix: '400',
      address: 'D.N. Nagar, Link Road, Andheri West, Mumbai, Maharashtra 400053',
      lat: 19.1197,
      lng: 72.8464,
      slots: ['14 Oct', '16 Oct']
    },
    {
      id: 'mum-tardeo',
      name: 'Tardeo Central RTO (MH-01)',
      rtoCode: 'MH-01',
      area: 'Tardeo, South Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pin: '400034',
      pinPrefix: '400',
      address: 'Old Bodyguard Lane, Tardeo, Mumbai, Maharashtra 400034',
      lat: 18.9696,
      lng: 72.8193,
      slots: ['15 Oct', '17 Oct']
    },
    {
      id: 'mum-wadala',
      name: 'Wadala Automated RTO Facility (MH-03)',
      rtoCode: 'MH-03',
      area: 'Wadala, Central Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pin: '400037',
      pinPrefix: '400',
      address: 'Truck Terminal Road, Wadala, Mumbai, Maharashtra 400037',
      lat: 19.0178,
      lng: 72.8688,
      slots: ['13 Oct', '16 Oct']
    },
    {
      id: 'pune-sangamwadi',
      name: 'Pune RTO Automated Track (MH-12)',
      rtoCode: 'MH-12',
      area: 'Sangamwadi, Pune',
      city: 'Pune',
      state: 'Maharashtra',
      pin: '411001',
      pinPrefix: '411',
      address: 'Dr. Ambedkar Road, Near Sangam Bridge, Pune, Maharashtra 411001',
      lat: 18.5304,
      lng: 73.8647,
      slots: ['14 Oct', '18 Oct']
    },

    // --- JHARKHAND ---
    {
      id: 'jsr-sakchi',
      name: 'Jamshedpur Sakchi RTO (JH-05)',
      rtoCode: 'JH-05',
      area: 'Sakchi, Jamshedpur',
      city: 'Jamshedpur',
      state: 'Jharkhand',
      pin: '831001',
      pinPrefix: '831',
      address: 'Near Old Court, Sakchi, Jamshedpur, Jharkhand 831001',
      lat: 22.8046,
      lng: 86.2029,
      slots: ['13 Oct', '15 Oct']
    },
    {
      id: 'ranchi-dhurwa',
      name: 'Ranchi Dhurwa Automated Track (JH-01)',
      rtoCode: 'JH-01',
      area: 'Dhurwa, Ranchi',
      city: 'Ranchi',
      state: 'Jharkhand',
      pin: '834004',
      pinPrefix: '834',
      address: 'Sector 4, HEC Township, Dhurwa, Ranchi, Jharkhand 834004',
      lat: 23.3105,
      lng: 85.2894,
      slots: ['16 Oct', '19 Oct']
    },

    // --- TELANGANA / HYDERABAD ---
    {
      id: 'hyd-kondapur',
      name: 'Kondapur RTO Automated Track (TS-09)',
      rtoCode: 'TS-09',
      area: 'Kondapur, Hitec City, Hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pin: '500084',
      pinPrefix: '500',
      address: 'Near Botanical Garden Road, Kondapur, Hyderabad, Telangana 500084',
      lat: 17.4645,
      lng: 78.3582,
      slots: ['15 Oct', '18 Oct']
    },

    // --- TAMIL NADU / CHENNAI ---
    {
      id: 'chn-annanagar',
      name: 'Anna Nagar RTO Test Track (TN-02)',
      rtoCode: 'TN-02',
      area: 'Anna Nagar, Chennai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pin: '600040',
      pinPrefix: '600',
      address: '2nd Avenue, Anna Nagar West, Chennai, Tamil Nadu 600040',
      lat: 13.0850,
      lng: 80.2101,
      slots: ['14 Oct', '17 Oct']
    },

    // --- WEST BENGAL / KOLKATA ---
    {
      id: 'kol-saltlake',
      name: 'Salt Lake Automated Test Facility (WB-08)',
      rtoCode: 'WB-08',
      area: 'Salt Lake Sector 5, Kolkata',
      city: 'Kolkata',
      state: 'West Bengal',
      pin: '700091',
      pinPrefix: '700',
      address: 'Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal 700091',
      lat: 22.5804,
      lng: 88.4378,
      slots: ['15 Oct', '19 Oct']
    },

    // --- UTTAR PRADESH ---
    {
      id: 'up-noida',
      name: 'Noida Sector 32 Transport Office (UP-16)',
      rtoCode: 'UP-16',
      area: 'Sector 32, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pin: '201301',
      pinPrefix: '201',
      address: 'Near City Center Metro, Sector 32, Noida, Uttar Pradesh 201301',
      lat: 28.5744,
      lng: 77.3560,
      slots: ['13 Oct', '16 Oct']
    },
    {
      id: 'up-lucknow',
      name: 'Lucknow Transport Nagar ADTT (UP-32)',
      rtoCode: 'UP-32',
      area: 'Transport Nagar, Lucknow',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pin: '226012',
      pinPrefix: '226',
      address: 'Kanpur Road, Transport Nagar, Lucknow, Uttar Pradesh 226012',
      lat: 26.7825,
      lng: 80.8920,
      slots: ['16 Oct', '18 Oct']
    },

    // --- RAJASTHAN ---
    {
      id: 'rj-jaipur',
      name: 'Jaipur Jagatpura Automated Track (RJ-14)',
      rtoCode: 'RJ-14',
      area: 'Jagatpura, Jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      pin: '302017',
      pinPrefix: '302',
      address: 'Jhalana Institutional Area, Jagatpura, Jaipur, Rajasthan 302017',
      lat: 26.8335,
      lng: 75.8239,
      slots: ['15 Oct', '18 Oct']
    }
  ];

  // Helper: Get user's reference coordinates based on address
  const getUserCoordinates = (addr) => {
    const text = `${addr.area || ''} ${addr.city || ''} ${addr.flatNo || ''} ${addr.stateName || ''} ${addr.pincode || ''}`.toLowerCase();
    
    // Locality specific
    if (text.includes('gautam nagar') || text.includes('royal enclave') || text.includes('kashipur')) return { lat: 29.2085, lng: 78.9580 };
    if (text.includes('ramnagar')) return { lat: 29.3900, lng: 79.1200 };
    if (text.includes('moradabad') || text.startsWith('2440')) return { lat: 28.8300, lng: 78.7700 };
    if (text.includes('rudrapur')) return { lat: 28.9800, lng: 79.4000 };
    if (text.includes('haldwani')) return { lat: 29.2183, lng: 79.5130 };
    if (text.includes('dehradun') || text.includes('uttarakhand')) return { lat: 30.3165, lng: 78.0322 };
    if (text.includes('indiranagar')) return { lat: 12.9784, lng: 77.6408 };
    if (text.includes('koramangala')) return { lat: 12.9352, lng: 77.6245 };
    if (text.includes('jayanagar')) return { lat: 12.9308, lng: 77.5838 };
    if (text.includes('yeshwanthpur')) return { lat: 13.0285, lng: 77.5458 };
    if (text.includes('electronic city')) return { lat: 12.8452, lng: 77.6602 };
    if (text.includes('dwarka')) return { lat: 28.5921, lng: 77.0460 };
    if (text.includes('sarai') || text.includes('south delhi')) return { lat: 28.5892, lng: 77.2588 };
    if (text.includes('rohini') || text.includes('civil lines') || text.includes('model town')) return { lat: 28.7041, lng: 77.1025 };
    if (text.includes('vasant')) return { lat: 28.5583, lng: 77.1637 };
    if (text.includes('andheri')) return { lat: 19.1136, lng: 72.8697 };
    if (text.includes('tardeo')) return { lat: 18.9696, lng: 72.8193 };
    if (text.includes('sakchi')) return { lat: 22.8046, lng: 86.2029 };

    // City / State specific
    if (text.includes('bengaluru') || text.includes('bangalore') || text.startsWith('560')) return { lat: 12.9716, lng: 77.5946 };
    if (text.includes('delhi') || text.startsWith('110')) return { lat: 28.6139, lng: 77.2090 };
    if (text.includes('mumbai') || text.startsWith('400')) return { lat: 19.0760, lng: 72.8777 };
    if (text.includes('pune') || text.startsWith('411')) return { lat: 18.5204, lng: 73.8567 };
    if (text.includes('jamshedpur') || text.startsWith('831')) return { lat: 22.8046, lng: 86.2029 };
    if (text.includes('ranchi') || text.startsWith('834')) return { lat: 23.3441, lng: 85.3096 };
    if (text.includes('hyderabad') || text.startsWith('500')) return { lat: 17.3850, lng: 78.4867 };
    if (text.includes('chennai') || text.startsWith('600')) return { lat: 13.0827, lng: 80.2707 };
    if (text.includes('kolkata') || text.startsWith('700')) return { lat: 22.5726, lng: 88.3639 };
    if (text.includes('noida') || text.startsWith('201')) return { lat: 28.5744, lng: 77.3560 };
    if (text.includes('lucknow') || text.startsWith('226')) return { lat: 26.8467, lng: 80.9462 };
    if (text.includes('jaipur') || text.startsWith('302')) return { lat: 26.9124, lng: 75.7873 };

    return { lat: 29.2085, lng: 78.9580 };
  };

  // Helper: Haversine distance in KM with realistic road routing factor
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = parseFloat((R * c * 1.25).toFixed(1));
    return Math.max(2.4, dist);
  };

  // Get active user address coordinates
  const userCoords = getUserCoordinates(addressData);

  // Compute distance for all centers and prepare list
  const centersWithDistances = NATIONWIDE_RTO_DATABASE.map((c) => {
    const dist = calculateDistance(userCoords.lat, userCoords.lng, c.lat, c.lng);
    return {
      ...c,
      distanceNum: dist,
      distance: `${dist}km away`
    };
  }).sort((a, b) => a.distanceNum - b.distanceNum);

  // Filter centers based on User Address & Search Query
  const getDisplayCenters = () => {
    const q = searchQuery.toLowerCase().trim();

    // 1. IF SEARCH QUERY IS TYPED: Perform deep logical match across PIN, City, State, Area, RTO Code, Name
    if (q) {
      const searched = centersWithDistances.filter((c) => {
        const matchPin = c.pin.includes(q) || c.pinPrefix.includes(q);
        const matchCity = c.city.toLowerCase().includes(q);
        const matchState = c.state.toLowerCase().includes(q);
        const matchArea = c.area.toLowerCase().includes(q);
        const matchRtoCode = c.rtoCode.toLowerCase().replace('-', '').includes(q.replace('-', ''));
        const matchName = c.name.toLowerCase().includes(q);
        const matchAddress = c.address.toLowerCase().includes(q);

        return matchPin || matchCity || matchState || matchArea || matchRtoCode || matchName || matchAddress;
      });

      if (searched.length > 0) {
        return searched;
      }

      // If user typed a custom city or PIN not explicitly listed, dynamically generate a matching RTO!
      const isPinQuery = /^\d{3,6}$/.test(q);
      return [
        {
          id: `custom-rto-${q.replace(/\s+/g, '-')}`,
          name: isPinQuery ? `PIN ${q} Regional Transport Track` : `${q.toUpperCase()} Automated Driving Test Track`,
          rtoCode: isPinQuery ? `PIN-${q.slice(0, 3)}` : 'RTO-ADTT',
          area: isPinQuery ? `Pin Code ${q} Zone` : `${q} Division`,
          city: isPinQuery ? 'Local Region' : q,
          state: addressData.stateName || 'State Transport Division',
          pin: isPinQuery ? q : 'Nearest Zone',
          address: isPinQuery ? `Automated Driving Test Track, Near PIN ${q} Post Office` : `Central RTO Test Facility, Main Bypass Road, ${q}`,
          lat: userCoords.lat + 0.02,
          lng: userCoords.lng + 0.02,
          distanceNum: 2.4,
          distance: '2.4km away',
          slots: ['14 Oct', '16 Oct']
        }
      ];
    }

    // 2. IF NO SEARCH QUERY: Filter primarily for the user's city/state
    const userCity = (addressData.city || '').toLowerCase().trim();
    const userState = (addressData.stateName || '').toLowerCase().trim();
    const userPin = (addressData.pincode || '').trim();

    // Priority 1: Centers in user's city or nearby surrounding district tracks (within 80km)
    const sameCityCenters = centersWithDistances.filter(c => {
      const matchCity = c.city.toLowerCase().includes(userCity) || (userCity && userCity.includes(c.city.toLowerCase()));
      const matchPin = userPin && (c.pin.startsWith(userPin.slice(0, 3)) || c.pin === userPin);
      return matchCity || matchPin;
    });

    if (sameCityCenters.length > 0) {
      // Include nearby regional centers in the same state/division (under 80km)
      const nearbyRegional = centersWithDistances.filter(c => {
        const isSameState = userState && (c.state.toLowerCase().includes(userState) || userState.includes(c.state.toLowerCase()));
        const isNear = c.distanceNum <= 80;
        return isSameState && isNear;
      });
      return nearbyRegional.length > 0 ? nearbyRegional : sameCityCenters;
    }

    // Priority 2: Centers in user's state
    const sameStateCenters = centersWithDistances.filter(c => {
      return userState && (c.state.toLowerCase().includes(userState) || userState.includes(c.state.toLowerCase()));
    });

    if (sameStateCenters.length > 0) {
      return sameStateCenters;
    }

    // Priority 3: Fallback - generate local RTO for user's entered city (never dump nationwide centers)
    return [
      {
        id: `local-rto-${(addressData.city || 'local').toLowerCase().replace(/\s+/g, '-')}`,
        name: `${addressData.city || 'Regional'} Automated Test Track (ADTT)`,
        rtoCode: 'RTO-ADTT',
        area: `${addressData.area || 'Central'}, ${addressData.city || 'District'}`,
        city: addressData.city || 'City',
        state: addressData.stateName || 'State Transport Division',
        pin: addressData.pincode || 'Local Zone',
        address: `Automated Driving Track, Near Transport Office, ${addressData.city || ''}, ${addressData.stateName || ''} ${addressData.pincode || ''}`,
        lat: userCoords.lat,
        lng: userCoords.lng,
        distanceNum: 2.4,
        distance: '2.4km away',
        slots: ['12 Oct', '14 Oct']
      }
    ];
  };

  const displayCenters = getDisplayCenters();

  // Selected center defaults to the closest/nearest displayed RTO
  const [selectedCenter, setSelectedCenter] = useState(displayCenters[0]?.id);

  // Sync selected center if displayed list changes (e.g. on search or address update)
  useEffect(() => {
    if (displayCenters.length > 0 && !displayCenters.some(c => c.id === selectedCenter)) {
      setSelectedCenter(displayCenters[0].id);
    }
  }, [displayCenters, selectedCenter]);

  // Handle in-place address update & automatically find nearest RTO center
  const handleSaveInlineAddress = (e) => {
    e.preventDefault();
    const updated = {
      flatNo: editFlat,
      area: editArea,
      city: editCity,
      stateName: addressData.stateName || '',
      pincode: editPin,
      fullAddress: `${editFlat}, ${editArea}, ${editCity} – ${editPin}`
    };
    
    setAddressData(updated);
    centralDataStore.saveDraftForm('dl_address', updated);
    setShowEditAddressModal(false);
  };

  const activeCenter = displayCenters.find(c => c.id === selectedCenter) || displayCenters[0] || NATIONWIDE_RTO_DATABASE[0];

  return (
    <div className="page page-dl-center-select" style={{ width: 'min(1120px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Header Section (1:1 Reference Match) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            LOCATION SELECTION
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.8px' }}>
            {t('dlFlow.centerTitle') || 'Select a Test Centre'}
          </h1>
        </div>
        
        <p style={{ color: '#64748b', fontSize: '14.5px', maxWidth: '380px', margin: 0, textAlign: 'right', lineHeight: 1.5 }}>
          Find the most convenient location for your practical driving test. Availability is updated in real-time.
        </p>
      </div>

      {/* DIRECT VISIBLE ADDRESS BAR WITH 1-CLICK CHANGE ADDRESS */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        padding: '14px 20px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0, 37, 66, 0.03)',
        marginBottom: '24px',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPin size={18} color="#e88a2d" />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              YOUR SELECTED ADDRESS
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>
              {addressData.fullAddress || `${addressData.flatNo}, ${addressData.area}, ${addressData.city} – ${addressData.pincode}`}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditFlat(addressData.flatNo || '');
            setEditArea(addressData.area || '');
            setEditCity(addressData.city || '');
            setEditPin(addressData.pincode || '');
            setShowEditAddressModal(true);
          }}
          style={{
            background: '#002542',
            border: 'none',
            color: '#ffffff',
            padding: '8px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(0, 37, 66, 0.15)',
            transition: 'all 0.15s ease'
          }}
        >
          Change Address ✏️
        </button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Search & Test Center Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Intelligent Search Bar (Searches Pin, City, State, Area & Code) */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by PIN, city, state, area or RTO code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 38px 13px 40px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                color: '#173b57',
                boxSizing: 'border-box',
                background: '#ffffff'
              }}
            />
            <span style={{ position: 'absolute', left: '13px', top: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
              <Search size={17} />
            </span>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', top: '12px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Context Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', fontWeight: 600, padding: '0 4px' }}>
            <span>
              {searchQuery ? `Search results for "${searchQuery}" (${displayCenters.length})` : `Available RTO Tracks near ${addressData.city || 'you'} (${displayCenters.length})`}
            </span>
            <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={13} strokeWidth={3} /> Auto-sorted by proximity
            </span>
          </div>

          {/* Test Center Cards Stack (Sorted Closest to Farthest) */}
          {displayCenters.map((c, index) => {
            const isSelected = selectedCenter === c.id;
            const isNearest = index === 0;

            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCenter(c.id);
                  centralDataStore.saveDraftForm('dl_test_center', c);
                }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  border: isSelected ? '2px solid #002542' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 6px 20px rgba(0, 37, 66, 0.08)' : '0 2px 10px rgba(0, 37, 66, 0.02)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#173b57', margin: 0, lineHeight: 1.3, flex: 1 }}>
                    {c.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    {isNearest && (
                      <span style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                        ⚡ NEAREST
                      </span>
                    )}
                    {isSelected && (
                      <span style={{ background: '#002542', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                        Selected
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                  <MapPin size={14} color="#002542" /> <span style={{ fontWeight: 700, color: '#002542' }}>{c.distance}</span> · {c.area} ({c.pin})
                </div>

                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  EARLIEST AVAILABILITY
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: isSelected ? '20px' : '0' }}>
                  {c.slots.map((s, idx) => (
                    <span key={idx} style={{ background: '#f0f9ff', color: '#0369a1', padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 700 }}>
                      {s}
                    </span>
                  ))}
                </div>

                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      centralDataStore.saveDraftForm('dl_test_center', c);
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

        {/* Right Column: Clean Live Map View (Auto-synced with Active Selection) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)',
          height: '520px',
          position: 'sticky',
          top: '24px'
        }}>
          <iframe
            key={activeCenter.id}
            title="Live Test Center Map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(activeCenter.name + ' ' + activeCenter.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
            allowFullScreen
            loading="lazy"
          />
        </div>

      </div>

      {/* Inline Quick Edit Address Modal */}
      {showEditAddressModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 37, 66, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px 32px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0, 37, 66, 0.15)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                ✏️ Change Address
              </h3>
              <button
                type="button"
                onClick={() => setShowEditAddressModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.4 }}>
              Enter your address below. The system will automatically fetch all RTO test centres in your region and highlight the nearest one.
            </p>

            <form onSubmit={handleSaveInlineAddress} style={{ display: 'grid', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Flat / House & Building</label>
                <input
                  type="text"
                  value={editFlat}
                  onChange={(e) => setEditFlat(e.target.value)}
                  placeholder="e.g. Flat 402, Green Heights"
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Area / Locality</label>
                <input
                  type="text"
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                  placeholder="e.g. Indiranagar, Dwarka, Andheri, Sakchi"
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>City</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Delhi, Mumbai, Pune"
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Pin Code</label>
                  <input
                    type="text"
                    value={editPin}
                    onChange={(e) => setEditPin(e.target.value)}
                    placeholder="e.g. 560034, 110013, 400053"
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowEditAddressModal(false)}
                  style={{ background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#476179', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: '#002542', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, color: '#ffffff', cursor: 'pointer' }}
                >
                  Save & Fetch RTOs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------------------------
// 7B. DL TEST SLOT BOOKING PAGE — CAR-SEAT SHAPED LAYOUT (1:1 IMAGE 1 MATCH)
// ----------------------------------------------------------------------
export function DLTestSlotBookingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Retrieve User & Address saved from previous address selection page
  const user = centralDataStore.getUserProfile() || {};
  const initialSavedAddress = centralDataStore.getDraftForm('dl_address');
  const initialSavedCenter = centralDataStore.getDraftForm('dl_test_center');

  // Address state (retrieved from step 3 confirm address page)
  const [addressData, setAddressData] = useState(() => {
    if (initialSavedAddress && (initialSavedAddress.flatNo || initialSavedAddress.fullAddress)) {
      return initialSavedAddress;
    }
    return {
      flatNo: user.streetAddress || 'Flat 402, Green Park Heights',
      area: user.district || 'Sakchi',
      city: user.city || 'Jamshedpur',
      stateName: user.state || 'Jharkhand',
      pincode: user.pincode || '831001',
      fullAddress: user.fullAddress || 'Flat 402, Green Park Heights, Sakchi, Jamshedpur, Jharkhand - 831001',
      recipientName: user.name || 'Yanshi Chauhan',
      mobile: user.mobile || '+91 98765 43210',
      type: 'Verified Learner Licence Address'
    };
  });

  // Selected Test Center (retrieved from previous step or default)
  const [testCenter] = useState(() => {
    if (initialSavedCenter && initialSavedCenter.name) {
      return initialSavedCenter;
    }
    return {
      id: 'sarai',
      name: 'Sarai Kale Khan Automated RTO Track',
      shortName: 'Sarai Kale Khan RTO',
      code: 'DL-04',
      address: 'Ring Road, ISBT Sarai Kale Khan, Sakchi, New Delhi - 110013',
      distance: '3.2 km from your saved address',
      driveTime: '10 mins drive',
      tech: 'Automated Overhead Sensors & 360° Cameras'
    };
  });

  // Selection states
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDay, setSelectedDay] = useState('28');
  const [sessionFilter, setSessionFilter] = useState('all'); // 'all', 'morning', 'afternoon'
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  
  // Modals state
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Address Edit Form temporary state for inline modal
  const [editForm, setEditForm] = useState({
    flatNo: addressData.flatNo || 'Flat 402, Green Park Heights',
    area: addressData.area || 'Sakchi',
    city: addressData.city || 'Jamshedpur',
    stateName: addressData.stateName || 'Jharkhand',
    pincode: addressData.pincode || '831001',
    recipientName: addressData.recipientName || user.name || 'Yanshi Chauhan',
    mobile: addressData.mobile || user.mobile || '+91 98765 43210'
  });

  const handleSaveModalAddress = (e) => {
    e.preventDefault();
    const updatedFull = `${editForm.flatNo}, ${editForm.area}, ${editForm.city}, ${editForm.stateName} - ${editForm.pincode}`;
    const newAddressObj = {
      ...editForm,
      fullAddress: updatedFull,
      type: 'Updated Smartcard Dispatch Address'
    };
    setAddressData(newAddressObj);
    centralDataStore.saveDraftForm('dl_address', newAddressObj);
    centralDataStore.updateUserProfile({
      streetAddress: `${editForm.flatNo}, ${editForm.area}`,
      city: editForm.city,
      state: editForm.stateName,
      pincode: editForm.pincode,
      fullAddress: updatedFull
    });
    setIsEditAddressOpen(false);
  };

  // Days options with slot counts
  const days = [
    { day: 'MON', date: '25', count: 8, status: 'available' },
    { day: 'TUE', date: '26', count: 2, status: 'few' },
    { day: 'WED', date: '27', count: 6, status: 'available' },
    { day: 'THU', date: '28', count: 5, status: 'available' },
    { day: 'FRI', date: '29', count: 7, status: 'available' },
    { day: 'SAT', date: '30', count: 1, status: 'few' },
    { day: 'SUN', date: '31', count: 0, status: 'booked' }
  ];

  // Car Cockpit Slot Grid
  const slotsList = [
    { time: '09:00 AM', period: 'morning', status: 'booked', bay: 'Track Bay 1', examiner: 'Inspector R. Sharma' },
    { time: '10:00 AM', period: 'morning', status: 'few', tag: '2 LEFT', bay: 'Track Bay 2', examiner: 'Inspector S. Verma' },
    { time: '10:30 AM', period: 'morning', status: 'available', bay: 'Track Bay 1 (Parallel Parking)', examiner: 'Inspector R. Sharma' },
    { time: '11:00 AM', period: 'morning', status: 'available', bay: 'Track Bay 3 (Gradient Hill)', examiner: 'Inspector A. Kumar' },
    { time: '02:30 PM', period: 'afternoon', status: 'available', bay: 'Track Bay 2 (Reverse S-Curve)', examiner: 'Inspector P. Singh' },
    { time: '03:00 PM', period: 'afternoon', status: 'booked', bay: 'Track Bay 1', examiner: 'Inspector S. Verma' },
    { time: '03:30 PM', period: 'afternoon', status: 'available', tag: 'WOMEN PRIORITY', bay: 'Track Bay 3', examiner: 'Inspector M. Roy' }
  ];

  const filteredSlots = slotsList.filter(s => {
    if (sessionFilter === 'morning') return s.period === 'morning';
    if (sessionFilter === 'afternoon') return s.period === 'afternoon';
    return true;
  });

  const activeSlotObj = slotsList.find(s => s.time === selectedSlot) || slotsList[2];

  const handleConfirmAndProceed = () => {
    centralDataStore.bookAppointment({
      date: `${selectedDay} ${selectedMonth}`,
      time: selectedSlot,
      slot: selectedSlot,
      location: testCenter.name,
      testCenterName: testCenter.name,
      testCenterAddress: testCenter.address || 'Sakchi RTO Complex, Near Jubilee Park, Jamshedpur',
      testCenterCode: testCenter.code || 'DL-04',
      testCentreId: testCenter.id || 'sarai',
      reportingTime: selectedSlot === '09:00 AM' ? '08:45 AM' : selectedSlot === '10:00 AM' ? '09:45 AM' : selectedSlot === '10:30 AM' ? '10:15 AM' : '02:15 PM',
      dispatchAddress: addressData.fullAddress || `${addressData.flatNo}, ${addressData.area}, ${addressData.city}, ${addressData.stateName} - ${addressData.pincode}`,
      recipientName: addressData.recipientName || user.name,
      recipientMobile: addressData.mobile || user.mobile,
      trackBay: activeSlotObj.bay
    });
    navigate('/dl/appointment-fixed');
  };

  return (
    <div className="page page-dl-slot-booking" style={{ width: 'min(1140px, calc(100% - 48px))', margin: '28px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Navigation & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/dl/test-center')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#002542',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 0'
          }}
        >
          <ArrowLeft size={16} /> Back to Test Center Selection
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          <Sparkles size={14} /> STEP 4 OF 5 · PRACTICAL TEST SLOT
        </div>
      </div>

      {/* Horizontal Header Progress Stepper Track */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '16px 28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
        marginBottom: '24px',
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
                fontWeight: 800,
                boxShadow: st.active ? '0 0 10px rgba(232, 138, 45, 0.4)' : 'none'
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

      {/* PROMINENT CHOSEN DISPATCH & CONTACT ADDRESS CARD (ADDRESS FROM PREVIOUS STEP) */}
      <div style={{
        background: 'linear-gradient(135deg, #002542 0%, #001a30 100%)',
        borderRadius: '20px',
        padding: '20px 24px',
        color: '#ffffff',
        marginBottom: '28px',
        boxShadow: '0 8px 24px rgba(0, 37, 66, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: '300px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'rgba(232, 138, 45, 0.2)',
            border: '1px solid #e88a2d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e88a2d',
            flexShrink: 0
          }}>
            <Home size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase' }}>
                DISPATCH ADDRESS FROM PREVIOUS STEP
              </span>
              <span style={{ background: '#16a34a', color: '#ffffff', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>
                ✓ Verified
              </span>
            </div>
            
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              {addressData.recipientName || user.name || 'Yanshi Chauhan'} ({addressData.mobile || user.mobile || '+91 98765 43210'})
            </div>
            
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.4 }}>
              {addressData.fullAddress || `${addressData.flatNo}, ${addressData.area}, ${addressData.city}, ${addressData.stateName} - ${addressData.pincode}`}
            </p>

            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={12} color="#e88a2d" />
              <span>Distance to {testCenter.shortName || testCenter.name}: <b>{testCenter.distance || '3.8 km'}</b> ({testCenter.driveTime || '12 mins drive'})</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setEditForm({
              flatNo: addressData.flatNo || 'Flat 402, Green Park Heights',
              area: addressData.area || 'Sakchi',
              city: addressData.city || 'Jamshedpur',
              stateName: addressData.stateName || 'Jharkhand',
              pincode: addressData.pincode || '831001',
              recipientName: addressData.recipientName || user.name || 'Yanshi Chauhan',
              mobile: addressData.mobile || user.mobile || '+91 98765 43210'
            });
            setIsEditAddressOpen(true);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          <Edit3 size={15} color="#e88a2d" /> Edit Address Details
        </button>
      </div>

      {/* Date & Sub-Step Selector Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
          01 DATE &gt; <span style={{ color: '#002542' }}>02 SLOT &amp; COCKPIT SEAT</span> &gt; 03 REVIEW &gt; 04 CONFIRM
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#002542',
            cursor: 'pointer'
          }}
        >
          <option value="October 2026">October 2026</option>
          <option value="November 2026">November 2026</option>
          <option value="December 2026">December 2026</option>
        </select>
      </div>

      {/* Horizontal Date Selection Bar */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '4px' }}>
        {days.map((d) => {
          const isActive = selectedDay === d.date;
          const isBooked = d.status === 'booked';
          const isFew = d.status === 'few';

          return (
            <div
              key={d.date}
              onClick={() => !isBooked && setSelectedDay(d.date)}
              style={{
                background: isActive ? '#002542' : isBooked ? '#f8fafc' : '#ffffff',
                color: isActive ? '#ffffff' : isBooked ? '#94a3b8' : '#173b57',
                borderRadius: '16px',
                padding: '14px 20px',
                textAlign: 'center',
                border: isActive ? '2px solid #002542' : isFew ? '1px solid #f59e0b' : '1px solid #e2e8f0',
                boxShadow: isActive ? '0 6px 18px rgba(0, 37, 66, 0.2)' : 'none',
                cursor: isBooked ? 'not-allowed' : 'pointer',
                minWidth: '72px',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 800, opacity: isActive ? 0.8 : 0.6, letterSpacing: '0.5px' }}>
                {d.day}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, marginTop: '2px' }}>
                {d.date}
              </div>
              
              {/* Availability Tag */}
              <div style={{
                fontSize: '9px',
                fontWeight: 800,
                marginTop: '4px',
                color: isActive ? '#e88a2d' : isBooked ? '#94a3b8' : isFew ? '#b45309' : '#16a34a'
              }}>
                {isBooked ? 'Full' : `${d.count} slots`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column Layout */}
      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: CAR COCKPIT SEAT SHAPED LAYOUT CARD */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 6px 24px rgba(0, 37, 66, 0.04)'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#173b57', margin: 0 }}>
              Select a Practical Test Slot
            </h2>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Car size={16} color="#002542" /> LMV Automated Track
            </div>
          </div>

          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0' }}>
            Pick your preferred seat & time slot for the practical driving test on {selectedDay} {selectedMonth}.
          </p>

          {/* Session Filters (All, Morning, Afternoon) */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#f8fafc', padding: '6px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            {[
              { id: 'all', label: 'All Sessions' },
              { id: 'morning', label: '🌅 Morning (9AM - 12PM)' },
              { id: 'afternoon', label: '☀️ Afternoon (2PM - 5PM)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSessionFilter(f.id)}
                style={{
                  flex: 1,
                  background: sessionFilter === f.id ? '#002542' : 'transparent',
                  color: sessionFilter === f.id ? '#ffffff' : '#476179',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* STYLIZED CAR COCKPIT / VAN OUTLINE CONTAINER */}
          <div style={{
            width: '340px',
            margin: '0 auto 28px auto',
            border: '4px solid #e2e8f0',
            borderRadius: '44px 44px 28px 28px',
            padding: '36px 24px 28px 24px',
            background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
            position: 'relative',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.03)'
          }}>
            
            {/* Steering Wheel / Driver Cockpit Header */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontWeight: 800,
              color: '#94a3b8',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              <span style={{ fontSize: '14px' }}>🚘</span> TEST VEHICLE COCKPIT
            </div>

            {/* Wheels / Side Mirrors */}
            <div style={{ position: 'absolute', top: '70px', left: '-12px', width: '12px', height: '40px', background: '#94a3b8', borderRadius: '6px 0 0 6px' }} />
            <div style={{ position: 'absolute', top: '70px', right: '-12px', width: '12px', height: '40px', background: '#94a3b8', borderRadius: '0 6px 6px 0' }} />
            <div style={{ position: 'absolute', bottom: '70px', left: '-12px', width: '12px', height: '40px', background: '#cbd5e1', borderRadius: '6px 0 0 6px' }} />
            <div style={{ position: 'absolute', bottom: '70px', right: '-12px', width: '12px', height: '40px', background: '#cbd5e1', borderRadius: '0 6px 6px 0' }} />

            {/* 2x3 Car Seat Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px 20px', marginTop: '10px' }}>
              {filteredSlots.map((s, idx) => {
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
                      borderRadius: '18px 18px 12px 12px',
                      padding: '24px 10px 14px 10px',
                      textAlign: 'center',
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      boxShadow: isSelected ? '0 6px 20px rgba(0, 37, 66, 0.25)' : '0 2px 8px rgba(0,0,0,0.03)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Headrest Tab */}
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '42px',
                      height: '10px',
                      borderRadius: '6px 6px 0 0',
                      background: isSelected ? '#001a30' : isBooked ? '#cbd5e1' : '#cbd5e1'
                    }} />

                    {/* Badge */}
                    {s.tag && (
                      <span style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '6px',
                        background: s.tag.includes('WOMEN') ? '#fce7f3' : '#fef3c7',
                        color: s.tag.includes('WOMEN') ? '#be185d' : '#b45309',
                        fontSize: '8px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '8px',
                        border: '1px solid currentColor'
                      }}>
                        {s.tag}
                      </span>
                    )}

                    {/* Time & Icon */}
                    {isBooked ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>✕</span>
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

                    <div style={{ fontSize: '9px', fontWeight: 700, opacity: isSelected ? 0.9 : 0.6, marginTop: '4px' }}>
                      {s.bay.split(' ')[0]} {s.bay.split(' ')[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
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

        {/* Right Column: RTO Track Details & Appointment Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Selected RTO Info & Track Features */}
          <div style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ height: '110px', background: 'linear-gradient(135deg, #173b57 0%, #002542 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase' }}>SELECTED RTO TRACK</div>
                <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>{testCenter.name || 'Jamshedpur RTO Test Track'}</div>
              </div>
            </div>

            <div style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                📍 {testCenter.address || 'Sakchi RTO Complex, Near Jubilee Park, Jamshedpur'}
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', fontSize: '11px', color: '#476179', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>⚙️ <b>Track Tech:</b> Automated Overhead Cameras & Sensor Grids</div>
                <div>🎯 <b>Passing Score:</b> 80 / 100 Minimum Criteria</div>
              </div>
            </div>
          </div>

          {/* Appointment Summary Box */}
          <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '2px' }}>
              Appointment Summary
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
              Application #IND-2026-98124 · Learner Licence Form 3 Verified
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={18} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>DATE &amp; MONTH</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>{selectedDay} {selectedMonth}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={18} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>SELECTED TIME SLOT</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>{selectedSlot} ({activeSlotObj.bay})</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>TEST CENTER</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>{testCenter.name}</div>
                </div>
              </div>

              {/* Vehicle Class Box */}
              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '12px 14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Car size={20} color="#002542" />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>VEHICLE CLASS</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>LMV — Car (Light Motor Vehicle)</div>
                </div>
              </div>

              {/* Verified Dispatch Address Summary Box */}
              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '12px 14px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Home size={18} color="#e88a2d" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#e88a2d', textTransform: 'uppercase' }}>SMARTCARD DISPATCH ADDRESS</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#173b57', marginTop: '2px' }}>
                    {addressData.fullAddress || `${addressData.flatNo}, ${addressData.area}, ${addressData.city}, ${addressData.stateName} - ${addressData.pincode}`}
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={() => setIsConfirmModalOpen(true)}
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
              Reporting time: 15 mins prior to {selectedSlot}.
            </p>
          </div>

        </div>

      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* INLINE MODAL 1: EDIT DISPATCH ADDRESS DIRECTLY FROM SLOT BOOKING PAGE  */}
      {/* ---------------------------------------------------------------------- */}
      {isEditAddressOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 37, 66, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsEditAddressOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#476179' }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
              DISPATCH ADDRESS MANAGEMENT
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
              Update DL Smartcard Dispatch Address
            </h3>

            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.4 }}>
              Your physical Smartcard driving licence will be delivered to this verified address after passing the practical test.
            </p>

            <form onSubmit={handleSaveModalAddress} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '4px' }}>
                  RECIPIENT FULL NAME
                </label>
                <input
                  type="text"
                  value={editForm.recipientName}
                  onChange={(e) => setEditForm({ ...editForm, recipientName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#173b57', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '4px' }}>
                  HOUSE / FLAT NO. &amp; BUILDING NAME
                </label>
                <input
                  type="text"
                  value={editForm.flatNo}
                  onChange={(e) => setEditForm({ ...editForm, flatNo: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#173b57', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '4px' }}>
                  STREET / AREA / COLONY
                </label>
                <input
                  type="text"
                  value={editForm.area}
                  onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#173b57', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '4px' }}>
                  CITY / DISTRICT
                </label>
                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#173b57', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '4px' }}>
                  STATE
                </label>
                <input
                  type="text"
                  value={editForm.stateName}
                  onChange={(e) => setEditForm({ ...editForm, stateName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#173b57', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '4px' }}>
                  PINCODE
                </label>
                <input
                  type="text"
                  value={editForm.pincode}
                  onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#173b57', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: '#002542',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Save Address &amp; Apply
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditAddressOpen(false)}
                  style={{
                    background: '#ffffff',
                    color: '#173b57',
                    border: '1px solid #cbd5e1',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* INLINE MODAL 2: CONFIRMATION & REVIEW BEFORE FINAL BOOKING             */}
      {/* ---------------------------------------------------------------------- */}
      {isConfirmModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 37, 66, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '36px',
            maxWidth: '540px',
            width: '100%',
            boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#476179' }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', color: '#002542', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <Car size={30} color="#002542" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                Confirm Driving Test Slot
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Review your appointment details before issuing your official RTO pass.
              </p>
            </div>

            {/* Summary Details Box */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#476179' }}>
                <span>Date &amp; Time:</span>
                <span style={{ fontWeight: 800, color: '#173b57' }}>{selectedDay} {selectedMonth} at {selectedSlot}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#476179' }}>
                <span>Test Center:</span>
                <span style={{ fontWeight: 800, color: '#173b57' }}>{testCenter.name}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#476179' }}>
                <span>Track Bay:</span>
                <span style={{ fontWeight: 800, color: '#173b57' }}>{activeSlotObj.bay}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#476179' }}>
                <span>Candidate Name:</span>
                <span style={{ fontWeight: 800, color: '#173b57' }}>{addressData.recipientName || user.name}</span>
              </div>

              <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '10px', marginTop: '4px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', textTransform: 'uppercase', marginBottom: '2px' }}>
                  DELIVERY ADDRESS FOR DL SMARTCARD
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#173b57' }}>
                  {addressData.fullAddress || `${addressData.flatNo}, ${addressData.area}, ${addressData.city}, ${addressData.stateName} - ${addressData.pincode}`}
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmAndProceed}
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
                boxShadow: '0 4px 16px rgba(0, 37, 66, 0.25)'
              }}
            >
              Confirm &amp; Issue Appointment Pass <CheckCircle size={18} color="#e88a2d" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------------------------
// 7C. APPOINTMENT FIXED SUCCESS PAGE
// ----------------------------------------------------------------------
export function DLAppointmentFixedPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const upcomingApt = centralDataStore.getUpcomingAppointment() || {};
  const savedCenter = centralDataStore.getDraftForm('dl_test_center') || {};
  const savedAddress = centralDataStore.getDraftForm('dl_address') || centralDataStore.getUserProfile() || {};

  const testCenterName = upcomingApt.testCenterName || savedCenter.name || upcomingApt.location || 'Sarai Kale Khan Automated RTO Track';
  const testCenterAddress = upcomingApt.testCenterAddress || savedCenter.address || 'Ring Road, ISBT Sarai Kale Khan, Sakchi, New Delhi - 110013';
  const appointmentRef = upcomingApt.ref || upcomingApt.id || 'APT-982-1049';
  const scheduledDate = upcomingApt.date || '28 October 2026';
  const slotTime = upcomingApt.slot || upcomingApt.time || '10:30 AM';
  const reportingTime = upcomingApt.reportingTime || '10:15 AM';
  const dispatchAddress = upcomingApt.dispatchAddress || savedAddress.fullAddress || `${savedAddress.flatNo || savedAddress.streetAddress || 'Flat 402, Green Park Heights'}, ${savedAddress.city || 'Jamshedpur'}`;
  const recipientName = upcomingApt.recipientName || savedAddress.recipientName || savedAddress.name || 'Yanshi Chauhan';

  useEffect(() => {
    localStorage.setItem('last_processed_flow', 'dl_appointment');
    localStorage.setItem('last_processed_title', 'DL Practical Test Slot Fixed');
  }, []);

  return (
    <div className="page page-dl-appointment-fixed" style={{ width: 'min(820px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' }}>
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

        <p style={{ color: '#64748b', fontSize: '15px', margin: '0 auto 32px auto', maxWidth: '540px', lineHeight: 1.5 }}>
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
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>{appointmentRef}</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Scheduled Date</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57', marginTop: '4px' }}>{scheduledDate}</div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>RTO Test Center &amp; Track Location</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', marginTop: '4px' }}>{testCenterName}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>📍 {testCenterAddress}</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Selected Slot &amp; Reporting Time</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#e88a2d', marginTop: '4px' }}>{slotTime} (Report: {reportingTime})</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Candidate Name</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57', marginTop: '4px' }}>{recipientName}</div>
            </div>

            <div style={{ gridColumn: 'span 2', background: '#ffffff', padding: '14px 18px', borderRadius: '14px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#e88a2d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🏠 SMARTCARD DISPATCH ADDRESS
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', marginTop: '4px' }}>
                {dispatchAddress}
              </div>
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
