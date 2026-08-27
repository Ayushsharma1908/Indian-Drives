import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Car,
  FileText,
  Shield,
  Bell,
  CheckCircle2,
  Award,
  X,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { getStoredUserProfile } from '../../data/userProfileData';
import { useLanguage } from '../../main';

export function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const profile = getStoredUserProfile();
  const [searchParams] = useSearchParams();
  const [upcomingVisit, setUpcomingVisit] = useState(null);
  const [importantNotice, setImportantNotice] = useState(null);
  const [showProcessedNotification, setShowProcessedNotification] = useState(false);
  const [activeFlow, setActiveFlow] = useState(null);
  const [flowTitle, setFlowTitle] = useState('');
  const [flowFee, setFlowFee] = useState('250');

  const dismissNotification = () => {
    setShowProcessedNotification(false);
    if (activeFlow) {
      sessionStorage.setItem(`seen_${activeFlow}`, 'true');
    }
    localStorage.removeItem('last_processed_flow');
    localStorage.removeItem('last_processed_title');
    localStorage.removeItem('last_processed_fee');
  };

  useEffect(() => {
    // Determine currently processed flow
    const paramFlow = searchParams.get('processed');
    const localFlow = localStorage.getItem('last_processed_flow');
    const flow = paramFlow || localFlow;

    const title = searchParams.get('title') || localStorage.getItem('last_processed_title') || 'Licence Service';
    const fee = localStorage.getItem('last_processed_fee') || '250';

    if (flow) {
      if (sessionStorage.getItem(`seen_${flow}`) === 'true') {
        localStorage.removeItem('last_processed_flow');
        localStorage.removeItem('last_processed_title');
        localStorage.removeItem('last_processed_fee');
        if (paramFlow) {
          navigate('/dashboard', { replace: true });
        }
        return;
      }

      setActiveFlow(flow);
      setFlowTitle(title);
      setFlowFee(fee);
      sessionStorage.setItem(`seen_${flow}`, 'true');

      const timer = setTimeout(() => {
        setShowProcessedNotification(true);
        localStorage.removeItem('last_processed_flow');
        localStorage.removeItem('last_processed_title');
        localStorage.removeItem('last_processed_fee');

        if (paramFlow) {
          navigate('/dashboard', { replace: true });
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    // Check for active booked appointments
    api.appointments()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          const booked = res.find((a) => a.status === 'booked' || a.status === 'scheduled');
          if (booked) {
            setUpcomingVisit(booked);
            return;
          }
        }
      })
      .catch(() => {});

    // Check for urgent unread notifications
    api.notifications()
      .then((res) => {
        if (Array.isArray(res)) {
          const urgent = res.find(
            (n) => !n.read && (
              n.title.toLowerCase().includes('verified') ||
              n.title.toLowerCase().includes('ready') ||
              n.title.toLowerCase().includes('retest') ||
              n.title.toLowerCase().includes('important')
            )
          );
          if (urgent) {
            setImportantNotice(urgent);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="page-dashboard-container"
      style={{
        position: 'relative',
        background: '#f8fafc',
        minHeight: 'calc(100vh - 72px)',
        padding: '36px 0 70px 0',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SUBTLE AMBIENT ROAD NETWORK BACKGROUND DESIGN
      ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        {/* Soft Ambient Radial Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-100px',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232, 138, 45, 0.12) 0%, rgba(254, 215, 170, 0.05) 50%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '-140px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.10) 0%, rgba(186, 230, 253, 0.04) 50%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '25%',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22, 163, 74, 0.07) 0%, rgba(187, 247, 208, 0.02) 50%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Vector Highway & Road Markings SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ opacity: 0.85 }}
        >
          <defs>
            <linearGradient id="bgRoadGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#002542" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#e88a2d" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#16805a" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="bgRoadLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#002542" stopOpacity="0.03" />
              <stop offset="40%" stopColor="#e88a2d" stopOpacity="0.18" />
              <stop offset="80%" stopColor="#0284c7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#16805a" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Primary Sweeping Expressway */}
          <path
            d="M -100 220 C 300 220, 480 60, 850 60 C 1200 60, 1350 380, 1600 380"
            stroke="url(#bgRoadGrad1)"
            strokeWidth="56"
            strokeLinecap="round"
          />
          <path
            d="M -100 220 C 300 220, 480 60, 850 60 C 1200 60, 1350 380, 1600 380"
            stroke="url(#bgRoadLine)"
            strokeWidth="3"
            strokeDasharray="16 16"
            strokeLinecap="round"
          />

          {/* Secondary Cross-Connect Highway */}
          <path
            d="M 100 850 C 400 850, 600 520, 1050 520 C 1300 520, 1450 720, 1600 720"
            stroke="url(#bgRoadGrad1)"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <path
            d="M 100 850 C 400 850, 600 520, 1050 520 C 1300 520, 1450 720, 1600 720"
            stroke="url(#bgRoadLine)"
            strokeWidth="2"
            strokeDasharray="12 14"
            strokeLinecap="round"
          />

          {/* Gentle Decorative Milestone Markers */}
          <circle cx="850" cy="60" r="4" fill="#e88a2d" fillOpacity="0.25" />
          <circle cx="1050" cy="520" r="4" fill="#0284c7" fillOpacity="0.25" />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT WRAPPER
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        
        {/* DYNAMIC PROCESSED / APPOINTMENT NOTIFICATIONS */}
        <AnimatePresence mode="wait">
          {showProcessedNotification && activeFlow === 'dl_passed' && (
            <motion.div
              key="dl-passed-notification"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                  border: '2px solid #bbf7d0',
                  borderRadius: '20px',
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  width: '100%',
                  boxShadow: '0 12px 30px rgba(22, 163, 74, 0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '50px',
                      height: '50px',
                      borderRadius: '16px',
                      background: '#dcfce7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#16a34a',
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle2 size={28} strokeWidth={2.5} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#15803d', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
                      STAGE 2 COMPLETED · DRIVING LICENCE ISSUED
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>
                      Practical Driving Test Passed with Distinction!
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                      Your Smart Card Driving Licence is active. Access it anytime in your digital licence wallet.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <button
                    onClick={() => {
                      dismissNotification();
                      navigate('/dl/congrats');
                    }}
                    style={{
                      background: '#16a34a',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 22px',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
                    }}
                  >
                    View Licence Certificate <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={dismissNotification}
                    title="Dismiss"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {upcomingVisit && !showProcessedNotification && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                  border: '1px solid #bbf7d0',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  width: '100%',
                  boxShadow: '0 4px 16px rgba(0, 37, 66, 0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: '#dcfce7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#16805a'
                    }}
                  >
                    <Calendar size={22} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#16805a', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                      UPCOMING TEST APPOINTMENT
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#173b57' }}>
                      RTO Practical Test: {upcomingVisit.vehicleClass || 'LMV (Motor Car)'} · {upcomingVisit.date}, {upcomingVisit.time || upcomingVisit.slot || '10:30 AM'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/appointments')}
                  style={{
                    background: '#002542',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 37, 66, 0.15)'
                  }}
                >
                  View Pass <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* ─────────────────────────────────────────────────────────────
            3. LUXURY HERO CARD WITH S-CURVE INTERACTIVE ROADMAP
        ───────────────────────────────────────────────────────────── */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '24px',
            padding: '36px 44px',
            boxShadow: '0 12px 35px -8px rgba(0, 37, 66, 0.06), 0 4px 12px rgba(0, 37, 66, 0.02)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(360px, 480px)',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(90deg, #fff7ed 0%, #ffedd5 100%)',
                border: '1px solid #fed7aa',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#c2410c',
                letterSpacing: '0.8px',
                width: 'fit-content'
              }}
            >
              <Sparkles size={13} color="#ea580c" />
              NATIONAL CITIZEN DRIVING CONSOLE · PARIVAHAN ALIGNED
            </div>

            <h1
              style={{
                fontSize: '48px',
                fontWeight: 800,
                color: '#002542',
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: '-1.2px'
              }}
            >
              {t('dashboard.title')}, {profile.firstName || 'Yanshi'} 🙏
            </h1>

            <div style={{ fontSize: '20px', color: '#173b57', fontWeight: 600, lineHeight: 1.4 }}>
              Welcome to Indian Drives.
              <div style={{ color: '#64748b', fontWeight: 400, fontSize: '16px', marginTop: '4px' }}>
                {t('dashboard.subtitle')}
              </div>
            </div>
          </div>

          {/* Right S-Curve Roadmap SVG Graphic */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.85) 0%, rgba(255, 255, 255, 0.85) 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.8), 0 6px 16px rgba(0, 37, 66, 0.03)'
            }}
          >
            <svg
              width="430"
              height="150"
              viewBox="0 0 430 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="vibrantRoadGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="40%" stopColor="#0284c7" />
                  <stop offset="75%" stopColor="#173b57" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Highway Outer Track */}
              <path
                d="M 30 120 C 120 120, 135 30, 205 30 C 265 30, 295 75, 385 75"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Vibrant Road Line */}
              <path
                d="M 30 120 C 120 120, 135 30, 205 30 C 265 30, 295 75, 385 75"
                stroke="url(#vibrantRoadGradient)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Dashed Center Road Line */}
              <path
                d="M 30 120 C 120 120, 135 30, 205 30 C 265 30, 295 75, 385 75"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />

              {/* Node 1: 0 (START) */}
              <g transform="translate(30, 120)">
                <circle r="14" fill="#f59e0b" fillOpacity="0.2" filter="url(#nodeGlow)" />
                <circle r="10" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
                <circle r="4" fill="#f59e0b" />
                <text x="0" y="24" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="800" letterSpacing="0.5">START</text>
              </g>

              {/* Node 2: LL (35%) */}
              <g transform="translate(205, 30)">
                <circle r="12" fill="#0284c7" fillOpacity="0.15" />
                <circle r="8" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                <circle r="3.5" fill="#0284c7" />
                <text x="0" y="-12" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="700">LL (35%)</text>
              </g>

              {/* Node 3: TEST (65%) */}
              <g transform="translate(300, 48)">
                <circle r="7" fill="#173b57" />
                <circle r="3" fill="#ffffff" />
                <text x="0" y="-12" textAnchor="middle" fill="#476179" fontSize="10" fontWeight="700">TEST (65%)</text>
              </g>

              {/* Node 4: 100 (DL ISSUED) */}
              <g transform="translate(385, 75)">
                <circle r="14" fill="#10b981" fillOpacity="0.25" filter="url(#nodeGlow)" />
                <circle r="10" fill="#10b981" />
                <path d="M -3 0 L -1 3 L 4 -2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <text x="0" y="24" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="800">DL ISSUED</text>
              </g>
            </svg>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. VIBRANT 3 DESTINATION CARDS SECTION
        ───────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div
              style={{
                color: '#e88a2d',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                marginBottom: '6px'
              }}
            >
              WHERE ARE YOU IN YOUR DRIVING JOURNEY?
            </div>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#002542',
                margin: 0,
                letterSpacing: '-0.7px'
              }}
            >
              {"Tell us where you are, and we'll take you from there."}
            </h2>
          </div>

          {/* 3 High-End Destination Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '26px'
            }}
          >
            
            {/* ═══════════════════════════════════════════════════════
                CARD 01: STARTING FRESH (Warm Saffron / Amber Theme)
            ═══════════════════════════════════════════════════════ */}
            <div
              onClick={() => navigate('/journey?stage=ll')}
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 42%)',
                border: '1.5px solid #fef3c7',
                borderRadius: '20px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.05), 0 2px 8px rgba(0, 37, 66, 0.02)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.boxShadow = '0 20px 35px -8px rgba(245, 158, 11, 0.16), 0 8px 16px -4px rgba(0, 37, 66, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#fef3c7';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.05), 0 2px 8px rgba(0, 37, 66, 0.02)';
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(217, 119, 6, 0.28)'
                }}
              >
                <Car size={26} />
              </div>

              {/* Step Tag */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#c2410c',
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  width: 'fit-content',
                  marginBottom: '12px'
                }}
              >
                01 · STARTING FRESH
              </div>

              {/* Heading & Description */}
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#002542', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                {"I'm starting from scratch"}
              </h3>
              <p style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6, margin: '0 0 20px 0', flexGrow: 1 }}>
                {"I don't have a Learner Licence yet. Complete online Form 2 with Aadhaar eKYC and take the test right from home."}
              </p>

              {/* Action Button */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  color: '#c2410c',
                  padding: '11px 18px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginTop: 'auto'
                }}
              >
                <span>Start with LL</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                CARD 02: CONTINUE JOURNEY (Deep Royal Navy / Sky Theme)
                FEATURED / ACTIVE
            ═══════════════════════════════════════════════════════ */}
            <div
              onClick={() => navigate('/journey?stage=dl')}
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 42%)',
                border: '2px solid #38bdf8',
                borderRadius: '20px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(2, 132, 199, 0.08), 0 2px 8px rgba(0, 37, 66, 0.03)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 20px 35px -8px rgba(2, 132, 199, 0.20), 0 8px 16px -4px rgba(0, 37, 66, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#38bdf8';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(2, 132, 199, 0.08), 0 2px 8px rgba(0, 37, 66, 0.03)';
              }}
            >
              {/* Active Badge on Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: '#002542',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.6px',
                  padding: '4px 9px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                ACTIVE STAGE
              </div>

              {/* Icon Circle */}
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #002542 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(0, 37, 66, 0.28)'
                }}
              >
                <FileText size={26} />
              </div>

              {/* Step Tag */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#0369a1',
                  background: '#e0f2fe',
                  border: '1px solid #bae6fd',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  width: 'fit-content',
                  marginBottom: '12px'
                }}
              >
                02 · CONTINUE YOUR JOURNEY
              </div>

              {/* Heading & Description */}
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#002542', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                I have a Learner Licence
              </h3>
              <p style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6, margin: '0 0 20px 0', flexGrow: 1 }}>
                Your LL is active. Complete permanent DL Form 4, port existing documents automatically, and book your driving test slot.
              </p>

              {/* Action Button */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#002542',
                  border: 'none',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginTop: 'auto',
                  boxShadow: '0 4px 12px rgba(0, 37, 66, 0.2)'
                }}
              >
                <span>Continue to DL</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                CARD 03: EXISTING LICENCE (Emerald Green Theme)
            ═══════════════════════════════════════════════════════ */}
            <div
              onClick={() => navigate('/licence-services')}
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 42%)',
                border: '1.5px solid #bbf7d0',
                borderRadius: '20px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.05), 0 2px 8px rgba(0, 37, 66, 0.02)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.boxShadow = '0 20px 35px -8px rgba(16, 185, 129, 0.16), 0 8px 16px -4px rgba(0, 37, 66, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#bbf7d0';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.05), 0 2px 8px rgba(0, 37, 66, 0.02)';
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(4, 120, 87, 0.28)'
                }}
              >
                <Shield size={26} />
              </div>

              {/* Step Tag */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#15803d',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  width: 'fit-content',
                  marginBottom: '12px'
                }}
              >
                03 · EXISTING LICENCE
              </div>

              {/* Heading & Description */}
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#002542', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                I already have a Driving Licence
              </h3>
              <p style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6, margin: '0 0 20px 0', flexGrow: 1 }}>
                Manage renewals, duplicate Smart Cards, address & contact updates, endorsement and international permits.
              </p>

              {/* Action Button */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#15803d',
                  padding: '11px 18px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginTop: 'auto'
                }}
              >
                <span>View licence services</span>
                <ArrowRight size={16} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
