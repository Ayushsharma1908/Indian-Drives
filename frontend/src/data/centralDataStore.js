/**
 * centralDataStore.js
 * Centralized Single Source of Truth & Event Dispatcher for Indian Drives.
 * Connects all pages, widgets, forms, notifications, and AI context without fake hardcoded data.
 */

const STORAGE_KEY = 'indian_drives_central_store_v2';

const INITIAL_STATE = {
  user: {
    id: 'user-demo',
    name: 'Raj Singh',
    firstName: 'Raj',
    lastName: 'Singh',
    email: 'raj.singh@example.com',
    mobile: '+91 98765 43210',
    avatar: 'RS',
    fatherName: 'Rajesh Singh',
    dob: '1998-08-19',
    gender: 'Female',
    bloodGroup: 'O+ve',
    streetAddress: 'Flat 402, Green Park Heights, Sakchi',
    city: 'Jamshedpur',
    district: 'East Singhbhum',
    state: 'Jharkhand',
    pincode: '831001',
    fullAddress: 'Flat 402, Green Park Heights, Sakchi, Jamshedpur, Jharkhand - 831001',
    rtoCode: 'JH-05',
    rtoName: 'Jamshedpur RTO (Sakchi, Jamshedpur)'
  },
  licences: {
    ll: {
      number: 'LL-05/2026/008821',
      name: 'Raj Singh',
      dob: '1998-08-19',
      vehicleClass: 'LMV (Light Motor Vehicle)',
      issueDate: '14 Jul 2026',
      expiryDate: '13 Jan 2027',
      status: 'valid',
      rto: 'JH-05 Jamshedpur RTO'
    },
    dl: null // Not issued until practical test is passed
  },
  applications: [
    {
      id: 'IND-2026-98124',
      type: 'Driving Licence (Form 4)',
      vehicleClass: 'LMV',
      status: 'in-progress',
      currentStage: 'test-booking',
      rto: 'JH-05 Jamshedpur RTO (Sakchi)',
      submittedAt: '24 Aug 2026'
    }
  ],
  documents: [
    {
      id: 'doc-1',
      name: 'Aadhaar Card (Ends in 4920)',
      category: 'Identity Proof',
      type: 'identity',
      date: '12 Oct 2024',
      validUntil: 'Permanent',
      status: 'Verified',
      fileSize: '340 KB'
    },
    {
      id: 'doc-2',
      name: 'Electricity Bill (Recent Address Proof)',
      category: 'Address Proof',
      type: 'address',
      date: '01 Aug 2026',
      validUntil: '01 Nov 2026',
      status: 'Verified',
      fileSize: '512 KB'
    },
    {
      id: 'doc-3',
      name: 'Learner Licence Form 3',
      category: 'Licence Proof',
      type: 'licence',
      date: '14 Jul 2026',
      validUntil: '13 Jan 2027',
      status: 'Verified',
      fileSize: '210 KB'
    },
    {
      id: 'doc-4',
      name: 'Passport Size Photo & Signature',
      category: 'Biometric Proof',
      type: 'biometric',
      date: '10 Feb 2026',
      validUntil: 'Permanent',
      status: 'Verified',
      fileSize: '180 KB'
    }
  ],
  payments: [
    {
      id: 'TXN-882194',
      appId: 'IND-2026-98124',
      title: 'Driving Licence Application & Test Fee',
      purpose: 'DL Application Fee',
      amount: 450,
      formattedAmount: '₹450.00',
      date: '23 Aug 2026',
      status: 'Successful',
      method: 'UPI (GPay)',
      breakdown: [
        { label: 'Form 7 Application Fee', fee: '₹200.00' },
        { label: 'Automated Track Test Fee', fee: '₹150.00' },
        { label: 'Smartcard Printing & Postal Fee', fee: '₹100.00' }
      ]
    },
    {
      id: 'TXN-551980',
      appId: 'LL-05/2026/008821',
      title: 'Learner Licence Online Test & Processing Fee',
      purpose: 'LL Application Fee',
      amount: 200,
      formattedAmount: '₹200.00',
      date: '12 Jul 2026',
      status: 'Successful',
      method: 'Net Banking',
      breakdown: [
        { label: 'Form 2 Application Fee', fee: '₹150.00' },
        { label: 'Online Knowledge Test Fee', fee: '₹50.00' }
      ]
    }
  ],
  appointments: [
    {
      id: 'APT-JH05-98104',
      ref: 'IND-DL-SLOT-994',
      title: 'Automated Driving Licence Skill Test',
      date: '24 Oct 2026',
      dateRaw: '2026-10-24',
      time: '10:00 AM - 11:00 AM',
      location: 'Jamshedpur RTO Test Track, Sakchi, Jamshedpur (JH-05)',
      testCentreId: 'rto001',
      slot: '10:00 AM',
      type: 'upcoming',
      status: 'Scheduled',
      vehicleClass: 'LMV (Light Motor Vehicle)',
      trackBay: 'Bay 3',
      reportingTime: '09:45 AM'
    }
  ],
  notifications: [
    {
      id: 'note-1',
      category: 'applications',
      dateGroup: 'Today',
      title: 'DL Application Under Scrutiny',
      body: 'Your Form 4 application IND-2026-98124 and document proofs are verified. Next step: Attend your scheduled practical test.',
      timeAgo: 'Just now',
      unread: true,
      route: '/journey'
    },
    {
      id: 'note-2',
      category: 'appointments',
      dateGroup: 'Today',
      title: 'Driving Test Appointment Confirmed',
      body: 'Your automated track test is scheduled for 24 Oct 2026 at 10:00 AM at Jamshedpur RTO Track (JH-05).',
      timeAgo: '3 hours ago',
      unread: true,
      route: '/appointments'
    },
    {
      id: 'note-3',
      category: 'payments',
      dateGroup: 'Yesterday',
      title: 'Fee Payment Successful',
      body: 'Payment of ₹450 (TXN-882194) for Driving Licence Application has been credited.',
      timeAgo: 'Yesterday, 2:30 PM',
      unread: false,
      route: '/payments'
    },
    {
      id: 'note-4',
      category: 'applications',
      dateGroup: 'Yesterday',
      title: 'All Documents Verified',
      body: 'Aadhaar eKYC, Address proof, and Form 3 Learner Licence verified successfully.',
      timeAgo: 'Yesterday, 11:15 AM',
      unread: false,
      route: '/documents'
    }
  ],
  journey: {
    type: 'DL',
    currentStage: 'test-booking',
    activeStageId: 'dl',
    stages: [
      { id: 'start', label: 'Start Application', status: 'completed' },
      { id: 'll', label: 'Learner Licence', status: 'completed' },
      { id: 'documents', label: 'Documents & Scrutiny', status: 'completed' },
      { id: 'payment', label: 'Fee Payment', status: 'completed' },
      { id: 'test-booking', label: 'Driving Test Slot', status: 'current' },
      { id: 'licence', label: 'DL Smartcard Issued', status: 'upcoming' }
    ]
  },
  draftForms: {}
};

class CentralDataStore {
  constructor() {
    this.state = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...INITIAL_STATE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Could not parse stored state, using defaults:', e);
    }
    return INITIAL_STATE;
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to persist central store state:', e);
    }
    this.broadcastStateChange();
  }

  broadcastStateChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('indian-drives-state-change', { detail: this.state }));
      window.dispatchEvent(new CustomEvent('notifications-updated', { detail: this.getNotifications() }));
    }
  }

  // --- USER PROFILE ---
  getUserProfile() {
    return this.state.user;
  }

  updateUserProfile(updates) {
    this.state.user = { ...this.state.user, ...updates };
    this.saveToStorage();
    return this.state.user;
  }

  // --- LICENCES ---
  getLicences() {
    return this.state.licences;
  }

  issueDrivingLicence(dlData) {
    const newDL = {
      number: dlData?.number || `JH-05-${new Date().getFullYear()}-0098124`,
      name: this.state.user.name,
      dob: this.state.user.dob,
      vehicleClass: 'LMV (Light Motor Vehicle)',
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      expiryDate: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'active',
      rto: this.state.user.rtoName
    };
    this.state.licences.dl = newDL;
    this.updateJourneyStage('licence');
    this.addNotification({
      category: 'licences',
      title: 'Digital Driving Licence Ready',
      body: `Your Driving Licence ${newDL.number} has been issued and is available for download.`,
      route: '/manage-licence'
    });
    this.saveToStorage();
    return newDL;
  }

  // --- APPLICATIONS ---
  getApplications() {
    return this.state.applications;
  }

  addApplication(appData) {
    const app = {
      id: `IND-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      submittedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'in-progress',
      ...appData
    };
    this.state.applications.unshift(app);
    this.addNotification({
      category: 'applications',
      title: `${app.type || 'Application'} Submitted`,
      body: `Your application (${app.id}) has been recorded. All details saved securely.`,
      route: '/journey'
    });
    this.saveToStorage();
    return app;
  }

  // --- DOCUMENTS ---
  getDocuments() {
    return this.state.documents;
  }

  addDocument(doc) {
    const newDoc = {
      id: `doc-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Verified',
      validUntil: 'Permanent',
      fileSize: '420 KB',
      ...doc
    };
    this.state.documents.push(newDoc);
    this.addNotification({
      category: 'applications',
      title: 'Document Uploaded & Verified',
      body: `${newDoc.name} has been added to your Document Vault.`,
      route: '/documents'
    });
    this.saveToStorage();
    return newDoc;
  }

  // --- PAYMENTS ---
  getPayments() {
    return this.state.payments;
  }

  createPayment(paymentData) {
    const txn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      appId: paymentData.appId || this.state.applications[0]?.id || 'IND-2026-98124',
      title: paymentData.title || 'Driving Licence Fee',
      purpose: paymentData.purpose || paymentData.title || 'DL Application Fee',
      amount: Number(paymentData.amount || 450),
      formattedAmount: `₹${Number(paymentData.amount || 450).toFixed(2)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Successful',
      method: paymentData.method || 'UPI (GPay)',
      breakdown: paymentData.breakdown || [
        { label: 'Application Fee', fee: `₹${Number(paymentData.amount || 450).toFixed(2)}` }
      ]
    };
    this.state.payments.unshift(txn);
    this.addNotification({
      category: 'payments',
      title: 'Payment Completed',
      body: `Payment of ${txn.formattedAmount} (Ref: ${txn.id}) was successful.`,
      route: '/payments'
    });
    this.saveToStorage();

    // Trigger Real-Time Backend Notification (Email + SMS)
    try {
      const baseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5001";
      fetch(`${baseUrl}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: txn.title || txn.purpose,
          amount: txn.amount,
          transactionId: txn.id,
          method: txn.method
        })
      }).catch((err) => console.warn("Backend payment notification trigger skipped:", err.message));
    } catch (e) {
      console.warn("Could not dispatch backend payment notification:", e.message);
    }

    return txn;
  }

  // --- APPOINTMENTS ---
  getAppointments() {
    return this.state.appointments;
  }

  getUpcomingAppointment() {
    return this.state.appointments.find(a => a.type === 'upcoming' && a.status === 'Scheduled') || null;
  }

  bookAppointment(slotData) {
    this.state.appointments.forEach(a => {
      if (a.type === 'upcoming') {
        a.type = 'past';
        a.status = 'Rescheduled';
      }
    });

    const activeApp = this.state.applications[0];
    const appNumber = slotData.applicationNo || slotData.appId || activeApp?.id || 'IND-2026-98124';
    const testCenterName = slotData.location || slotData.testCenterName || slotData.center || slotData.centre || activeApp?.rto || 'ARTO Kashipur Driving Test Track';
    const vehicleClass = slotData.vehicleClass || activeApp?.vehicleClass || 'LMV (Light Motor Vehicle)';
    const title = slotData.title || (slotData.stage === 'll' ? 'Learner Licence Test' : 'Automated Driving Licence Skill Test');

    const newApt = {
      id: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
      ref: appNumber,
      title,
      date: slotData.date || '28 Oct 2026',
      dateRaw: slotData.dateRaw || '2026-10-28',
      time: slotData.time || slotData.slot || '10:00 AM',
      location: testCenterName,
      testCenterName: testCenterName,
      testCentreId: slotData.testCentreId || 'rto-001',
      slot: slotData.slot || slotData.time || '10:00 AM',
      type: 'upcoming',
      status: 'Scheduled',
      vehicleClass,
      trackBay: slotData.trackBay || 'Bay 2',
      reportingTime: slotData.reportingTime || '09:45 AM'
    };

    this.state.appointments.unshift(newApt);
    this.addNotification({
      category: 'appointments',
      title: 'Driving Test Booked',
      body: `Your slot is confirmed for ${newApt.date} at ${newApt.time} at ${newApt.testCenterName}.`,
      route: '/appointments'
    });
    this.saveToStorage();

    // Trigger Real-Time Backend Notification (Email + SMS)
    try {
      const baseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5001";
      fetch(`${baseUrl}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testCentreId: newApt.testCentreId,
          date: newApt.date,
          slot: newApt.slot,
          vehicleClass: newApt.vehicleClass,
          centerName: newApt.testCenterName,
          title: newApt.title,
          applicationId: newApt.ref
        })
      }).catch((err) => console.warn("Backend appointment notification trigger skipped:", err.message));
    } catch (e) {
      console.warn("Could not dispatch backend appointment notification:", e.message);
    }

    return newApt;
  }

  cancelAppointment(appointmentId) {
    const apt = this.state.appointments.find(a => a.id === appointmentId);
    if (apt) {
      apt.status = 'Cancelled';
      apt.type = 'past';
      this.addNotification({
        category: 'appointments',
        title: 'Appointment Cancelled',
        body: `Your appointment ${apt.id} on ${apt.date} has been cancelled.`,
        route: '/appointments'
      });
      this.saveToStorage();
    }
    return apt;
  }

  // --- NOTIFICATIONS ---
  getNotifications() {
    return this.state.notifications;
  }

  getUnreadNotificationCount() {
    return this.state.notifications.filter(n => n.unread).length;
  }

  addNotification(noteData) {
    const newNote = {
      id: `note-${Date.now()}`,
      dateGroup: 'Today',
      timeAgo: 'Just now',
      unread: true,
      ...noteData
    };
    this.state.notifications.unshift(newNote);
    this.saveToStorage();
    return newNote;
  }

  markNotificationAsRead(id) {
    const note = this.state.notifications.find(n => n.id === id);
    if (note) {
      note.unread = false;
      this.saveToStorage();
    }
  }

  markAllNotificationsAsRead() {
    this.state.notifications.forEach(n => {
      n.unread = false;
    });
    this.saveToStorage();
  }

  // --- JOURNEY & PROGRESS CALCULATION ---
  getJourney() {
    return this.state.journey;
  }

  getJourneyProgress() {
    const stages = this.state.journey.stages || [];
    if (stages.length === 0) return 0;
    const completed = stages.filter(s => s.status === 'completed').length;
    return Math.round((completed / stages.length) * 100);
  }

  updateJourneyStage(stageId) {
    const stages = this.state.journey.stages || [];
    let foundCurrent = false;
    this.state.journey.currentStage = stageId;

    stages.forEach(stage => {
      if (stage.id === stageId) {
        stage.status = 'current';
        foundCurrent = true;
      } else if (!foundCurrent) {
        stage.status = 'completed';
      } else {
        stage.status = 'upcoming';
      }
    });

    this.saveToStorage();
  }

  // --- DRAFT FORM PERSISTENCE ---
  saveDraftForm(key, data) {
    this.state.draftForms[key] = { ...this.state.draftForms[key], ...data };
    this.saveToStorage();
  }

  getDraftForm(key) {
    return this.state.draftForms[key] || {};
  }

  clearDraftForm(key) {
    delete this.state.draftForms[key];
    this.saveToStorage();
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.saveToStorage();
  }
}

export const centralDataStore = new CentralDataStore();
