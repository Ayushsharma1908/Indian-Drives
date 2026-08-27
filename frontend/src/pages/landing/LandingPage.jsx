import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Laptop, Calendar,
  CreditCard, Truck, Award, HelpCircle, Lock, User, FileText, Search, Phone,
  Check, X, Zap, ChevronRight, MapPin, Eye, Info, Menu
} from 'lucide-react';
import { AuthContext } from '../../main';
import './LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'aadhaar'
  const [phoneNum, setPhoneNum] = useState('');
  const [aadhaarNum, setAadhaarNum] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleStartJourney = () => {
    setMobileMenuOpen(false);
    const isAuth = localStorage.getItem('indian-drives-authenticated') === 'true' || localStorage.getItem('indian-drives-token');
    if (isAuth) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('indian-drives-authenticated', 'true');
    localStorage.setItem('indian-drives-token', 'demo-token-' + Date.now());
    if (auth && auth.login) {
      auth.login({ email: 'yanshi.chauhan@example.com' }).catch(() => {});
    }
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    handleLoginSubmit();
  };

  return (
    <div className="landing-page-root">
      
      {/* 1. TOP PUBLIC NAVIGATION BAR */}
      <header className="landing-header">
        {/* Brand Logo */}
        <div className="landing-brand" onClick={() => navigate('/')}>
          <img src="/indian-drives-logo.png" alt="Indian Drives Logo" className="brand-logo-img" style={{ height: '42px', width: 'auto' }} />
        </div>

        {/* Center Desktop Nav Links */}
        <nav className="landing-desktop-nav">
          <a href="#how-it-works" className="landing-nav-link">How It Works</a>
          <a href="#features" className="landing-nav-link">Key Features</a>
          <a href="#paths" className="landing-nav-link">Citizen Journeys</a>
          <a
            href="#ask-ai"
            onClick={(e) => { e.preventDefault(); navigate('/ask'); }}
            className="landing-ai-link"
          >
            ✦ Ask DriveSeva AI
          </a>
        </nav>

        {/* Right CTA Actions & Mobile Toggle */}
        <div className="landing-nav-actions">
          <button onClick={handleStartJourney} className="landing-start-btn">
            Start Your Journey <ArrowRight size={16} />
          </button>
          
          <button
            className="landing-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        <div className={`landing-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#how-it-works" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#features" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>Key Features</a>
          <a href="#paths" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>Citizen Journeys</a>
          <a
            href="#ask-ai"
            onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/ask'); }}
            className="landing-ai-link"
          >
            ✦ Ask DriveSeva AI
          </a>
          <button onClick={handleStartJourney} className="landing-start-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            Start Your Journey <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="landing-hero-container">
        {/* Left Column Text */}
        <div>
          <div className="landing-hero-badge">
            <Sparkles size={14} color="#f97316" /> RE-IMAGINING CITIZEN DRIVING LICENCE SERVICES
          </div>

          <h1 className="landing-hero-title">
            Driving Licence Services, <span style={{ color: '#e88a2d' }}>Simplified & Misguidance-Free.</span>
          </h1>

          <p className="landing-hero-subtitle">
            Experience India’s smartest driving licence portal. No long queues, no middlemen, and zero misguidance. Clear step-by-step guidance for Learner Licence, Practical Tests, and Smartcard Maintenance.
          </p>

          {/* Action Buttons */}
          <div className="landing-hero-actions">
            <button onClick={handleStartJourney} className="landing-hero-btn-primary">
              Start Your Journey <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="landing-trust-badges">
            <span className="landing-trust-item">
              <ShieldCheck size={16} color="#16a34a" /> 100% Aadhaar Verified
            </span>
            <span className="landing-trust-item">
              <Laptop size={16} color="#0369a1" /> Remote Proctored Exam
            </span>
            <span className="landing-trust-item">
              <Truck size={16} color="#e88a2d" /> Live Smartcard Tracking
            </span>
          </div>
        </div>

        {/* Right Column Hero Mockup Graphic */}
        <div className="landing-hero-mockup-wrapper">
          {/* Card Mockup Showcase */}
          <div className="landing-hero-mockup-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0a2540' }}>
                LIVE PORTAL PREVIEW
              </span>
            </div>

            {/* Dashboard Speedometer Track Preview */}
            <div className="landing-speedometer-preview">
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '8px' }}>
                SPEEDOMETER ROADMAP TRACKER
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Learner Licence Active → DL Exam Ready
              </div>

              {/* Progress Line */}
              <div style={{ background: '#1e3a8a', height: '6px', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#f97316', borderRadius: '3px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', fontWeight: 700, flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>✓ LL Issued</span>
                <span style={{ color: '#f97316' }}>⏱ Test Scheduled</span>
                <span style={{ color: '#94a3b8' }}>Smartcard Dispatch</span>
              </div>
            </div>

            {/* Quick Cards Stack */}
            <div className="landing-quick-cards-grid">
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369a1', marginBottom: '4px' }}>ONLINE LL TEST</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0a2540' }}>15 Min Remote Assessment</div>
              </div>

              <div style={{ background: '#fff7ed', padding: '16px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#c2410c', marginBottom: '4px' }}>SLOT BOOKING</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0a2540' }}>Car-Seat Visual Selection</div>
              </div>
            </div>
          </div>

          {/* Floating Backdrop Decorative Accent */}
          <div className="landing-backdrop-blur" />
        </div>
      </section>

      {/* 3. "HOW IT MANAGES USER FLOW EFFICIENTLY (ZERO MISGUIDANCE)" SECTION */}
      <section id="how-it-works" className="landing-section-white">
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div className="landing-section-header">
            <span className="landing-section-tag">
              TRANSPARENT & GUIDED CITIZEN WORKFLOW
            </span>
            <h2 className="landing-section-title">
              Never Get Misguided Again. One Portal, 3 Streamlined Paths.
            </h2>
            <p className="landing-section-desc">
              Unlike legacy portals with confusing menus, DriveSeva dynamically detects where you are in your driving journey and shows only what you need to process next.
            </p>
          </div>

          {/* 3 Citizen Paths Cards */}
          <div id="paths" className="landing-paths-grid">
            
            {/* Path 1: Learner Licence */}
            <div className="landing-path-card">
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#0a2540',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Laptop size={24} color="#f97316" />
                </div>

                <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                  PATH 1
                </span>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', margin: '12px 0 10px 0' }}>
                  Learner Licence (LL)
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                  Apply online with Aadhaar details, upload identity proof, pay standard RTO fees, and take the 15-minute proctored road safety test right from home.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#0a2540' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Zero physical RTO queue</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Automated camera proctoring</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Instant LL certificate download</div>
                </div>
              </div>

              <button onClick={handleDemoLogin} className="landing-path-card-btn-outlined">
                Apply for LL <ArrowRight size={16} />
              </button>
            </div>

            {/* Path 2: Driving Licence */}
            <div className="landing-path-card" style={{ border: '1px solid #bae6fd', boxShadow: '0 4px 20px rgba(3, 105, 161, 0.06)' }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#0a2540',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Car size={24} color="#f97316" />
                </div>

                <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                  PATH 2
                </span>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', margin: '12px 0 10px 0' }}>
                  Driving Licence (DL) Test
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                  Holders of active LL can verify their address, pick test slots using a car-seat visual selector, get mandatory document checklists, and track smartcard dispatch.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#0a2540' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Visual car-seat slot picker</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> What-to-carry checklist</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Speed Post live tracking</div>
                </div>
              </div>

              <button onClick={handleDemoLogin} className="landing-path-card-btn-filled">
                Book Practical Test <ArrowRight size={16} />
              </button>
            </div>

            {/* Path 3: Licence Maintenance */}
            <div className="landing-path-card">
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#0a2540',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Award size={24} color="#f97316" />
                </div>

                <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                  PATH 3
                </span>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', margin: '12px 0 10px 0' }}>
                  Licence Services & Maintenance
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                  Existing licence holders can renew their DL, request duplicate smartcards, or update specific details (Name, Address, Contact) with live fee calculation.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#0a2540' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> 1-Click Licence Renewal</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Interactive details updater</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> Digital Licence Wallet</div>
                </div>
              </div>

              <button onClick={handleDemoLogin} className="landing-path-card-btn-outlined">
                Manage Licence <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMPREHENSIVE FEATURES GRID SECTION */}
      <section id="features" className="landing-section-alt">
        <div className="landing-section-header">
          <span className="landing-section-tag">
            ENGINEERED FOR CITIZENS
          </span>
          <h2 className="landing-section-title">
            Everything You Need to Manage Your Driving Licence
          </h2>
          <p className="landing-section-desc">
            Designed with state-of-the-art UI, transparent fee breakdowns, and real-time status tracking.
          </p>
        </div>

        <div className="landing-features-grid">
          {[
            {
              icon: Laptop,
              title: 'Proctored Online Assessment',
              desc: 'Take the official Learner Licence computer test online with automated web-camera identity verification.',
              color: '#0369a1',
              bg: '#e0f2fe'
            },
            {
              icon: Calendar,
              title: 'Car-Seat Layout Slot Booking',
              desc: 'Choose your preferred RTO test center, date, and time slot using an interactive visual seat selection matrix.',
              color: '#c2410c',
              bg: '#ffedd5'
            },
            {
              icon: Truck,
              title: 'Live Smartcard Dispatch Tracking',
              desc: 'Track your physical driving licence smartcard printing and Speed Post delivery with step-by-step progress bars.',
              color: '#15803d',
              bg: '#dcfce7'
            },
            {
              icon: FileText,
              title: 'Interactive Details Update Engine',
              desc: 'Selectively update Name, Address, or Contact details with dynamic live fee calculation and instant doc uploads.',
              color: '#7c3aed',
              bg: '#f3e8ff'
            },
            {
              icon: Award,
              title: 'Verified Digital Licence Wallet',
              desc: 'Access your official QR-verified digital driving licence anytime on mobile or desktop for instant verification.',
              color: '#b45309',
              bg: '#fef3c7'
            },
            {
              icon: Sparkles,
              title: 'Ask DriveSeva 24/7 AI Assistant',
              desc: 'Get instant, accurate answers about RTO rules, required documents, fee structures, and application queries.',
              color: '#0a2540',
              bg: '#f1f5f9'
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="landing-feature-card">
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: feat.bg,
                  color: feat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} />
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0a2540', margin: 0 }}>
                  {feat.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="landing-cta-banner">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="landing-cta-title">
            Ready to Experience Misguidance-Free Driving Licence Services?
          </h2>
          <p className="landing-cta-desc">
            Join thousands of citizens managing their driving licences effortlessly on DriveSeva.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={handleStartJourney} className="landing-cta-btn">
              Start Your Journey <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. PUBLIC FOOTER */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div>
            <strong style={{ color: '#ffffff' }}>Indian Drives (DriveSeva)</strong> — Official Citizen Driving Licence Portal Concept.
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/help')}>Help & Support</span>
            <span style={{ cursor: 'pointer' }} onClick={handleStartJourney}>Start Your Journey</span>
          </div>
        </div>
      </footer>

      {/* 7. INTERACTIVE LOGIN / SIGN IN MODAL */}
      {showLoginModal && (
        <div className="landing-modal-overlay">
          <div className="landing-modal-card">
            {/* Close Icon */}
            <button
              onClick={() => setShowLoginModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} color="#64748b" />
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: '#0a2540',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Lock size={24} color="#f97316" />
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0a2540', margin: '0 0 6px 0' }}>
                Citizen Portal Login
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Enter your mobile number or Aadhaar to securely sign in.
              </p>
            </div>

            {/* Login Method Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => { setLoginMethod('phone'); setOtpSent(false); }}
                style={{
                  background: loginMethod === 'phone' ? '#ffffff' : 'transparent',
                  color: loginMethod === 'phone' ? '#0a2540' : '#64748b',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: loginMethod === 'phone' ? '0 2px 6px rgba(0, 37, 66, 0.06)' : 'none'
                }}
              >
                Mobile Number
              </button>

              <button
                type="button"
                onClick={() => { setLoginMethod('aadhaar'); setOtpSent(false); }}
                style={{
                  background: loginMethod === 'aadhaar' ? '#ffffff' : 'transparent',
                  color: loginMethod === 'aadhaar' ? '#0a2540' : '#64748b',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: loginMethod === 'aadhaar' ? '0 2px 6px rgba(0, 37, 66, 0.06)' : 'none'
                }}
              >
                Aadhaar e-KYC
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: '16px' }}>
              {loginMethod === 'phone' ? (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>
                    MOBILE NUMBER
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '12px', fontSize: '14px', fontWeight: 700, color: '#64748b' }}>+91</span>
                    <input
                      type="text"
                      placeholder="98765 43210"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px 12px 50px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 700, color: '#0a2540' }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>
                    12-DIGIT AADHAAR NUMBER
                  </label>
                  <input
                    type="text"
                    placeholder="xxxx-xxxx-xxxx"
                    value={aadhaarNum}
                    onChange={(e) => setAadhaarNum(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 700, color: '#0a2540' }}
                  />
                </div>
              )}

              {otpSent && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: '6px' }}>
                    ENTER 4-DIGIT OTP SENT TO YOUR DEVICE
                  </label>
                  <input
                    type="text"
                    placeholder="4492"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #16a34a', fontSize: '16px', fontWeight: 800, color: '#0a2540', letterSpacing: '4px', textAlign: 'center' }}
                  />
                </div>
              )}

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  style={{
                    width: '100%',
                    background: '#0a2540',
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
                    marginTop: '8px'
                  }}
                >
                  Send OTP <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#16a34a',
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
                    marginTop: '8px'
                  }}
                >
                  Verify & Login <Check size={18} />
                </button>
              )}
            </form>

            <div style={{ borderTop: '1px dashed #e2e8f0', margin: '20px 0 16px 0' }} />

            {/* Quick Demo Login Option */}
            <button
              onClick={handleDemoLogin}
              style={{
                width: '100%',
                background: '#f8fafc',
                color: '#0a2540',
                border: '1px solid #cbd5e1',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              ⚡ Instant Demo Citizen Login (Yanshi Chauhan)
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
