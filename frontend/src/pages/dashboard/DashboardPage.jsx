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
          1. MINIMAL AMBIENT BACKGROUND HIGHWAY ARTWORK (SINGLE ROAD)
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
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.65 }}
        >
          <defs>
            {/* Clean minimal highway asphalt gradient */}
            <linearGradient id="singleRoadAsphalt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.75" />
            </linearGradient>

            {/* Subtle neutral centerline */}
            <linearGradient id="singleRoadCenterline" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#64748b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
            </linearGradient>

            {/* Topographic elevation line gradient */}
            <linearGradient id="bgTopoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#002542" stopOpacity="0.02" />
              <stop offset="50%" stopColor="#002542" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#002542" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Topographic Contour Curves */}
          <path
            d="M -150 180 C 200 160, 500 70, 850 80 C 1150 90, 1350 220, 1600 200"
            stroke="url(#bgTopoGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M -150 240 C 220 220, 520 120, 870 130 C 1170 140, 1370 280, 1600 260"
            stroke="url(#bgTopoGrad)"
            strokeWidth="1"
          />
          <path
            d="M -100 460 C 300 440, 600 580, 950 560 C 1250 540, 1450 400, 1650 380"
            stroke="url(#bgTopoGrad)"
            strokeWidth="1.2"
          />
          <path
            d="M -100 520 C 320 500, 620 640, 970 620 C 1270 600, 1470 460, 1650 440"
            stroke="url(#bgTopoGrad)"
            strokeWidth="1"
            strokeDasharray="5 7"
          />

          {/* SINGLE HIGHWAY: Outer Soft Glow Ribbon */}
          <path
            d="M -80 320 C 320 320, 500 140, 880 140 C 1220 140, 1360 450, 1550 450"
            stroke="#f1f5f9"
            strokeWidth="52"
            strokeLinecap="round"
          />

          {/* Expressway Asphalt Bed */}
          <path
            d="M -80 320 C 320 320, 500 140, 880 140 C 1220 140, 1360 450, 1550 450"
            stroke="url(#singleRoadAsphalt)"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Outer Guardrails / Shoulder Lines */}
          <path
            d="M -80 306 C 320 306, 500 126, 880 126 C 1220 126, 1360 436, 1550 436"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          <path
            d="M -80 334 C 320 334, 500 154, 880 154 C 1220 154, 1360 464, 1550 464"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />

          {/* Static Clean Dashed Centerline */}
          <path
            d="M -80 320 C 320 320, 500 140, 880 140 C 1220 140, 1360 450, 1550 450"
            stroke="url(#singleRoadCenterline)"
            strokeWidth="2"
            strokeDasharray="8 10"
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

          {importantNotice && !showProcessedNotification && (
            <motion.div
              key="important-notice"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #fed7aa',
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
                      background: '#fff7ed',
                      color: '#ea580c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bell size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                      IMPORTANT NOTIFICATION
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#173b57' }}>
                      {importantNotice.title}: {importantNotice.desc}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => {
                      centralDataStore.markNotificationRead(importantNotice.id);
                      setImportantNotice(null);
                      if (importantNotice.link) navigate(importantNotice.link);
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
                    View Details <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      centralDataStore.markNotificationRead(importantNotice.id);
                      setImportantNotice(null);
                    }}
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
            3. CLEAN & SPACIOUS HERO SECTION
        ───────────────────────────────────────────────────────────── */}
        <div
          style={{
            padding: '12px 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* Minimal Tricolor Top Accent */}
          <div style={{ display: 'flex', width: '36px', height: '3px', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ flex: 1, background: 'var(--color-saffron)' }} />
            <div style={{ flex: 1, background: 'var(--color-border)' }} />
            <div style={{ flex: 1, background: 'var(--color-sage)' }} />
          </div>

          <h1
            style={{
              fontSize: '46px',
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
            <div style={{ color: 'var(--color-text-secondary)', fontWeight: 400, fontSize: '15.5px', marginTop: '4px' }}>
              {t('dashboard.subtitle')}
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }} />

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
              onClick={() => navigate('/licence-services')}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

function DestinationCard({ step, tag, title, desc, cta, icon: Icon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: isHovered ? '1px solid #002542' : '1px solid #e2e8f0',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 10px 24px rgba(0, 37, 66, 0.06)' : '0 2px 8px rgba(0, 37, 66, 0.02)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: isHovered ? '#002542' : '#f8fafc',
          border: isHovered ? '1px solid #002542' : '1px solid #e2e8f0',
          color: isHovered ? '#ffffff' : '#002542',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          transition: 'all 0.2s ease'
        }}
      >
        <Icon size={22} />
      </div>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          color: isHovered ? '#002542' : '#64748b',
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
          color: '#102D43',
          margin: '0 0 10px 0',
          lineHeight: 1.3
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: '#64748b',
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
          color: '#002542',
          fontSize: '14px',
          fontWeight: 700,
          marginTop: 'auto'
        }}
      >
        <span>{cta}</span>
        <span
          style={{
            display: 'inline-flex',
            transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
            transition: 'transform 0.2s ease',
            color: '#002542'
          }}
        >
          <ArrowRight size={16} />
        </span>
      </div>
    </div>
  );
}
