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
  X,
  Navigation
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
        padding: '36px 0 60px 0',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SUBTLE MINIMAL ROAD BACKGROUND DESIGN
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
          style={{ opacity: 0.45 }}
        >
          {/* Gentle Sweeping Road Track */}
          <path
            d="M -80 260 C 320 260, 480 90, 840 90 C 1180 90, 1320 400, 1560 400"
            stroke="#e2e8f0"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M -80 260 C 320 260, 480 90, 840 90 C 1180 90, 1320 400, 1560 400"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="10 12"
            strokeLinecap="round"
          />

          {/* Lower Connecting Road */}
          <path
            d="M 60 840 C 360 840, 560 560, 980 560 C 1240 560, 1380 720, 1560 720"
            stroke="#edf2f7"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 60 840 C 360 840, 560 560, 980 560 C 1240 560, 1380 720, 1560 720"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="8 10"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN DASHBOARD CONTENT
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
        
        {/* DYNAMIC NOTIFICATIONS / APPOINTMENTS */}
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
            3. HERO SECTION WITH LIVE WORKING ROAD DIAGRAM
        ───────────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(380px, 500px)',
            gap: '36px',
            alignItems: 'center',
            padding: '8px 0 20px 0'
          }}
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Minimal Tricolor Top Accent */}
            <div style={{ display: 'flex', width: '36px', height: '3px', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
              <div style={{ flex: 1, background: '#e88a2d' }} />
              <div style={{ flex: 1, background: '#cbd5e1' }} />
              <div style={{ flex: 1, background: '#16805a' }} />
            </div>

            <h1
              style={{
                fontSize: '44px',
                fontWeight: 700,
                color: '#002542',
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: '-1px'
              }}
            >
              {t('dashboard.title')}, {profile.firstName || 'Yanshi'} 🙏
            </h1>

            <div style={{ fontSize: '18px', color: '#173b57', fontWeight: 600, lineHeight: 1.4 }}>
              Welcome to Indian Drives.
              <div style={{ color: '#64748b', fontWeight: 400, fontSize: '15px', marginTop: '2px' }}>
                {t('dashboard.subtitle')}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT: LIVE WORKING ROAD DIAGRAM (MINIMAL & PREMIUM)
          ═══════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '20px 22px 18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 2px 10px rgba(0, 37, 66, 0.03)'
            }}
          >
            {/* Top Live Progress Status Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16805a', display: 'inline-block' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#002542', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  LIVE JOURNEY TRACK
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                Stage: <strong>DL Form 4 Approved</strong>
              </span>
            </div>

            {/* SVG Live Road Canvas */}
            <div style={{ position: 'relative', width: '100%', height: '140px' }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 440 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Subtle Road Gradient */}
                  <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>

                  {/* Completed Progress Path Glow */}
                  <linearGradient id="completedPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e88a2d" />
                    <stop offset="60%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#16805a" />
                  </linearGradient>

                  {/* Beacon Radial Blur */}
                  <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. Road Outer Shoulder / Curb */}
                <path
                  d="M 30 108 C 115 108, 130 28, 205 28 C 265 28, 290 68, 385 68"
                  stroke="#e2e8f0"
                  strokeWidth="24"
                  strokeLinecap="round"
                />

                {/* 2. Asphalt Road Body */}
                <path
                  d="M 30 108 C 115 108, 130 28, 205 28 C 265 28, 290 68, 385 68"
                  stroke="url(#roadAsphalt)"
                  strokeWidth="18"
                  strokeLinecap="round"
                />

                {/* 3. Live Animated White Dashed Centerline */}
                <path
                  className="live-road-dashes"
                  d="M 30 108 C 115 108, 130 28, 205 28 C 265 28, 290 68, 385 68"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                {/* ──────────────────────────────────────────────────
                    WAYPOINTS / MILESTONES
                ────────────────────────────────────────────────── */}

                {/* WAYPOINT 01: START */}
                <g transform="translate(30, 108)">
                  <circle r="10" fill="#ffffff" stroke="#e88a2d" strokeWidth="3" />
                  <circle r="4" fill="#e88a2d" />
                  <text x="0" y="24" textAnchor="middle" fill="#c2410c" fontSize="10" fontWeight="800" letterSpacing="0.4">START</text>
                </g>

                {/* WAYPOINT 02: LL ISSUED (COMPLETED ✓) */}
                <g transform="translate(205, 28)">
                  <circle r="9" fill="#002542" stroke="#ffffff" strokeWidth="2" />
                  <path d="M -2.5 0 L -0.5 2 L 3 -1.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="0" y="-14" textAnchor="middle" fill="#002542" fontSize="10" fontWeight="800">LL (35%)</text>
                </g>

                {/* LIVE NAVIGATING CAR POSITION (Active between LL & Test at ~52%) */}
                <g transform="translate(250, 42)">
                  {/* Pulsing Beacon Ring */}
                  <circle className="car-pulse-ring" r="14" fill="#0284c7" fillOpacity="0.3" filter="url(#beaconGlow)" />
                  <circle r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                  
                  {/* Mini Car Icon on Road */}
                  <g transform="translate(-5, -5) scale(0.65)">
                    <path
                      d="M2 7l1-3h10l1 3M1 10h14a1 1 0 001-1V7a2 2 0 00-2-2H2a2 2 0 00-2 2v2a1 1 0 001 1z"
                      fill="#ffffff"
                    />
                    <circle cx="4" cy="10" r="1.5" fill="#002542" />
                    <circle cx="12" cy="10" r="1.5" fill="#002542" />
                  </g>
                </g>

                {/* WAYPOINT 03: TEST (65%) */}
                <g transform="translate(305, 52)">
                  <circle r="7" fill="#ffffff" stroke="#002542" strokeWidth="2.5" />
                  <circle r="2.5" fill="#002542" />
                  <text x="0" y="-12" textAnchor="middle" fill="#476179" fontSize="10" fontWeight="700">TEST (65%)</text>
                </g>

                {/* WAYPOINT 04: DL ISSUED (DESTINATION 100%) */}
                <g transform="translate(385, 68)">
                  <circle r="10" fill="#ffffff" stroke="#16805a" strokeWidth="3" />
                  <circle r="4" fill="#16805a" />
                  <text x="0" y="24" textAnchor="middle" fill="#16805a" fontSize="10" fontWeight="800">DL ISSUED</text>
                </g>
              </svg>
            </div>

            {/* Bottom Live Micro-Legend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid #f1f5f9', fontSize: '11px', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7' }} />
                Current: <strong>Test Scheduled at Burari Track (18 Sep)</strong>
              </span>
              <span style={{ fontWeight: 600, color: '#002542' }}>
                Progress: <strong>55%</strong>
              </span>
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
                color: '#476179',
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
                fontSize: '28px',
                fontWeight: 700,
                color: '#002542',
                margin: 0,
                letterSpacing: '-0.5px'
              }}
            >
              {"Tell us where you are, and we'll take you from there."}
            </h2>
          </div>

          {/* 3 Balanced Destination Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px'
            }}
          >
            
            {/* CARD 01: STARTING FRESH */}
            <div
              onClick={() => navigate('/journey?stage=ll')}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 37, 66, 0.03)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 37, 66, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 37, 66, 0.03)';
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#002542',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <Car size={22} />
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#476179',
                  marginBottom: '8px'
                }}
              >
                01 · STARTING FRESH
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#002542', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                {"I'm starting from scratch"}
              </h3>
              <p style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6, margin: '0 0 24px 0', flexGrow: 1 }}>
                {"I don't have a Learner Licence yet. Start your online Form 2 application with Aadhaar."}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#002542',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}
              >
                <span>Start with LL</span>
                <ArrowRight size={15} />
              </div>
            </div>

            {/* CARD 02: CONTINUE YOUR JOURNEY (ACTIVE) */}
            <div
              onClick={() => navigate('/journey?stage=dl')}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 37, 66, 0.04)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#002542';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 37, 66, 0.07)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 37, 66, 0.04)';
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#002542',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <FileText size={22} />
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#002542',
                  marginBottom: '8px'
                }}
              >
                02 · CONTINUE YOUR JOURNEY
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#002542', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                I have a Learner Licence
              </h3>
              <p style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6, margin: '0 0 24px 0', flexGrow: 1 }}>
                Continue towards your Driving Licence and schedule your practical driving test.
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#002542',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}
              >
                <span>Continue to DL</span>
                <ArrowRight size={15} />
              </div>
            </div>

            {/* CARD 03: EXISTING LICENCE */}
            <div
              onClick={() => navigate('/licence-services')}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 37, 66, 0.03)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 37, 66, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 37, 66, 0.03)';
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#002542',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <Shield size={22} />
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#476179',
                  marginBottom: '8px'
                }}
              >
                03 · EXISTING LICENCE
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#002542', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                I already have a Driving Licence
              </h3>
              <p style={{ fontSize: '14px', color: '#476179', lineHeight: 1.6, margin: '0 0 24px 0', flexGrow: 1 }}>
                Manage renewals, duplicate Smart Cards, address updates and citizen services.
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#002542',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}
              >
                <span>View licence services</span>
                <ArrowRight size={15} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
