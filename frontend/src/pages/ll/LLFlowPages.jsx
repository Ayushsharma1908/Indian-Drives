import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2, Car, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Upload,
  Clock, AlertTriangle, Play, HelpCircle, Award, RefreshCw, FileText
} from 'lucide-react';
import { Stepper } from '../../components/ui/Stepper';
import { StatusBadge } from '../../components/ui/StatusBadge';

const LL_STEPS = ['Application Intro', 'Vehicle Select', 'Documents', 'Applicant Details', 'Address', 'Review'];

// 1. LL Application Intro (64:2406)
export function LLApplicationIntroPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-intro">
      <Stepper steps={LL_STEPS} currentStep={0} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge"><FileCheck2 size={14} /> STEP 1 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Apply for a Learner Licence</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
          Follow our 6-step online process. Complete your identity verification, upload proofs, and take the online proctored traffic rules test from home.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Fee Breakdown</h4>
            <div style={{ fontSize: '14px', color: 'var(--muted)', display: 'grid', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>LL Form Fee:</span><strong>₹150</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>LL Test Fee:</span><strong>₹50</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--outline)', paddingTop: '6px', fontWeight: 800, color: 'var(--primary)' }}><span>Total Payable:</span><strong>₹200</strong></div>
            </div>
          </div>

          <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Required Proofs</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--muted)', lineHeight: '1.8' }}>
              <li>Aadhaar Card (Identity & Age)</li>
              <li>Proof of Address</li>
              <li>Passport Size Photo & Signature</li>
            </ul>
          </div>
        </div>

        <button className="primary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '16px' }} onClick={() => navigate('/ll/vehicle')}>
          Proceed to Vehicle Selection <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// 2. Vehicle Selection (64:2142)
export function LLVehicleSelectionPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(['mcwg', 'lmv']);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="page page-ll-vehicle">
      <Stepper steps={LL_STEPS} currentStep={1} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge"><Car size={14} /> STEP 2 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Select Vehicle Class</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>Choose the categories of vehicles you wish to drive.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { id: 'mcwg', title: 'Motor Cycle With Gear (MCWG)', desc: 'Two wheelers with gear, motorbikes, scooters.' },
            { id: 'mcwog', title: 'Motor Cycle Without Gear (MCWOG)', desc: 'Scooters without manual clutch.' },
            { id: 'lmv', title: 'Light Motor Vehicle (LMV)', desc: 'Motorcars, jeeps, non-transport light vehicles.' }
          ].map(v => (
            <div
              key={v.id}
              onClick={() => toggle(v.id)}
              style={{
                border: selected.includes(v.id) ? '2px solid var(--saffron)' : '1px solid var(--outline)',
                background: selected.includes(v.id) ? 'var(--saffron-soft)' : '#fff',
                padding: '20px',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '6px' }}>{v.title}</div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/intro')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/ll/documents')}>Continue to Documents <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 3. Document Requirements (64:2269)
export function LLDocumentRequirementsPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-docs">
      <Stepper steps={LL_STEPS} currentStep={2} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge"><Upload size={14} /> STEP 3 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Upload Mandatory Documents</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>Ensure documents are clear, legible, and under 5MB (PDF/JPG).</p>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
          {[
            { title: 'Identity & Age Proof', status: 'Aadhaar Card Uploaded (Verified)', done: true },
            { title: 'Address Proof', status: 'Electricity Bill Uploaded', done: true },
            { title: 'Self Declaration Medical Form 1', status: 'Completed online', done: true }
          ].map((d, i) => (
            <div key={i} style={{ padding: '16px', background: 'var(--surface-low)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{d.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--ok)', marginTop: '2px' }}>{d.status}</div>
              </div>
              <StatusBadge status="Verified" text="Uploaded" />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/vehicle')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/ll/applicant')}>Applicant Details <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 4. Applicant Details (64:1925)
export function LLApplicantDetailsPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-applicant">
      <Stepper steps={LL_STEPS} currentStep={3} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge">STEP 4 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Applicant Personal Details</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Full Name (as in Aadhaar)</label>
            <input className="input-field" defaultValue="Rahul Sharma" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
          </div>
          <div>
            <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Date of Birth</label>
            <input className="input-field" type="date" defaultValue="1998-08-14" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
          </div>
          <div>
            <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Blood Group</label>
            <select className="input-field" defaultValue="O+" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }}>
              <option value="O+">O Positive (O+)</option>
              <option value="A+">A Positive (A+)</option>
              <option value="B+">B Positive (B+)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/documents')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/ll/address')}>Address Details <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 5. Address Details (64:1747)
export function LLAddressDetailsPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-address">
      <Stepper steps={LL_STEPS} currentStep={4} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge">STEP 5 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Address Information</h1>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
          <div>
            <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>House No / Street Address</label>
            <input className="input-field" defaultValue="#42, 3rd Cross, HAL 2nd Stage, Indiranagar" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>State</label>
              <input className="input-field" defaultValue="Karnataka" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
            </div>
            <div>
              <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>District / RTO Jurisdiction</label>
              <input className="input-field" defaultValue="Bengaluru East (KA-01)" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
            </div>
            <div>
              <label className="input-label" style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Pin Code</label>
              <input className="input-field" defaultValue="560038" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/applicant')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/ll/review')}>Review Application <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 6. Application Review (64:2884)
export function LLApplicationReviewPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-review">
      <Stepper steps={LL_STEPS} currentStep={5} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge">FINAL STEP</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Review & Confirm Application</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>Please double check all submitted details before initiating test fee payment.</p>

        <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '32px', display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Applicant Name:</span><strong>Rahul Sharma</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vehicle Class:</span><strong>MCWG, LMV</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>RTO Office:</span><strong>KA-01 (Bengaluru East)</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Fee:</span><strong style={{ color: 'var(--primary)', fontSize: '18px' }}>₹200.00</strong></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/address')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/ll/assessment-cockpit')}>Submit & Take LL Exam <Play size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 7. LL Assessment Cockpit (65:4864)
export function LLAssessmentCockpitPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-cockpit">
      <div className="services-panel" style={{ padding: '32px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <span className="eye-badge" style={{ background: 'var(--saffron-soft)', color: '#000' }}><ShieldCheck size={14} /> PROCTORED EXAM COCKPIT</span>
        <h1 style={{ fontSize: '26px', margin: '16px 0 8px 0' }}>Learner Licence Online Computer Test</h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          This exam consists of 20 multiple choice questions on Indian Traffic Signs & Motor Vehicle Rules. Minimum passing score is 12/20 (60%).
        </p>

        <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px', fontSize: '13px', color: '#0369a1' }}>
          <div style={{ fontWeight: 800, marginBottom: '6px' }}>Exam Guidelines:</div>
          <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.6' }}>
            <li>Keep your web camera active during the test.</li>
            <li>Do not refresh or switch tabs during the examination.</li>
            <li>Time Limit: 20 minutes (60 seconds per question).</li>
          </ul>
        </div>

        <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 800 }} onClick={() => navigate('/ll/assessment-exam')}>
          Start Live Exam Now <Play size={16} />
        </button>
      </div>
    </div>
  );
}

// 8. LL Assessment Live Exam Question (65:5029)
export function LLAssessmentLiveExamPage() {
  const navigate = useNavigate();
  const [selectedOpt, setSelectedOpt] = useState(1);

  return (
    <div className="page page-ll-exam">
      <div className="services-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-high)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--saffron)' }}>QUESTION 4 OF 20</span>
            <h3 style={{ margin: 0, fontSize: '18px' }}>What does this mandatory road sign signify?</h3>
          </div>
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> 00:42 sec
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ background: '#fff', border: '2px dashed var(--outline)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: '8px solid #b91c1c', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900, color: '#b91c1c' }}>
              STOP
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', display: 'block' }}>Mandatory Traffic Sign</span>
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
                  padding: '14px',
                  borderRadius: '10px',
                  border: selectedOpt === opt.id ? '2px solid var(--primary)' : '1px solid var(--outline)',
                  background: selectedOpt === opt.id ? 'var(--primary-soft)' : '#fff',
                  textAlign: 'left',
                  fontWeight: selectedOpt === opt.id ? 800 : 500,
                  fontSize: '14px',
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

// 9. LL Assessment Result (65:5235)
export function LLAssessmentResultPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-result">
      <div className="services-panel" style={{ padding: '32px', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7', color: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <CheckCircle2 size={40} />
        </div>
        <span className="eye-badge" style={{ background: '#dcfce7', color: '#15803d' }}>PASSED CONGRATULATIONS</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>LL Assessment Passed!</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>
          You scored <strong>18 out of 20 (90%)</strong> on your online Learner Licence examination.
        </p>

        <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>LEARNER LICENCE NO</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>KA01/2026/009182</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>VALID UNTIL</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ok)' }}>26 Feb 2027</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="secondary-button" onClick={() => navigate('/ll/verified')}>View Digital LL Card</button>
          <button className="primary-button" onClick={() => navigate('/dl/continue')}>Proceed to Permanent DL <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 10. LL Verified (64:3106) & Learning Dashboard (64:3981) / Dashboard (64:2554)
export function LLVerifiedPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-ll-verified">
      <div className="services-panel" style={{ padding: '32px', maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="eye-badge" style={{ background: '#dcfce7', color: '#15803d' }}>OFFICIAL LL SMART CARD</span>
            <h1 style={{ fontSize: '26px', margin: '4px 0 0 0' }}>Learner Licence Issued</h1>
          </div>
          <StatusBadge status="Verified" text="Active LL" />
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--saffron)', fontWeight: 800 }}>GOVERNMENT OF KARNATAKA • RTO BENGALURU EAST</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>LEARNER DRIVING LICENCE</div>
            </div>
            <div style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px' }}>Form 3</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '10px', padding: '8px', textAlign: 'center', color: '#000' }}>
              <div style={{ width: '80px', height: '80px', background: '#e2e8f0', borderRadius: '8px', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Photo</div>
              <span style={{ fontSize: '10px', fontWeight: 700 }}>KA01/2026/009182</span>
            </div>

            <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
              <div><span style={{ opacity: 0.7 }}>Holder:</span> <strong>Rahul Sharma</strong></div>
              <div><span style={{ opacity: 0.7 }}>DOB:</span> <strong>14-Aug-1998</strong> • Blood: <strong>O+</strong></div>
              <div><span style={{ opacity: 0.7 }}>Vehicle Class:</span> <strong>MCWG, LMV</strong></div>
              <div><span style={{ opacity: 0.7 }}>Valid From:</span> <strong>26-Aug-2026</strong> to <strong>26-Feb-2027</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
