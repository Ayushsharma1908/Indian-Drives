import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Laptop, Calendar,
  CreditCard, Truck, Award, HelpCircle, Lock, User, FileText, Search, Phone,
  Check, X, Zap, ChevronRight, MapPin, Eye, Info
} from 'lucide-react';
import { AuthContext } from '../../main';

export function LandingPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'aadhaar'
  const [phoneNum, setPhoneNum] = useState('');
  const [aadhaarNum, setAadhaarNum] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleStartJourney = () => {
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
      auth.login({ email: 'rahul.sharma@example.in' }).catch(() => {});
    }
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    handleLoginSubmit();
  };

  return (
    <div className="landing-page-root" style={{ background: '#f8fafc', color: '#173b57', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      
      {/* 1. TOP PUBLIC NAVIGATION BAR */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 48px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0, 37, 66, 0.03)'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/indian-drives-logo.png" alt="Indian Drives Logo" className="brand-logo-img" style={{ height: '42px', width: 'auto' }} />
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '14px', fontWeight: 700 }}>
          <a href="#how-it-works" style={{ color: '#476179', textDecoration: 'none' }}>How It Works</a>
          <a href="#features" style={{ color: '#476179', textDecoration: 'none' }}>Key Features</a>
          <a href="#paths" style={{ color: '#476179', textDecoration: 'none' }}>Citizen Journeys</a>
          <a href="#ask-ai" onClick={(e) => { e.preventDefault(); navigate('/ask'); }} style={{ color: '#e88a2d', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ✦ Ask DriveSeva AI
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleStartJourney}
            style={{
              background: '#0a2540',
              color: '#ffffff',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(10, 37, 64, 0.15)'
            }}
          >
            Start Your Journey <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        padding: '80px 48px 60px 48px',
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center'
      }}>
        {/* Left Column Text */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#eef6ff',
            border: '1px solid #bae6fd',
            color: '#0369a1',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 800,
            marginBottom: '20px'
          }}>
            <Sparkles size={14} color="#f97316" /> RE-IMAGINING CITIZEN DRIVING LICENCE SERVICES
          </div>

          <h1 style={{
            fontSize: '52px',
            fontWeight: 900,
            color: '#0a2540',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            margin: '0 0 20px 0'
          }}>
            Driving Licence Services, <span style={{ color: '#e88a2d' }}>Simplified & Misguidance-Free.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#476179',
            lineHeight: 1.6,
            margin: '0 0 32px 0',
            maxWidth: '540px'
          }}>
            Experience India’s smartest driving licence portal. No long queues, no middlemen, and zero misguidance. Clear step-by-step guidance for Learner Licence, Practical Tests, and Smartcard Maintenance.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <button
              onClick={handleStartJourney}
              style={{
                background: '#0a2540',
                color: '#ffffff',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 16px rgba(10, 37, 64, 0.2)'
              }}
            >
              Start Your Journey <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#16a34a" /> 100% Aadhaar Verified
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Laptop size={16} color="#0369a1" /> Remote Proctored Exam
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} color="#e88a2d" /> Live Smartcard Tracking
            </span>
          </div>
        </div>

        {/* Right Column Hero Mockup Graphic */}
        <div style={{ position: 'relative' }}>
          
          {/* Card Mockup Showcase */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0, 37, 66, 0.08)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0a2540' }}>
                LIVE PORTAL PREVIEW
              </span>
            </div>

            {/* Dashboard Speedometer Track Preview */}
            <div style={{ background: '#0a2540', borderRadius: '16px', padding: '24px', color: '#ffffff', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '8px' }}>
                SPEEDOMETER ROADMAP TRACKER
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Learner Licence Active → DL Exam Ready
              </div>

              {/* Progress Line */}
              <div style={{ background: '#1e3a8a', height: '6px', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#f97316', borderRadius: '3px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', fontWeight: 700 }}>
                <span style={{ color: '#10b981' }}>✓ LL Issued</span>
                <span style={{ color: '#f97316' }}>⏱ Test Scheduled</span>
                <span style={{ color: '#94a3b8' }}>Smartcard Dispatch</span>
              </div>
            </div>

            {/* Quick Cards Stack */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            bottom: '-20px',
            left: '-20px',
            background: 'linear-gradient(135deg, rgba(232, 138, 45, 0.15) 0%, rgba(3, 105, 161, 0.15) 100%)',
            borderRadius: '32px',
            zIndex: 1,
            filter: 'blur(20px)'
          }} />

        </div>
      </section>

      {/* 3. "HOW IT MANAGES USER FLOW EFFICIENTLY (ZERO MISGUIDANCE)" SECTION */}
      <section id="how-it-works" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase' }}>
              TRANSPARENT & GUIDED CITIZEN WORKFLOW
            </span>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0a2540', margin: '10px 0 16px 0', letterSpacing: '-0.8px' }}>
              Never Get Misguided Again. One Portal, 3 Streamlined Paths.
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
              Unlike legacy portals with confusing menus, DriveSeva dynamically detects where you are in your driving journey and shows only what you need to process next.
            </p>
          </div>

          {/* 3 Citizen Paths Cards */}
          <div id="paths" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            
            {/* Path 1: Learner Licence */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
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

              <button
                onClick={handleDemoLogin}
                style={{
                  marginTop: '32px',
                  background: '#ffffff',
                  color: '#0a2540',
                  border: '1px solid #cbd5e1',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                Apply for LL <ArrowRight size={16} />
              </button>
            </div>

            {/* Path 2: Driving Licence */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #bae6fd',
              boxShadow: '0 4px 20px rgba(3, 105, 161, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
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

              <button
                onClick={handleDemoLogin}
                style={{
                  marginTop: '32px',
                  background: '#0a2540',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                Book Practical Test <ArrowRight size={16} />
              </button>
            </div>

            {/* Path 3: Licence Maintenance */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
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

              <button
                onClick={handleDemoLogin}
                style={{
                  marginTop: '32px',
                  background: '#ffffff',
                  color: '#0a2540',
                  border: '1px solid #cbd5e1',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                Manage Licence <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMPREHENSIVE FEATURES GRID SECTION */}
      <section id="features" style={{ padding: '80px 48px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px auto' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#e88a2d', letterSpacing: '1px', textTransform: 'uppercase' }}>
            ENGINEERED FOR CITIZENS
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0a2540', margin: '10px 0 16px 0', letterSpacing: '-0.8px' }}>
            Everything You Need to Manage Your Driving Licence
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Designed with state-of-the-art UI, transparent fee breakdowns, and real-time status tracking.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          
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
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
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
      <section style={{ background: '#0a2540', padding: '64px 48px', color: '#ffffff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 16px 0', letterSpacing: '-0.8px' }}>
            Ready to Experience Misguidance-Free Driving Licence Services?
          </h2>
          <p style={{ fontSize: '17px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 32px 0' }}>
            Join thousands of citizens managing their driving licences effortlessly on DriveSeva.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={handleStartJourney}
              style={{
                background: '#f97316',
                color: '#ffffff',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)'
              }}
            >
              Start Your Journey <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. PUBLIC FOOTER */}
      <footer style={{ background: '#071829', color: '#94a3b8', padding: '40px 48px', fontSize: '13px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <strong style={{ color: '#ffffff' }}>Indian Drives (DriveSeva)</strong> — Official Citizen Driving Licence Portal Concept.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/help')}>Help & Support</span>
            <span style={{ cursor: 'pointer' }} onClick={handleStartJourney}>Start Your Journey</span>
          </div>
        </div>
      </footer>

      {/* 7. INTERACTIVE LOGIN / SIGN IN MODAL */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(7, 24, 41, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '36px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
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
              ⚡ Instant Demo Citizen Login (Rahul Sharma)
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
