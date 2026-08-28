import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Laptop, Calendar,
  CreditCard, Truck, Award, HelpCircle, Lock, User, FileText, Search, Phone,
  Check, X, Zap, ChevronRight, MapPin, Eye, Info, Menu
} from 'lucide-react';
import { AuthContext, LanguageContext } from '../../main';
import { LanguageSelector } from '../../components/layout/LanguageSelector';
import './LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { language, setLanguage, tr } = useContext(LanguageContext) || {};
  const t = (key) => (tr ? tr(key) : key);

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
      auth.login({ email: 'raj.kumar@example.com' }).catch(() => {});
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
          <a href="#how-it-works" className="landing-nav-link">{t('nav.howItWorks')}</a>
          <a href="#features" className="landing-nav-link">{t('nav.keyFeatures')}</a>
          <a href="#paths" className="landing-nav-link">{t('nav.citizenJourneys')}</a>
          <a
            href="#ask-ai"
            onClick={(e) => { e.preventDefault(); navigate('/ask'); }}
            className="landing-ai-link"
          >
            ✦ {t('nav.ask')}
          </a>
        </nav>

        {/* Right CTA Actions & Language Selector */}
        <div className="landing-nav-actions">
          {setLanguage && (
            <LanguageSelector currentLanguage={language || 'en'} onSelectLanguage={setLanguage} />
          )}

          <button onClick={handleStartJourney} className="landing-start-btn">
            {t('nav.startJourney')} <ArrowRight size={16} />
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
          <a href="#how-it-works" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.howItWorks')}</a>
          <a href="#features" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.keyFeatures')}</a>
          <a href="#paths" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.citizenJourneys')}</a>
          <a
            href="#ask-ai"
            onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/ask'); }}
            className="landing-ai-link"
          >
            ✦ {t('nav.ask')}
          </a>
          <button onClick={handleStartJourney} className="landing-start-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {t('nav.startJourney')} <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="landing-hero-container">
        {/* Left Column Text */}
        <div>
          <div className="landing-hero-badge">
            <Sparkles size={14} color="#f97316" /> {t('landing.badge')}
          </div>

          <h1 className="landing-hero-title">
            {t('landing.title')} <span style={{ color: '#e88a2d' }}>{t('landing.titleHighlight')}</span>
          </h1>

          <p className="landing-hero-subtitle">
            {t('landing.subtitle')}
          </p>

          {/* Action Buttons */}
          <div className="landing-hero-actions">
            <button onClick={handleStartJourney} className="landing-hero-btn-primary">
              {t('landing.startJourney')} <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="landing-trust-badges">
            <span className="landing-trust-item">
              <ShieldCheck size={16} color="#16a34a" /> {t('landing.trustAadhaar')}
            </span>
            <span className="landing-trust-item">
              <Laptop size={16} color="#0369a1" /> {t('landing.trustRemote')}
            </span>
            <span className="landing-trust-item">
              <Truck size={16} color="#e88a2d" /> {t('landing.trustTracking')}
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
                {t('landing.speedometerTitle')}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                {t('landing.speedometerSub')}
              </div>

              {/* Progress Line */}
              <div style={{ background: '#1e3a8a', height: '6px', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#f97316', borderRadius: '3px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', fontWeight: 700, flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>{t('landing.llIssued')}</span>
                <span style={{ color: '#f97316' }}>{t('landing.testScheduled')}</span>
                <span style={{ color: '#94a3b8' }}>{t('landing.smartcardDispatch')}</span>
              </div>
            </div>

            {/* Quick Cards Stack */}
            <div className="landing-quick-cards-grid">
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369a1', marginBottom: '4px' }}>{t('landing.onlineTest')}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0a2540' }}>{t('landing.onlineTestDesc')}</div>
              </div>

              <div style={{ background: '#fff7ed', padding: '16px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#c2410c', marginBottom: '4px' }}>{t('landing.slotBooking')}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0a2540' }}>{t('landing.slotBookingDesc')}</div>
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
              {t('landing.pathsTag')}
            </span>
            <h2 className="landing-section-title">
              {t('landing.pathsTitle')}
            </h2>
            <p className="landing-section-desc">
              {t('landing.pathsDesc')}
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
                  {t('landing.path1Tag')}
                </span>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', margin: '12px 0 10px 0' }}>
                  {t('landing.path1Title')}
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                  {t('landing.path1Desc')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#0a2540' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path1Check1')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path1Check2')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path1Check3')}</div>
                </div>
              </div>

              <button onClick={handleDemoLogin} className="landing-path-card-btn-outlined">
                {t('landing.path1Btn')} <ArrowRight size={16} />
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
                  {t('landing.path2Tag')}
                </span>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', margin: '12px 0 10px 0' }}>
                  {t('landing.path2Title')}
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                  {t('landing.path2Desc')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#0a2540' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path2Check1')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path2Check2')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path2Check3')}</div>
                </div>
              </div>

              <button onClick={handleDemoLogin} className="landing-path-card-btn-filled">
                {t('landing.path2Btn')} <ArrowRight size={16} />
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
                  {t('landing.path3Tag')}
                </span>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0a2540', margin: '12px 0 10px 0' }}>
                  {t('landing.path3Title')}
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                  {t('landing.path3Desc')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#0a2540' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path3Check1')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path3Check2')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#16a34a" /> {t('landing.path3Check3')}</div>
                </div>
              </div>

              <button onClick={handleDemoLogin} className="landing-path-card-btn-outlined">
                {t('landing.path3Btn')} <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMPREHENSIVE FEATURES GRID SECTION */}
      <section id="features" className="landing-section-alt">
        <div className="landing-section-header">
          <span className="landing-section-tag">
            {t('landing.featTag')}
          </span>
          <h2 className="landing-section-title">
            {t('landing.featTitle')}
          </h2>
          <p className="landing-section-desc">
            {t('landing.featDesc')}
          </p>
        </div>

        <div className="landing-features-grid">
          {[
            {
              icon: Laptop,
              title: t('landing.feat1Title'),
              desc: t('landing.feat1Desc'),
              color: '#0369a1',
              bg: '#e0f2fe'
            },
            {
              icon: Calendar,
              title: t('landing.feat2Title'),
              desc: t('landing.feat2Desc'),
              color: '#c2410c',
              bg: '#ffedd5'
            },
            {
              icon: Truck,
              title: t('landing.feat3Title'),
              desc: t('landing.feat3Desc'),
              color: '#15803d',
              bg: '#dcfce7'
            },
            {
              icon: FileText,
              title: t('landing.feat4Title'),
              desc: t('landing.feat4Desc'),
              color: '#7c3aed',
              bg: '#f3e8ff'
            },
            {
              icon: Award,
              title: t('landing.feat5Title'),
              desc: t('landing.feat5Desc'),
              color: '#b45309',
              bg: '#fef3c7'
            },
            {
              icon: Sparkles,
              title: t('landing.feat6Title'),
              desc: t('landing.feat6Desc'),
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
            {t('landing.ctaTitle')}
          </h2>
          <p className="landing-cta-desc">
            {t('landing.ctaDesc')}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={handleStartJourney} className="landing-cta-btn">
              {t('landing.ctaBtn')} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. PUBLIC FOOTER */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div>
            <strong style={{ color: '#ffffff' }}>Indian Drives (DriveSeva)</strong> — {t('landing.footerText')}
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/help')}>{t('nav.help')}</span>
            <span style={{ cursor: 'pointer' }} onClick={handleStartJourney}>{t('nav.startJourney')}</span>
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
                {t('landing.loginTitle')}
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                {t('landing.loginSub')}
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
                {t('landing.mobileTab')}
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
                {t('landing.aadhaarTab')}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: '16px' }}>
              {loginMethod === 'phone' ? (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>
                    {t('landing.mobileLabel')}
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
                    {t('landing.aadhaarLabel')}
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
                    {t('landing.enterOtpLabel')}
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
                  {t('landing.sendOtpBtn')} <ArrowRight size={16} />
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
                  {t('landing.verifyBtn')} <Check size={18} />
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
              {t('landing.demoLoginBtn')}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
