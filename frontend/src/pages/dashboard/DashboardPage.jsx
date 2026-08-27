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
          1. SUBTLE MINIMAL ROAD BACKGROUND DESIGN (NON-INTRUSIVE)
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
        {/* Subtle Minimal Road SVG Line Art */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ opacity: 0.45 }}
        >
          {/* Gentle Gray Sweeping Road */}
          <path
            d="M -80 260 C 320 260, 480 90, 840 90 C 1180 90, 1320 400, 1560 400"
            stroke="#e2e8f0"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Subtle Dashed Centerline */}
          <path
            d="M -80 260 C 320 260, 480 90, 840 90 C 1180 90, 1320 400, 1560 400"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="10 12"
            strokeLinecap="round"
          />

          {/* Lower Gentle Connecting Road */}
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
            3. CLEAN HERO SECTION WITH RESTRAINED S-CURVE ROADMAP
        ───────────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(360px, 460px)',
            gap: '36px',
            alignItems: 'center',
            padding: '12px 0 24px 0'
          }}
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Minimal Tricolor Top Accent Line */}
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

          {/* Right S-Curve Roadmap Graphic (Clean, Restrained) */}
          <div
            style={{
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0, 37, 66, 0.03)'
            }}
          >
            <svg
              width="410"
              height="130"
              viewBox="0 0 410 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="restrainedRoadGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e88a2d" />
                  <stop offset="50%" stopColor="#002542" />
                  <stop offset="100%" stopColor="#16805a" />
                </linearGradient>
              </defs>

              {/* Road Track */}
              <path
                d="M 25 105 C 110 105, 125 25, 195 25 C 255 25, 280 65, 365 65"
                stroke="#f1f5f9"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 25 105 C 110 105, 125 25, 195 25 C 255 25, 280 65, 365 65"
                stroke="url(#restrainedRoadGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Node 1: START (Minimal Saffron) */}
              <g transform="translate(25, 105)">
                <circle r="7" fill="#ffffff" stroke="#e88a2d" strokeWidth="2.5" />
                <circle r="3" fill="#e88a2d" />
                <text x="0" y="20" textAnchor="middle" fill="#e88a2d" fontSize="10" fontWeight="700" letterSpacing="0.4">START</text>
              </g>

              {/* Node 2: LL (35%) (Road Navy) */}
              <g transform="translate(195, 25)">
                <circle r="6" fill="#ffffff" stroke="#002542" strokeWidth="2" />
                <circle r="2.5" fill="#002542" />
                <text x="0" y="-10" textAnchor="middle" fill="#476179" fontSize="10" fontWeight="600">LL (35%)</text>
              </g>

              {/* Node 3: TEST (65%) */}
              <g transform="translate(285, 42)">
                <circle r="5" fill="#94a3b8" />
                <text x="0" y="-10" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">TEST (65%)</text>
              </g>

              {/* Node 4: DL ISSUED (Minimal Green) */}
              <g transform="translate(365, 65)">
                <circle r="7" fill="#ffffff" stroke="#16805a" strokeWidth="2.5" />
                <circle r="3" fill="#16805a" />
                <text x="0" y="20" textAnchor="middle" fill="#16805a" fontSize="10" fontWeight="700">DL ISSUED</text>
              </g>
            </svg>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }} />

        {/* ─────────────────────────────────────────────────────────────
            4. CLEAN, BALANCED 3 DESTINATION CARDS (LESS HIGHLIGHTED)
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

          {/* 3 Balanced, Clean Destination Cards */}
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
