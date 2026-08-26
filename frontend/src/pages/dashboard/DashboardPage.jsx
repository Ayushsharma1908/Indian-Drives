import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, ArrowRight, Car, FileText, Shield, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLLCompleted, setIsLLCompleted] = useState(true); // Default to true after LL completion

  useEffect(() => {
    const paramCompleted = searchParams.get('ll_completed');
    const localCompleted = localStorage.getItem('ll_completed');
    if (paramCompleted === 'true' || localCompleted === 'true' || paramCompleted !== 'false') {
      setIsLLCompleted(true);
    }
  }, [searchParams]);

  return (
    <div className="page-dashboard-container" style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 72px)', padding: '32px 0 60px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1184px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* 1. UPCOMING FOR YOU BANNER (DYNAMICALLY UPDATED ON LL COMPLETION) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isLLCompleted ? (
            /* DL WAITING NOTIFICATION BANNER */
            <div style={{
              background: '#ffffff',
              border: '2px solid #e88a2d',
              borderRadius: '18px',
              padding: '18px 26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              width: '100%',
              maxWidth: '860px',
              boxShadow: '0 4px 20px rgba(232, 138, 45, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  position: 'relative',
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e88a2d',
                  flexShrink: 0
                }}>
                  <Car size={22} />
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#e88a2d',
                    boxShadow: '0 0 0 2px #ffffff'
                  }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e88a2d' }} />
                    UPCOMING FOR YOU · DL APPLICATION WAITING
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>
                    Learner Licence Approved (LL/24/09/8821) — Driving Licence (DL) is waiting!
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                    Your LL is active. Click to open your DL Dashboard and track your 30-day unlock progress.
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/journey?stage=dl')}
                style={{
                  background: '#002542',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 37, 66, 0.2)',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
              >
                Go to DL Dashboard <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* DEFAULT APPOINTMENT BANNER */
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              width: '100%',
              maxWidth: '840px',
              boxShadow: '0 2px 10px rgba(0, 37, 66, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  position: 'relative',
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#173b57'
                }}>
                  <Calendar size={20} />
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#e88a2d'
                  }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#476179', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    UPCOMING FOR YOU
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#173b57' }}>
                    RTO Visit: Driving Licence Test <span style={{ color: '#94a3b8', margin: '0 6px' }}>·</span> 18 September 2026, 10:30 AM
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/appointments')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#173b57',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                View appointment <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>

        {/* 2. HERO SECTION ("Namaste, Yanshi 👋") */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 480px)', gap: '40px', alignItems: 'center', padding: '20px 0' }}>
          
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ fontSize: '54px', fontWeight: 700, color: '#173b57', margin: 0, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
              Namaste, Yanshi 👋
            </h1>
            <div style={{ fontSize: '22px', color: '#173b57', fontWeight: 600, lineHeight: 1.4 }}>
              Welcome to Indian Drives.
              <div style={{ color: '#476179', fontWeight: 400, marginTop: '4px' }}>
                We'll guide you every step of the way.
              </div>
            </div>
          </div>

          {/* Right S-Curve Roadmap SVG Graphic */}
          <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="440" height="160" viewBox="0 0 440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="roadmapGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e88a2d" />
                  <stop offset="45%" stopColor="#173b57" />
                  <stop offset="100%" stopColor="#173b57" />
                </linearGradient>
              </defs>
              {/* Outer Soft Thick Track */}
              <path
                d="M 30 130 C 120 130, 140 35, 210 35 C 270 35, 300 85, 390 85"
                stroke="#e2e8f0"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Single Continuous Gradient Curve (Orange to Navy Blue) */}
              <path
                d="M 30 130 C 120 130, 140 35, 210 35 C 270 35, 300 85, 390 85"
                stroke="url(#roadmapGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Node 1: START */}
              <g transform="translate(30, 130)">
                <circle r="10" fill="#f7f9fb" stroke="#e88a2d" strokeWidth="4" />
                <circle r="4" fill="#e88a2d" />
                <text x="0" y="24" textAnchor="middle" fill="#e88a2d" fontSize="11" fontWeight="800" letterSpacing="0.5">START</text>
              </g>

              {/* Node 2: LL */}
              <g transform="translate(210, 35)">
                <circle r="6" fill="#173b57" />
                <text x="0" y="-14" textAnchor="middle" fill="#476179" fontSize="11" fontWeight="700">LL</text>
              </g>

              {/* Node 3: TEST */}
              <g transform="translate(305, 48)">
                <circle r="6" fill="#173b57" />
                <text x="0" y="-14" textAnchor="middle" fill="#476179" fontSize="11" fontWeight="700">TEST</text>
              </g>

              {/* Node 4: DL */}
              <g transform="translate(390, 85)">
                <circle r="10" fill="#f7f9fb" stroke="#173b57" strokeWidth="2" strokeDasharray="3 3" />
                <circle r="4" fill="#173b57" />
                <text x="0" y="24" textAnchor="middle" fill="#173b57" fontSize="11" fontWeight="800">DL</text>
              </g>
            </svg>
          </div>

        </div>

        {/* SECTION DIVIDER */}
        <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }} />

        {/* 3. WHERE ARE YOU IN YOUR DRIVING JOURNEY SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ color: '#e88a2d', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              WHERE ARE YOU IN YOUR DRIVING JOURNEY?
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#173b57', margin: 0, letterSpacing: '-0.8px' }}>
              Tell us where you are, and we'll take you from there.
            </h2>
          </div>

          {/* 3 Clean Editorial Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            
            {/* Column 01: Starting Fresh */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#476179' }}>
                <Car size={16} />
                <span style={{ fontSize: '13px', fontWeight: 700 }}>01</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#173b57', margin: 0 }}>
                Starting Fresh
              </h3>

              <p style={{ fontSize: '15px', color: '#476179', margin: 0, lineHeight: 1.5 }}>
                I don't have a Learner Licence yet.
              </p>

              <button
                onClick={() => navigate('/journey?stage=ll')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#173b57',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: 0,
                  marginTop: '8px',
                  width: 'fit-content'
                }}
              >
                Start with LL <ArrowRight size={16} />
              </button>
            </div>

            {/* Column 02: Continue Your Journey */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#476179' }}>
                <FileText size={16} />
                <span style={{ fontSize: '13px', fontWeight: 700 }}>02</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#173b57', margin: 0 }}>
                Continue Your Journey
              </h3>

              <p style={{ fontSize: '15px', color: '#476179', margin: 0, lineHeight: 1.5 }}>
                Continue towards your Driving Licence.
              </p>

              <button
                onClick={() => navigate('/journey?stage=dl')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#173b57',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: 0,
                  marginTop: '8px',
                  width: 'fit-content'
                }}
              >
                Continue to DL <ArrowRight size={16} />
              </button>
            </div>

            {/* Column 03: Existing Licence */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#476179' }}>
                <Shield size={16} />
                <span style={{ fontSize: '13px', fontWeight: 700 }}>03</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#173b57', margin: 0 }}>
                Existing Licence
              </h3>

              <p style={{ fontSize: '15px', color: '#476179', margin: 0, lineHeight: 1.5 }}>
                Manage services related to your existing licence.
              </p>

              <button
                onClick={() => navigate('/licence-services')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#173b57',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: 0,
                  marginTop: '8px',
                  width: 'fit-content'
                }}
              >
                View licence services <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
