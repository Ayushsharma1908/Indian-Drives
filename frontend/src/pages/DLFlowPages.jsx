import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, CalendarDays, MapPin, CreditCard, Clock,
  ArrowRight, ArrowLeft, Download, Check, Truck, Award
} from 'lucide-react';
import { Stepper } from '../components/ui/Stepper';
import { StatusBadge } from '../components/ui/StatusBadge';

const DL_STEPS = ['DL Intro', 'Vehicle Class', 'Details & Address', 'Verification', 'Payment', 'Slot Booking'];

// 1. DL Intro & Continue (64:3173 / 64:3235)
export function DLIntroPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-intro">
      <Stepper steps={DL_STEPS} currentStep={0} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge"><Car size={14} /> PERMANENT DRIVING LICENCE</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Convert Learner Licence to Permanent DL</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
          You have held an active Learner Licence (KA01/2026/009182) for over 30 days. You are now eligible to take the automated RTO track test and receive your permanent Smartcard Driving Licence.
        </p>

        <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>ACTIVE LL DETAILS</span>
            <div style={{ fontSize: '16px', fontWeight: 800 }}>KA01/2026/009182 (MCWG, LMV)</div>
          </div>
          <StatusBadge status="Verified" text="Eligible for DL" />
        </div>

        <button className="primary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '16px' }} onClick={() => navigate('/dl/confirm-vehicle')}>
          Start Permanent DL Application <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// 2. Confirm Vehicle Class (64:3328)
export function DLConfirmVehiclePage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-confirm-vehicle">
      <Stepper steps={DL_STEPS} currentStep={1} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge">STEP 2 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Confirm Driving Vehicle Class</h1>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
          <div style={{ border: '2px solid var(--primary)', padding: '20px', borderRadius: '12px', background: 'var(--primary-soft)' }}>
            <div style={{ fontWeight: 800, fontSize: '16px' }}>MCWG (Motor Cycle With Gear)</div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0 0' }}>Included from Learner Licence #KA01/2026/009182</p>
          </div>
          <div style={{ border: '2px solid var(--primary)', padding: '20px', borderRadius: '12px', background: 'var(--primary-soft)' }}>
            <div style={{ fontWeight: 800, fontSize: '16px' }}>LMV (Light Motor Vehicle - Cars/Jeeps)</div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0 0' }}>Included from Learner Licence #KA01/2026/009182</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/dl/intro')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/dl/confirm-applicant')}>Confirm Details <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 3. Confirm Applicant & Address Details (64:3411 / 64:3463 / 64:3524)
export function DLConfirmDetailsPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-confirm-details">
      <Stepper steps={DL_STEPS} currentStep={2} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge">STEP 3 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Confirm Applicant & Address Info</h1>

        <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '32px', display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Name:</span><strong>Rahul Sharma</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DOB:</span><strong>14-Aug-1998</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Dispatch Address:</span><strong>#42, 3rd Cross, Indiranagar, Bengaluru - 560038</strong></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="secondary-button" onClick={() => navigate('/dl/confirm-vehicle')}><ArrowLeft size={16} /> Back</button>
          <button className="primary-button" onClick={() => navigate('/dl/fee-summary')}>Proceed to Fee Payment <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// 4. DL Fee Summary & Payment (64:3031 / 64:3673 / 64:3771)
export function DLPaymentCheckoutPage() {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);

  return (
    <div className="page page-dl-payment">
      <Stepper steps={DL_STEPS} currentStep={4} />
      <div className="services-panel" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
        {!paid ? (
          <>
            <span className="eye-badge"><CreditCard size={14} /> STEP 5 OF 6</span>
            <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Driving Licence Fee Payment</h1>

            <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--outline)' }}>
                <span>DL Form Fee (Form 7):</span><strong>₹200.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--outline)' }}>
                <span>Automated Track Test Fee:</span><strong>₹300.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--outline)' }}>
                <span>Smartcard Licence Printing:</span><strong>₹200.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>
                <span>Total Payable Amount:</span><strong>₹700.00</strong>
              </div>
            </div>

            <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 800 }} onClick={() => setPaid(true)}>
              Pay ₹700.00 via UPI / Card <CreditCard size={18} />
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Transaction ID: <strong>TXN-9844-01X</strong> (Amount Paid: ₹700.00)</p>

            <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => navigate('/dl/test-center')}>
              Select Driving Test RTO & Date <CalendarDays size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 5. Test Center & Slot Selection (67:6511 / 64:3825 / 67:6596)
export function DLTestSlotBookingPage() {
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState('indiranagar');
  const [selectedDate, setSelectedDate] = useState('2026-10-24');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  return (
    <div className="page page-dl-slot">
      <Stepper steps={DL_STEPS} currentStep={5} />
      <div className="services-panel" style={{ padding: '32px' }}>
        <span className="eye-badge"><CalendarDays size={14} /> STEP 6 OF 6</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Book Driving Test Slot</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>1. Choose RTO Test Track</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { id: 'indiranagar', title: 'Indiranagar Automated Track', desc: 'Track 4, Near BDA Complex' },
                { id: 'ecity', title: 'Electronic City RTO Track', desc: 'Phase 1 Transport Complex' }
              ].map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCenter(c.id)}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: selectedCenter === c.id ? '2px solid var(--primary)' : '1px solid var(--outline)',
                    background: selectedCenter === c.id ? 'var(--primary-soft)' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>{c.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>2. Select Date & Time Slot</h3>
            <input
              type="date"
              className="input-field"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--outline)', marginBottom: '16px' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM'].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSlot(s)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: selectedSlot === s ? '2px solid var(--saffron)' : '1px solid var(--outline)',
                    background: selectedSlot === s ? 'var(--saffron-soft)' : '#fff',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="primary-button" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 800 }} onClick={() => navigate('/dl/dashboard')}>
          Confirm Test Appointment <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
}

// 6. DL Dashboard (64:2728), Test Result (67:6886) & Dispatch (67:7051)
export function DLDashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-dashboard">
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="eye-badge"><Car size={14} /> DL APPLICATION HUB</span>
          <h1>Driving Licence Status</h1>
          <p>Track your test results, smartcard printing, and postal speed post delivery.</p>
        </div>
        <StatusBadge status="Scheduled" text="Test Scheduled" />
      </div>

      <div className="console-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <span className="stat-num" style={{ fontSize: '18px', color: 'var(--primary)' }}>APT-982-1049</span>
          <span className="stat-label">Appointment Ref</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ fontSize: '18px', color: 'var(--saffron)' }}>24 Oct 2026</span>
          <span className="stat-label">Test Date</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ fontSize: '18px', color: 'var(--ok)' }}>10:00 AM</span>
          <span className="stat-label">Time Slot</span>
        </div>
      </div>

      <div className="services-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Licence Lifecycle Timeline</h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { step: '1. Online Application & Fee Payment', done: true, text: 'Completed on 24 Oct 2024' },
            { step: '2. Driving Test Track Slot Booked', done: true, text: 'Scheduled for 24 Oct 2026 at Indiranagar' },
            { step: '3. Automated Track Skill Evaluation', done: false, text: 'Pending test attendance' },
            { step: '4. Smartcard Printing & Speed Post Dispatch', done: false, text: 'Awaiting test pass certificate' }
          ].map((t, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.done ? 'var(--ok)' : 'var(--surface-mid)', color: t.done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>
                {t.done ? <Check size={14} /> : idx + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{t.step}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="secondary-button" onClick={() => navigate('/dl/test-result')}>Preview Driving Test Result Screen</button>
        <button className="secondary-button" onClick={() => navigate('/dl/dispatch')}>Preview Dispatch & Delivery Screen</button>
      </div>
    </div>
  );
}

export function DrivingTestResultPage() {
  const navigate = useNavigate();
  return (
    <div className="page page-dl-test-result">
      <div className="services-panel" style={{ padding: '32px', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7', color: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <Award size={40} />
        </div>
        <span className="eye-badge" style={{ background: '#dcfce7', color: '#15803d' }}>AUTOMATED TRACK RESULT: PASS</span>
        <h1 style={{ fontSize: '28px', margin: '12px 0 8px 0' }}>Driving Test Passed!</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>
          Automated Track Score: <strong>95/100</strong>. Parallel Parking & Gradient Reverse passed cleanly.
        </p>
        <button className="primary-button" onClick={() => navigate('/dl/dispatch')}>View Smartcard Dispatch Status <Truck size={16} /></button>
      </div>
    </div>
  );
}

export function LicenceDispatchPage() {
  return (
    <div className="page page-dl-dispatch">
      <div className="services-panel" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
        <span className="eye-badge"><Truck size={14} /> SPEED POST DISPATCH</span>
        <h1 style={{ fontSize: '26px', margin: '12px 0 8px 0' }}>Licence Printing & Delivery</h1>

        <div style={{ background: 'var(--surface-low)', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tracking Number:</span><strong>SP-IN9948201IN</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Courier Partner:</span><strong>India Post Speed Post</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Estimated Delivery:</span><strong style={{ color: 'var(--ok)' }}>28 Oct 2026</strong></div>
        </div>
      </div>
    </div>
  );
}
