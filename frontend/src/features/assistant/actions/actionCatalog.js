/**
 * Structured Action Catalog for Ask Indian Drives
 * Maps action keys to routes, display metadata, icons, and permission policies.
 */

export const ACTION_CATALOG = {
  START_LL_APPLICATION: {
    id: 'START_LL_APPLICATION',
    label: 'Start Learner Licence Application',
    shortLabel: 'Start LL Application',
    route: '/ll/intro',
    icon: 'FileText',
    category: 'LL',
    description: 'Begin a new online Learner Licence application for your vehicle class.'
  },
  CONTINUE_LL_APPLICATION: {
    id: 'CONTINUE_LL_APPLICATION',
    label: 'Continue LL Application',
    shortLabel: 'Continue LL',
    route: '/ll/applicant',
    icon: 'ArrowRight',
    category: 'LL',
    description: 'Resume your saved Learner Licence application draft.'
  },
  OPEN_LL_DASHBOARD: {
    id: 'OPEN_LL_DASHBOARD',
    label: 'Open LL Dashboard',
    shortLabel: 'LL Dashboard',
    route: '/ll/dashboard',
    icon: 'Shield',
    category: 'LL',
    description: 'View your Learner Licence timeline, status and verified certificate.'
  },
  OPEN_LL_DOCUMENTS: {
    id: 'OPEN_LL_DOCUMENTS',
    label: 'Upload LL Documents',
    shortLabel: 'LL Documents',
    route: '/ll/documents',
    icon: 'FileText',
    category: 'LL',
    description: 'Review and upload mandatory ID, address, and medical declarations for LL.'
  },
  OPEN_LL_PAYMENT: {
    id: 'OPEN_LL_PAYMENT',
    label: 'Pay LL Application Fee',
    shortLabel: 'Pay Fee',
    route: '/ll/payment',
    icon: 'CreditCard',
    category: 'LL',
    description: 'Complete official application fee payment via Sarathi portal gateway.'
  },
  OPEN_LL_TEST: {
    id: 'OPEN_LL_TEST',
    label: 'Start LL Theory Test',
    shortLabel: 'Start LL Test',
    route: '/ll/assessment-cockpit',
    icon: 'Sparkles',
    category: 'LL',
    description: 'Enter the online Learner Licence theory exam cockpit.'
  },
  VIEW_LL_RESULT: {
    id: 'VIEW_LL_RESULT',
    label: 'View LL Test Result',
    shortLabel: 'LL Result',
    route: '/ll/assessment-result',
    icon: 'CheckCircle2',
    category: 'LL',
    description: 'View your official LL assessment scorecard and Form 3 download.'
  },
  OPEN_DL_ENTRY: {
    id: 'OPEN_DL_ENTRY',
    label: 'Apply for Driving Licence',
    shortLabel: 'Apply for DL',
    route: '/dl/intro',
    icon: 'Car',
    category: 'DL',
    description: 'Transition from Learner Licence to full Permanent Driving Licence.'
  },
  VERIFY_LL: {
    id: 'VERIFY_LL',
    label: 'Verify Learner Licence',
    shortLabel: 'Verify LL',
    route: '/dl/verify',
    icon: 'Shield',
    category: 'DL',
    description: 'Fetch and authenticate your active Learner Licence details.'
  },
  OPEN_DL_DASHBOARD: {
    id: 'OPEN_DL_DASHBOARD',
    label: 'Open DL Dashboard',
    shortLabel: 'DL Dashboard',
    route: '/dl/dashboard',
    icon: 'Compass',
    category: 'DL',
    description: 'Track your permanent Driving Licence progress from test to dispatch.'
  },
  START_DL_APPLICATION: {
    id: 'START_DL_APPLICATION',
    label: 'Start DL Application',
    shortLabel: 'Start DL',
    route: '/dl/start',
    icon: 'FilePlus',
    category: 'DL',
    description: 'Initiate your Form 4 Driving Licence application.'
  },
  CONTINUE_DL_APPLICATION: {
    id: 'CONTINUE_DL_APPLICATION',
    label: 'Continue DL Application',
    shortLabel: 'Continue DL',
    route: '/dl/confirm-intro',
    icon: 'ArrowRight',
    category: 'DL',
    description: 'Confirm applicant details and vehicle categories.'
  },
  OPEN_DL_DOCUMENTS: {
    id: 'OPEN_DL_DOCUMENTS',
    label: 'Review DL Documents',
    shortLabel: 'DL Documents',
    route: '/dl/documents',
    icon: 'FileCheck',
    category: 'DL',
    description: 'Check verified LL documents and additional required proofs.'
  },
  OPEN_DL_PAYMENT: {
    id: 'OPEN_DL_PAYMENT',
    label: 'Pay DL Fees & Slot Charges',
    shortLabel: 'Pay DL Fee',
    route: '/dl/payment',
    icon: 'CreditCard',
    category: 'DL',
    description: 'Pay ₹200 driving test fee and Smart Card issue charges.'
  },
  CHECK_DL_TEST_ELIGIBILITY: {
    id: 'CHECK_DL_TEST_ELIGIBILITY',
    label: 'Check Driving Test Eligibility',
    shortLabel: 'Check Eligibility',
    route: null,
    isTool: true,
    icon: 'CheckCircle2',
    category: 'DL',
    description: 'Run automated checks on LL validity, 30-day holding period, and fee status.'
  },
  OPEN_APPOINTMENTS: {
    id: 'OPEN_APPOINTMENTS',
    label: 'Open Appointments Hub',
    shortLabel: 'Appointments',
    route: '/appointments',
    icon: 'Calendar',
    category: 'Appointments',
    description: 'Manage your RTO appointments, driving test slots and visit passes.'
  },
  BOOK_APPOINTMENT: {
    id: 'BOOK_APPOINTMENT',
    label: 'Book Driving Test Slot',
    shortLabel: 'Book Slot',
    route: '/dl/test-center',
    icon: 'CalendarPlus',
    category: 'Appointments',
    description: 'Select automated test track, test date, and 1-hour time slot.'
  },
  VIEW_APPOINTMENT: {
    id: 'VIEW_APPOINTMENT',
    label: 'View Booked Appointment',
    shortLabel: 'View Appointment',
    route: '/appointments',
    icon: 'CalendarCheck',
    category: 'Appointments',
    description: 'View your upcoming test date, track bay, and QR appointment pass.'
  },
  RESCHEDULE_APPOINTMENT: {
    id: 'RESCHEDULE_APPOINTMENT',
    label: 'Reschedule Appointment',
    shortLabel: 'Reschedule',
    route: '/dl/test-center',
    icon: 'Clock',
    category: 'Appointments',
    requiresConfirm: true,
    confirmTitle: 'Reschedule Driving Test Slot?',
    confirmMessage: 'Your current appointment (18 September 2026, 10:30 AM at Burari Track) will be released and you will pick a new date.',
    description: 'Change your booked driving test date or time slot.'
  },
  CANCEL_APPOINTMENT: {
    id: 'CANCEL_APPOINTMENT',
    label: 'Cancel Appointment',
    shortLabel: 'Cancel Visit',
    route: '/appointments',
    icon: 'XCircle',
    category: 'Appointments',
    requiresConfirm: true,
    confirmTitle: 'Cancel RTO Appointment?',
    confirmMessage: 'Are you sure you want to cancel your booked driving test slot? You will need to re-book before your LL expires.',
    description: 'Cancel your currently scheduled RTO test appointment.'
  },
  VIEW_TEST_RESULT: {
    id: 'VIEW_TEST_RESULT',
    label: 'View Driving Test Result',
    shortLabel: 'Test Result',
    route: '/dl/test-result',
    icon: 'Award',
    category: 'DL',
    description: 'Check automated sensor track evaluation and skill sub-scores.'
  },
  OPEN_APPLICATION_STATUS: {
    id: 'OPEN_APPLICATION_STATUS',
    label: 'View Application Status',
    shortLabel: 'Application Status',
    route: '/journey',
    icon: 'Activity',
    category: 'Status',
    description: 'Check live scrutiny, verification milestones, and government records.'
  },
  OPEN_LICENCE_SERVICES: {
    id: 'OPEN_LICENCE_SERVICES',
    label: 'Licence Services Hub',
    shortLabel: 'Licence Services',
    route: '/licence-services',
    icon: 'Shield',
    category: 'Services',
    description: 'Browse citizen services for existing driving licence holders.'
  },
  OPEN_LICENCE: {
    id: 'OPEN_LICENCE',
    label: 'Manage Driving Licence',
    shortLabel: 'Manage Licence',
    route: '/manage-licence',
    icon: 'CreditCard',
    category: 'Services',
    description: 'View digital licence card, validity, authorized classes, and endorsements.'
  },
  RENEW_LICENCE: {
    id: 'RENEW_LICENCE',
    label: 'Renew Driving Licence',
    shortLabel: 'Renew Licence',
    route: '/renew-licence',
    icon: 'RefreshCw',
    category: 'Services',
    description: 'Apply for Driving Licence renewal with medical declaration.'
  },
  REQUEST_DUPLICATE: {
    id: 'REQUEST_DUPLICATE',
    label: 'Request Duplicate Licence',
    shortLabel: 'Duplicate DL',
    route: '/duplicate-licence',
    icon: 'Copy',
    category: 'Services',
    description: 'Apply for duplicate licence replacement due to loss, theft or damage.'
  },
  UPDATE_LICENCE_DETAILS: {
    id: 'UPDATE_LICENCE_DETAILS',
    label: 'Update Address or Details',
    shortLabel: 'Update Details',
    route: '/update-licence',
    icon: 'Edit3',
    category: 'Services',
    description: 'Change registered address, mobile number or bio details on your licence.'
  },
  OPEN_DOCUMENT_CENTER: {
    id: 'OPEN_DOCUMENT_CENTER',
    label: 'Open Document Center',
    shortLabel: 'Document Center',
    route: '/documents',
    icon: 'Folder',
    category: 'Documents',
    description: 'Manage all uploaded documents, verification slips, and forms.'
  },
  OPEN_PAYMENTS: {
    id: 'OPEN_PAYMENTS',
    label: 'Open Payments & Receipts',
    shortLabel: 'Payments',
    route: '/payments',
    icon: 'Receipt',
    category: 'Payments',
    description: 'View transaction history, download receipts, or retry payments.'
  },
  OPEN_NOTIFICATIONS: {
    id: 'OPEN_NOTIFICATIONS',
    label: 'View Notifications',
    shortLabel: 'Notifications',
    route: '/notifications',
    icon: 'Bell',
    category: 'Alerts',
    description: 'Check official alerts, SMS logs, and scrutiny updates.'
  },
  OPEN_HELP: {
    id: 'OPEN_HELP',
    label: 'Help & Knowledge Center',
    shortLabel: 'Help Center',
    route: '/help',
    icon: 'HelpCircle',
    category: 'Help',
    description: 'Search official Parivahan guidelines, FAQs, and contact RTO support.'
  },
  GENERATE_RTO_CHECKLIST: {
    id: 'GENERATE_RTO_CHECKLIST',
    label: 'Generate RTO Visit Checklist',
    shortLabel: 'RTO Checklist',
    route: null,
    isTool: true,
    icon: 'CheckSquare',
    category: 'Preparation',
    description: 'Generate a personalized checklist of documents, vehicle, and arrival requirements.'
  }
};

/**
 * Helper to safely execute or dispatch an action
 */
export function executeAction(actionKey, payload = {}, navigate = null) {
  const action = ACTION_CATALOG[actionKey];
  if (!action) {
    console.warn(`Action "${actionKey}" not found in catalog.`);
    return false;
  }

  if (action.route && typeof navigate === 'function') {
    navigate(action.route);
    return true;
  }

  return true;
}
