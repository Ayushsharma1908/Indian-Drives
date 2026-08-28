import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Sparkles, User, Bookmark, Car, CheckCircle2,
  Clock, Calendar, FileText, Send, X, Shield, Layers, Check,
  ChevronDown
} from 'lucide-react';
import { AuthContext, useLanguage } from '../../main';
import { LanguageSelector } from '../../components/layout/LanguageSelector';
import './LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { language, setLanguage, t } = useLanguage();

  // Modals & Drawers
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [selectedJourneyModal, setSelectedJourneyModal] = useState(null); // 'll', 'dl', 'services'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState('/dashboard');

  // AI Chat States (localized dynamically)
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Update initial greeting when language changes
  useEffect(() => {
    setChatMessages([
      {
        sender: 'bot',
        text: t('ask.greeting', 'Namaste! I am DriveSEVA, your assistant for Indian Drives. How can I help you today?'),
        time: 'Just now'
      }
    ]);
  }, [language, t]);

  // Auth Form states
  const [authMethod, setAuthMethod] = useState('phone');
  const [phoneNum, setPhoneNum] = useState('');
  const [aadhaarNum, setAadhaarNum] = useState('');

  // Auth Trigger
  const handleOpenAuth = (targetPath = '/dashboard') => {
    setSelectedJourneyModal(null);
    setMobileMenuOpen(false);
    const isAuth = localStorage.getItem('indian-drives-authenticated') === 'true' || localStorage.getItem('indian-drives-token');
    if (isAuth) {
      navigate(targetPath);
    } else {
      setPendingRedirect(targetPath);
      setShowAuthModal(true);
    }
  };

  const handleAuthSubmit = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('indian-drives-authenticated', 'true');
    localStorage.setItem('indian-drives-token', 'demo-token-' + Date.now());
    if (auth && auth.login) {
      auth.login({ email: 'yanshi.chauhan@example.com' }).catch(() => {});
    }
    setShowAuthModal(false);
    navigate(pendingRedirect || '/dashboard');
  };

  const handleDemoLogin = (targetPath) => {
    localStorage.setItem('indian-drives-authenticated', 'true');
    localStorage.setItem('indian-drives-token', 'demo-token-' + Date.now());
    if (auth && auth.login) {
      auth.login({ email: 'yanshi.chauhan@example.com' }).catch(() => {});
    }
    setShowAuthModal(false);
    navigate(targetPath || pendingRedirect || '/dashboard');
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || chatInput.trim();
    if (!text) return;

    const newMsgs = [...chatMessages, { sender: 'user', text, time: 'Just now' }];
    setChatMessages(newMsgs);
    setChatInput('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse = '';
      let requiresAuth = false;

      if (lower.includes('status') || lower.includes('track') || lower.includes('my application') || lower.includes('slot')) {
        botResponse = t('ask.statusResponse', 'To check your real-time application status or view booked test slot passes, please sign in to your Indian Drives account.');
        requiresAuth = true;
      } else if (lower.includes('document') || lower.includes('require') || lower.includes('doc')) {
        botResponse = t('ask.docResponse', 'For a Learner Licence (LL), you only need your Aadhaar Number for contactless online verification. For a permanent Driving Licence (DL), your active LL number is required.');
      } else if (lower.includes('ll') || lower.includes('learner')) {
        botResponse = t('ask.llResponse', 'You can apply for your Learner Licence completely online through Indian Drives, practice with official test simulators, and receive your digital licence without paperwork.');
      } else if (lower.includes('dl') || lower.includes('driving test') || lower.includes('track')) {
        botResponse = t('ask.dlResponse', 'After holding your Learner Licence for 30 days, you can book a practical driving test at your nearest automated RTO test track directly through Indian Drives.');
      } else if (lower.includes('renew') || lower.includes('address') || lower.includes('duplicate') || lower.includes('service')) {
        botResponse = t('ask.servicesResponse', 'Existing licence holders can renew expiring licences, update residential addresses, or request duplicate smart cards directly from the Licence Services hub.');
      } else {
        botResponse = t('landing.heroSubtitle', 'Apply, track and manage your driving licence in one place.');
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: 'Just now',
          requiresAuth
        }
      ]);
    }, 500);
  };

  // Three Journey Summaries
  const journeySummaries = {
    ll: {
      stepNum: '01',
      accentColor: '#0284c7',
      title: t('landing.journey1Title', "I'm starting from scratch"),
      subtitle: t('landing.journey1Desc', "Get your Learner Licence."),
      desc: t('landing.path1Desc', 'Complete online Aadhaar verification, practice with computerized knowledge test simulators, and obtain your digital Learner Licence from home.'),
      steps: [
        t('landing.howStep1', 'Online identity verification'),
        t('landing.howStep2', 'Theory knowledge test preparation'),
        t('landing.howStep4', 'Digital Learner Licence issuance')
      ],
      cta: t('landing.journey1Cta', 'Start Learner Licence Journey →'),
      target: '/journey?stage=ll'
    },
    dl: {
      stepNum: '02',
      accentColor: '#ea580c',
      title: t('landing.journey2Title', 'I have a Learner Licence'),
      subtitle: t('landing.journey2Desc', 'Continue towards your Driving Licence.'),
      desc: t('landing.path2Desc', 'Hold an active Learner Licence for at least 30 days. Select your nearest automated RTO test track, book a convenient morning or afternoon slot, and clear your driving test.'),
      steps: [
        t('landing.journey2Desc', 'Learner Licence validation'),
        t('landing.serviceTestTitle', 'Automated test track slot booking'),
        t('landing.serviceTestDesc', 'Practical test evaluation & smart card dispatch')
      ],
      cta: t('landing.journey2Cta', 'Book Driving Test Slot →'),
      target: '/journey?stage=dl'
    },
    services: {
      stepNum: '03',
      accentColor: '#16a34a',
      title: t('landing.journey3Title', 'I already have a Driving Licence'),
      subtitle: t('landing.journey3Desc', 'Manage your existing licence.'),
      desc: t('landing.path3Desc', 'Renew expiring licences, update your registered residential address, or request duplicate smart cards without visiting physical transport offices.'),
      steps: [
        t('landing.serviceManageTitle', 'Existing licence details lookup'),
        t('landing.serviceManageDesc', 'Service selection & document upload'),
        t('landing.serviceTrackDesc', 'Online fee settlement & tracking')
      ],
      cta: t('landing.journey3Cta', 'Manage Licence Services →'),
      target: '/licence-services'
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="premium-landing-root">
      
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN NAVBAR (WHITE / TRANSLUCENT PREMIUM)
          ───────────────────────────────────────────────────────────── */}
      <header className="premium-navbar">
        <div className="navbar-inner">
          {/* Logo (Official Brand Asset) */}
          <div className="brand-link" onClick={() => navigate('/')}>
            <img
              src="/indian-drives-logo.png"
              alt="Indian Drives"
              className="official-brand-logo"
            />
          </div>

          {/* Navigation Links */}
          <nav className="navbar-links">
            <a href="#how-it-works" className="nav-link">{t('nav.howItWorks', 'How It Works')}</a>
            <a href="#services" className="nav-link">{t('nav.services', 'Services')}</a>
            <a href="#journeys" className="nav-link">{t('nav.myJourney', 'My Journey')}</a>
            <button onClick={() => setShowAiDrawer(true)} className="nav-ai-link">
              <span className="sparkle-icon">✦</span> {t('nav.ask', 'Ask DriveSEVA')}
            </button>
          </nav>

          {/* Right Action: Language, Sign In, Primary CTA */}
          <div className="navbar-right">
            <LanguageSelector currentLanguage={language} onSelectLanguage={setLanguage} />

            <button onClick={() => handleOpenAuth('/dashboard')} className="navbar-signin-btn">
              {t('common.login', 'Sign In')}
            </button>

            <button onClick={() => handleOpenAuth('/dashboard')} className="navbar-primary-btn">
              {t('landing.heroStartBtn', 'Start Your Journey →')}
            </button>

            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <span style={{ fontSize: '20px' }}>☰</span>}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu">
            <a href="#how-it-works" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('nav.howItWorks', 'How It Works')}
            </a>
            <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('nav.services', 'Services')}
            </a>
            <a href="#journeys" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('nav.myJourney', 'My Journey')}
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); setShowAiDrawer(true); }}
              className="mobile-nav-ai-btn"
            >
              ✦ {t('nav.ask', 'Ask DriveSEVA')}
            </button>
            <button onClick={() => handleOpenAuth('/dashboard')} className="navbar-primary-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
              {t('landing.heroStartBtn', 'Start Your Journey →')}
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO — CINEMATIC FULL VIEWPORT
          ───────────────────────────────────────────────────────────── */}
      <section className="premium-hero-viewport">
        <div className="hero-content-wrapper">
          
          {/* Main Headline & Supporting Copy */}
          <div className="hero-text-block">
            <h1 className="hero-headline">
              {t('landing.heroTitle', 'Your driving licence journey,')}<br />
              <span className="hero-highlight-orange">{t('landing.heroHighlight', 'simplified.')}</span>
            </h1>

            <p className="hero-supporting-text">
              {t('landing.heroSubtitle', 'Apply, track and manage your driving licence in one place.')}
            </p>

            <div className="hero-action-buttons">
              <button onClick={() => handleOpenAuth('/dashboard')} className="hero-btn-primary">
                {t('landing.heroStartBtn', 'Start Your Journey →')}
              </button>

              <button onClick={() => setShowAiDrawer(true)} className="hero-btn-secondary">
                <span className="btn-sparkle">✦</span> {t('landing.heroAskBtn', 'Ask DriveSEVA')}
              </button>
            </div>
          </div>

          {/* Integrated Road Journey Line (Minimal Glowing Nodes on the Road) */}
          <div className="road-journey-tracker-row">
            <div className="road-node-item">
              <div className="road-node-dot dot-navy" />
              <span className="road-node-label">{t('landing.roadmapStart', 'START')}</span>
            </div>

            <div className="road-connector-line">
              <div className="connector-glow" />
            </div>

            <div className="road-node-item">
              <div className="road-node-dot dot-blue" />
              <span className="road-node-label label-blue">{t('landing.roadmapLL', 'LEARNER LICENCE')}</span>
            </div>

            <div className="road-connector-line">
              <div className="connector-glow" />
            </div>

            <div className="road-node-item">
              <div className="road-node-dot dot-orange" />
              <span className="road-node-label label-orange">{t('landing.roadmapTest', 'TEST')}</span>
            </div>

            <div className="road-connector-line">
              <div className="connector-glow" />
            </div>

            <div className="road-node-item">
              <div className="road-node-dot dot-green" />
              <span className="road-node-label label-green">{t('landing.roadmapDL', 'DRIVING LICENCE')}</span>
            </div>
          </div>

          {/* Subtle Scroll Down Prompt */}
          <div className="hero-scroll-prompt" onClick={() => scrollToSection('journeys')}>
            <span>{t('common.scroll', 'Scroll')}</span>
            <ChevronDown size={14} className="scroll-icon-bounce" />
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. YOUR JOURNEY — "WHERE ARE YOU?" (THREE CARDS ONLY)
          ───────────────────────────────────────────────────────────── */}
      <section id="journeys" className="section-journeys-clean">
        <div className="premium-container">
          
          <div className="section-header-clean">
            <span className="section-eyebrow-orange">{t('landing.journeysEyebrow', 'YOUR JOURNEY')}</span>
            <h2 className="section-title-navy">
              {t('landing.journeysTitle', 'Where are you in your driving journey?')}
            </h2>
            <p className="section-subtitle-muted">
              {t('landing.journeysSubtitle', "Choose where you are. We'll guide you from there.")}
            </p>
          </div>

          <div className="three-cards-row">
            
            {/* Card 01: Starting Fresh */}
            <div
              className="journey-card-clean card-blue-border"
              onClick={() => setSelectedJourneyModal('ll')}
            >
              <div className="card-top-indicator">
                <span className="index-number index-blue">01</span>
                <div className="icon-circle icon-bg-blue">
                  <User size={18} color="#0284c7" />
                </div>
              </div>

              <div className="card-center-text">
                <h3 className="card-heading">{t('landing.journey1Title', "I'm starting from scratch")}</h3>
                <p className="card-description">{t('landing.journey1Desc', "Get your Learner Licence.")}</p>
              </div>

              <div className="card-bottom-cta">
                <span className="cta-link cta-blue">{t('landing.journey1Cta', 'Start →')}</span>
              </div>
            </div>

            {/* Card 02: I have a Learner Licence */}
            <div
              className="journey-card-clean card-orange-border"
              onClick={() => setSelectedJourneyModal('dl')}
            >
              <div className="card-top-indicator">
                <span className="index-number index-orange">02</span>
                <div className="icon-circle icon-bg-orange">
                  <Bookmark size={18} color="#ea580c" />
                </div>
              </div>

              <div className="card-center-text">
                <h3 className="card-heading">{t('landing.journey2Title', 'I have a Learner Licence')}</h3>
                <p className="card-description">{t('landing.journey2Desc', 'Continue towards your Driving Licence.')}</p>
              </div>

              <div className="card-bottom-cta">
                <span className="cta-link cta-orange">{t('landing.journey2Cta', 'Continue →')}</span>
              </div>
            </div>

            {/* Card 03: I already have a Driving Licence */}
            <div
              className="journey-card-clean card-green-border"
              onClick={() => setSelectedJourneyModal('services')}
            >
              <div className="card-top-indicator">
                <span className="index-number index-green">03</span>
                <div className="icon-circle icon-bg-green">
                  <Car size={18} color="#16a34a" />
                </div>
              </div>

              <div className="card-center-text">
                <h3 className="card-heading">{t('landing.journey3Title', 'I already have a Driving Licence')}</h3>
                <p className="card-description">{t('landing.journey3Desc', 'Manage your existing licence.')}</p>
              </div>

              <div className="card-bottom-cta">
                <span className="cta-link cta-green">{t('landing.journey3Cta', 'Manage →')}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SERVICES — "WHAT YOU CAN DO" (COMPACT)
          ───────────────────────────────────────────────────────────── */}
      <section id="services" className="section-services-clean">
        <div className="premium-container">
          
          <div className="section-header-clean">
            <span className="section-eyebrow-orange">{t('landing.servicesEyebrow', 'WHAT YOU CAN DO')}</span>
            <h2 className="section-title-navy">
              {t('landing.servicesTitle', 'Core platform capabilities')}
            </h2>
            <p className="section-subtitle-muted">
              {t('landing.servicesSubtitle', 'Everything you need at every stage of your licence journey.')}
            </p>
          </div>

          <div className="services-quad-row">
            
            <div className="service-item-box">
              <div className="service-icon-wrap wrap-blue">
                <User size={19} color="#0284c7" />
              </div>
              <h4 className="service-title">{t('landing.serviceApplyTitle', 'Apply')}</h4>
              <p className="service-desc">{t('landing.serviceApplyDesc', 'Start a new licence application with guided online steps.')}</p>
            </div>

            <div className="service-item-box">
              <div className="service-icon-wrap wrap-orange">
                <Clock size={19} color="#ea580c" />
              </div>
              <h4 className="service-title">{t('landing.serviceTrackTitle', 'Track')}</h4>
              <p className="service-desc">{t('landing.serviceTrackDesc', 'See your current application progress and verified milestones.')}</p>
            </div>

            <div className="service-item-box">
              <div className="service-icon-wrap wrap-teal">
                <Calendar size={19} color="#0f766e" />
              </div>
              <h4 className="service-title">{t('landing.serviceTestTitle', 'Test & Appointments')}</h4>
              <p className="service-desc">{t('landing.serviceTestDesc', 'Manage driving test slots and automated track appointments.')}</p>
            </div>

            <div className="service-item-box">
              <div className="service-icon-wrap wrap-green">
                <Layers size={19} color="#16a34a" />
              </div>
              <h4 className="service-title">{t('landing.serviceManageTitle', 'Manage Licence')}</h4>
              <p className="service-desc">{t('landing.serviceManageDesc', 'Handle renewals, address updates, and duplicate smart cards.')}</p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. HOW IT WORKS (FOUR CLEAR MILESTONES)
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="section-how-clean">
        <div className="premium-container">
          
          <div className="section-header-clean">
            <span className="section-eyebrow-orange">{t('landing.howEyebrow', 'HOW IT WORKS')}</span>
            <h2 className="section-title-navy">
              {t('landing.howTitle', 'Four clear milestones')}
            </h2>
          </div>

          <div className="how-milestones-track">
            <div className="milestone-step">
              <div className="step-circle">1</div>
              <div className="step-label">{t('landing.howStep1', 'Online Application')}</div>
            </div>
            <div className="step-line" />
            <div className="milestone-step">
              <div className="step-circle">2</div>
              <div className="step-label">{t('landing.howStep2', 'Knowledge Test')}</div>
            </div>
            <div className="step-line" />
            <div className="milestone-step">
              <div className="step-circle">3</div>
              <div className="step-label">{t('landing.howStep3', 'Driving Test Slot')}</div>
            </div>
            <div className="step-line" />
            <div className="milestone-step">
              <div className="step-circle">4</div>
              <div className="step-label">{t('landing.howStep4', 'Licence Issued')}</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DRIVESEVA ASSISTANT — "NEED HELP?"
          ───────────────────────────────────────────────────────────── */}
      <section className="section-driveseva-clean">
        <div className="premium-container">
          <div className="driveseva-minimal-banner">
            <div className="driveseva-left-copy">
              <span className="driveseva-eyebrow-tag">{t('landing.helpEyebrow', 'NEED HELP?')}</span>
              <h3 className="driveseva-headline">{t('landing.helpTitle', 'Ask DriveSEVA')}</h3>
              <p className="driveseva-body">
                {t('landing.helpDesc', 'Get guidance about your driving licence journey, applications and next steps.')}
              </p>
            </div>
            <button onClick={() => setShowAiDrawer(true)} className="driveseva-cta-button">
              {t('landing.helpCta', 'Ask DriveSEVA →')}
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FINAL CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="section-final-cta-clean">
        <div className="premium-container">
          <div className="final-cta-container">
            <h2 className="final-cta-heading">
              {t('landing.ctaTitle', 'Ready to start your journey?')}
            </h2>
            <p className="final-cta-sub">
              {t('landing.ctaDesc', 'Sign in to access your personalized driving licence journey.')}
            </p>
            <button onClick={() => handleOpenAuth('/dashboard')} className="final-cta-button">
              {t('landing.ctaButton', 'Start Your Journey →')}
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. CLEAN MINIMAL FOOTER
          ───────────────────────────────────────────────────────────── */}
      <footer className="premium-footer">
        <div className="premium-container footer-content-row">
          <div className="footer-left">
            <img src="/indian-drives-logo.png" alt="Indian Drives" className="footer-logo-img" />
            <span className="footer-copyright">
              © {new Date().getFullYear()} {t('landing.footerRights', 'Indian Drives. All rights reserved.')}
            </span>
          </div>

          <div className="footer-right-links">
            <a href="#how-it-works">{t('nav.howItWorks', 'How It Works')}</a>
            <a href="#services">{t('nav.services', 'Services')}</a>
            <a href="#journeys">{t('nav.myJourney', 'My Journey')}</a>
            <button onClick={() => setShowAiDrawer(true)} className="footer-ai-btn">
              ✦ {t('nav.ask', 'Ask DriveSEVA')}
            </button>
            <button onClick={() => handleOpenAuth('/dashboard')} className="footer-signin-btn">
              {t('common.login', 'Sign In')}
            </button>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          9. MODALS & AI DRAWER
          ───────────────────────────────────────────────────────────── */}
      {selectedJourneyModal && journeySummaries[selectedJourneyModal] && (
        <div className="modal-overlay-backdrop" onClick={() => setSelectedJourneyModal(null)}>
          <div className="journey-summary-dialog" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const j = journeySummaries[selectedJourneyModal];
              return (
                <div>
                  <div className="dialog-header-row">
                    <div>
                      <span className="dialog-stage-tag" style={{ color: j.accentColor }}>
                        STAGE {j.stepNum}
                      </span>
                      <h3 className="dialog-title">{j.title}</h3>
                      <div className="dialog-subtitle">{j.subtitle}</div>
                    </div>
                    <button onClick={() => setSelectedJourneyModal(null)} className="dialog-close-btn">
                      ✕
                    </button>
                  </div>

                  <p className="dialog-description">{j.desc}</p>

                  <div className="dialog-steps-card">
                    <div className="steps-card-title">{t('common.keySteps', 'Key Steps:')}</div>
                    <div className="steps-card-list">
                      {j.steps.map((st, idx) => (
                        <div key={idx} className="step-bullet-item">
                          <CheckCircle2 size={15} color={j.accentColor} />
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenAuth(j.target)}
                    className="dialog-primary-action"
                  >
                    {j.cta}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* DriveSEVA Assistant Drawer */}
      {showAiDrawer && (
        <div className="modal-overlay-backdrop" onClick={() => setShowAiDrawer(false)}>
          <div className="driveseva-slide-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <div className="drawer-bot-info">
                <div className="drawer-avatar">✦</div>
                <div>
                  <div className="drawer-bot-title">{t('ask.title', 'DriveSEVA Assistant')}</div>
                  <div className="drawer-bot-status">● {t('common.online', 'Online')}</div>
                </div>
              </div>
              <button onClick={() => setShowAiDrawer(false)} className="drawer-close-btn">✕</button>
            </div>

            <div className="drawer-quick-prompts">
              <button onClick={() => handleSendMessage(t('ask.chip1', 'How do I apply for a Learner Licence?'))}>
                {t('landing.roadmapLL', 'Learner Licence')}
              </button>
              <button onClick={() => handleSendMessage(t('ask.chip2', 'How does driving test slot booking work?'))}>
                {t('landing.roadmapTest', 'Driving Test Slot')}
              </button>
              <button onClick={() => handleSendMessage(t('ask.chip3', 'What services can I manage?'))}>
                {t('landing.serviceManageTitle', 'Licence Services')}
              </button>
            </div>

            <div className="drawer-messages-area">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`drawer-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <div>{msg.text}</div>
                  {msg.requiresAuth && (
                    <button
                      onClick={() => handleOpenAuth('/dashboard')}
                      className="bubble-signin-btn"
                    >
                      {t('common.login', 'Sign In')} →
                    </button>
                  )}
                  <div className="bubble-timestamp">{msg.time}</div>
                </div>
              ))}
            </div>

            <div className="drawer-input-row">
              <input
                type="text"
                placeholder={t('ask.placeholder', 'Ask DriveSEVA anything...')}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              />
              <button onClick={() => handleSendMessage()} className="drawer-send-btn">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Gateway Modal */}
      {showAuthModal && (
        <div className="modal-overlay-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="auth-gateway-card" onClick={(e) => e.stopPropagation()}>
            <div className="auth-card-top">
              <div>
                <span className="auth-card-eyebrow">{t('auth.eyebrow', 'CITIZEN ACCESS')}</span>
                <h3 className="auth-card-title">{t('auth.title', 'Sign in to Indian Drives')}</h3>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="dialog-close-btn">✕</button>
            </div>

            {/* One-Click Demo Access */}
            <div className="demo-login-box">
              <div className="demo-box-title">{t('auth.demoTitle', 'Quick Demo Access')}</div>
              <p className="demo-box-sub">
                {t('auth.demoDesc', 'Explore the verified applicant cockpit as Yanshi Chauhan.')}
              </p>
              <button
                onClick={() => handleDemoLogin(pendingRedirect)}
                className="demo-action-button"
              >
                {t('auth.demoBtn', 'Continue as Yanshi Chauhan →')}
              </button>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleAuthSubmit}>
              <div className="auth-tab-buttons">
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`auth-tab-btn ${authMethod === 'phone' ? 'active' : ''}`}
                >
                  {t('auth.phoneTab', 'Mobile Number')}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('aadhaar')}
                  className={`auth-tab-btn ${authMethod === 'aadhaar' ? 'active' : ''}`}
                >
                  {t('auth.aadhaarTab', 'Aadhaar Number')}
                </button>
              </div>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  {authMethod === 'phone' ? t('auth.phoneLabel', '10-Digit Mobile Number') : t('auth.aadhaarLabel', '12-Digit Aadhaar Number')}
                </label>
                <input
                  type={authMethod === 'phone' ? 'tel' : 'text'}
                  placeholder={authMethod === 'phone' ? 'e.g. 98765 43210' : 'XXXX XXXX XXXX'}
                  value={authMethod === 'phone' ? phoneNum : aadhaarNum}
                  onChange={(e) => authMethod === 'phone' ? setPhoneNum(e.target.value) : setAadhaarNum(e.target.value)}
                  className="auth-input-control"
                />
              </div>

              <button type="submit" className="auth-submit-action">
                {t('auth.sendOtp', 'Send OTP & Sign In')}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
