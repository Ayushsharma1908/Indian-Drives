import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, Bot, Sparkles, BookOpen, CreditCard, FolderCheck,
  Calendar, Car, ChevronDown, ChevronUp, FileText, CheckCircle2, ShieldCheck, X
} from 'lucide-react';
import { useLanguage } from '../../main';

export function HelpCenterPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null); // Accordion state for FAQs
  const [selectedCategory, setSelectedCategory] = useState(null); // Category Modal/Drawer state
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // 6 Categories with rich internal content & articles
  const categories = [
    {
      id: 'll',
      title: 'Learner Licence',
      desc: 'Application process, eligibility criteria, and mandatory LL test guidelines.',
      icon: BookOpen,
      iconColor: 'var(--color-indigo)',
      iconBg: 'var(--color-pale-indigo)',
      borderColor: '#D5DCF2',
      articles: [
        { title: 'LL Eligibility Criteria', content: 'Applicants must be at least 18 years old for Light Motor Vehicles (LMV) or 16 years for non-geared 50cc two-wheelers. Parental consent is required for 16-18 age group.' },
        { title: 'Online LL Assessment Rules', content: 'The test consists of 15 multiple-choice questions covering traffic signs, road rules, and driving safety. Passing score is 9 out of 15 (60%). Remote proctoring checks camera identity.' },
        { title: 'Application & Form 1 Declaration', content: 'Complete online Form 1 physical fitness self-declaration and submit Aadhaar eKYC for instant document verification without visiting the RTO.' },
        { title: 'LL Validity & Test Eligibility', content: 'Learner Licence is valid for 6 months (180 days) across India. You become eligible to book a permanent DL practical test 30 days after LL issue.' }
      ]
    },
    {
      id: 'dl',
      title: 'Driving Licence',
      desc: 'Permanent licence, renewals, address change, and international driving permits.',
      icon: CreditCard,
      iconColor: 'var(--color-teal)',
      iconBg: 'var(--color-pale-teal)',
      borderColor: '#B8E4DD',
      articles: [
        { title: 'Permanent DL Application', content: 'Apply online 30 days after LL issuance. Upload your valid LL number, select RTO testing track, and book your practical driving test slot.' },
        { title: 'DL Renewal Guidelines', content: 'You can apply for DL renewal 1 year prior to expiry and up to 1 year post-expiry without a retest. Late fee applies after 30 days post-expiry.' },
        { title: 'Address Change Procedure', content: 'Upload proof of new address using Aadhaar eKYC for instant online update. Non-Aadhaar address proofs require digital document verification.' },
        { title: 'International Driving Permit (IDP)', content: 'Valid Indian DL holders can request an IDP valid for 1 year by uploading passport copy, valid visa, and Form 1A medical certificate.' }
      ]
    },
    {
      id: 'docs',
      title: 'Documents',
      desc: 'Required identity, address, and medical proofs for various applications.',
      icon: FolderCheck,
      iconColor: '#0284c7',
      iconBg: '#EAF4F8',
      borderColor: '#BAE6FD',
      articles: [
        { title: 'Accepted Identity Proofs', content: 'Aadhaar Card (with eKYC), Passport, Voter ID Card, PAN Card, or Official Government ID.' },
        { title: 'Accepted Address Proofs', content: 'Aadhaar Card, Recent Utility Bill (Electricity/Water within 3 months), Passport, or Registered Rent Agreement.' },
        { title: 'Medical Certificate (Form 1A)', content: 'Mandatory for commercial licence applicants or individuals aged 50 and above. Must be signed by a registered MBBS medical practitioner.' },
        { title: 'Photo & Signature Specifications', content: 'Scanned passport-size photograph (clear background) and signature on white paper. Maximum file size 500 KB per document.' }
      ]
    },
    {
      id: 'payments',
      title: 'Payments',
      desc: 'Fee structures, payment methods, transaction failures, and refund policies.',
      icon: CreditCard,
      iconColor: 'var(--color-warm-amber)',
      iconBg: 'var(--color-pale-amber)',
      borderColor: '#F6D8B0',
      articles: [
        { title: 'RTO Fee Structure', content: 'Learner Licence (LL): ₹200 | Permanent Driving Licence (DL): ₹700 (includes Form 7 fee, test track fee & smartcard printing) | Renewal: ₹400.' },
        { title: 'Accepted Payment Methods', content: 'Secure online payment via UPI (GPay, PhonePe, Paytm), Net Banking, Credit Cards, or Debit Cards.' },
        { title: 'Transaction Pending / Failed', content: 'If money was deducted but status shows pending, bank reconciliation takes up to 24 hours. Do not double pay; unsuccessful attempts auto-refund in 3-5 days.' },
        { title: 'Downloading Fee Receipts', content: 'Access and download official tax receipts anytime from My Payments in your Indian Drives dashboard.' }
      ]
    },
    {
      id: 'appointments',
      title: 'Appointments',
      desc: 'Booking slots, rescheduling, cancellations, and RTO visit procedures.',
      icon: Calendar,
      iconColor: 'var(--color-indigo)',
      iconBg: 'var(--color-pale-indigo)',
      borderColor: '#D5DCF2',
      articles: [
        { title: 'Booking Driving Test Slots', content: 'Choose your local automated RTO test track, pick an available date on the interactive calendar, and select morning or afternoon session.' },
        { title: 'Rescheduling Appointments', content: 'You can reschedule your driving test appointment for free up to 48 hours prior to your scheduled slot directly from your dashboard.' },
        { title: 'Appointment Cancellation Policy', content: 'Cancel slots at least 48 hours in advance to release the slot for other citizens and preserve your test attempt eligibility.' },
        { title: 'What to Carry on RTO Visit', content: 'Bring original Learner Licence (Form 3), printed Appointment Pass with QR code, Payment Receipt, Original Aadhaar/ID proof, and a vehicle with red L plates.' }
      ]
    },
    {
      id: 'test',
      title: 'Driving Test',
      desc: 'Track layouts, vehicle requirements, evaluation criteria, and retake rules.',
      icon: Car,
      iconColor: 'var(--color-sage)',
      iconBg: 'var(--color-pale-teal)',
      borderColor: '#B8E4DD',
      articles: [
        { title: 'Automated Track Layouts', content: 'LMV (Car): Parallel Parking, Figure-8 Track, S-Curve Steering & Hill Gradient Stop/Start. MCWG: Figure-8 Balance & Emergency Braking.' },
        { title: 'Vehicle Requirements', content: 'Vehicle must be roadworthy with valid RC, active Insurance & PUC certificate. Must display red "L" plates on both front and rear bumpers.' },
        { title: 'Track Evaluation & Sensor Scoring', content: 'Automated overhead cameras and subterranean sensors track boundary line touches, kerb hits, and time limits. Minimum passing score is 80%.' },
        { title: 'Test Retake Policy', content: 'If you do not clear the test on your first attempt, you can re-apply for a retake slot after a 7-day waiting period (up to 3 attempts within LL validity).' }
      ]
    }
  ];

  // All FAQs with full structured answers
  const allFaqs = [
    {
      id: 1,
      q: 'How long is a Learner\'s Licence valid?',
      a: 'A Learner\'s Licence (LL) is valid for 6 months (180 days) from the date of issue across all states and UTs in India. You become eligible to apply for a permanent Driving Licence (DL) test after completing 30 days from the date of LL issuance.'
    },
    {
      id: 2,
      q: 'Do I need to visit the RTO for an address change?',
      a: 'If your Aadhaar card already reflects your new address, you can complete the address change online via Aadhaar eKYC without visiting the RTO physically. If applying with non-Aadhaar address proofs, an online verification is conducted, and physical document verification may be scheduled if required.'
    },
    {
      id: 3,
      q: 'What happens if I fail the driving test?',
      a: 'If you do not pass the automated track driving test, you can re-apply and schedule a retake slot after a mandatory waiting period of 7 days. You can re-attempt the test up to 3 times within the 6-month validity period of your Learner Licence.'
    },
    {
      id: 4,
      q: 'My payment was deducted but status shows pending.',
      a: 'Transaction updates can take up to 24 hours to sync with the bank server. If your payment was deducted, please do not double pay. Click "Verify Payment" under your transaction history or wait for automatic bank reconciliation. Unsuccessful double charges are refunded within 3-5 business days.'
    },
    {
      id: 5,
      q: 'What documents are required on the driving test day?',
      a: 'You must bring: (1) Original Learner Licence (Form 3), (2) Printed Appointment Slip with QR code, (3) Payment Fee Receipt, (4) Original Photo ID (Aadhaar/Passport), and (5) A roadworthy vehicle of the relevant class displaying red \'L\' plates on both front and back.'
    },
    {
      id: 6,
      q: 'Can I reschedule or cancel my RTO driving test appointment?',
      a: 'Yes! You can reschedule or cancel your driving test slot up to 48 hours prior to the scheduled date directly from the Appointments section in Indian Drives without paying any extra fee.'
    },
    {
      id: 7,
      q: 'How do I take the Learner Licence computer test online?',
      a: 'You can take the 15-question proctored Learner Licence assessment online directly from home. Ensure your computer camera is active for identity verification. Passing score is 9 out of 15 correct answers.'
    },
    {
      id: 8,
      q: 'How can I track my Driving Licence smartcard dispatch?',
      a: 'Once your driving test is cleared, your smartcard is printed and dispatched via Speed Post. You can track live parcel tracking updates directly from your Indian Drives dashboard under My Journey.'
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = allFaqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedFaqs = showAllFaqs ? filteredFaqs : filteredFaqs.slice(0, 4);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: 'calc(100vh - 78px)', padding: '40px 0 80px 0', fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: 'var(--color-text-primary)' }}>
      <div style={{ maxWidth: '1184px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* 1. HERO SEARCH SECTION */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-indigo)', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            HELP CENTER & FAQS
          </div>
          <h1 className="page-main-heading" style={{ fontSize: '44px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: '0 0 12px 0', letterSpacing: '-0.8px' }}>
            {t('userFlow.helpTitle')}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: '0 0 28px 0', lineHeight: 1.5 }}>
            Find clear, official answers about Indian Drives services, licensing, and procedures.
          </p>
        </div>

        {/* 2. DARK NAVY CALLOUT BANNER ("Can't find what you're looking for?") */}
        <div className="card" style={{
          background: 'var(--color-deep-navy)',
          borderRadius: '12px',
          padding: '24px 32px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 8px 24px rgba(16, 45, 67, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Bot Icon Badge */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(232, 137, 45, 0.15)',
              border: '1px solid rgba(232, 137, 45, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={24} color="var(--color-saffron)" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <h2 className="card-header" style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Can't find what you're looking for?
                </h2>
                <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(232, 137, 45, 0.25)', color: '#FFD699', padding: '2px 8px', borderRadius: '9999px', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                  AI ASSISTANT
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#D5DCF2', margin: 0, maxWidth: '600px', lineHeight: 1.45 }}>
                Our AI assistant is trained on official Indian Drives regulations to provide instant, specific guidance for your unique situation.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/ask')}
            style={{
              background: '#ffffff',
              color: 'var(--color-deep-navy)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-pale-indigo)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
          >
            Ask DriveSEVA <ArrowRight size={15} />
          </button>
        </div>

        {/* 3. BROWSE BY CATEGORY SECTION */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-indigo)', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <span style={{ display: 'inline-block', width: '16px', height: '2px', background: 'var(--color-indigo)' }} />
            Browse by Category
          </div>

          {/* 6 Category Cards Grid (2 rows x 3 columns) */}
          <div className="help-categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="card-standard"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '170px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cat.iconColor;
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    {/* Icon Badge with Subtle Semantic Background */}
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: cat.iconBg,
                      border: `1px solid ${cat.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                      color: cat.iconColor
                    }}>
                      <IconComp size={20} />
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: '0 0 6px 0' }}>
                      {cat.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {cat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
        <div className="card" style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '36px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(23, 59, 87, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h2 className="card-header" style={{ fontSize: '24px', fontWeight: 600, color: '#173b57', margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <span className="status-pill" style={{ background: '#f1f5f9', color: '#476179', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase' }}>
              TOP QUERIES
            </span>
          </div>

          {/* Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {displayedFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: isOpen ? '#f8fafc' : '#ffffff',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#173b57',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="#e88a2d" /> : <ChevronDown size={20} color="#94a3b8" />}
                  </button>

                  {/* Expandable Answer Section */}
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px 24px',
                      background: '#f8fafc',
                      fontSize: '15px',
                      color: '#476179',
                      lineHeight: 1.6,
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <div style={{ paddingTop: '16px' }}>
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* View All FAQs Button */}
          {filteredFaqs.length > 4 && (
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <button
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                style={{
                  background: '#ffffff',
                  color: '#173b57',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
              >
                {showAllFaqs ? 'Show Fewer FAQs' : 'View all FAQs'}
              </button>
            </div>
          )}
        </div>

        {/* 5. CATEGORY CONTENT MODAL / DRAWER */}
        {selectedCategory && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(7, 24, 41, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {React.createElement(selectedCategory.icon, { size: 24, color: '#e88a2d' })}
                  <h2 className="card-header" style={{ fontSize: '24px', fontWeight: 600, color: '#173b57', margin: 0 }}>
                    {selectedCategory.title} Guides & Articles
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={18} color="#64748b" />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedCategory.articles.map((art, i) => (
                  <div key={i} style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#173b57', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#16a34a" /> {art.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6 }}>
                      {art.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
