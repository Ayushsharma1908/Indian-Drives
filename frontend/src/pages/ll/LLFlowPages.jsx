import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2, Car, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Upload,
  Clock, AlertTriangle, Play, HelpCircle, Award, RefreshCw, FileText, MapPin,
  Laptop, Check, Info, HeartPulse, CreditCard, Edit3, User, Eye, Save, Lock
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getStoredUserProfile } from '../../data/userProfileData';
import { UnifiedStageStepper } from '../../components/ui/UnifiedStageStepper';
import { LanguageContext, useLanguage } from '../../main';

// ----------------------------------------------------------------------
// CONSISTENT 5-STEP HORIZONTAL STEPPER DESIGN FLOW
// ----------------------------------------------------------------------
const LL_FLOW_STEPS = [
  { id: 'applicant', title: 'Personal Details', label: 'Personal', icon: User, path: '/ll/applicant' },
  { id: 'address', title: 'Address Details', label: 'Address', icon: MapPin, path: '/ll/address' },
  { id: 'vehicle', title: 'Vehicle Class', label: 'Vehicle', icon: Car, path: '/ll/vehicle' },
  { id: 'documents', title: 'Documents Upload', label: 'Documents', icon: FileText, path: '/ll/documents' },
  { id: 'review', title: 'Application Review', label: 'Review', icon: CheckCircle2, path: '/ll/review' }
];

// Reusable Top Horizontal Stepper Layout Matching User Reference Image
function LLFlowLayout({ currentStepIndex, title, children }) {
  return (
    <div className="page page-ll-flow" style={{ width: 'min(1184px, calc(100% - 32px))', margin: '32px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Header Title & Application ID */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: 0, letterSpacing: '-0.5px' }}>
          {title}
        </h1>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
          Application ID: DS-2409-KLM
        </span>
      </div>

      {/* Top Standardized Responsive Stepper Header Bar */}
      <UnifiedStageStepper
        steps={LL_FLOW_STEPS}
        currentStepIndex={currentStepIndex}
        flowName="LEARNER LICENCE FLOW"
      />

      {/* Main Content Area */}
      {children}

    </div>
  );
}

// ----------------------------------------------------------------------
// 0. LL Application Intro Page
// ----------------------------------------------------------------------
export function LLApplicationIntroPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="page page-ll-intro" style={{ width: 'min(1140px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-1px' }}>
          {t('llFlow.introTitle')}
        </h1>
        <p style={{ color: '#476179', fontSize: '16px', margin: 0, lineHeight: 1.5 }}>
          {t('llFlow.introSubtitle')}
        </p>
      </div>

      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              ⇅
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#173b57', margin: 0 }}>
              {t('llFlow.journeyOverview')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '28px', textAlign: 'center' }}>
            {LL_FLOW_STEPS.map((stg, idx) => (
              <div key={stg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: idx === 0 ? '#173b57' : '#ffffff',
                  color: idx === 0 ? '#ffffff' : '#64748b',
                  border: idx === 0 ? 'none' : '2px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px'
                }}>
                  {idx + 1}
                </div>
                <span style={{ fontSize: '12px', fontWeight: idx === 0 ? 800 : 600, color: idx === 0 ? '#173b57' : '#64748b' }}>
                  {stg.label}
                </span>
              </div>
            ))}
          </div>

          <p style={{ color: '#476179', fontSize: '14px', margin: 0 }}>
            {t('llFlow.stepsDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', color: '#e88a2d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#173b57', margin: '0 0 4px 0' }}>{t('llFlow.rtoSelection')}</h3>
              <p style={{ fontSize: '14px', color: '#476179', margin: 0 }}>{t('llFlow.rtoSelectionSub')}</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Laptop size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#173b57', margin: '0 0 4px 0' }}>{t('llFlow.assessmentProcess')}</h3>
              <p style={{ fontSize: '14px', color: '#476179', margin: 0 }}>{t('llFlow.assessmentProcessSub')}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => navigate('/ll/applicant')}
          style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '14px 32px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          {t('llFlow.startAppBtn')} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// STAGE 1: Personal Details (/ll/applicant)
// ----------------------------------------------------------------------
export function LLApplicantDetailsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const profile = getStoredUserProfile();

  return (
    <LLFlowLayout currentStepIndex={0} title={t('llFlow.applicantTitle')}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          {t('llFlow.applicantTitle')}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          {t('llFlow.applicantSub')}
        </p>

        <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
              {t('llFlow.fullName')} <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input className="input-field" defaultValue={profile.fullName} placeholder={profile.fullName} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.dob')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input type="text" className="input-field" defaultValue={profile.dob} placeholder={profile.dob} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.gender')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select className="input-field" defaultValue={profile.gender || "Male"} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                Blood Group
              </label>
              <select className="input-field" defaultValue={profile.bloodGroup || "O+ve"} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }}>
                <option value="O+ve">O+ve</option>
                <option value="A+ve">A+ve</option>
                <option value="B+ve">B+ve</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.mobile')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input className="input-field" defaultValue={profile.mobile} placeholder={profile.mobile} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
              {t('llFlow.email')}
            </label>
            <input className="input-field" defaultValue={profile.email} placeholder={profile.email} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/intro')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            {t('common.back')}
          </button>
          <button onClick={() => navigate('/ll/address')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('common.continue')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </LLFlowLayout>
  );
}

// ----------------------------------------------------------------------
// STAGE 2: Address Details (/ll/address)
// ----------------------------------------------------------------------
export function LLAddressDetailsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const profile = getStoredUserProfile();

  return (
    <LLFlowLayout currentStepIndex={1} title={t('llFlow.addressTitle')}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          {t('llFlow.addressTitle')}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          {t('llFlow.addressSub')}
        </p>

        <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>{t('llFlow.street')}</label>
            <input className="input-field" defaultValue={profile.streetAddress} placeholder={profile.streetAddress} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>{t('llFlow.city')}</label>
              <input className="input-field" defaultValue={profile.city} placeholder={profile.city} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>{t('llFlow.pincode')}</label>
              <input className="input-field" defaultValue={`${profile.state} - ${profile.pincode}`} placeholder={`${profile.state} - ${profile.pincode}`} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/applicant')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            {t('common.back')}
          </button>
          <button onClick={() => navigate('/ll/vehicle')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('common.continue')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </LLFlowLayout>
  );
}

// ----------------------------------------------------------------------
// STAGE 3: Vehicle Class (/ll/vehicle)
// ----------------------------------------------------------------------
export function LLVehicleSelectionPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selected, setSelected] = useState(['lmv', 'mcwg']);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <LLFlowLayout currentStepIndex={2} title={t('llFlow.vehicleTitle')}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          {t('llFlow.vehicleTitle')}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          {t('llFlow.vehicleSub')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
          <div
            onClick={() => toggle('lmv')}
            style={{
              border: selected.includes('lmv') ? '2px solid #173b57' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              background: selected.includes('lmv') ? '#f8fafc' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 4px 0' }}>LMV</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Light Motor Vehicle (Car, Jeep, etc.)</p>
            </div>
          </div>

          <div
            onClick={() => toggle('mcwg')}
            style={{
              border: selected.includes('mcwg') ? '2px solid #173b57' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              background: selected.includes('mcwg') ? '#f8fafc' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BikeIcon />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 4px 0' }}>MCWG</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Motorcycle With Gear</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/address')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            {t('common.back')}
          </button>
          <button onClick={() => navigate('/ll/documents')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('common.continue')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </LLFlowLayout>
  );
}

function BikeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6h2.57a2 2 0 0 1 1.8 1.1l2.13 4.26a2 2 0 0 1 .23.94v2.7" />
      <path d="M15 17.5V11a2 2 0 0 0-2-2H8.5" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// STAGE 4: Document Upload (/ll/documents)
// ----------------------------------------------------------------------
export function LLDocumentRequirementsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <LLFlowLayout currentStepIndex={3} title={t('llFlow.docsTitle')}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          {t('llFlow.docsTitle')}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          {t('llFlow.docsSub')}
        </p>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
          {[
            { title: 'Passport Size Photograph', file: 'rajesh_photo_2024.jpg • 1.2 MB' },
            { title: 'Identity Proof (Aadhaar Card)', file: 'aadhaar_front_back.pdf • 2.4 MB' },
            { title: 'Address Proof (Voter ID)', file: 'voter_id_scan.pdf • 1.8 MB' },
            { title: 'Scanned Signature', file: 'rajesh_sign.png • 0.5 MB' }
          ].map((doc, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '18px 24px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 800, color: '#173b57' }}>{doc.title}</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{doc.file}</span>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#173b57', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                View
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/vehicle')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            {t('common.back')}
          </button>
          <button onClick={() => navigate('/ll/review')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('common.continue')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </LLFlowLayout>
  );
}

// ----------------------------------------------------------------------
// STAGE 5: Application Review (1:1 EXACT MATCH TO USER REFERENCE SCREENSHOT)
// ----------------------------------------------------------------------
export function LLApplicationReviewPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [confirmed, setConfirmed] = useState(false);
  const profile = getStoredUserProfile();

  return (
    <LLFlowLayout currentStepIndex={4} title={t('llFlow.reviewTitle')}>
      
      {/* 2-Column Main Section */}
      <div className="responsive-split-grid grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start', marginBottom: '32px' }}>
        
        {/* Left Cards Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Blue Alert Banner */}
          <div style={{ background: '#f0f4ff', padding: '20px 24px', borderRadius: '16px', border: '1px solid #dbefe', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#173b57', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
              i
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 800, color: '#173b57' }}>
                {t('llFlow.alertBanner')}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#476179', lineHeight: 1.5 }}>
                Please verify all details carefully. Changes cannot be made after submission without starting a new application.
              </p>
            </div>
          </div>

          {/* Card 1: Personal Details */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                  Personal Details
                </h3>
              </div>

              <button onClick={() => navigate('/ll/applicant')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#173b57', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 size={14} /> Edit
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>FULL NAME</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.fullName}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>DATE OF BIRTH</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.dob}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>GENDER</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.gender || 'Male'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>BLOOD GROUP</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.bloodGroup || 'O+ve'}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>MOBILE NUMBER</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.mobile}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>EMAIL ADDRESS</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.email}</div>
              </div>
            </div>
          </div>

          {/* Card 2: Address Details */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                  Address Details
                </h3>
              </div>

              <button onClick={() => navigate('/ll/address')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#173b57', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 size={14} /> Edit
              </button>
            </div>

            <div style={{ display: 'grid', gap: '18px', fontSize: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>PRESENT ADDRESS</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px', lineHeight: 1.5 }}>
                  {profile.streetAddress}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>CITY/DISTRICT</div>
                  <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.city}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>STATE & PINCODE</div>
                  <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>{profile.state} - {profile.pincode}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Vehicle Class */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                  Vehicle Class
                </h3>
              </div>

              <button onClick={() => navigate('/ll/vehicle')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#173b57', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 size={14} /> Edit
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#173b57', fontSize: '16px' }}>LMV</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Light Motor Vehicle (Car, Jeep, etc.)</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BikeIcon />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#173b57', fontSize: '16px' }}>MCWG</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Motorcycle With Gear</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Documents Uploaded */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                  Documents Uploaded
                </h3>
              </div>

              <button onClick={() => navigate('/ll/documents')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#173b57', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 size={14} /> Edit
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { name: 'Passport Size Photograph', file: 'rajesh_photo_2024.jpg • 1.2 MB' },
                { name: 'Identity Proof (Aadhaar Card)', file: 'aadhaar_front_back.pdf • 2.4 MB' },
                { name: 'Address Proof (Voter ID)', file: 'voter_id_scan.pdf • 1.8 MB' },
                { name: 'Scanned Signature', file: 'rajesh_sign.png • 0.5 MB' }
              ].map((doc, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#173b57', fontSize: '14px' }}>{doc.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{doc.file}</div>
                    </div>
                  </div>

                  <button style={{ background: 'none', border: 'none', color: '#173b57', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: What happens next? */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <CreditCard size={20} />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0' }}>
              What happens next?
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              After you submit this application, you will be redirected to the secure payment gateway to complete your fee payment.
            </p>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'grid', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Application Fee</span>
                <strong style={{ color: '#173b57' }}>₹150.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>LL Test Fee</span>
                <strong style={{ color: '#173b57' }}>₹50.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '16px', fontWeight: 800 }}>
                <span style={{ color: '#173b57' }}>Total</span>
                <span style={{ color: '#173b57' }}>₹200.00</span>
              </div>
            </div>
          </div>

          {/* Card 2: Need to change something? */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0' }}>
              Need to change something?
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 18px 0', lineHeight: 1.5 }}>
              You can safely go back and edit any section before final submission. Your progress will be saved automatically.
            </p>

            <button style={{ width: '100%', background: '#ffffff', color: '#173b57', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              💾 Save as Draft & Exit
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Fixed Action Bar */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px 28px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/ll/documents')}
          style={{ background: 'none', border: 'none', color: '#173b57', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#476179' }}>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#173b57' }}
            />
            I confirm the details above are accurate.
          </label>

          <button
            onClick={() => navigate('/ll/payment')}
            disabled={!confirmed}
            style={{
              background: confirmed ? '#0f2942' : '#cbd5e1',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: confirmed ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            Submit & Pay <CreditCard size={18} />
          </button>
        </div>
      </div>

    </LLFlowLayout>
  );
}

// ----------------------------------------------------------------------
// STAGE 6: LL Fee Payment & Successful Payment Screens (1:1 REFERENCE MATCH)
// ----------------------------------------------------------------------
export function LLFeePaymentPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [paid, setPaid] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [verifiedUpi, setVerifiedUpi] = useState(false);

  // If Payment is Completed, render the 1:1 "Payment Successful" Screen (Image 2)
  if (paid) {
    return (
      <div className="page page-ll-payment-success" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        
        {/* Top Stepper Bar (Details -> Documents -> Payment (Active Green) -> Approval) */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px 48px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            
            {/* Background Line */}
            <div style={{ position: 'absolute', top: '16px', left: '30px', right: '30px', height: '3px', background: '#cbd5e1', zIndex: 0 }} />
            
            {/* Green Progress Line */}
            <div style={{ position: 'absolute', top: '16px', left: '30px', width: '66%', height: '3px', background: '#16a34a', zIndex: 1 }} />

            {[
              { label: 'Details', done: true },
              { label: 'Documents', done: true },
              { label: 'Payment', active: true },
              { label: 'Approval', done: false }
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: step.done || step.active ? (step.active ? '#16a34a' : '#173b57') : '#ffffff',
                  color: step.done || step.active ? '#ffffff' : '#64748b',
                  border: step.done || step.active ? 'none' : '2px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  boxShadow: step.active ? '0 0 0 4px #ffffff, 0 0 0 6px #16a34a' : 'none'
                }}>
                  {step.done || step.active ? <Check size={16} strokeWidth={3} /> : idx + 1}
                </div>
                <span style={{ fontSize: '13px', fontWeight: step.active ? 800 : 600, color: step.active ? '#16a34a' : step.done ? '#173b57' : '#94a3b8' }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#dcfce7',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 0 0 8px rgba(22, 163, 74, 0.12)'
          }}>
            <Check size={44} strokeWidth={3} />
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            {t('llFlow.paymentSuccessTitle') || 'Payment Successful'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.5 }}>
            Your payment of <strong>₹220.00</strong> has been recorded. Your application is now moving to the next stage.
          </p>
        </div>

        {/* Transaction Receipt Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)', maxWidth: '640px', margin: '0 auto 36px auto', position: 'relative', overflow: 'hidden' }}>
          
          {/* Subtle Corner Decoration */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: '#f1f5f9', borderRadius: '0 0 0 100px', opacity: 0.6, pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
              Transaction Receipt
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>AMOUNT PAID</div>
              <div style={{ fontWeight: 800, color: '#173b57', fontSize: '20px' }}>₹220.00</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>TRANSACTION ID</div>
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, color: '#173b57' }}>
                DS-PAY-9842-XKL
              </span>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>DATE & TIME</div>
              <div style={{ fontWeight: 700, color: '#173b57', fontSize: '14px' }}>24 Aug 2024, 02:45 PM</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>APPLICATION NUMBER</div>
              <div style={{ fontWeight: 800, color: '#173b57', fontSize: '14px' }}>DS-2409-KLM</div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>PAYMENT METHOD</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, color: '#173b57' }}>
              <CreditCard size={16} /> UPI (GPay)
            </div>
          </div>

        </div>

        {/* LL Test Scenario Readiness Banner */}
        <div style={{ background: '#f0f9ff', borderRadius: '16px', border: '1px solid #bae6fd', padding: '20px 24px', maxWidth: '640px', margin: '0 auto 28px auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#002542', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Laptop size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Next Stage: Online LL Test Scenario</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Your fee is verified. Proceed to take your 15-minute road safety computer test.</div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/ll/assessment-cockpit')}
            style={{ background: '#002542', color: '#ffffff', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(0, 37, 66, 0.2)' }}
          >
            Start LL Test Scenario <ArrowRight size={18} />
          </button>

          <button
            onClick={() => alert("Downloading official government fee receipt (PDF)...")}
            style={{ background: '#ffffff', color: '#173b57', border: '1px solid #cbd5e1', padding: '16px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            📥 Download Receipt
          </button>
        </div>

      </div>
    );
  }

  // Otherwise, render the 1:1 "Secure Payment" Screen (Image 1)
  return (
    <div className="page page-ll-secure-payment" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Title Header & Badges */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
          {t('llFlow.checkoutTitle') || 'Secure Payment'}
        </h1>

        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#476179', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            🪪 App ID: DS-2409-KLM
          </span>
          <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#476179', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            📍 RTO Bangalore Central (KA-01)
          </span>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start', marginBottom: '36px' }}>
        
        {/* Left Column: Select Payment Method */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 24px 0' }}>
            Select Payment Method
          </h2>

          {/* Option 1: UPI (RECOMMENDED) */}
          <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ background: '#eef6ff', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 800, color: '#173b57', letterSpacing: '0.3px' }}>
                📱 UPI (RECOMMENDED)
              </div>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#173b57', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={13} strokeWidth={3} />
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              
              {/* 3 App Cards */}
              <div className="grid-4col-to-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                
                {/* GPay */}
                <div
                  onClick={() => setSelectedUpiApp('gpay')}
                  style={{
                    border: selectedUpiApp === 'gpay' ? '2px solid #173b57' : '1px solid #e2e8f0',
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: selectedUpiApp === 'gpay' ? '0 4px 12px rgba(23, 59, 87, 0.06)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#4285F4', marginBottom: '2px' }}>
                    <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>P</span><span style={{ color: '#FBBC05' }}>a</span><span style={{ color: '#34A853' }}>y</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#173b57' }}>GPay</span>
                </div>

                {/* PhonePe */}
                <div
                  onClick={() => setSelectedUpiApp('phonepe')}
                  style={{
                    border: selectedUpiApp === 'phonepe' ? '2px solid #173b57' : '1px solid #e2e8f0',
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: selectedUpiApp === 'phonepe' ? '0 4px 12px rgba(23, 59, 87, 0.06)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#5f259f', marginBottom: '2px' }}>
                    पे
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#173b57' }}>PhonePe</span>
                </div>

                {/* Paytm */}
                <div
                  onClick={() => setSelectedUpiApp('paytm')}
                  style={{
                    border: selectedUpiApp === 'paytm' ? '2px solid #173b57' : '1px solid #e2e8f0',
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: selectedUpiApp === 'paytm' ? '0 4px 12px rgba(23, 59, 87, 0.06)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#00baf2', marginBottom: '2px' }}>
                    Paytm
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#173b57' }}>Paytm</span>
                </div>

              </div>

              {/* Or enter UPI ID */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#476179', display: 'block', marginBottom: '8px' }}>
                  Or enter UPI ID
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    style={{ width: '100%', padding: '12px 90px 12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: '#ffffff' }}
                  />
                  <button
                    onClick={() => setVerifiedUpi(true)}
                    style={{ position: 'absolute', right: '8px', top: '7px', background: 'none', border: 'none', color: '#173b57', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}
                  >
                    {verifiedUpi ? '✓ Verified' : 'Verify'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Option 2: Net Banking */}
          <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 700, color: '#173b57' }}>
              🏛 Net Banking
            </div>
            <span style={{ fontSize: '16px', color: '#64748b' }}>›</span>
          </div>

          {/* Option 3: Credit / Debit Card */}
          <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 700, color: '#173b57' }}>
              💳 Credit / Debit Card
            </div>
            <span style={{ fontSize: '16px', color: '#64748b' }}>›</span>
          </div>

        </div>

        {/* Right Column: Payment Summary */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', margin: '0 0 20px 0' }}>
            Payment Summary
          </h3>

          <div style={{ display: 'grid', gap: '12px', fontSize: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Application Fee</span>
              <strong style={{ color: '#173b57' }}>₹150.00</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>LL Test Fee</span>
              <strong style={{ color: '#173b57' }}>₹50.00</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Service Charge</span>
              <strong style={{ color: '#173b57' }}>₹20.00</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#173b57' }}>Total Amount</span>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#173b57', letterSpacing: '-0.5px' }}>₹220.00</span>
            </div>
          </div>

          <button
            onClick={() => setPaid(true)}
            style={{
              width: '100%',
              background: '#002542',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(0, 37, 66, 0.2)'
            }}
          >
            🔒 PAY ₹220.00
          </button>

          <div style={{ textAlign: 'center', fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> 100% Secure & Govt. Approved Transaction
          </div>
        </div>

      </div>

      {/* Bottom Navigation Links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/ll/review')}
          style={{ background: 'none', border: 'none', color: '#173b57', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Cancel & Return
        </button>

        <button
          onClick={() => alert("Connecting to 24x7 RTO Citizen Support...")}
          style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <HelpCircle size={16} /> Need Help?
        </button>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 1. LL ASSESSMENT COCKPIT / INTRO PAGE (1:1 IMAGE 1 MATCH)
// ----------------------------------------------------------------------
export function LLAssessmentCockpitPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="page page-ll-cockpit cockpit-page-container">
      
      {/* Top Header Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 800, color: '#e88a2d', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e88a2d' }} /> {t('cockpit.nextCheckpoint')}
        </div>
        
        <h1 className="cockpit-title" style={{ fontSize: '36px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
          {t('cockpit.title')}
        </h1>
        
        <p className="cockpit-subtitle" style={{ color: '#64748b', fontSize: '16px', margin: '0 0 16px 0', maxWidth: '640px', lineHeight: 1.5 }}>
          {t('cockpit.subtitle')}
        </p>

        <span style={{ background: '#f0f4ff', color: '#173b57', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {t('cockpit.prototypeTag')}
        </span>
      </div>

      {/* 2-Column Main Layout */}
      <div className="cockpit-main-grid">
        
        {/* Left Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Assessment Route Card */}
          <div className="cockpit-card" style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#173b57', letterSpacing: '0.5px', marginBottom: '20px' }}>
              {t('cockpit.routeTag')}
            </div>

            {/* Checkpoint Track with Smooth Touch Landscape Scroll */}
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', minWidth: '540px', padding: '4px 12px' }}>
                {/* Gray Base Track Line */}
                <div style={{ position: 'absolute', top: '16px', left: '28px', right: '28px', height: '3px', background: '#e2e8f0', zIndex: 0, borderRadius: '9999px' }} />
                
                {/* Active Green Completed Progress Line */}
                <div style={{ position: 'absolute', top: '16px', left: '28px', width: '58%', height: '3px', background: 'linear-gradient(90deg, #16a34a 0%, #173b57 70%, #e88a2d 100%)', zIndex: 1, borderRadius: '9999px' }} />

                {[
                  { label: t('cockpit.appStep'), done: true, icon: FileText },
                  { label: t('cockpit.docsStep'), done: true, icon: FileCheck2 },
                  { label: t('cockpit.payStep'), done: true, icon: CreditCard },
                  { label: t('cockpit.llStep'), active: true, icon: Laptop },
                  { label: t('cockpit.dlStep'), done: false, icon: Car },
                  { label: t('cockpit.licenceStep'), done: false, icon: ShieldCheck }
                ].map((rt, idx) => {
                  const IconComp = rt.icon;

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, flexShrink: 0, padding: '0 6px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: rt.active ? '#e88a2d' : rt.done ? '#16a34a' : '#ffffff',
                        color: rt.active || rt.done ? '#ffffff' : '#64748b',
                        border: rt.active ? 'none' : rt.done ? 'none' : '2px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: rt.active ? '0 0 0 3px #fff7ed, 0 0 0 5px #e88a2d' : rt.done ? '0 2px 8px rgba(22, 163, 74, 0.25)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>
                        {rt.done ? (
                          <Check size={16} strokeWidth={3} />
                        ) : (
                          <IconComp size={16} />
                        )}
                      </div>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: rt.active ? 800 : rt.done ? 800 : 700,
                        color: rt.active ? '#173b57' : rt.done ? '#16a34a' : '#94a3b8',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.2px'
                      }}>
                        {rt.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Road Knowledge Check */}
          <div className="cockpit-card">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
              {t('cockpit.knowledgeTitle')}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>
              {t('cockpit.knowledgeSub')}
            </p>

            <div className="cockpit-knowledge-grid">
              <div style={{ background: '#f3e8ff', padding: '20px 12px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚥</div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.trafficSignals')}</span>
              </div>

              <div style={{ background: '#fee2e2', padding: '20px 12px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛑</div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.roadSigns')}</span>
              </div>

              <div style={{ background: '#dcfce7', padding: '20px 12px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛣️</div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.roadRules')}</span>
              </div>

              <div style={{ background: '#e0f2fe', padding: '20px 12px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.safeDriving')}</span>
              </div>
            </div>

            <button className="cockpit-btn-practice">
              {t('cockpit.practiceBtn')} <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Right Column: Assessment Readiness */}
        <div className="cockpit-readiness-card">
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
            {t('cockpit.readinessTitle')}
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0', lineHeight: 1.5 }}>
            {t('cockpit.readinessSub')}
          </p>

          <div className="cockpit-readiness-stats">
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('cockpit.totalQs')}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.totalVal')}</div>
              </div>

              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('cockpit.duration')}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.durationVal')}</div>
              </div>

              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('cockpit.passingScore')}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>{t('cockpit.passingVal')}</div>
              </div>
            </div>

            {/* Circular Donut Ring Graphic */}
            <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#dbeafe" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e88a2d" strokeWidth="8" strokeDasharray="251" strokeDashoffset="251" strokeLinecap="round" transform="rotate(-90 50 50)" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>0/15</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>{t('cockpit.completeText')}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/ll/assessment-exam')}
            className="cockpit-btn-start"
          >
            {t('cockpit.startBtn')} <ArrowRight size={18} />
          </button>

          <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', fontSize: '11px', color: '#64748b', lineHeight: 1.5, display: 'flex', gap: '8px' }}>
            <Info size={14} color="#173b57" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{t('cockpit.proctorNotice')}</span>
          </div>

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 2. LIVE ASSESSMENT EXAM PAGE (1:1 IMAGE 2 MATCH)
// ----------------------------------------------------------------------
export function LLAssessmentLiveExamPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedOpt, setSelectedOpt] = useState('C');
  const [answeredCount, setAnsweredCount] = useState(1);

  return (
    <div className="page page-ll-exam" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Stepper Track Bar */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px 48px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ position: 'absolute', top: '16px', left: '30px', right: '30px', height: '3px', background: '#e2e8f0', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '16px', left: '30px', width: '50%', height: '3px', background: '#173b57', zIndex: 1 }} />

          {[
            { label: 'APPLY', done: true },
            { label: 'DOCS', done: true },
            { label: 'PAY', done: true },
            { label: 'ASSESSMENT', active: true },
            { label: 'DRIVING', done: false },
            { label: 'LICENCE', done: false }
          ].map((st, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: st.active ? '#eef6ff' : st.done ? '#173b57' : '#ffffff',
                color: st.done ? '#ffffff' : '#173b57',
                border: st.active ? '2px solid #e88a2d' : st.done ? 'none' : '2px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '12px',
                boxShadow: st.active ? '0 0 0 4px #fff7ed' : 'none'
              }}>
                {st.done ? <Check size={16} strokeWidth={3} /> : st.active ? '❓' : idx + 1}
              </div>
              <span style={{ fontSize: '10px', fontWeight: st.active ? 800 : 700, color: st.active ? '#e88a2d' : st.done ? '#173b57' : '#94a3b8' }}>
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Exam Interface */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Section: Question & Choices Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)', position: 'relative', overflow: 'hidden' }}>
          
          {/* Faded Background Watermark Number */}
          <div style={{ position: 'absolute', top: '-10px', right: '20px', fontSize: '160px', fontWeight: 900, color: '#f1f5f9', pointerEvents: 'none', select: 'none', zIndex: 0 }}>
            01
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            
            {/* Header Badges */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#173b57', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 800 }}>
                QUESTION 01
              </span>
              <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                Road Signs
              </span>
            </div>

            {/* Question Text */}
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#173b57', margin: '0 0 24px 0', lineHeight: 1.4 }}>
              What does this road sign indicate to the driver?
            </h2>

            {/* Traffic Sign Image Box */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', textAlign: 'center', marginBottom: '28px', position: 'relative' }}>
              
              {/* Traffic Sign Graphic (Red Circle with Diagonal Bar - No Entry) */}
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '14px solid #dc2626', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: '#ffffff' }}>
                <div style={{ width: '100%', height: '14px', background: '#dc2626', transform: 'rotate(-45deg)', transformOrigin: 'center' }} />
              </div>

              <div style={{ position: 'absolute', bottom: '12px', right: '16px', fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🔍 TAP TO ENLARGE
              </div>
            </div>

            {/* 4 Choices Grid (2x2) */}
            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {[
                { key: 'A', text: 'Speed limit is 50 km/h' },
                { key: 'B', text: 'No stopping or standing' },
                { key: 'C', text: 'No entry for all motor vehicles' },
                { key: 'D', text: 'Yield right of way' }
              ].map((opt) => {
                const isSelected = selectedOpt === opt.key;

                return (
                  <div
                    key={opt.key}
                    onClick={() => setSelectedOpt(opt.key)}
                    style={{
                      background: isSelected ? '#f0f4ff' : '#ffffff',
                      border: isSelected ? '2px solid #173b57' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '20px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      position: 'relative',
                      boxShadow: isSelected ? '0 4px 12px rgba(23, 59, 87, 0.08)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isSelected ? '#173b57' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#173b57',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      {opt.key}
                    </div>

                    <span style={{ fontSize: '14px', fontWeight: isSelected ? 800 : 600, color: '#173b57', lineHeight: 1.4 }}>
                      {opt.text}
                    </span>

                    {isSelected && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', borderRadius: '50%', background: '#e88a2d' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🚩 Flag for Review
              </button>

              <button
                onClick={() => navigate('/ll/assessment-result')}
                style={{ background: '#002542', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Next Question <ArrowRight size={18} />
              </button>
            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Time Remaining Card */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              TIME REMAINING
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#dc2626', letterSpacing: '-0.5px' }}>
                14 : 32
              </span>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                <Clock size={18} />
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>ANSWERED</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#173b57' }}>0 / 15</div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>PASSING SCORE</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#173b57' }}>9 / 15</div>
            </div>
          </div>

          {/* Question Map */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#173b57', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🎛 QUESTION MAP
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((qNum) => {
                const isCurrent = qNum === 1;

                return (
                  <div
                    key={qNum}
                    style={{
                      background: isCurrent ? '#fef3c7' : '#eef6ff',
                      border: isCurrent ? '2px solid #e88a2d' : 'none',
                      color: isCurrent ? '#d97706' : '#476179',
                      borderRadius: '8px',
                      padding: '10px 0',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {qNum < 10 ? `0${qNum}` : qNum}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disabled Assistant Notice */}
          <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px 16px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', lineHeight: 1.5, display: 'flex', gap: '8px' }}>
            <Info size={16} color="#173b57" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>Indian Drives assistant is disabled during the active assessment.</span>
          </div>

          {/* Exit Assessment */}
          <button
            onClick={() => navigate('/ll/assessment-cockpit')}
            style={{ width: '100%', background: 'none', border: 'none', color: '#dc2626', fontWeight: 800, fontSize: '13px', cursor: 'pointer', textAlign: 'center', padding: '8px 0' }}
          >
            EXIT ASSESSMENT
          </button>

        </div>

      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 3. ASSESSMENT RESULT PAGE (1:1 IMAGE 3 MATCH)
// ----------------------------------------------------------------------
export function LLAssessmentResultPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="page page-ll-result" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Centered Success Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <Check size={36} strokeWidth={3} />
        </div>

        <div style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
          ASSESSMENT PASSED
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
          {t('llFlow.resultTitle') || 'Congratulations! You cleared the Learner Licence assessment.'}
        </h1>

        <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
          Your theoretical knowledge has been verified. You are now eligible to proceed to the practical driving test.
        </p>
      </div>

      {/* Journey Progress Track Card */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px 40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,37,66,0.03)', marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
          JOURNEY PROGRESS
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ position: 'absolute', top: '14px', left: '30px', right: '30px', height: '3px', background: '#e2e8f0', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '14px', left: '30px', width: '70%', height: '3px', background: '#16a34a', zIndex: 1 }} />

          {[
            { label: 'APPLICATION', done: true },
            { label: 'DOCUMENTS', done: true },
            { label: 'PAYMENT', done: true },
            { label: 'LL ASSESSMENT', pass: true },
            { label: 'DRIVING TEST', next: true },
            { label: 'LICENCE', done: false }
          ].map((jp, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: jp.pass ? '#16a34a' : jp.next ? '#ffffff' : jp.done ? '#173b57' : '#ffffff',
                color: '#ffffff',
                border: jp.next ? '3px solid #f59e0b' : jp.pass || jp.done ? 'none' : '2px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '12px'
              }}>
                {jp.pass || jp.done ? <Check size={14} strokeWidth={3} /> : jp.next ? <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} /> : ''}
              </div>
              <span style={{ fontSize: '10px', fontWeight: jp.pass || jp.next ? 800 : 700, color: jp.pass ? '#16a34a' : jp.next ? '#f59e0b' : jp.done ? '#173b57' : '#94a3b8' }}>
                {jp.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Results Grid */}
      <div className="grid-2col responsive-split-grid" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '28px', alignItems: 'start', marginBottom: '32px' }}>
        
        {/* Left Column: Final Score Donut Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 28px 0' }}>
            Final Score
          </h3>

          {/* Donut Chart Graphic */}
          <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 28px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="75" fill="none" stroke="#eef6ff" strokeWidth="18" />
              <circle
                cx="90"
                cy="90"
                r="75"
                fill="none"
                stroke="#173b57"
                strokeWidth="18"
                strokeDasharray="471"
                strokeDashoffset="120"
                strokeLinecap="round"
                transform="rotate(-90 90 90)"
              />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>SCORE</div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#173b57', lineHeight: 1 }}>11 <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 600 }}>/ 15</span></div>
              <div style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, marginTop: '8px', display: 'inline-block' }}>
                🟢 80% PASSED
              </div>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Minimum passing score required is 9/15. You have comfortably cleared the assessment.
          </p>
        </div>

        {/* Right Column Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Assessment Summary Card */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 20px 0' }}>
              Assessment Summary
            </h3>

            <div className="grid-4col-to-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Total Questions</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#173b57' }}>15</div>
              </div>

              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '16px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', marginBottom: '4px' }}>Correct</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#16a34a' }}>12</div>
              </div>

              <div style={{ background: '#fef2f2', borderRadius: '14px', padding: '16px', border: '1px solid #fecaca' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', marginBottom: '4px' }}>Incorrect</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#dc2626' }}>3</div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Time Taken</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#173b57' }}>08:42</div>
              </div>
            </div>
          </div>

          {/* Knowledge Breakdown Card */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#173b57', margin: '0 0 20px 0' }}>
              Knowledge Breakdown
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { icon: '🚥', title: 'Traffic Signals', width: '90%', badge: 'Strong', color: '#16a34a', bg: '#dcfce7' },
                { icon: '🛑', title: 'Road Signs', width: '85%', badge: 'Strong', color: '#16a34a', bg: '#dcfce7' },
                { icon: '🛣️', title: 'Road Rules', width: '70%', badge: 'Good', color: '#d97706', bg: '#fef3c7' },
                { icon: '⚠️', title: 'Safe Driving', width: '75%', badge: 'Good', color: '#d97706', bg: '#fef3c7' }
              ].map((kb, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {kb.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57', marginBottom: '6px' }}>{kb.title}</div>
                    <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ background: kb.color, height: '100%', width: kb.width, borderRadius: '3px' }} />
                    </div>
                  </div>

                  <span style={{ background: kb.bg, color: kb.color, padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 800 }}>
                    {kb.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Next Destination Banner */}
      <div style={{ background: '#002542', color: '#ffffff', borderRadius: '24px', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 24px rgba(0, 37, 66, 0.15)' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
            NEXT DESTINATION
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            Driving Test
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1' }}>
            Schedule your practical driving assessment at your nearest Regional Transport Office.
          </p>
        </div>

        <button
          onClick={() => navigate('/dl/intro')}
          style={{ background: '#f59e0b', color: '#002542', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}
        >
          Continue to Booking <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 4. LEARNER LICENCE ISSUED SUCCESS PAGE (1:1 REFERENCE MATCH)
// ----------------------------------------------------------------------
export function LLVerifiedPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="page page-ll-verified" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Success Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#dcfce7',
          color: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 0 0 6px rgba(22, 163, 74, 0.12)'
        }}>
          <Check size={36} strokeWidth={3} />
        </div>

        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          {t('llFlow.docsTitle') || 'Your Learner Licence has been issued! 🥳'}
        </h1>

        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Application No: <strong>LL-2409-KLM</strong> • Approved on: <strong>Aug 24, 2024</strong>
        </p>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid-2col responsive-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Digital Preview Card */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '12px' }}>
            Digital Preview
          </div>

          {/* Official Learner Licence Digital Card */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(0, 37, 66, 0.05)', position: 'relative', overflow: 'hidden', marginBottom: '24px' }}>
            
            {/* Watermark Diagonal Text Background */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-25deg)',
              fontSize: '28px',
              fontWeight: 900,
              color: '#f1f5f9',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              letterSpacing: '6px',
              select: 'none',
              opacity: 0.7
            }}>
              DEMO PREVIEW DEMO PREVIEW
            </div>

            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  UNION OF INDIA
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', marginTop: '2px' }}>
                  Learner's Licence
                </div>
              </div>

              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={20} />
              </div>
            </div>

            {/* Card Body: Photo + Key Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '24px', position: 'relative', zIndex: 1 }}>
              
              {/* Photo Box */}
              <div style={{ width: '110px', height: '120px', borderRadius: '12px', background: '#e2e8f0', border: '1px solid #cbd5e1', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Applicant Photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Information Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>NAME</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#173b57' }}>Rajesh Kumar Sharma</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>LICENCE NO.</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>LL/24/09/8821</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>D.O.B.</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>14/05/1995</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>VALID TILL</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>Feb 24, 2025</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>CLASS</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>LMV, MCWG</div>
                </div>
              </div>

            </div>

          </div>

          {/* Action Buttons Under Card */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <button
              onClick={() => alert("Downloading official digital Learner Licence (PDF)...")}
              style={{ background: '#002542', color: '#ffffff', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              📥 Download Digital Copy
            </button>

            <button
              onClick={() => {
                localStorage.setItem('ll_completed', 'true');
                navigate('/dashboard?ll_completed=true');
              }}
              style={{ background: '#ffffff', color: '#173b57', border: '1px solid #e2e8f0', padding: '14px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >
              Back to Dashboard
            </button>
          </div>

        </div>

        {/* Right Column: What's Next? Card */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#173b57', margin: '0 0 16px 0' }}>
            What's Next?
          </h3>

          {/* Notice Alert Box */}
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <Info size={20} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontSize: '13px', color: '#0369a1', lineHeight: 1.5, fontWeight: 600 }}>
              <strong>30-Day Waiting Period:</strong> You must complete exactly 30 days of learning before applying for a permanent Driving Licence. Practice safely!
            </p>
          </div>

          {/* Vertical Stepper Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
            
            {/* Timeline Line */}
            <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '13px', width: '2px', background: '#e2e8f0', zIndex: 0 }} />

            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#173b57', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Learner Licence Issued</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Today</div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ffffff', border: '3px solid #173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#173b57' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#173b57' }}>Permanent DL Unlocks</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>In 30 Days (Sep 23, 2024)</div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Book Driving Test Slot</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Available after DL application</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
