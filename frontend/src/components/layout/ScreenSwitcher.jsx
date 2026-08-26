import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layers, ChevronDown, ChevronUp, Search, Monitor, ExternalLink } from 'lucide-react';

export const ALL_FIGMA_SCREENS = [
  // Core Portal
  { id: 'documents-center', name: 'Documents Center', category: 'Core Portal', path: '/documents', figmaId: '64:2' },
  { id: 'appointments', name: 'Appointments', category: 'Core Portal', path: '/appointments', figmaId: '64:212' },
  { id: 'government-services', name: 'Government Services', category: 'Core Portal', path: '/services', figmaId: '64:400' },
  { id: 'payments', name: 'Payments', category: 'Core Portal', path: '/payments', figmaId: '64:552' },
  { id: 'notifications-center', name: 'Notifications Center', category: 'Core Portal', path: '/notifications', figmaId: '64:668' },
  { id: 'help-center', name: 'Help Center', category: 'Core Portal', path: '/help', figmaId: '64:906' },
  { id: 'profile', name: 'Profile', category: 'Core Portal', path: '/profile', figmaId: '64:1121' },
  { id: 'settings', name: 'Settings', category: 'Core Portal', path: '/settings', figmaId: '64:1312' },
  { id: 'ask-indian-drives', name: 'Ask Indian Drives', category: 'Core Portal', path: '/ask', figmaId: '64:1537' },
  { id: 'dashboard', name: 'Dashboard', category: 'Core Portal', path: '/dashboard', figmaId: '65:4576' },

  // Learner Licence Flow
  { id: 'application-introduction', name: 'LL Application Intro', category: 'Learner Licence', path: '/ll/intro', figmaId: '64:2406' },
  { id: 'vehicle-selection', name: 'Vehicle Selection', category: 'Learner Licence', path: '/ll/vehicle', figmaId: '64:2142' },
  { id: 'document-requirements', name: 'Document Requirements', category: 'Learner Licence', path: '/ll/documents', figmaId: '64:2269' },
  { id: 'applicant-details', name: 'Applicant Details', category: 'Learner Licence', path: '/ll/applicant', figmaId: '64:1925' },
  { id: 'address-details', name: 'Address Details', category: 'Learner Licence', path: '/ll/address', figmaId: '64:1747' },
  { id: 'application-review', name: 'Application Review', category: 'Learner Licence', path: '/ll/review', figmaId: '64:2884' },
  { id: 'learning-dashboard', name: 'Learning Dashboard', category: 'Learner Licence', path: '/ll/learning-dashboard', figmaId: '64:3981' },
  { id: 'learner-licence-dashboard', name: 'Learner Licence Dashboard', category: 'Learner Licence', path: '/ll/dashboard', figmaId: '64:2554' },
  { id: 'learner-licence-verified', name: 'Learner Licence Verified', category: 'Learner Licence', path: '/ll/verified', figmaId: '64:3106' },
  { id: 'll-assessment-cockpit', name: 'LL Assessment Cockpit', category: 'Learner Licence', path: '/ll/assessment-cockpit', figmaId: '65:4864' },
  { id: 'll-assessment-live-question', name: 'LL Assessment Live Exam', category: 'Learner Licence', path: '/ll/assessment-exam', figmaId: '65:5029' },
  { id: 'll-assessment-result', name: 'LL Assessment Result', category: 'Learner Licence', path: '/ll/assessment-result', figmaId: '65:5235' },

  // Driving Licence Flow
  { id: 'continue-to-driving-licence', name: 'Continue to Driving Licence', category: 'Driving Licence', path: '/dl/continue', figmaId: '64:3173' },
  { id: 'dl-application-introduction', name: 'DL Application Intro', category: 'Driving Licence', path: '/dl/intro', figmaId: '64:3235' },
  { id: 'confirm-vehicle-class', name: 'Confirm Vehicle Class', category: 'Driving Licence', path: '/dl/confirm-vehicle', figmaId: '64:3328' },
  { id: 'confirm-applicant-details', name: 'Confirm Applicant Details', category: 'Driving Licence', path: '/dl/confirm-applicant', figmaId: '64:3411' },
  { id: 'confirm-address', name: 'Confirm Address', category: 'Driving Licence', path: '/dl/confirm-address', figmaId: '64:3463' },
  { id: 'document-verification', name: 'Document Verification', category: 'Driving Licence', path: '/dl/doc-verification', figmaId: '64:3524' },
  { id: 'application-submitted', name: 'Application Submitted', category: 'Driving Licence', path: '/dl/submitted', figmaId: '64:3603' },
  { id: 'dl-fee-summary', name: 'DL Fee Summary', category: 'Driving Licence', path: '/dl/fee-summary', figmaId: '64:3031' },
  { id: 'dl-payment', name: 'DL Payment Checkout', category: 'Driving Licence', path: '/dl/payment', figmaId: '64:3673' },
  { id: 'payment-successful', name: 'Payment Successful', category: 'Driving Licence', path: '/dl/payment-success', figmaId: '64:3771' },
  { id: 'test-center-selection', name: 'Test Center Selection', category: 'Driving Licence', path: '/dl/test-center', figmaId: '67:6511' },
  { id: 'test-date-selection', name: 'Test Date Selection', category: 'Driving Licence', path: '/dl/test-date', figmaId: '64:3825' },
  { id: 'seat-selection', name: 'Seat & Slot Selection', category: 'Driving Licence', path: '/dl/seat-selection', figmaId: '67:6596' },
  { id: 'driving-licence-dashboard', name: 'Driving Licence Dashboard', category: 'Driving Licence', path: '/dl/dashboard', figmaId: '64:2728' },
  { id: 'driving-test-result', name: 'Driving Test Result', category: 'Driving Licence', path: '/dl/test-result', figmaId: '67:6886' },
  { id: 'licence-dispatch-delivery', name: 'Licence Dispatch & Delivery', category: 'Driving Licence', path: '/dl/dispatch', figmaId: '67:7051' },

  // Licence Services & Management
  { id: 'licence-services', name: 'Licence Services Hub', category: 'Licence Services', path: '/licence-services', figmaId: '68:8231' },
  { id: 'manage-driving-licence', name: 'Manage Driving Licence', category: 'Licence Services', path: '/manage-licence', figmaId: '68:8323' },
  { id: 'licence-verified', name: 'Licence Verified Card', category: 'Licence Services', path: '/licence-verified', figmaId: '68:8411' },
  { id: 'update-licence-details', name: 'Update Licence Details', category: 'Licence Services', path: '/update-licence', figmaId: '68:7741' },
  { id: 'renew-driving-licence', name: 'Renew Driving Licence', category: 'Licence Services', path: '/renew-licence', figmaId: '68:8091' },
  { id: 'duplicate-driving-licence', name: 'Duplicate Driving Licence', category: 'Licence Services', path: '/duplicate-licence', figmaId: '68:7959' },
  { id: 'update-request-submitted', name: 'Update Request Submitted', category: 'Licence Services', path: '/update-submitted', figmaId: '68:7578' },
  { id: 'renewal-request-submitted', name: 'Renewal Request Submitted', category: 'Licence Services', path: '/renewal-submitted', figmaId: '68:7670' },
  { id: 'my-journey', name: 'My Journey Timeline', category: 'Licence Services', path: '/journey', figmaId: '65:4739' },
  { id: 'review-application-form', name: 'Review Application Form', category: 'Licence Services', path: '/review-application-form', figmaId: '65:5544' }
];

export function ScreenSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const currentScreen = ALL_FIGMA_SCREENS.find(s => s.path === location.pathname) || ALL_FIGMA_SCREENS[0];

  const filteredScreens = ALL_FIGMA_SCREENS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(ALL_FIGMA_SCREENS.map(s => s.category)));

  return (
    <div className="screen-switcher-wrapper">
      <div className="screen-switcher-bar">
        <div className="screen-switcher-info">
          <span className="screen-switcher-tag">Figma Inspector</span>
          <Monitor size={14} />
          <span>Active Screen ({ALL_FIGMA_SCREENS.length} Screens):</span>
          <select
            className="screen-select"
            value={currentScreen.path}
            onChange={(e) => navigate(e.target.value)}
          >
            {ALL_FIGMA_SCREENS.map(s => (
              <option key={s.id} value={s.path}>
                [{s.category}] {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="screen-switcher-controls">
          <button
            className={`screen-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Layers size={13} />
            Browse All 48 Screens
            {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="screen-drawer">
          <input
            type="text"
            className="screen-search"
            placeholder="Search screens by title or category (e.g. Test Date, Payment, Assessment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {categories.map(cat => {
            const catScreens = filteredScreens.filter(s => s.category === cat);
            if (catScreens.length === 0) return null;
            return (
              <div key={cat}>
                <div className="screen-category-title">{cat} ({catScreens.length})</div>
                <div className="screen-grid">
                  {catScreens.map(screen => (
                    <button
                      key={screen.id}
                      className={`screen-card-btn ${location.pathname === screen.path ? 'active' : ''}`}
                      onClick={() => {
                        navigate(screen.path);
                        setIsOpen(false);
                      }}
                    >
                      <span>{screen.name}</span>
                      <ExternalLink size={11} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
