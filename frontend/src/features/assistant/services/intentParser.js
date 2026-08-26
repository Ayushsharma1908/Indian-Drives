import { ACTION_CATALOG } from '../actions/actionCatalog';

/**
 * Intelligent Intent Parser and Reasoning Engine
 * Evaluates user input against central JourneyContext and knowledge base
 */
export function parseAssistantIntent(input, context, conversationHistory = []) {
  const query = (input || '').trim().toLowerCase();
  
  // 1. GREETING / CASUAL
  if (/^(hi|hello|namaste|hey|good\s*(morning|afternoon|evening))\b/i.test(query)) {
    return {
      answer: `Namaste, ${context.userName}! I am your Indian Drives AI Assistant. Your Learner Licence (${context.learnerLicenceNumber}) is active and verified. I'm here to guide you to your permanent Driving Licence or assist with any licence services.`,
      statusBadge: { type: 'guidance', text: 'Active LL Stage · DL Ready' },
      action: ACTION_CATALOG.CONTINUE_DL_APPLICATION,
      followUps: [
        "What's my next step?",
        "Check my driving test eligibility",
        "What documents do I need for DL?",
        "What should I bring to the RTO?"
      ]
    };
  }

  // 2. NEXT STEP / WHERE AM I / WHAT TO DO NEXT
  if (/next\s*step|what\s*(do\s*i\s*do|should\s*i\s*do|now)|where\s*am\s*i|progress|guide\s*me/i.test(query)) {
    if (context.appointmentState?.hasAppointment) {
      return {
        answer: `You have completed your DL application, verified all 4 mandatory documents, and paid the fees. Your upcoming milestone is your **Driving Skill Test** scheduled for **${context.appointmentState.date}** at **${context.appointmentState.time}**.`,
        statusBadge: { type: 'government', text: 'Government Status: Approved for Test' },
        action: ACTION_CATALOG.VIEW_APPOINTMENT,
        checklist: null,
        followUps: [
          "What should I bring to the RTO?",
          "Can I reschedule my test?",
          "Check test eligibility requirements"
        ]
      };
    }

    return {
      answer: `You're currently at the **Driving Licence Application** stage. Your Learner Licence is verified. The next step is to finalize your application and book your practical driving test slot at the Burari Automated Track.`,
      statusBadge: { type: 'government', text: 'Stage: DL Application' },
      action: ACTION_CATALOG.CONTINUE_DL_APPLICATION,
      followUps: [
        "Check my driving test eligibility",
        "What documents do I need?",
        "How much is the DL fee?"
      ]
    };
  }

  // 3. DRIVING TEST / TEST BOOKING / ELIGIBILITY CHECK
  if (/book\s*(test|slot|appointment|dl)|driving\s*test|dl\s*test|eligib|slot\s*book/i.test(query)) {
    return {
      answer: `Before booking or attending your practical driving test, let's verify all statutory prerequisites under the Motor Vehicles Act.`,
      statusBadge: { type: 'government', text: 'Prerequisites Evaluation' },
      multiStepCheck: [
        { label: 'Learner Licence Status (LL/24/09/8821)', status: 'verified', note: 'Valid & Active until 2027' },
        { label: '30-Day Mandatory Holding Period', status: 'verified', note: '34 days completed (Min 30 days required)' },
        { label: 'Document Scrutiny (4/4 Proofs)', status: 'verified', note: 'Identity, Address, LL Form 3, Photo verified' },
        { label: 'Application Fee & Test Charges', status: 'verified', note: 'Paid ₹200 (TXN-882194)' },
        { label: 'Automated Track Slot Availability', status: 'verified', note: 'Available at Burari Track (DL-01)' }
      ],
      action: context.appointmentState?.hasAppointment ? ACTION_CATALOG.VIEW_APPOINTMENT : ACTION_CATALOG.BOOK_APPOINTMENT,
      followUps: [
        "What should I bring to the RTO?",
        "Can I reschedule my appointment?",
        "Where is the Burari test centre located?"
      ]
    };
  }

  // 4. RTO VISIT PREPARATION / WHAT TO BRING / APPOINTMENT CHECKLIST
  if (/bring|rto\s*visit|prepare|take\s*to\s*rto|what\s*to\s*carry|visit\s*checklist|tomorrow/i.test(query)) {
    return {
      answer: `Here is your **RTO Visit Preparation Checklist** for your appointment on **${context.appointmentState.date}** at **${context.appointmentState.time}** at **${context.appointmentState.testCentre}**:`,
      statusBadge: { type: 'guidance', text: 'Personalized RTO Preparation Pass' },
      rtoChecklist: [
        { text: 'Printed Appointment Confirmation Slip with QR code', required: true, note: 'Available in Appointments Hub' },
        { text: 'Original Identity Proof (Aadhaar Card / Voter ID)', required: true, note: 'Must match application details' },
        { text: 'Printed Learner Licence Certificate (Form 3)', required: true, note: 'Official issued copy' },
        { text: 'Payment Fee Receipt (TXN-882194 - ₹200)', required: true, note: 'Proves test fee clearance' },
        { text: 'Vehicle of relevant class (LMV) with valid RC, Insurance & PUC', required: true, note: 'Must have red "L" plates front & rear' },
        { text: 'Arrive 15–30 minutes prior to slot time for biometric check-in', required: false, note: 'Reporting time: 10:00 AM' }
      ],
      action: ACTION_CATALOG.VIEW_APPOINTMENT,
      followUps: [
        "Can I reschedule my appointment?",
        "What happens if I fail the test?",
        "View my application status"
      ]
    };
  }

  // 5. APPOINTMENT DETAILS / RESCHEDULE / CANCEL
  if (/appointment|slot|reschedule|cancel\s*appointment|when\s*is\s*my/i.test(query)) {
    if (query.includes('reschedule')) {
      return {
        answer: `You can reschedule your driving test slot online without forfeiting your fee, provided you request the change at least 24 hours prior to your scheduled slot.`,
        statusBadge: { type: 'attention', text: 'Reschedule Available' },
        action: ACTION_CATALOG.RESCHEDULE_APPOINTMENT,
        followUps: [
          "View current appointment",
          "What should I bring to RTO?",
          "Cancel my appointment"
        ]
      };
    }

    if (query.includes('cancel')) {
      return {
        answer: `Cancelling your appointment will release your test slot. You can book a new slot anytime before your Learner Licence expires on **13 Jan 2027**.`,
        statusBadge: { type: 'attention', text: 'Cancellation Notice' },
        action: ACTION_CATALOG.CANCEL_APPOINTMENT,
        followUps: [
          "Reschedule instead",
          "View appointment details",
          "Back to next step"
        ]
      };
    }

    return {
      answer: `You have an active appointment for **${context.appointmentState.vehicleClass} Driving Skill Test** at **${context.appointmentState.testCentre}** on **${context.appointmentState.date}** at **${context.appointmentState.time}** (${context.appointmentState.track}).`,
      statusBadge: { type: 'government', text: 'Appointment Booked · Slot Confirmed' },
      action: ACTION_CATALOG.VIEW_APPOINTMENT,
      followUps: [
        "What should I bring to RTO?",
        "Reschedule appointment",
        "Check my documents"
      ]
    };
  }

  // 6. DOCUMENTS / UPLOAD / REJECTED
  if (/doc|proof|upload|aadhaar|electricity|photo|signature|reject/i.test(query)) {
    if (/reject|why\s*was|issue|problem/i.test(query)) {
      return {
        answer: `All 4 documents attached to your application **${context.applicationNumber}** are currently marked **Verified ✓** by the RTO Scrutiny Officer. If any future document requires re-upload, you'll receive an instant notification and direct re-upload link.`,
        statusBadge: { type: 'government', text: 'Document Status: 4 of 4 Verified' },
        action: ACTION_CATALOG.OPEN_DOCUMENT_CENTER,
        followUps: [
          "What documents are needed for DL?",
          "Check driving test eligibility",
          "View payment receipt"
        ]
      };
    }

    return {
      answer: `For your Driving Licence application (**${context.vehicleClass}**), your verified documents include:
• **Identity Proof**: Aadhaar Card (Verified ✓)
• **Address Proof**: Electricity Bill (Verified ✓)
• **Licence Proof**: Learner Licence Form 3 (Verified ✓)
• **Biometrics**: Passport Photo & Signature (Verified ✓)

No further document uploads are required at this time.`,
      statusBadge: { type: 'government', text: 'Document Center: All Verified' },
      action: ACTION_CATALOG.OPEN_DOCUMENT_CENTER,
      followUps: [
        "What should I bring to the RTO?",
        "Check test booking",
        "View application status"
      ]
    };
  }

  // 7. PAYMENTS / FEES / RECEIPT
  if (/pay|fee|receipt|cost|charge|transaction|refund|failed|unpaid/i.test(query)) {
    return {
      answer: `Your DL application fee of **${context.paymentState.amount}** was successfully processed on **${context.paymentState.date}** under Transaction ID **${context.paymentState.transactionId}**. Your receipt is available for download.`,
      statusBadge: { type: 'government', text: 'Payment Status: Verified (₹200 Paid)' },
      action: ACTION_CATALOG.OPEN_PAYMENTS,
      followUps: [
        "Book or view my driving test",
        "What should I bring to the RTO?",
        "Check my application status"
      ]
    };
  }

  // 8. APPLICATION STATUS / GOVERNMENT RECORD EXPLANATION
  if (/status|scrutiny|under\s*review|where\s*is\s*my\s*app|track/i.test(query)) {
    return {
      answer: `**Official Government Record**: *${context.governmentStatus}*

**Plain-Language Explanation**:
Your application (**${context.applicationNumber}**) has successfully cleared all online scrutiny steps (document authentication, fee verification, and LL validity). Your file is now cleared for the practical driving test.`,
      statusBadge: { type: 'government', text: context.governmentStatusLabel },
      action: ACTION_CATALOG.OPEN_APPLICATION_STATUS,
      followUps: [
        "What's my next step?",
        "View my appointment",
        "What should I bring to RTO?"
      ]
    };
  }

  // 9. LEARNER LICENCE (LL) SPECIFIC
  if (/\b(ll|learner|learning|theory\s*test|form\s*3)\b/i.test(query)) {
    return {
      answer: `Your Learner Licence (**${context.learnerLicenceNumber}**) was issued on 14 July 2026 and remains valid until 13 Jan 2027. You have satisfied the mandatory 30-day holding period and are fully eligible for your permanent Driving Licence test.`,
      statusBadge: { type: 'government', text: 'LL Status: Active & Valid' },
      action: ACTION_CATALOG.OPEN_DL_ENTRY,
      followUps: [
        "Continue to DL application",
        "Book driving test slot",
        "What should I bring to RTO?"
      ]
    };
  }

  // 10. LICENCE SERVICES / RENEWAL / DUPLICATE / ADDRESS CHANGE
  if (/renew|duplicate|lost\s*licence|change\s*address|update\s*licence|service/i.test(query)) {
    let chosenAction = ACTION_CATALOG.OPEN_LICENCE_SERVICES;
    let detailText = "You can access citizen licence services directly online.";

    if (query.includes('renew')) {
      chosenAction = ACTION_CATALOG.RENEW_LICENCE;
      detailText = "Driving Licence renewal is available up to 1 year prior to expiry and within 1 year after expiry with standard renewal fees.";
    } else if (query.includes('duplicate') || query.includes('lost')) {
      chosenAction = ACTION_CATALOG.REQUEST_DUPLICATE;
      detailText = "You can apply for a duplicate Smart Card licence if your original is lost, stolen, or mutilated.";
    } else if (query.includes('address') || query.includes('update')) {
      chosenAction = ACTION_CATALOG.UPDATE_LICENCE_DETAILS;
      detailText = "You can update your residential address or contact details with supporting Aadhaar / Utility Bill proof.";
    }

    return {
      answer: `${detailText} All citizen services are routed to your registered RTO (${context.rto}).`,
      statusBadge: { type: 'guidance', text: 'Citizen Licence Services' },
      action: chosenAction,
      followUps: [
        "What documents are needed for renewal?",
        "Manage my existing licence",
        "Back to my DL application"
      ]
    };
  }

  // 11. HUMAN ESCALATION / CONTACT / HELP
  if (/help|support|contact|call|officer|human|complaint|grievance/i.test(query)) {
    return {
      answer: `If you require official assistance beyond our AI guide, you can access the Indian Drives Help Center or contact the Delhi Transport Department helpline (1077 / 011-23953785) or Parivahan Sewa portal.`,
      statusBadge: { type: 'guidance', text: 'Official Support & Help' },
      action: ACTION_CATALOG.OPEN_HELP,
      followUps: [
        "What's my next step?",
        "Check my application status",
        "What should I bring to RTO?"
      ]
    };
  }

  // 12. FALLBACK CONTEXTUAL ANSWER
  return {
    answer: `Regarding **"${input}"**: Based on your current driving licence profile in **${context.state}** (RTO: **${context.rtoCode}**), your Learner Licence is verified and your DL application is progressing smoothly. Let me know how I can help you move forward.`,
    statusBadge: { type: 'guidance', text: 'Indian Drives Assistant' },
    action: ACTION_CATALOG.OPEN_APPLICATION_STATUS,
    followUps: [
      "What is my next step?",
      "Check driving test eligibility",
      "What should I bring to the RTO?",
      "Check my documents"
    ]
  };
}
