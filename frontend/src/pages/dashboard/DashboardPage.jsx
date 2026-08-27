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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { centralDataStore } from '../../data/centralDataStore';
import { getStoredUserProfile } from '../../data/userProfileData';
import { useLanguage } from '../../main';

export function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const profile = centralDataStore.getUserProfile() || getStoredUserProfile();
  const [searchParams] = useSearchParams();
  const [upcomingVisit, setUpcomingVisit] = useState(() => centralDataStore.getUpcomingAppointment());
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
    const handleStateChange = () => {
      setUpcomingVisit(centralDataStore.getUpcomingAppointment());
    };
    window.addEventListener('indian-drives-state-change', handleStateChange);

    // Also check for urgent unread notifications
    const notes = centralDataStore.getNotifications();
    const urgent = notes.find(
      (n) => n.unread && (
        n.title.toLowerCase().includes('verified') ||
        n.title.toLowerCase().includes('ready') ||
        n.title.toLowerCase().includes('retest') ||
        n.title.toLowerCase().includes('important')
      )
    );
    if (urgent) {
      setImportantNotice(urgent);
    }

    return () => window.removeEventListener('indian-drives-state-change', handleStateChange);
  }, []);

  return (
    <div
      className="page-dashboard-container"
      style={{
        position: 'relative',
        background: '#f8fafc',
        minHeight: 'calc(100vh - 72px)',
        padding: '36px 0 64px 0',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SUBTLE AMBIENT BACKGROUND ROAD ART (WATERMARK STYLE)
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
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ opacity: 0.35 }}
        >
          <path
            d="M -100 320 C 350 320, 520 120, 920 120 C 1260 120, 1380 440, 1600 440"
            stroke="#e2e8f0"
            strokeWidth="36"
            strokeLinecap="round"
          />
          <path
            d="M -100 320 C 350 320, 520 120, 920 120 C 1260 120, 1380 440, 1600 440"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="12 14"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN DASHBOARD CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1184px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        
        {/* DYNAMIC NOTIFICATIONS / APPOINTMENTS BANNER */}
        <AnimatePresence mode="wait">
          {showProcessedNotification && activeFlow === 'dl_passed' && (
            <motion.div
              key="dl-passed-notification"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #bbf7d0',
                  borderRadius: '14px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  width: '100%',
                  boxShadow: '0 2px 8px rgba(0, 37, 66, 0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#f0fdf4',
                      color: '#16805a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#16805a', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                      DRIVING LICENCE ISSUED
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#173b57' }}>
                      Practical Driving Test Passed — Driving Licence is active.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => {
                      dismissNotification();
                      navigate('/dl/congrats');
                    }}
                    style={{
                      background: '#002542',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: 'none'
                    }}
                  >
                    View Licence <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={dismissNotification}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {upcomingVisit && !showProcessedNotification && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  width: '100%',
                  boxShadow: '0 1px 4px rgba(0, 37, 66, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: '#f1f5f9',
                      color: '#173b57',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Calendar size={19} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#476179', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                      UPCOMING TEST APPOINTMENT
                    </span>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#173b57' }}>
                      RTO Practical Test: {upcomingVisit.vehicleClass || 'LMV'} · {upcomingVisit.date}, {upcomingVisit.time || upcomingVisit.slot || '10:30 AM'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/appointments')}
                  style={{
                    background: 'transparent',
                    border: '1px solid #cbd5e1',
                    color: '#173b57',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 13px',
                    borderRadius: '8px'
                  }}
                >
                  View appointment <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* ─────────────────────────────────────────────────────────────
            3. HERO SECTION (GREETING ON LEFT + S-CURVE ROAD ON RIGHT)
        ───────────────────────────────────────────────────────────── */}
        <div
          className="hero-section-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(360px, 480px)',
            gap: '36px',
            alignItems: 'center',
            padding: '12px 0 20px 0'
          }}
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Minimal Tricolor Top Accent */}
            <div style={{ display: 'flex', width: '36px', height: '3px', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ flex: 1, background: 'var(--color-saffron)' }} />
              <div style={{ flex: 1, background: 'var(--color-border)' }} />
              <div style={{ flex: 1, background: 'var(--color-sage)' }} />
            </div>

            <h1
              style={{
                fontSize: '44px',
                fontWeight: 700,
                color: 'var(--color-deep-navy)',
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: '-1.2px'
              }}
            >
              {t('dashboard.title')}, {profile.firstName || 'Yanshi'} 🙏
            </h1>

            <div style={{ fontSize: '18px', color: 'var(--color-primary-navy)', fontWeight: 600, lineHeight: 1.4 }}>
              Welcome to Indian Drives.
              <div style={{ color: 'var(--color-text-secondary)', fontWeight: 400, fontSize: '15px', marginTop: '4px' }}>
                {t('dashboard.subtitle')}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT: SEAMLESS S-CURVE ROAD DIAGRAM (STITCH SPEC)
          ═══════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '160px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 450 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Centerline Multi-Color Transition Gradient */}
                <linearGradient id="roadStitchGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E8892D" />
                  <stop offset="35%" stopColor="#102D43" />
                  <stop offset="65%" stopColor="#425B78" />
                  <stop offset="100%" stopColor="#5D9278" />
                </linearGradient>
              </defs>

              {/* 1. Road Outer Shoulder / Curb Outline */}
              <path
                d="M 35 110 C 110 110, 140 28, 210 28 C 270 28, 290 62, 340 62 C 370 62, 385 45, 410 38"
                stroke="#DCE4EA"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* 2. Road Asphalt Surface Body */}
              <path
                d="M 35 110 C 110 110, 140 28, 210 28 C 270 28, 290 62, 340 62 C 370 62, 385 45, 410 38"
                stroke="#F7F9FB"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* 3. Live Animated Multi-Color Dashed Center Road Line */}
              <path
                className="live-road-dashes"
                d="M 35 110 C 110 110, 140 28, 210 28 C 270 28, 290 62, 340 62 C 370 62, 385 45, 410 38"
                stroke="url(#roadStitchGrad)"
                strokeWidth="2.2"
                strokeDasharray="5 7"
                strokeLinecap="round"
              />

              {/* ──────────────────────────────────────────────────
                  4 MILESTONE NODES (START, LL, TEST, DL)
              ────────────────────────────────────────────────── */}

              {/* NODE 1: START (Bottom Left) */}
              <g transform="translate(35, 110)">
                <circle r="14" fill="#FFF3E3" fillOpacity="0.8" />
                <circle r="5.5" fill="#E8892D" />
                <text
                  x="0"
                  y="24"
                  textAnchor="middle"
                  fill="#E8892D"
                  fontSize="11"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  START
                </text>
              </g>

              {/* NODE 2: LL (Top Peak Crest) */}
              <g transform="translate(210, 28)">
                <circle r="6" fill="#102D43" />
                <circle r="2" fill="#FFFFFF" />
                <text
                  x="0"
                  y="-12"
                  textAnchor="middle"
                  fill="#102D43"
                  fontSize="11"
                  fontWeight="800"
                  letterSpacing="0.4"
                >
                  LL
                </text>
              </g>

              {/* NODE 3: TEST (Descent Valley) */}
              <g transform="translate(320, 62)">
                <circle r="4.5" fill="#8693A2" />
                <text
                  x="0"
                  y="-11"
                  textAnchor="middle"
                  fill="#8693A2"
                  fontSize="10.5"
                  fontWeight="700"
                  letterSpacing="0.4"
                >
                  TEST
                </text>
              </g>

              {/* NODE 4: DL (End Target) */}
              <g transform="translate(410, 38)">
                <circle
                  r="12"
                  fill="none"
                  stroke="#5D9278"
                  strokeWidth="1.8"
                  strokeDasharray="3 3"
                />
                <circle r="5.5" fill="#5D9278" />
                <text
                  x="0"
                  y="24"
                  textAnchor="middle"
                  fill="#102D43"
                  fontSize="11"
                  fontWeight="800"
                  letterSpacing="0.4"
                >
                  DL
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div style={{ height: '1px', background: 'var(--color-border)', width: '100%' }} />

        {/* ─────────────────────────────────────────────────────────────
            4. CLEAN, BALANCED 3 DESTINATION CARDS
        ───────────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div
              style={{
                color: 'var(--color-indigo)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}
            >
              WHERE ARE YOU IN YOUR DRIVING JOURNEY?
            </div>
            <h2
              style={{
                fontSize: '26px',
                fontWeight: 700,
                color: 'var(--color-deep-navy)',
                margin: 0,
                letterSpacing: '-0.5px'
              }}
            >
              {"Tell us where you are, and we'll take you from there."}
            </h2>
          </div>

          {/* 3 Destination Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px'
            }}
          >
            
            {/* CARD 01: STARTING FRESH */}
            <DestinationCard
              step="01"
              tag="STARTING FRESH"
              title="I'm starting from scratch"
              desc="I don't have a Learner Licence yet. Start your online Form 2 application with Aadhaar."
              cta="Start with LL process"
              icon={Car}
              theme={{
                baseBg: '#ffffff',
                border: '#e2e8f0',
                hoverBorder: '#818cf8',
                hoverGlow: '0 10px 25px rgba(99, 102, 241, 0.12)',
                iconBg: '#eef2ff',
                iconBorder: '#e0e7ff',
                iconColor: '#4f46e5',
                accentColor: '#4f46e5'
              }}
              onClick={() => navigate('/journey?stage=ll')}
            />

            {/* CARD 02: CONTINUE YOUR JOURNEY */}
            <DestinationCard
              step="02"
              tag="CONTINUE YOUR JOURNEY"
              title="I have a Learner Licence"
              desc="Continue towards your Driving Licence and schedule your practical driving test."
              cta="Start with DL process"
              icon={FileText}
              theme={{
                baseBg: '#ffffff',
                border: '#e2e8f0',
                hoverBorder: '#fb923c',
                hoverGlow: '0 10px 25px rgba(234, 88, 12, 0.12)',
                iconBg: '#fff7ed',
                iconBorder: '#ffedd5',
                iconColor: '#ea580c',
                accentColor: '#ea580c'
              }}
              onClick={() => navigate('/journey?stage=dl')}
            />

            {/* CARD 03: EXISTING LICENCE */}
            <DestinationCard
              step="03"
              tag="EXISTING LICENCE"
              title="I already have a Driving Licence"
              desc="Manage renewals, duplicate Smart Cards, address updates and citizen services."
              cta="Manage Licence Services"
              icon={Shield}
              theme={{
                baseBg: '#ffffff',
                border: '#e2e8f0',
                hoverBorder: '#34d399',
                hoverGlow: '0 10px 25px rgba(16, 185, 129, 0.12)',
                iconBg: '#ecfdf5',
                iconBorder: '#d1fae5',
                iconColor: '#059669',
                accentColor: '#059669'
              }}
              onClick={() => navigate('/licence-services')}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

function DestinationCard({ step, tag, title, desc, cta, icon: Icon, theme, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.baseBg,
        borderRadius: '20px',
        border: `1px solid ${isHovered ? theme.hoverBorder : theme.border}`,
        padding: '30px 26px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: isHovered ? theme.hoverGlow : '0 2px 10px rgba(0, 37, 66, 0.03)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top subtle highlight line when hovered */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: isHovered ? theme.hoverBorder : 'transparent',
          transition: 'all 0.22s ease'
        }}
      />

      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '14px',
          background: isHovered ? theme.iconBg : 'var(--color-bg)',
          border: `1px solid ${isHovered ? theme.iconBorder : 'var(--color-border)'}`,
          color: isHovered ? theme.iconColor : 'var(--color-deep-navy)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '18px',
          transition: 'all 0.22s ease',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)'
        }}
      >
        <Icon size={22} />
      </div>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: isHovered ? theme.accentColor : 'var(--color-text-secondary)',
          marginBottom: '8px',
          transition: 'color 0.2s ease'
        }}
      >
        {step} · {tag}
      </div>

      <h3
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--color-deep-navy)',
          margin: '0 0 10px 0',
          lineHeight: 1.3
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          margin: '0 0 24px 0',
          flexGrow: 1
        }}
      >
        {desc}
      </p>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: isHovered ? theme.accentColor : 'var(--color-deep-navy)',
          fontSize: '14.5px',
          fontWeight: 700,
          marginTop: 'auto',
          transition: 'all 0.2s ease'
        }}
      >
        <span>{cta}</span>
        <span
          style={{
            display: 'inline-flex',
            transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
            transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
            color: isHovered ? theme.accentColor : 'var(--color-deep-navy)'
          }}
        >
          <ArrowRight size={16} />
        </span>
      </div>
    </div>
  );
}
