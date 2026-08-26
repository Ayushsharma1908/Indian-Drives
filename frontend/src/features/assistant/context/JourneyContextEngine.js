import { useState, useEffect } from 'react';
import { api } from '../../../services/api';

/**
 * Creates a normalized central user-journey context object
 * for the Ask Indian Drives assistant.
 */
export async function fetchUserJourneyContext(activeUser = null) {
  const userName = activeUser?.name || 'Yanshi';
  const localLLCompleted = localStorage.getItem('ll_completed') === 'true';

  let journeyData = null;
  let appointmentsData = [];
  let documentsData = [];
  let paymentsData = [];
  let notificationsData = [];
  let llData = null;
  let dlData = null;

  try {
    const [j, appts, docs, pays, notes, ll, dl] = await Promise.allSettled([
      api.journey(),
      api.appointments(),
      api.documents(),
      api.payments(),
      api.notifications(),
      api.ll(),
      api.dl()
    ]);

    if (j.status === 'fulfilled' && j.value) journeyData = j.value;
    if (appts.status === 'fulfilled' && Array.isArray(appts.value)) appointmentsData = appts.value;
    if (docs.status === 'fulfilled' && Array.isArray(docs.value)) documentsData = docs.value;
    if (pays.status === 'fulfilled' && Array.isArray(pays.value)) paymentsData = pays.value;
    if (notes.status === 'fulfilled' && Array.isArray(notes.value)) notificationsData = notes.value;
    if (ll.status === 'fulfilled' && ll.value) llData = ll.value;
    if (dl.status === 'fulfilled' && dl.value) dlData = dl.value;
  } catch (err) {
    console.warn('Using demo journey context fallback:', err);
  }

  // Active appointment
  const bookedAppt = appointmentsData.find(a => a.status === 'booked' || a.status === 'scheduled') || {
    id: 'appt-dl-01',
    testCentre: 'DL-01 North Delhi Automated Driving Test Track (Burari)',
    date: '18 September 2026',
    time: '10:30 AM',
    slot: 'Slot 2 (10:30 AM – 11:30 AM)',
    track: 'Track Bay 3',
    vehicleClass: 'LMV',
    status: 'booked'
  };

  // Documents summary
  const docsList = documentsData.length > 0 ? documentsData : [
    { id: 'doc-1', name: 'Aadhaar Card (Identity Proof)', type: 'identity', status: 'verified', updatedAt: '22 Aug 2026' },
    { id: 'doc-2', name: 'Electricity Bill (Address Proof)', type: 'address', status: 'verified', updatedAt: '22 Aug 2026' },
    { id: 'doc-3', name: 'Learner Licence (Form 3)', type: 'licence', status: 'verified', updatedAt: '23 Aug 2026' },
    { id: 'doc-4', name: 'Passport Photo & Signature', type: 'photo', status: 'verified', updatedAt: '23 Aug 2026' }
  ];

  // Payments summary
  const latestPayment = paymentsData.length > 0 ? paymentsData[0] : {
    id: 'pay-001',
    purpose: 'DL Application Fee',
    amount: '₹200',
    status: 'success',
    transactionId: 'TXN-882194',
    date: '25 Aug 2026'
  };

  return {
    userName,
    state: 'Delhi (NCT)',
    rto: 'DL-01 North Delhi (Mall Road & Burari)',
    rtoCode: 'DL-01',
    journeyType: 'DL',
    licenceType: 'Light Motor Vehicle (LMV) + MCWG',
    licenceNumber: dlData?.number || 'DL-042026001928',
    learnerLicenceNumber: llData?.number || 'LL/24/09/8821',
    applicationNumber: 'IND-2026-98124',
    vehicleClass: 'LMV (Motor Car)',
    currentStage: 'DL Application',
    currentStageLabel: 'Driving Licence Application · Test Booking',
    completedStages: [
      'Learner Licence Application',
      'Document Verification',
      'Fee Payment (₹200)',
      'LL Theory Assessment (Passed 18/20)'
    ],
    nextStage: 'Book Driving Test Slot',
    pendingActions: ['Book Test Slot at Burari Track or View Scheduled Visit'],
    documentState: {
      overall: 'verified',
      items: docsList
    },
    paymentState: {
      status: latestPayment?.status === 'success' ? 'paid' : 'pending',
      amount: latestPayment?.amount || '₹200',
      transactionId: latestPayment?.transactionId || 'TXN-882194',
      date: latestPayment?.date || latestPayment?.createdAt || '25 Aug 2026',
      receiptAvailable: true
    },
    appointmentState: {
      hasAppointment: Boolean(bookedAppt),
      status: bookedAppt?.status || 'booked',
      testCentre: bookedAppt?.testCentre || 'DL-01 North Delhi Automated Track (Burari)',
      date: bookedAppt?.date || '18 September 2026',
      time: bookedAppt?.time || '10:30 AM',
      slot: bookedAppt?.slot || '10:30 AM – 11:30 AM',
      track: bookedAppt?.track || 'Track Bay 3',
      vehicleClass: bookedAppt?.vehicleClass || 'LMV'
    },
    testState: {
      llTest: { status: 'passed', score: '18/20', date: '20 Aug 2026' },
      dlTest: { status: 'scheduled', minHoldingPeriodMet: true, holdingDays: 34 }
    },
    governmentStatus: 'Under Scrutiny — Approved for Practical Test',
    governmentStatusLabel: 'Official Government Record: Under Scrutiny',
    guidanceNote: 'Your application is progressing normally. All mandatory verifications are complete.',
    lastUpdated: 'Today, 10:30 AM',
    isDemoData: true
  };
}

export function useJourneyContext(activeUser) {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchUserJourneyContext(activeUser).then((ctx) => {
      if (mounted) {
        setContext(ctx);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [activeUser]);

  return { context, loading };
}
