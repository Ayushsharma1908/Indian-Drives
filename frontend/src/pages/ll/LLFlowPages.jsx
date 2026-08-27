import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2, Car, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Upload,
  Clock, AlertTriangle, Play, HelpCircle, Award, RefreshCw, FileText, MapPin,
  Laptop, Check, Info, HeartPulse, CreditCard, Edit3, User, Eye, Save, Lock,
  Download, Truck, Zap
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { centralDataStore } from '../../data/centralDataStore';
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
  const profile = centralDataStore.getUserProfile();
  const savedDraft = centralDataStore.getDraftForm('ll_applicant');

  const [formData, setFormData] = useState({
    fullName: savedDraft.fullName ?? profile.fullName ?? '',
    dob: savedDraft.dob ?? profile.dob ?? '',
    gender: savedDraft.gender ?? profile.gender ?? 'Female',
    bloodGroup: savedDraft.bloodGroup ?? profile.bloodGroup ?? 'O+ve',
    mobile: savedDraft.mobile ?? profile.mobile ?? '',
    email: savedDraft.email ?? profile.email ?? ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    centralDataStore.saveDraftForm('ll_applicant', updated);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleContinue = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    centralDataStore.saveDraftForm('ll_applicant', formData);
    navigate('/ll/address');
  };

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
            <input
              className="input-field"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Yanshi Chauhan"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: errors.fullName ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
            />
            {errors.fullName && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.fullName}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.dob')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                placeholder="DD/MM/YYYY"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: errors.dob ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
              />
              {errors.dob && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.dob}</div>}
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.gender')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                className="input-field"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px', background: '#ffffff' }}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                Blood Group
              </label>
              <select
                className="input-field"
                value={formData.bloodGroup}
                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px', background: '#ffffff' }}
              >
                <option value="O+ve">O+ve</option>
                <option value="A+ve">A+ve</option>
                <option value="B+ve">B+ve</option>
                <option value="AB+ve">AB+ve</option>
                <option value="O-ve">O-ve</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.mobile')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                className="input-field"
                value={formData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                placeholder="+91 98765 43210"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: errors.mobile ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
              />
              {errors.mobile && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.mobile}</div>}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
              {t('llFlow.email')}
            </label>
            <input
              className="input-field"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. name@example.com"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/intro')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            {t('common.back')}
          </button>
          <button onClick={handleContinue} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
  const profile = centralDataStore.getUserProfile();
  const savedDraft = centralDataStore.getDraftForm('ll_address');

  const [addressData, setAddressData] = useState({
    streetAddress: savedDraft.streetAddress ?? profile.streetAddress ?? '',
    city: savedDraft.city ?? profile.city ?? '',
    state: savedDraft.state ?? profile.state ?? 'Jharkhand',
    pincode: savedDraft.pincode ?? profile.pincode ?? '831001'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const updated = { ...addressData, [field]: value };
    setAddressData(updated);
    centralDataStore.saveDraftForm('ll_address', updated);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleContinue = () => {
    const newErrors = {};
    if (!addressData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!addressData.city.trim()) newErrors.city = 'City is required';
    if (!addressData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    centralDataStore.saveDraftForm('ll_address', addressData);
    navigate('/ll/vehicle');
  };

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
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
              {t('llFlow.street')} <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              className="input-field"
              value={addressData.streetAddress}
              onChange={(e) => handleChange('streetAddress', e.target.value)}
              placeholder="e.g. Flat 402, Green Park Heights, Sakchi"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: errors.streetAddress ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
            />
            {errors.streetAddress && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.streetAddress}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.city')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                className="input-field"
                value={addressData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g. Jamshedpur"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: errors.city ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
              />
              {errors.city && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.city}</div>}
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                {t('llFlow.pincode')} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                className="input-field"
                value={addressData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="e.g. 831001"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: errors.pincode ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '15px', boxSizing: 'border-box' }}
              />
              {errors.pincode && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.pincode}</div>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/applicant')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            {t('common.back')}
          </button>
          <button onClick={handleContinue} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t('common.continue')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </LLFlowLayout>
  );
}

// ----------------------------------------------------------------------
// STAGE 3: Vehicle Class (/ll/vehicle) - Comprehensive Parivahan COV Catalog
// ----------------------------------------------------------------------
export function LLVehicleSelectionPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const savedDraft = centralDataStore.getDraftForm('ll_vehicle');
  const [selected, setSelected] = useState(savedDraft?.selected || ['lmv', 'mcwg']);
  const [activeCategory, setActiveCategory] = useState('all');

  const VEHICLE_CATALOG = [
    // Personal / Non-Transport
    {
      id: 'mcwog',
      code: 'MCWOG',
      name: 'Motor Cycle Without Gear',
      category: 'personal',
      description: 'Scooters, Mopeds, Gearless Two-Wheelers & Electric Scooters',
      minAge: 'Min. Age 16 for 50cc / 18 general',
      icon: BikeIcon,
      badge: 'NON-TRANSPORT'
    },
    {
      id: 'mcwg',
      code: 'MCWG',
      name: 'Motor Cycle With Gear',
      category: 'personal',
      description: 'Standard Motorcycles, Geared Motorbikes, Cruisers',
      minAge: 'Min. Age 18 Years',
      icon: BikeIcon,
      badge: 'POPULAR'
    },
    {
      id: 'lmv',
      code: 'LMV',
      name: 'Light Motor Vehicle (Car/SUV)',
      category: 'personal',
      description: 'Private Motor Cars, Sedans, Hatchbacks, SUVs, Jeeps, Personal Vans',
      minAge: 'Min. Age 18 Years',
      icon: Car,
      badge: 'POPULAR'
    },
    {
      id: 'lmv-nt',
      code: 'LMV-NT',
      name: 'Light Motor Vehicle - Non Transport',
      category: 'personal',
      description: 'Private light passenger vehicles exclusively for non-commercial use',
      minAge: 'Min. Age 18 Years',
      icon: Car,
      badge: 'NON-TRANSPORT'
    },
    // Commercial & Transport
    {
      id: 'trans',
      code: 'TRANS / HGV',
      name: 'Transport / Heavy Goods Vehicle',
      category: 'commercial',
      description: 'Commercial Goods Carriers, Multi-Axle Trucks, Lorries, Container Trailers',
      minAge: 'Min. Age 20 Years (Valid LMV 1yr+)',
      icon: Truck,
      badge: 'COMMERCIAL'
    },
    {
      id: 'hpv',
      code: 'HPV / HPMV',
      name: 'Heavy Passenger Motor Vehicle',
      category: 'commercial',
      description: 'Commercial Passenger Buses, Tourist Coaches, Heavy Maxi Cabs',
      minAge: 'Min. Age 20 Years',
      icon: Truck,
      badge: 'COMMERCIAL'
    },
    {
      id: 'erick',
      code: 'e-RICKSHAW / e-CART',
      name: 'Electric Rickshaw & E-Cart',
      category: 'commercial',
      description: 'Battery-operated 3-wheeled passenger rickshaws and electric cargo carts',
      minAge: 'Min. Age 20 Years',
      icon: Zap,
      badge: 'CLEAN ENERGY'
    },
    // Specialized & Adapted
    {
      id: 'invcrx',
      code: 'INVCRX (Adapted)',
      name: 'Adapted Vehicle (Invalid Carriage)',
      category: 'specialized',
      description: 'Specially modified and adapted vehicles for Divyangjan (Persons with Disabilities)',
      minAge: 'Min. Age 18 Years',
      icon: Car,
      badge: 'DIVYANGJAN'
    },
    {
      id: 'agritrn',
      code: 'AGRI / TRACTOR',
      name: 'Agricultural Tractor & Trailer',
      category: 'specialized',
      description: 'Agricultural Tractors, Harvesters, and Field Machinery with Trolleys',
      minAge: 'Min. Age 18 Years',
      icon: Truck,
      badge: 'AGRICULTURE'
    },
    {
      id: 'rdrlr',
      code: 'RDRLR',
      name: 'Road Roller / Construction',
      category: 'specialized',
      description: 'Heavy road compaction rollers and civil highway engineering equipment',
      minAge: 'Min. Age 20 Years',
      icon: Truck,
      badge: 'SPECIAL PURPOSE'
    }
  ];

  const toggle = (id) => {
    const updated = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
    setSelected(updated);
    centralDataStore.saveDraftForm('ll_vehicle', { selected: updated });
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      alert('Please select at least one vehicle category to continue.');
      return;
    }
    centralDataStore.saveDraftForm('ll_vehicle', { selected });
    navigate('/ll/documents');
  };

  const filteredVehicles = activeCategory === 'all'
    ? VEHICLE_CATALOG
    : VEHICLE_CATALOG.filter(v => v.category === activeCategory);

  return (
    <LLFlowLayout currentStepIndex={2} title={t('llFlow.vehicleTitle') || 'Vehicle Class Selection'}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        
        {/* Header & Subtitle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-deep-navy)', margin: '0 0 6px 0' }}>
              Official Parivahan Class of Vehicles (COV)
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
              Select one or more vehicle categories for your Learner Licence application according to Ministry of Road Transport & Highways guidelines.
            </p>
          </div>

          <div style={{ background: 'var(--color-pale-indigo)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '8px 16px', textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-indigo)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>SELECTED CLASSES</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>{selected.length} {selected.length === 1 ? 'Class' : 'Classes'}</div>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Categories (10)' },
            { id: 'personal', label: '🚗 Personal / Non-Transport (4)' },
            { id: 'commercial', label: '🚛 Commercial & Transport (3)' },
            { id: 'specialized', label: '🚜 Specialized & Adapted (3)' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeCategory === tab.id ? '1px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                background: activeCategory === tab.id ? 'var(--color-deep-navy)' : '#ffffff',
                color: activeCategory === tab.id ? '#ffffff' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vehicle Selection Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px', marginBottom: '36px' }}>
          {filteredVehicles.map((veh) => {
            const isSelected = selected.includes(veh.id);
            const Icon = veh.icon;

            return (
              <div
                key={veh.id}
                onClick={() => toggle(veh.id)}
                style={{
                  border: isSelected ? '2px solid var(--color-deep-navy)' : '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: '20px',
                  background: isSelected ? 'var(--color-pale-indigo)' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: isSelected ? '0 4px 16px rgba(16, 45, 67, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'all 0.18s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: isSelected ? '#ffffff' : 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-deep-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>{veh.code}</span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: veh.badge === 'POPULAR' ? '#dcfce7' : 'var(--color-sky)',
                          color: veh.badge === 'POPULAR' ? '#16a34a' : 'var(--color-primary-navy)'
                        }}>
                          {veh.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                        {veh.name}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid var(--color-deep-navy)' : '2px solid var(--color-border)',
                    background: isSelected ? 'var(--color-deep-navy)' : '#ffffff',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.45, margin: 0, flexGrow: 1 }}>
                  {veh.description}
                </p>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  <span>⏳ {veh.minAge}</span>
                  <span style={{ color: isSelected ? 'var(--color-deep-navy)' : 'transparent', fontWeight: 700 }}>
                    {isSelected ? '✓ Added to LL' : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
          <button
            type="button"
            onClick={() => navigate('/ll/address')}
            className="secondary-button"
            style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 700 }}
          >
            ← {t('common.back')}
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="primary-button"
            style={{ padding: '12px 32px', fontSize: '14px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            {t('common.continue')} ({selected.length} Selected) <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </LLFlowLayout>
  );
}

function BikeIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div style={{ background: '#f0f4ff', padding: '20px 24px', borderRadius: '16px', border: '1px solid #bfdbfe', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {(centralDataStore.getDraftForm('ll_vehicle')?.selected || ['lmv', 'mcwg']).map((vId) => {
                const labels = {
                  mcwog: { code: 'MCWOG', name: 'Motor Cycle Without Gear', icon: BikeIcon },
                  mcwg: { code: 'MCWG', name: 'Motor Cycle With Gear', icon: BikeIcon },
                  lmv: { code: 'LMV', name: 'Light Motor Vehicle (Car/SUV)', icon: Car },
                  'lmv-nt': { code: 'LMV-NT', name: 'LMV Non-Transport', icon: Car },
                  trans: { code: 'TRANS / HGV', name: 'Transport Heavy Goods Vehicle', icon: Truck },
                  hpv: { code: 'HPV', name: 'Heavy Passenger Vehicle', icon: Truck },
                  erick: { code: 'e-RICKSHAW', name: 'Electric Rickshaw / E-Cart', icon: Zap },
                  invcrx: { code: 'INVCRX', name: 'Adapted Vehicle (Divyangjan)', icon: Car },
                  agritrn: { code: 'AGRI', name: 'Agricultural Tractor & Machinery', icon: Truck },
                  rdrlr: { code: 'RDRLR', name: 'Road Roller / Construction', icon: Truck }
                };
                const veh = labels[vId] || { code: vId.toUpperCase(), name: 'Vehicle Class', icon: Car };
                const Icon = veh.icon;

                return (
                  <div key={vId} style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#173b57', fontSize: '14px' }}>{veh.code}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>{veh.name}</div>
                    </div>
                  </div>
                );
              })}
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

    const txnId = `DS-PAY-${Math.floor(1000 + Math.random() * 9000)}-LL`;
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setReceiptMeta({
      txnId,
      date: now,
      method: methodDisplay,
      amount: '₹220.00',
      appId: 'IND-2026-98124'
    });

    centralDataStore.createPayment({
      title: 'Learner Licence Application Fee',
      amount: 220,
      purpose: 'LL Application Fee',
      method: methodDisplay,
      breakdown: [
        { label: 'Application Fee', fee: '₹150.00' },
        { label: 'LL Test Fee', fee: '₹50.00' },
        { label: 'Service Charge', fee: '₹20.00' }
      ]
    });

    setPaid(true);
  };

  // SUCCESS SCREEN WITH COOL CELEBRATION ANIMATION
  if (paid) {
    return (
      <div className="page page-ll-payment-success" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        
        {/* Top Stepper Bar */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px 48px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', top: '16px', left: '30px', right: '30px', height: '3px', background: '#cbd5e1', zIndex: 0 }} />
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

        {/* Center Success Header with Radiating Animation */}
        <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10px', left: '30%', color: 'var(--color-saffron)' }} className="payment-sparkle">✦</div>
          <div style={{ position: 'absolute', top: '20px', right: '32%', color: 'var(--color-teal)' }} className="payment-sparkle">✦</div>

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
              margin: '0 auto 20px auto'
            }}
          >
            <div className="payment-checkmark-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={46} strokeWidth={3} />
            </div>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#102D43', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            {t('llFlow.paymentSuccessTitle') || 'Payment Successful'}
          </h1>
          <p style={{ color: '#607083', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.5 }}>
            Your fee of <strong>₹220.00</strong> has been confirmed by the gateway. Your test slot is now ready.
          </p>
        </div>

        {/* Transaction Receipt Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)', maxWidth: '640px', margin: '0 auto 36px auto', position: 'relative', overflow: 'hidden' }}>
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
                {receiptMeta?.txnId || 'DS-PAY-9842-XKL'}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>DATE & TIME</div>
              <div style={{ fontWeight: 700, color: '#173b57', fontSize: '14px' }}>{receiptMeta?.date || 'Just now'}</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>APPLICATION NUMBER</div>
              <div style={{ fontWeight: 800, color: '#173b57', fontSize: '14px' }}>IND-2026-98124</div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>PAYMENT METHOD</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, color: '#173b57' }}>
              <CreditCard size={16} /> {receiptMeta?.method || 'UPI (Google Pay)'}
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
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/ll/assessment-cockpit')}
            className="primary-button"
            style={{ padding: '16px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Start LL Test Scenario <ArrowRight size={18} />
          </button>

          <button
            onClick={() => window.print()}
            className="secondary-button"
            style={{ padding: '16px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={16} /> Print / Save Receipt
          </button>
        </div>

      </div>
    );
  }

  // MAIN CHECKOUT FORM SCREEN
  return (
    <div className="page page-ll-secure-payment" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Title Header & Badges */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#102D43', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
          {t('llFlow.checkoutTitle') || 'Secure Payment'}
        </h1>

        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#476179', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            🪪 App ID: IND-2026-98124
          </span>
          <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#476179', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            📍 RTO Jamshedpur (JH-05)
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
          <div style={{ background: '#f8fafc', borderRadius: '16px', border: paymentMethod === 'upi' ? '2px solid var(--color-deep-navy)' : '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ background: '#eef6ff', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setPaymentMethod('upi')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 800, color: '#173b57' }}>
                📱 Instant UPI (GPay, PhonePe, Paytm, BHIM)
              </div>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px' }}>
                FASTEST
              </span>
            </div>

            {paymentMethod === 'upi' && (
              <div style={{ padding: '20px' }}>
                
                {/* 3 App Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { id: 'gpay', label: 'GPay', sub: 'Google Pay' },
                    { id: 'phonepe', label: 'PhonePe', sub: 'PhonePe' },
                    { id: 'paytm', label: 'Paytm', sub: 'Paytm' },
                    { id: 'bhim', label: 'BHIM', sub: 'BHIM UPI' }
                  ].map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedUpiApp(app.id)}
                      style={{
                        border: selectedUpiApp === app.id ? '2px solid #173b57' : '1px solid #e2e8f0',
                        background: selectedUpiApp === app.id ? '#eef6ff' : '#ffffff',
                        borderRadius: '12px',
                        padding: '14px 8px',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>{app.label}</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>{app.sub}</div>
                    </div>
                  ))}
                </div>

                {/* UPI ID entry */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#476179', display: 'block', marginBottom: '8px' }}>
                    Or enter UPI ID / VPA
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setUpiVerified(false);
                      }}
                      placeholder="e.g. mobile@upi"
                      style={{ flex: 1, padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', background: '#ffffff', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (upiId.includes('@')) setUpiVerified(true);
                        else alert('Enter a valid UPI ID (e.g. user@okhdfcbank)');
                      }}
                      className="secondary-button"
                      style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700 }}
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

              </div>
            )}
          </div>

          {/* Option 2: Credit / Debit Card */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: paymentMethod === 'card' ? '2px solid var(--color-deep-navy)' : '1px solid #e2e8f0', padding: '18px 20px', marginBottom: '14px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setPaymentMethod('card')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 700, color: '#173b57' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paymentMethod === 'card' ? '5px solid var(--color-deep-navy)' : '2px solid #cbd5e1', boxSizing: 'border-box' }} />
                💳 Credit / Debit Card (Visa, Mastercard, RuPay)
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>All Cards</span>
            </div>

            {paymentMethod === 'card' && (
              <div style={{ marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'grid', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>CARD NUMBER</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• ••••"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.number ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                  {cardErrors.number && <div style={{ fontSize: '11.5px', color: '#ef4444', marginTop: '4px' }}>{cardErrors.number}</div>}
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>NAME ON CARD</label>
                  <input
                    type="text"
                    placeholder="e.g. YANSHI CHAUHAN"
                    value={cardName}
                    onChange={(e) => {
                      setCardName(e.target.value.toUpperCase());
                      if (cardErrors.name) setCardErrors(prev => ({ ...prev, name: null }));
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.name ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                  {cardErrors.name && <div style={{ fontSize: '11.5px', color: '#ef4444', marginTop: '4px' }}>{cardErrors.name}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>EXPIRY DATE</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.expiry ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                    {cardErrors.expiry && <div style={{ fontSize: '11.5px', color: '#ef4444', marginTop: '4px' }}>{cardErrors.expiry}</div>}
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#476179', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      value={cardCvv}
                      onChange={handleCvvChange}
                      maxLength={3}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: cardErrors.cvv ? '1px solid #ef4444' : '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                    {cardErrors.cvv && <div style={{ fontSize: '11.5px', color: '#ef4444', marginTop: '4px' }}>{cardErrors.cvv}</div>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Option 3: Net Banking */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: paymentMethod === 'netbanking' ? '2px solid var(--color-deep-navy)' : '1px solid #e2e8f0', padding: '18px 20px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setPaymentMethod('netbanking')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 700, color: '#173b57' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paymentMethod === 'netbanking' ? '5px solid var(--color-deep-navy)' : '2px solid #cbd5e1', boxSizing: 'border-box' }} />
                🏛 Net Banking (All Indian Banks)
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Instant</span>
            </div>

            {paymentMethod === 'netbanking' && (
              <div style={{ marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                  {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'PNB'].map((bankName) => (
                    <div
                      key={bankName}
                      onClick={() => {
                        setSelectedBank(bankName.toLowerCase());
                        setCustomBank('');
                      }}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '10px',
                        border: selectedBank === bankName.toLowerCase() && !customBank ? '2px solid var(--color-deep-navy)' : '1px solid #e2e8f0',
                        background: selectedBank === bankName.toLowerCase() && !customBank ? '#eef6ff' : '#ffffff',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#173b57',
                        cursor: 'pointer'
                      }}
                    >
                      {bankName}
                    </div>
                  ))}
                </div>

                <select
                  value={customBank}
                  onChange={(e) => {
                    setCustomBank(e.target.value);
                    setSelectedBank('');
                  }}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13.5px', background: '#ffffff' }}
                >
                  <option value="">-- Or choose from other banks --</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="Union Bank of India">Union Bank of India</option>
                  <option value="IndusInd Bank">IndusInd Bank</option>
                  <option value="IDBI Bank">IDBI Bank</option>
                  <option value="Federal Bank">Federal Bank</option>
                </select>
              </div>
            )}
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
            {paymentMethod === 'upi' ? '🔒 PAY ₹220.00 VIA UPI' : paymentMethod === 'card' ? '🔒 PAY ₹220.00 WITH CARD' : '🔒 PROCEED TO BANK (₹220.00)'}
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
          className="secondary-button"
          style={{ padding: '8px 16px', fontSize: '13.5px' }}
        >
          ← Cancel & Return
        </button>

        <button
          onClick={() => alert("Connecting to 24x7 RTO Citizen Support...")}
          style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
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
