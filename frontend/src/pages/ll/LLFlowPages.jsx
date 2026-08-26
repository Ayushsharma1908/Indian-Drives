import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2, Car, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Upload,
  Clock, AlertTriangle, Play, HelpCircle, Award, RefreshCw, FileText, MapPin,
  Laptop, Check, Info, HeartPulse, CreditCard, Edit3, User, Eye, Save, Lock
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

// ----------------------------------------------------------------------
// CONSISTENT 5-STEP HORIZONTAL STEPPER DESIGN FLOW
// ----------------------------------------------------------------------
const LL_FLOW_STEPS = [
  { id: 'applicant', label: 'Personal', path: '/ll/applicant' },
  { id: 'address', label: 'Address', path: '/ll/address' },
  { id: 'vehicle', label: 'Vehicle', path: '/ll/vehicle' },
  { id: 'documents', label: 'Documents', path: '/ll/documents' },
  { id: 'review', label: 'Review', path: '/ll/review' }
];

// Reusable Top Horizontal Stepper Layout Matching User Reference Image
function LLFlowLayout({ currentStepIndex, title, children }) {
  const navigate = useNavigate();

  return (
    <div className="page page-ll-flow" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '32px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Header Title & Application ID */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: 0, letterSpacing: '-0.5px' }}>
          {title}
        </h1>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
          Application ID: DS-2409-KLM
        </span>
      </div>

      {/* Top Horizontal Stepper Header Bar */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px 48px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          
          {/* Connecting Track Line */}
          <div style={{ position: 'absolute', top: '16px', left: '40px', right: '40px', height: '3px', background: '#cbd5e1', zIndex: 0 }} />
          
          {/* Filled Progress Line */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '40px',
            width: `${(currentStepIndex / (LL_FLOW_STEPS.length - 1)) * 100}%`,
            height: '3px',
            background: '#173b57',
            transition: 'width 0.4s ease',
            zIndex: 1
          }} />

          {LL_FLOW_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                onClick={() => navigate(step.path)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, cursor: 'pointer' }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isCompleted || isActive ? '#173b57' : '#ffffff',
                  color: isCompleted || isActive ? '#ffffff' : '#64748b',
                  border: isCompleted || isActive ? 'none' : '2px solid #94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  boxShadow: isActive ? '0 0 0 4px #ffffff, 0 0 0 6px #173b57' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : isActive ? <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} /> : idx + 1}
                </div>
                <span style={{ fontSize: '13px', fontWeight: isActive || isCompleted ? 800 : 600, color: isActive || isCompleted ? '#173b57' : '#94a3b8' }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

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

  return (
    <div className="page page-ll-intro" style={{ width: 'min(1140px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0', letterSpacing: '-1px' }}>
          Start Your Learner Licence Journey
        </h1>
        <p style={{ color: '#476179', fontSize: '16px', margin: 0, lineHeight: 1.5 }}>
          A guided digital pathway to your first driving milestone.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              ⇅
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#173b57', margin: 0 }}>
              Journey Overview
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
            5 guided steps: Personal info, Address, Vehicle choice, Upload proofs, & Final Review.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', color: '#e88a2d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#173b57', margin: '0 0 4px 0' }}>RTO Selection</h3>
              <p style={{ fontSize: '14px', color: '#476179', margin: 0 }}>Auto-selected based on address.</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef6ff', color: '#173b57', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Laptop size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#173b57', margin: '0 0 4px 0' }}>Assessment Process</h3>
              <p style={{ fontSize: '14px', color: '#476179', margin: 0 }}>100% online assessment.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => navigate('/ll/applicant')}
          style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '14px 32px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          Start Application <ArrowRight size={18} />
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

  return (
    <LLFlowLayout currentStepIndex={0} title="Personal Details">
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          Applicant Information
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          Please provide your personal details as per official records.
        </p>

        <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
              Full Name (as per Aadhaar) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input className="input-field" defaultValue="Rajesh Kumar Sharma" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                Date of Birth <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input type="date" className="input-field" defaultValue="1992-08-14" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                Gender <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select className="input-field" defaultValue="Male" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }}>
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
              <select className="input-field" defaultValue="O+" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }}>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
                Mobile Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input className="input-field" defaultValue="+91 98765 43210" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input className="input-field" defaultValue="rajesh.sharma@example.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/intro')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            Back
          </button>
          <button onClick={() => navigate('/ll/address')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Save & Continue <ArrowRight size={16} />
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

  return (
    <LLFlowLayout currentStepIndex={1} title="Address Details">
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          Residential Address
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          Provide present address as per valid address proof.
        </p>

        <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>Street Address / Flat No.</label>
            <input className="input-field" defaultValue="Flat 4B, Surya Apartments, 12th Cross Road, Indiranagar, Near BDA Complex" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>City / District</label>
              <input className="input-field" defaultValue="Bengaluru Urban" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#173b57', display: 'block', marginBottom: '6px' }}>State & Pincode</label>
              <input className="input-field" defaultValue="Karnataka - 560038" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/ll/applicant')} style={{ background: '#e0f0ff', color: '#002542', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            Back
          </button>
          <button onClick={() => navigate('/ll/vehicle')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Save & Continue <ArrowRight size={16} />
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
  const [selected, setSelected] = useState(['lmv', 'mcwg']);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <LLFlowLayout currentStepIndex={2} title="Vehicle Class">
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          Select Vehicle Categories
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          Choose vehicle classes you wish to be licensed for.
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
            Back
          </button>
          <button onClick={() => navigate('/ll/documents')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Save & Continue <ArrowRight size={16} />
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

  return (
    <LLFlowLayout currentStepIndex={3} title="Document Upload">
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0' }}>
          Mandatory Proof Uploads
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          Upload clear PDF or JPG copies of your identity, address, photo, and signature.
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
            Back
          </button>
          <button onClick={() => navigate('/ll/review')} style={{ background: '#0f2942', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Proceed to Review <ArrowRight size={16} />
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
  const [confirmed, setConfirmed] = useState(false);

  return (
    <LLFlowLayout currentStepIndex={4} title="Application Review">
      
      {/* 2-Column Main Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start', marginBottom: '32px' }}>
        
        {/* Left Cards Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Blue Alert Banner */}
          <div style={{ background: '#f0f4ff', padding: '20px 24px', borderRadius: '16px', border: '1px solid #dbefe', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#173b57', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>
              i
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 800, color: '#173b57' }}>
                Final Review Required
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
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>Rajesh Kumar Sharma</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>DATE OF BIRTH</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>14 August 1992 <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>(31 yrs)</span></div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>GENDER</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>Male</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>BLOOD GROUP</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>O+</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>MOBILE NUMBER</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>+91 98765 43210</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>EMAIL ADDRESS</div>
                <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>rajesh.sharma@example.com</div>
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
                  Flat 4B, Surya Apartments, 12th Cross Road Indiranagar, Near BDA Complex
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>CITY/DISTRICT</div>
                  <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>Bengaluru Urban</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>STATE & PINCODE</div>
                  <div style={{ fontWeight: 800, color: '#173b57', fontSize: '15px' }}>Karnataka - 560038</div>
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
// STAGE 6: LL Fee Payment AFTER Review (/ll/payment)
// ----------------------------------------------------------------------
export function LLFeePaymentPage() {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);

  return (
    <div className="page page-ll-payment" style={{ width: 'min(900px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 37, 66, 0.05)', maxWidth: '600px', margin: '0 auto' }}>
        {!paid ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <CreditCard size={22} color="#173b57" />
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#173b57' }}>Fee Checkout</h3>
            </div>

            <div style={{ display: 'grid', gap: '10px', fontSize: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Form 3 LL Application Fee:</span>
                <strong>₹150.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Online Computer Test Fee:</span>
                <strong>₹50.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                <span>Total Amount Payable:</span>
                <span style={{ color: '#173b57' }}>₹200.00</span>
              </div>
            </div>

            <button
              onClick={() => setPaid(true)}
              style={{ width: '100%', background: '#0f2942', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Pay ₹200.00 via UPI / Card <CreditCard size={18} />
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#173b57', margin: '0 0 8px 0' }}>Payment Successful!</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
              Transaction ID: <strong>TXN-LL-994820X</strong> (Amount Paid: ₹200.00)
            </p>

            <button
              onClick={() => navigate('/ll/assessment-cockpit')}
              style={{ width: '100%', background: '#0f2942', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Start Online Exam Cockpit <Play size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// EXAM COCKPIT, LIVE EXAM & RESULT SCREENS
// ----------------------------------------------------------------------
export function LLAssessmentCockpitPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-cockpit" style={{ width: 'min(750px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.05)' }}>
        <span className="eye-badge" style={{ background: '#fff7ed', color: '#e88a2d' }}><ShieldCheck size={14} /> PROCTORED EXAM COCKPIT</span>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '16px 0 8px 0', color: '#173b57' }}>Learner Licence Online Computer Test</h1>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
          This exam consists of 20 multiple choice questions on Indian Traffic Signs & Motor Vehicle Rules. Minimum passing score is 12/20 (60%).
        </p>

        <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '28px', fontSize: '14px', color: '#0369a1', border: '1px solid #bae6fd' }}>
          <div style={{ fontWeight: 800, marginBottom: '8px' }}>Exam Guidelines:</div>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Keep your web camera active during the test.</li>
            <li>Do not refresh or switch tabs during the examination.</li>
            <li>Time Limit: 20 minutes (60 seconds per question).</li>
          </ul>
        </div>

        <button className="primary-button" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 800 }} onClick={() => navigate('/ll/assessment-exam')}>
          Start Live Exam Now <Play size={18} />
        </button>
      </div>
    </div>
  );
}

export function LLAssessmentLiveExamPage() {
  const navigate = useNavigate();
  const [selectedOpt, setSelectedOpt] = useState(1);

  return (
    <div className="page page-ll-exam" style={{ width: 'min(900px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#e88a2d' }}>QUESTION 4 OF 20</span>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 800, color: '#173b57' }}>What does this mandatory road sign signify?</h3>
          </div>
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> 00:42 sec
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ background: '#ffffff', border: '2px dashed #cbd5e1', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '8px solid #b91c1c', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 900, color: '#b91c1c' }}>
              STOP
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '12px', display: 'block', fontWeight: 600 }}>Mandatory Traffic Sign</span>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { id: 1, text: 'Stop & Yield Right of Way' },
              { id: 2, text: 'No Parking Zone Ahead' },
              { id: 3, text: 'Speed Limit 50 km/h' },
              { id: 4, text: 'Hospital Zone Ahead' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedOpt(opt.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: selectedOpt === opt.id ? '2px solid #173b57' : '1px solid #e2e8f0',
                  background: selectedOpt === opt.id ? '#f8fafc' : '#ffffff',
                  textAlign: 'left',
                  fontWeight: selectedOpt === opt.id ? 800 : 500,
                  fontSize: '15px',
                  color: '#173b57',
                  cursor: 'pointer'
                }}
              >
                {opt.id}. {opt.text}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/assessment-cockpit')}>Exit Exam</button>
          <button className="primary-button" onClick={() => navigate('/ll/assessment-result')}>Submit & View Score <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

export function LLAssessmentResultPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-result" style={{ width: 'min(700px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.05)' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <CheckCircle2 size={40} />
        </div>
        <span className="eye-badge" style={{ background: '#dcfce7', color: '#15803d' }}>PASSED CONGRATULATIONS</span>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0 8px 0', color: '#173b57' }}>LL Assessment Passed!</h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '28px' }}>
          You scored <strong>18 out of 20 (90%)</strong> on your online Learner Licence examination.
        </p>

        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>LEARNER LICENCE NO</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>KA01/2026/009182</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>VALID UNTIL</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#16a34a' }}>26 Feb 2027</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/verified')}>View Digital LL Card</button>
          <button className="primary-button" onClick={() => navigate('/dl/intro')}>Proceed to Permanent DL <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

export function LLVerifiedPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-verified" style={{ width: 'min(750px, calc(100% - 48px))', margin: '36px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,37,66,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="eye-badge" style={{ background: '#dcfce7', color: '#15803d' }}>OFFICIAL LL SMART CARD</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0 0 0', color: '#173b57' }}>Learner Licence Issued</h1>
          </div>
          <StatusBadge status="Verified" text="Active LL" />
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(15,23,42,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#e88a2d', fontWeight: 800 }}>GOVERNMENT OF KARNATAKA • RTO BENGALURU EAST</div>
              <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>LEARNER DRIVING LICENCE</div>
            </div>
            <div style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px' }}>Form 3</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '12px', textAlign: 'center', color: '#000' }}>
              <div style={{ width: '80px', height: '80px', background: '#cbd5e1', borderRadius: '8px', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>Photo</div>
              <span style={{ fontSize: '11px', fontWeight: 800 }}>KA01/2026/009182</span>
            </div>

            <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
              <div><span style={{ opacity: 0.7 }}>Holder:</span> <strong>Rajesh Kumar Sharma</strong></div>
              <div><span style={{ opacity: 0.7 }}>DOB:</span> <strong>14-Aug-1992</strong> • Blood: <strong>O+</strong></div>
              <div><span style={{ opacity: 0.7 }}>Vehicle Class:</span> <strong>MCWG, LMV</strong></div>
              <div><span style={{ opacity: 0.7 }}>Valid From:</span> <strong>26-Aug-2026</strong> to <strong>26-Feb-2027</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
