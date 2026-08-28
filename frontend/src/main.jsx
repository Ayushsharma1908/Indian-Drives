import React, { createContext, useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, NavLink, Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getStoredUserProfile } from "./data/userProfileData";
import {
  Bell,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Gauge,
  Languages,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  User,
  WalletCards,
  Menu,
  X
} from "lucide-react";
import { api } from "./services/api";
import { translations } from "./data/translations";
import { applyDOMTranslation } from "./services/autoTranslator";
import "./styles.css";

export const AuthContext = createContext(null);
export const LanguageContext = createContext(null);
export const JourneyContext = createContext(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    const fallbackTr = (key, defaultVal) => {
      if (!key) return defaultVal || '';
      const val = key.split(".").reduce((v, p) => v?.[p], translations.en);
      if (val !== undefined && val !== null && val !== '') return val;
      return defaultVal !== undefined ? defaultVal : '';
    };
    return { language: 'en', setLanguage: () => {}, tr: fallbackTr, t: fallbackTr };
  }
  return context;
}

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
  { code: "as", label: "অসমীয়া (Assamese)" },
  { code: "ur", label: "اردو (Urdu)" },
  { code: "sa", label: "संस्कृतम् (Sanskrit)" },
  { code: "mai", label: "मैथिली (Maithili)" },
  { code: "sat", label: "संथाली (Santali)" },
  { code: "ks", label: "کٲشُر (Kashmiri)" },
  { code: "ne", label: "नेपाली (Nepali)" },
  { code: "kok", label: "कोंकणी (Konkani)" },
  { code: "sd", label: "سنڌي (Sindhi)" },
  { code: "doi", label: "डोगरी (Dogri)" },
  { code: "brx", label: "बड़ो (Bodo)" },
  { code: "mni", label: "মৈতৈলোন্ (Manipuri)" }
];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.24, ease: "easeOut" }
};

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("indian-drives-language") || "en");
  const copy = translations[language] || translations.en;
  const tr = (key, defaultVal) => {
    if (!key) return defaultVal || '';
    let val = key.split(".").reduce((value, part) => value?.[part], copy);
    if (val !== undefined && val !== null && val !== '') return val;
    val = key.split(".").reduce((value, part) => value?.[part], translations.en);
    if (val !== undefined && val !== null && val !== '') return val;
    return defaultVal !== undefined ? defaultVal : '';
  };
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [journey, setJourney] = useState(null);
  const [journeyLoading, setJourneyLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("indian-drives-language", language);
    document.documentElement.lang = language;

    // Apply immediate translation across entire DOM
    applyDOMTranslation(document.body, language);

    // Watch for React re-renders and page navigation to translate newly mounted elements
    const observer = new MutationObserver(() => {
      applyDOMTranslation(document.body, language);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    if (!localStorage.getItem("indian-drives-token") && !localStorage.getItem("indian-drives-authenticated")) {
      setAuthLoading(false);
      return;
    }
    api.me()
      .then(setUser)
      .catch(() => {
        if (localStorage.getItem("indian-drives-authenticated") === "true") {
          const profile = getStoredUserProfile();
          setUser({ name: profile.fullName, email: profile.email, avatar: profile.avatar });
        } else {
          localStorage.removeItem("indian-drives-token");
        }
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const refreshJourney = () => api.journey().then(setJourney).finally(() => setJourneyLoading(false));

  useEffect(() => {
    if (user) refreshJourney();
  }, [user]);

  const auth = {
    user,
    authLoading,
    login: async (payload) => {
      try {
        const data = await api.login(payload);
        localStorage.setItem("indian-drives-token", data.token);
        localStorage.setItem("indian-drives-authenticated", "true");
        setUser(data.user);
        return data.user;
      } catch (e) {
        localStorage.setItem("indian-drives-token", "demo-token-" + Date.now());
        localStorage.setItem("indian-drives-authenticated", "true");
        const profile = getStoredUserProfile();
        const mockUser = { name: profile.fullName, email: profile.email, avatar: profile.avatar };
        setUser(mockUser);
        return mockUser;
      }
    },
    logout: async () => {
      try {
        await api.logout();
      } catch (e) { }
      localStorage.removeItem("indian-drives-token");
      setUser(null);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr, t: tr }}>
      <AuthContext.Provider value={auth}>
        <JourneyContext.Provider value={{ journey, journeyLoading, refreshJourney }}>
          <Router>
            <AnimatedRoutes />
          </Router>
        </JourneyContext.Provider>
      </AuthContext.Provider>
    </LanguageContext.Provider>
  );
}

import { centralDataStore } from "./data/centralDataStore";
import { ScreenSwitcher } from "./components/layout/ScreenSwitcher";
import { LanguageSelector } from "./components/layout/LanguageSelector";
import { DashboardPage } from "./pages/dashboard";
import { DocumentsCenterPage, GovernmentServicesPage } from "./pages/services";
import {
  AppointmentsPage,
  HelpCenterPage,
  NotificationsPage,
  PaymentsPage,
  ProfilePage,
  SettingsPage
} from "./pages/user";
import { AskIndianDrivesPage } from "./pages/ask-ai";

import {
  LLApplicationIntroPage,
  LLVehicleSelectionPage,
  LLDocumentRequirementsPage,
  LLApplicantDetailsPage,
  LLAddressDetailsPage,
  LLApplicationReviewPage,
  LLFeePaymentPage,
  LLAssessmentCockpitPage,
  LLAssessmentLiveExamPage,
  LLAssessmentResultPage,
  LLVerifiedPage
} from "./pages/ll";

import {
  DLIntroPage,
  DLLearnerFoundPage,
  DLStartIntroPage,
  DLConfirmAddressPage,
  DLVerifiedDocumentsPage,
  DLPaymentCheckoutPage,
  DLTestCenterSelectionPage,
  DLTestSlotBookingPage,
  DLAppointmentFixedPage,
  DLDashboardPage,
  DrivingTestResultPage,
  LicenceDispatchPage
} from "./pages/dl";

import {
  LicenceServicesHubPage,
  ManageDrivingLicencePage,
  LicenceFoundPage,
  UpdateLicenceDetailsPage,
  RenewDrivingLicencePage,
  DuplicateDrivingLicencePage,
  LicenceServicePaymentCheckoutPage,
  LicenceServicePaymentSuccessPage,
  MyJourneyTimelinePage
} from "./pages/licence-services";
import { LandingPage } from "./pages/landing";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedApp />} />
      </Routes>
    </AnimatePresence>
  );
}


function ProtectedApp() {
  const { user, authLoading } = useContext(AuthContext);
  const isAuthenticated = localStorage.getItem('indian-drives-authenticated') === 'true' || localStorage.getItem('indian-drives-token') || user;

  if (authLoading) return <FullPageLoading />;

  return (
    <Routes>
      {/* Public Landing & Login */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Protected Shell Pages - Must login first via Start Your Journey */}
      <Route path="/*" element={
        isAuthenticated ? (
          <Shell>
            <Routes>
              {/* Core Hub */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/documents" element={<DocumentsCenterPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/services" element={<GovernmentServicesPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/ask" element={<AskIndianDrivesPage />} />
              <Route path="/ask-ai" element={<AskIndianDrivesPage />} />

              {/* Learner Licence Flow */}
              <Route path="/ll/intro" element={<LLApplicationIntroPage />} />
              <Route path="/ll/applicant" element={<LLApplicantDetailsPage />} />
              <Route path="/ll/address" element={<LLAddressDetailsPage />} />
              <Route path="/ll/vehicle" element={<LLVehicleSelectionPage />} />
              <Route path="/ll/documents" element={<LLDocumentRequirementsPage />} />
              <Route path="/ll/review" element={<LLApplicationReviewPage />} />
              <Route path="/ll/payment" element={<LLFeePaymentPage />} />
              <Route path="/ll/dashboard" element={<MyJourneyTimelinePage initialStage="ll" />} />
              <Route path="/ll/verified" element={<LLVerifiedPage />} />
              <Route path="/ll/issued" element={<LLVerifiedPage />} />
              <Route path="/ll/assessment-cockpit" element={<LLAssessmentCockpitPage />} />
              <Route path="/ll/assessment-exam" element={<LLAssessmentLiveExamPage />} />
              <Route path="/ll/assessment-result" element={<LLAssessmentResultPage />} />

              {/* Driving Licence Flow */}
              <Route path="/dl/verify" element={<DLIntroPage />} />
              <Route path="/dl/intro" element={<DLIntroPage />} />
              <Route path="/dl/ll-found" element={<DLLearnerFoundPage />} />
              <Route path="/dl/start" element={<DLStartIntroPage />} />
              <Route path="/dl/confirm-intro" element={<DLStartIntroPage />} />
              <Route path="/dl/address" element={<DLConfirmAddressPage />} />
              <Route path="/dl/confirm-address" element={<DLConfirmAddressPage />} />
              <Route path="/dl/documents" element={<DLVerifiedDocumentsPage />} />
              <Route path="/dl/doc-verification" element={<DLVerifiedDocumentsPage />} />
              <Route path="/dl/fee-summary" element={<DLPaymentCheckoutPage />} />
              <Route path="/dl/payment" element={<DLPaymentCheckoutPage />} />
              <Route path="/dl/test-center" element={<DLTestCenterSelectionPage />} />
              <Route path="/dl/test-slot" element={<DLTestSlotBookingPage />} />
              <Route path="/dl/appointment-fixed" element={<DLAppointmentFixedPage />} />
              <Route path="/dl/dashboard" element={<MyJourneyTimelinePage initialStage="dl" />} />
              <Route path="/dl/test-result" element={<DrivingTestResultPage />} />
              <Route path="/dl/dispatch" element={<LicenceDispatchPage />} />

              {/* Licence Services & Maintenance */}
              <Route path="/licence-services" element={<LicenceServicesHubPage />} />
              <Route path="/manage-licence" element={<ManageDrivingLicencePage />} />
              <Route path="/licence-verified" element={<LicenceFoundPage />} />
              <Route path="/update-licence" element={<UpdateLicenceDetailsPage />} />
              <Route path="/update-submitted" element={<UpdateLicenceDetailsPage />} />
              <Route path="/renew-licence" element={<RenewDrivingLicencePage />} />
              <Route path="/renewal-submitted" element={<RenewDrivingLicencePage />} />
              <Route path="/duplicate-licence" element={<DuplicateDrivingLicencePage />} />
              <Route path="/licence-services/payment" element={<LicenceServicePaymentCheckoutPage />} />
              <Route path="/licence-services/payment-success" element={<LicenceServicePaymentSuccessPage />} />
              <Route path="/journey" element={<MyJourneyTimelinePage />} />
              <Route path="/review-application-form" element={<LLApplicationReviewPage />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Shell>
        ) : (
          <Navigate to="/" replace />
        )
      } />
    </Routes>
  );
}

function Shell({ children }) {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState(() => centralDataStore.getUnreadNotificationCount());

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleUpdate = () => setUnreadCount(centralDataStore.getUnreadNotificationCount());
    window.addEventListener('notifications-updated', handleUpdate);
    window.addEventListener('indian-drives-state-change', handleUpdate);
    return () => {
      window.removeEventListener('notifications-updated', handleUpdate);
      window.removeEventListener('indian-drives-state-change', handleUpdate);
    };
  }, []);

  const currentUser = user || centralDataStore.getUserProfile();

  return (
    <div className="app-shell">
      <header className="topbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/dashboard" className="brand" aria-label="Indian Drives Home">
          <img src="/indian-drives-logo.png" alt="Indian Drives Logo" className="brand-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
        </Link>

        <nav className="navlinks desktop-only-nav" aria-label="Primary">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            {t('nav.dashboard')}
          </NavLink>
          <NavLink to="/journey" className={({ isActive }) => isActive ? "active" : ""}>
            {t('nav.journey')}
          </NavLink>
          <NavLink to="/help" className={({ isActive }) => isActive ? "active" : ""}>
            {t('nav.help')}
          </NavLink>
          <NavLink
            to="/ask"
            className={({ isActive }) => isActive ? "active landing-ai-link" : "landing-ai-link"}
            style={({ isActive }) => ({
              color: '#e88a2d',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              opacity: isActive ? 1 : 0.95
            })}
          >
            <span style={{ color: '#e88a2d', fontSize: '14px' }}>✦</span> {t('nav.ask')}
          </NavLink>
        </nav>

        <div className="top-actions">
          <LanguageSelector currentLanguage={language} onSelectLanguage={setLanguage} />
          <Link className="icon-button" to="/notifications" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 0 0 2px #ffffff'
                }}
              />
            )}
          </Link>
          <Link className="profile-pill" to="/profile" aria-label="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-pale-indigo)', color: 'var(--color-primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
            {currentUser?.avatar || 'YC'}
          </Link>
          <button
            className="landing-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Slide Drawer */}
        <div className={`landing-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/dashboard" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <LayoutDashboard size={18} /> {t('nav.dashboard')}
          </NavLink>
          <NavLink to="/journey" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <Car size={18} /> {t('nav.journey')}
          </NavLink>
          <NavLink to="/documents" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <FileCheck2 size={18} /> {t('nav.documents') || 'Document Vault'}
          </NavLink>
          <NavLink to="/appointments" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <CalendarDays size={18} /> {t('nav.appointments') || 'Appointments'}
          </NavLink>
          <NavLink to="/payments" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <CreditCard size={18} /> {t('nav.payments') || 'Payments & Receipts'}
          </NavLink>
          <NavLink to="/services" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <ShieldCheck size={18} /> {t('nav.services') || 'Licence Services'}
          </NavLink>
          <NavLink to="/help" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <CircleHelp size={18} /> {t('nav.help')}
          </NavLink>
          <NavLink to="/ask" className="landing-ai-link" onClick={() => setMobileMenuOpen(false)}>
            <span>✦</span> {t('nav.ask')}
          </NavLink>
        </div>
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="app-footer" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#476179' }}>
      <div>
        Indian Drives — A citizen experience concept for driving licence services.
      </div>
    </footer>
  );
}

function Landing() {
  const { user } = useContext(AuthContext);
  const { tr } = useContext(LanguageContext);
  if (user) return <Navigate to="/dashboard" replace />;
  return (
    <motion.div className="landing stitch-pattern" {...fadeUp}>
      <div className="landing-nav">
        <div className="brand"><img src="/indian-drives-logo.png" alt="Indian Drives Logo" className="brand-logo-img" /></div>
        <Link className="button secondary" to="/login">{tr("common.login")}</Link>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{tr("landing.eyebrow")}</p>
          <h1>Indian Drives</h1>
          <p>{tr("landing.subtitle")}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/login">{tr("landing.cta")} <ChevronRight size={18} /></Link>
            <a className="button secondary" href="https://parivahan.gov.in/" target="_blank" rel="noreferrer">Parivahan</a>
          </div>
        </div>
        <motion.div className="hero-panel" whileHover={{ y: -4 }}>
          <JourneyCockpit progress={62} title={tr("journey.title")} status={tr("journey.current")} compact />
          <div className="hero-card-grid">
            <MiniStatus icon={FileCheck2} label={tr("documents.title")} value={tr("status.verified")} />
            <MiniStatus icon={WalletCards} label={tr("payments.title")} value={tr("status.success")} />
            <MiniStatus icon={CalendarDays} label={tr("appointments.title")} value={tr("common.next")} />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

function Login() {
  const { login } = useContext(AuthContext);
  const { tr } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "yanshi.chauhan@example.com", password: "demo123" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div className="login-page stitch-pattern" {...fadeUp}>
      <form className="auth-card" onSubmit={submit}>
        <img src="/indian-drives-logo.png" alt="" />
        <h1>{tr("login.title")}</h1>
        <p>{tr("login.subtitle")}</p>
        <label>{tr("forms.email")}<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label>{tr("forms.password")}<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
        {error && <div className="alert error">{error}</div>}
        <button className="button primary full" disabled={loading}>{loading ? tr("loading.signingIn") : tr("common.login")}</button>
        <Link to="/">{tr("common.back")}</Link>
      </form>
    </motion.div>
  );
}

function Dashboard() {
  const { tr } = useContext(LanguageContext);
  const { journey } = useContext(JourneyContext);
  const next = currentStep(journey);
  return (
    <Page title={tr("dashboard.title")} subtitle={tr("dashboard.subtitle")}>
      <section className="bento-grid">
        <motion.div className="panel journey-card" whileHover={{ y: -3 }}>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{tr("dashboard.current")}</p>
              <h2>{tr("journey.driving")}</h2>
              <p>{tr("dashboard.nextText")}</p>
            </div>
            <StatusBadge status={tr("status.inProgress")} />
          </div>
          <JourneyRoad />
          <div className="next-step-panel">
            <div>
              <h3>{tr("dashboard.nextStep")}: {next?.label || tr("appointments.title")}</h3>
              <p>{tr("dashboard.nextHint")}</p>
            </div>
            <Link className="button primary" to="/appointments">{tr("common.continue")} <ChevronRight size={18} /></Link>
          </div>
        </motion.div>
        <motion.aside className="panel services-panel" whileHover={{ y: -3 }}>
          <h3><ShieldCheck size={22} /> {tr("services.title")}</h3>
          <ServiceLinks />
        </motion.aside>
        <motion.aside className="assistant-panel" whileHover={{ y: -3 }}>
          <MessageCircle />
          <h3>{tr("nav.ask")}</h3>
          <p>{tr("ask.subtitle")}</p>
          <Link className="button inverse" to="/ask-ai">{tr("ask.start")}</Link>
        </motion.aside>
      </section>
      <section className="quick-actions">
        <QuickAction icon={ClipboardCheck} label={tr("application.continue")} to="/dl/application" />
        <QuickAction icon={FileCheck2} label={tr("documents.manage")} to="/documents" />
        <QuickAction icon={CreditCard} label={tr("payments.make")} to="/payments" />
        <QuickAction icon={Gauge} label={tr("common.status")} to="/journey" />
      </section>
    </Page>
  );
}

function JourneyPage() {
  const { tr } = useContext(LanguageContext);
  const { journey, refreshJourney } = useContext(JourneyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ llNumber: "JH26/LL/123456", dob: "2004-05-12" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function verify(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.verifyLL(form);
      await refreshJourney();
      navigate(data.nextRoute);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title={tr("journey.title")} subtitle={tr("journey.subtitle")}>
      <section className="cockpit-layout">
        <div className="panel cockpit-panel">
          <JourneyCockpit progress={journeyPercent(journey)} title={tr("journey.current")} status={currentStep(journey)?.label || tr("appointments.title")} />
        </div>
        <div className="panel">
          <h3>{tr("journey.verifyLL")}</h3>
          <form className="stack-form" onSubmit={verify}>
            <label>{tr("forms.llNumber")}<input value={form.llNumber} onChange={(event) => setForm({ ...form, llNumber: event.target.value })} required /></label>
            <label>{tr("forms.dob")}<input type="date" value={form.dob} onChange={(event) => setForm({ ...form, dob: event.target.value })} required /></label>
            {error && <div className="alert error">{error}</div>}
            <button className="button primary" disabled={loading}>{loading ? tr("loading.verifying") : tr("journey.verifyContinue")}</button>
          </form>
        </div>
      </section>
      <JourneyTimeline />
    </Page>
  );
}

function LLDashboard() {
  const { tr } = useContext(LanguageContext);
  return (
    <Page title={tr("ll.title")} subtitle={tr("ll.subtitle")}>
      <LicenceDashboard type="LL" progress={58} next="/ll/application" />
    </Page>
  );
}

function DLDashboard() {
  const { tr } = useContext(LanguageContext);
  const { journey } = useContext(JourneyContext);
  return (
    <Page title={tr("dl.title")} subtitle={tr("dl.subtitle")}>
      <LicenceDashboard type="DL" progress={journeyPercent(journey)} next="/appointments" />
    </Page>
  );
}

function LicenceDashboard({ type, progress, next }) {
  const { tr } = useContext(LanguageContext);
  return (
    <section className="cockpit-layout">
      <div className="panel cockpit-panel">
        <JourneyCockpit progress={progress} title={`${type} ${tr("journey.progress")}`} status={tr("journey.current")} />
      </div>
      <div className="panel step-card">
        <p className="eyebrow">{type}</p>
        <h2>{type === "LL" ? tr("ll.title") : tr("dl.title")}</h2>
        <p>{tr("journey.speedHint")}</p>
        <Link className="button primary" to={next}>{tr("common.continue")} <ChevronRight size={18} /></Link>
      </div>
    </section>
  );
}

function ApplicationForm({ type }) {
  const { tr } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { refreshJourney } = useContext(JourneyContext);
  const [form, setForm] = useState({ type, applicantName: "Yanshi Chauhan", vehicleClass: "LMV", rto: "Jamshedpur RTO" });
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    await api.createApplication(form);
    await refreshJourney();
    navigate(`/${type.toLowerCase()}/documents`);
  }

  return (
    <Page title={`${type} ${tr("application.title")}`} subtitle={tr("application.subtitle")}>
      <form className="panel form-console" onSubmit={submit}>
        <label>{tr("forms.name")}<input value={form.applicantName} onChange={(event) => setForm({ ...form, applicantName: event.target.value })} required /></label>
        <label>{tr("forms.vehicleClass")}<select value={form.vehicleClass} onChange={(event) => setForm({ ...form, vehicleClass: event.target.value })}><option>LMV</option><option>MCWG</option><option>HMV</option></select></label>
        <label>{tr("forms.rto")}<select value={form.rto} onChange={(event) => setForm({ ...form, rto: event.target.value })}><option>Jamshedpur RTO</option><option>Adityapur Transport Office</option></select></label>
        <div className="review-box">
          <CheckCircle2 />
          <span>{tr("application.review")}</span>
        </div>
        <button className="button primary" disabled={loading}>{loading ? tr("loading.submitting") : tr("application.submit")}</button>
      </form>
    </Page>
  );
}

function DocumentsPage() {
  const { tr } = useContext(LanguageContext);
  const [documents, setDocuments] = useAsync(api.documents, []);
  const [working, setWorking] = useState("");

  async function verify(id) {
    setWorking(id);
    const updated = await api.updateDocument(id, { status: "verified" });
    setDocuments((items) => items.map((item) => (item.id === id ? updated : item)));
    setWorking("");
  }

  return (
    <Page title={tr("documents.title")} subtitle={tr("documents.subtitle")}>
      <div className="console-grid">
        {documents.map((doc, index) => (
          <motion.div className="panel document-card" key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <FileCheck2 />
            <div>
              <h3>{doc.name}</h3>
              <p>{tr("documents.updated")}: {doc.updatedAt}</p>
            </div>
            <StatusBadge status={tr(`status.${doc.status}`)} />
            <button className="button secondary" onClick={() => verify(doc.id)} disabled={doc.status === "verified" || working === doc.id}>
              {working === doc.id ? tr("loading.processing") : tr("documents.verify")}
            </button>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

function LegacyPaymentsPage() {
  const { tr } = useContext(LanguageContext);
  const { refreshJourney } = useContext(JourneyContext);
  const [payments, setPayments] = useAsync(api.payments, []);
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    const payment = await api.createPayment({ amount: 450, purpose: "DL Application Fee" });
    setPayments((items) => [payment, ...items]);
    await refreshJourney();
    setLoading(false);
  }

  return (
    <Page title={tr("payments.title")} subtitle={tr("payments.subtitle")}>
      <section className="payment-layout">
        <div className="panel fee-card">
          <p className="eyebrow">{tr("payments.summary")}</p>
          <h2>Rs 450</h2>
          <p>{tr("payments.feeHint")}</p>
          <button className="button primary" onClick={pay} disabled={loading}>{loading ? tr("loading.payment") : tr("payments.pay")}</button>
        </div>
        <div className="panel table-panel">
          {payments.map((payment) => (
            <div className="table-row" key={payment.id}>
              <span>{payment.purpose}</span>
              <strong>Rs {payment.amount}</strong>
              <StatusBadge status={tr(`status.${payment.status}`)} />
              <small>{payment.transactionId}</small>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

function LegacyAppointmentsPage() {
  const { tr } = useContext(LanguageContext);
  const { refreshJourney } = useContext(JourneyContext);
  const [centres] = useAsync(api.testCentres, []);
  const [appointments, setAppointments] = useAsync(api.appointments, []);
  const [centreId, setCentreId] = useState("rto001");
  const [date, setDate] = useState("2026-08-28");
  const [vehicleClass, setVehicleClass] = useState("LMV");
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.slots(centreId, date).then(setSlots);
  }, [centreId, date, appointments.length]);

  const centre = centres.find((item) => item.id === centreId) || centres[0];

  async function book() {
    if (!selected) return;
    setLoading(true);
    const appointment = await api.createAppointment({ testCentreId: centreId, date, slot: selected, vehicleClass });
    setAppointments((items) => [appointment, ...items]);
    setSelected("");
    await refreshJourney();
    setLoading(false);
  }

  async function result(value) {
    if (!appointments[0]) return;
    const response = await api.testResult(appointments[0].id, value);
    setAppointments((items) => items.map((item) => (item.id === appointments[0].id ? response.appointment : item)));
    await refreshJourney();
  }

  return (
    <Page title={tr("appointments.title")} subtitle={tr("appointments.subtitle")}>
      <section className="booking-layout">
        <div className="panel map-panel">
          <div className="track-map">
            <div className="map-legend">
              <span><i /> {tr("appointments.available")}</span>
              <span><i className="booked" /> {tr("status.booked")}</span>
              <span><i className="chosen" /> {tr("appointments.selected")}</span>
            </div>
            <div className="bay-grid">
              {slots.map((slot, index) => (
                <button key={slot.id} type="button" disabled={slot.status !== "available"} onClick={() => setSelected(slot.time)} className={selected === slot.time ? "bay selected" : `bay ${slot.status}`}>
                  <strong>{slot.time}</strong>
                  <span>Bay {(index % 4) + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="centre-list">
            {centres.map((item) => (
              <button key={item.id} className={item.id === centreId ? "selected centre-item" : "centre-item"} onClick={() => setCentreId(item.id)}>
                <MapPin size={18} />
                <span><strong>{item.name}</strong><small>{item.address} · {item.distance}</small></span>
              </button>
            ))}
          </div>
        </div>
        <div className="panel selection-panel">
          <h3>{tr("appointments.details")}</h3>
          <label>{tr("forms.date")}<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <label>{tr("forms.vehicleClass")}<select value={vehicleClass} onChange={(event) => setVehicleClass(event.target.value)}><option>LMV</option><option>MCWG</option><option>HMV</option></select></label>
          <div className="selection-summary">
            <span>{tr("appointments.selected")}</span>
            <strong>{selected || tr("appointments.none")}</strong>
            <small>{centre?.name}</small>
          </div>
          <button className="button primary full" onClick={book} disabled={!selected || loading}>{loading ? tr("loading.booking") : tr("appointments.confirm")}</button>
          <div className="info-box">{tr("appointments.arrive")}</div>
        </div>
      </section>
      <section className="panel appointments-console">
        <h3>{tr("appointments.booked")}</h3>
        {appointments.length === 0 ? <p>{tr("appointments.empty")}</p> : appointments.map((item) => (
          <div className="appointment-row" key={item.id}>
            <CalendarDays />
            <span>{item.date} · {item.time} · {item.vehicleClass}</span>
            <StatusBadge status={tr(`status.${item.status}`)} />
            <button className="button secondary" onClick={() => result("passed")}>{tr("appointments.pass")}</button>
            <button className="button subtle" onClick={() => result("failed")}>{tr("appointments.fail")}</button>
          </div>
        ))}
      </section>
    </Page>
  );
}

function VerifyDL() {
  const { tr } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ dlNumber: "JH26/DL/654321", dob: "2004-05-12" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const data = await api.verifyDL(form);
      navigate(data.nextRoute);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Page title={tr("dl.verifyTitle")} subtitle={tr("dl.verifySubtitle")}>
      <form className="panel form-console" onSubmit={submit}>
        <label>{tr("forms.dlNumber")}<input value={form.dlNumber} onChange={(event) => setForm({ ...form, dlNumber: event.target.value })} required /></label>
        <label>{tr("forms.dob")}<input type="date" value={form.dob} onChange={(event) => setForm({ ...form, dob: event.target.value })} required /></label>
        {error && <div className="alert error">{error}</div>}
        <button className="button primary">{tr("dl.verify")}</button>
      </form>
    </Page>
  );
}

function ServicesPage() {
  const { tr } = useContext(LanguageContext);
  const [services] = useAsync(api.services, []);
  const [requests, setRequests] = useAsync(api.serviceRequests, []);
  const [selected, setSelected] = useState("renewal");
  const [form, setForm] = useState({ licenceNumber: "JH26/DL/654321", dob: "2004-05-12", address: "Jamshedpur, Jharkhand" });
  const [loading, setLoading] = useState(false);
  const current = services.find((item) => item.id === selected) || services[0];

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    const request = await api.createServiceRequest({ serviceId: selected, ...form });
    setRequests((items) => [request, ...items]);
    setLoading(false);
  }

  return (
    <Page title={tr("services.title")} subtitle={tr("services.subtitle")}>
      <section className="services-workspace">
        <div className="service-cards">
          {services.map((service) => (
            <motion.button whileHover={{ y: -3 }} key={service.id} className={service.id === selected ? "service-tile selected" : "service-tile"} onClick={() => setSelected(service.id)}>
              <ShieldCheck />
              <strong>{tr(`serviceNames.${service.id}`)}</strong>
              <span>Rs {service.fee} · {service.eta}</span>
            </motion.button>
          ))}
        </div>
        <form className="panel service-form" onSubmit={submit}>
          <h3>{current ? tr(`serviceNames.${current.id}`) : tr("services.request")}</h3>
          <p>{tr("services.required")}: {current?.required.join(", ")}</p>
          <label>{tr("forms.dlNumber")}<input value={form.licenceNumber} onChange={(event) => setForm({ ...form, licenceNumber: event.target.value })} required /></label>
          <label>{tr("forms.dob")}<input type="date" value={form.dob} onChange={(event) => setForm({ ...form, dob: event.target.value })} required /></label>
          <label>{tr("forms.address")}<input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
          <button className="button primary" disabled={loading}>{loading ? tr("loading.submitting") : tr("services.submit")}</button>
        </form>
      </section>
      <section className="panel table-panel">
        <h3>{tr("services.requests")}</h3>
        {requests.length === 0 ? <p>{tr("services.empty")}</p> : requests.map((request) => (
          <div className="table-row" key={request.id}>
            <span>{tr(`serviceNames.${request.serviceId}`)}</span>
            <strong>{request.referenceId}</strong>
            <StatusBadge status={tr(`status.${request.status}`)} />
            <small>{request.createdAt}</small>
          </div>
        ))}
      </section>
    </Page>
  );
}

function AskAI() {
  const { tr, language } = useContext(LanguageContext);
  const [messages, setMessages] = useState([{ role: "assistant", text: tr("ask.greeting"), actions: [] }]);
  const [input, setInput] = useState(tr("ask.sample"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([{ role: "assistant", text: tr("ask.greeting"), actions: [] }]);
    setInput(tr("ask.sample"));
  }, [language]);

  async function send(event) {
    event.preventDefault();
    if (!input.trim()) return;
    const question = input;
    setInput("");
    setMessages((items) => [...items, { role: "user", text: question }]);
    setLoading(true);
    const response = await api.askAI(question);
    setMessages((items) => [...items, { role: "assistant", text: response.answer, actions: response.actions, sources: response.sources }]);
    setLoading(false);
  }

  return (
    <Page title={tr("nav.ask")} subtitle={tr("ask.subtitle")}>
      <div className="chat-panel">
        {messages.map((message, index) => (
          <motion.div key={index} className={`message ${message.role}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p>{message.text}</p>
            {message.sources?.length > 0 && <small>{tr("ask.sources")}: {message.sources.map((source) => source.name).join(", ")}</small>}
            {message.actions?.map((action) => <Link key={action.label} className="button secondary" to={action.route}>{action.label}</Link>)}
          </motion.div>
        ))}
        {loading && <div className="message assistant"><p>{tr("loading.thinking")}</p></div>}
      </div>
      <form className="chat-input" onSubmit={send}>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={tr("ask.placeholder")} />
        <button className="button primary">{tr("common.send")}</button>
      </form>
    </Page>
  );
}

function HelpPage() {
  const { tr } = useContext(LanguageContext);
  const [query, setQuery] = useState("");
  const [topics] = useAsync(api.help, []);
  const filtered = topics.filter((topic) => `${topic.title} ${topic.content}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Page title={tr("nav.help")} subtitle={tr("help.subtitle")}>
      <div className="search-shell">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tr("help.search")} />
      </div>
      <div className="console-grid">
        {filtered.map((topic) => (
          <div className="panel help-card" key={topic.id}>
            <h3>{topic.title}</h3>
            <p>{topic.content}</p>
            <Link to={topic.id === "services" ? "/services" : "/ask-ai"} className="button secondary">{tr("common.continue")} <ChevronRight size={17} /></Link>
          </div>
        ))}
      </div>
    </Page>
  );
}

function LegacyNotificationsPage() {
  const { tr } = useContext(LanguageContext);
  const [notes, setNotes] = useAsync(api.notifications, []);
  async function readAll() {
    setNotes(await api.readAllNotifications());
  }
  return (
    <Page title={tr("nav.notifications")} subtitle={tr("notifications.subtitle")}>
      <button className="button secondary" onClick={readAll}>{tr("notifications.readAll")}</button>
      <div className="notification-list">
        {notes.map((note) => (
          <div className={note.read ? "notification read" : "notification"} key={note.id}>
            <Bell />
            <div><strong>{note.title}</strong><p>{note.body}</p></div>
            <span>{note.createdAt}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}

function LegacyProfilePage() {
  const { tr } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [licence] = useAsync(api.dl, null);
  return (
    <Page title={tr("nav.profile")} subtitle={tr("profile.subtitle")}>
      <section className="profile-grid">
        <div className="panel profile-card">
          <div className="avatar-large">{user?.avatar}</div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.mobile}</p>
        </div>
        <DigitalLicence licence={licence} />
      </section>
    </Page>
  );
}

function TestPrepPage() {
  const { tr } = useContext(LanguageContext);
  return (
    <Page title={tr("ll.test")} subtitle={tr("ll.testSubtitle")}>
      <div className="panel success-panel">
        <CheckCircle2 />
        <h2>{tr("ll.ready")}</h2>
        <p>{tr("ll.readyText")}</p>
        <Link className="button primary" to="/journey">{tr("common.continue")}</Link>
      </div>
    </Page>
  );
}

function DigitalLicence({ licence }) {
  const { tr } = useContext(LanguageContext);
  if (!licence) {
    return (
      <div className="panel licence-card empty">
        <h3>{tr("profile.digitalDL")}</h3>
        <p>{tr("profile.noLicence")}</p>
      </div>
    );
  }
  return (
    <motion.div className="licence-card issued" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <div>
        <span>{tr("profile.govt")}</span>
        <h3>{tr("profile.digitalDL")}</h3>
      </div>
      <strong>{licence.number}</strong>
      <div className="licence-fields">
        <span>{tr("forms.name")}</span><b>{licence.name}</b>
        <span>{tr("forms.dob")}</span><b>{licence.dob}</b>
        <span>{tr("forms.vehicleClass")}</span><b>{licence.vehicleClass}</b>
        <span>{tr("profile.validTill")}</span><b>{licence.expiryDate}</b>
      </div>
      <StatusBadge status={tr(`status.${licence.status}`)} />
    </motion.div>
  );
}

function Page({ title, subtitle, children }) {
  return (
    <motion.div className="page stitch-pattern" {...fadeUp}>
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function JourneyTimeline() {
  const { journey, journeyLoading } = useContext(JourneyContext);
  const { tr } = useContext(LanguageContext);
  if (journeyLoading) return <div className="panel">{tr("loading.journey")}</div>;
  return (
    <div className="timeline">
      {journey?.steps.map((step, index) => (
        <motion.div className={`timeline-step ${step.status}`} key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
          <span>{step.status === "completed" ? <CheckCircle2 size={18} /> : step.status === "current" ? <Car size={18} /> : index + 1}</span>
          <b>{tr(`steps.${step.id}`)}</b>
          <small>{tr(`status.${step.status}`)}</small>
        </motion.div>
      ))}
    </div>
  );
}

function JourneyCockpit({ progress, title, status, compact = false }) {
  const angle = Math.round((progress / 100) * 220 - 110);
  return (
    <div className={compact ? "cockpit compact" : "cockpit"}>
      <div className="arc">
        <div className="arc-progress" style={{ transform: `rotate(${angle}deg)` }} />
        <span className="node done" />
        <span className="node current" />
        <span className="node future" />
        <div className="arc-content">
          <small>{title}</small>
          <strong>{status}</strong>
          <em>{progress}%</em>
        </div>
      </div>
    </div>
  );
}

function JourneyRoad() {
  return (
    <div className="journey-road">
      <span className="road-node done" />
      <span className="road-node active" />
      <span className="road-node" />
      <Car className="road-car" />
    </div>
  );
}

function ServiceLinks() {
  const { tr } = useContext(LanguageContext);
  const links = [
    ["ll", "Learner's License", "/ll"],
    ["dl", "Driving License", "/dl"],
    ["renewal", tr("serviceNames.renewal"), "/services"],
    ["documents", tr("documents.title"), "/documents"]
  ];
  return (
    <div className="service-list">
      {links.map(([key, label, to]) => (
        <Link key={key} to={to}><span>{label}</span><ChevronRight size={17} /></Link>
      ))}
    </div>
  );
}

function QuickAction({ icon: Icon, label, to }) {
  return (
    <motion.div whileHover={{ y: -3 }}>
      <Link className="quick-action" to={to}>
        <span><Icon size={20} /></span>
        <b>{label}</b>
      </Link>
    </motion.div>
  );
}

function MiniStatus({ icon: Icon, label, value }) {
  return <div className="mini-status"><Icon size={19} /><span>{label}</span><strong>{value}</strong></div>;
}

function StatusBadge({ status }) {
  return <span className={`status ${String(status).toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}

function FullPageLoading() {
  return <div className="login-page"><div className="auth-card"><p>Loading Indian Drives...</p></div></div>;
}

function useAsync(loader, initialValue) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    let live = true;
    loader().then((data) => live && setValue(data)).catch(() => live && setValue(initialValue));
    return () => {
      live = false;
    };
  }, []);
  return [value, setValue];
}

function currentStep(journey) {
  return journey?.steps?.find((step) => step.status === "current") || journey?.steps?.at(-1);
}

function journeyPercent(journey) {
  if (!journey?.steps?.length) return 0;
  const complete = journey.steps.filter((step) => step.status === "completed").length;
  const current = journey.steps.some((step) => step.status === "current") ? 0.45 : 0;
  return Math.min(100, Math.round(((complete + current) / journey.steps.length) * 100));
}

createRoot(document.getElementById("root")).render(<App />);
