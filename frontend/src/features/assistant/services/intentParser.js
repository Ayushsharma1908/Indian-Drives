import { ACTION_CATALOG } from '../actions/actionCatalog';

/**
 * Comprehensive Intent Parser and Reasoning Engine
 * Evaluates user input against central JourneyContext and official Motor Vehicles rules
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
        "What do I do next?",
        "Check driving test eligibility",
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

  // 3. START LL APPLICATION
  if (/apply\s*(for\s*)?(my\s*)?(ll|learner|learning)|start\s*(with\s*)?ll|fresh|scratch/i.test(query)) {
    return {
      answer: `To start fresh with a new Learner Licence, you can complete the online Form 2 application with Aadhaar eKYC, select your vehicle class (LMV/MCWG), and take the online theory test from home.`,
      statusBadge: { type: 'guidance', text: 'Stage 01 · Starting Fresh' },
      action: ACTION_CATALOG.START_LL_APPLICATION,
      followUps: [
        "What documents are needed for LL?",
        "I already have a Learner Licence",
        "How much is the LL application fee?"
      ]
    };
  }

  // 4. TRANSITION FROM LL TO DL
  if (/have\s*(an?\s*)?(ll|learner)|transition\s*to\s*dl|want\s*(my\s*)?driving\s*licence|convert\s*ll/i.test(query)) {
    return {
      answer: `Since your Learner Licence (**${context.learnerLicenceNumber}**) is active and verified, you can proceed directly with your permanent Driving Licence (DL) Form 4 application.`,
      statusBadge: { type: 'government', text: 'LL Verified · Ready for DL' },
      action: ACTION_CATALOG.CONTINUE_DL_APPLICATION,
      followUps: [
        "Check my driving test eligibility",
        "What documents do I need?",
        "Book my driving test"
      ]
    };
  }

  // 5. DRIVING TEST / TEST BOOKING / ELIGIBILITY CHECK
  if (/book\s*(test|slot|appointment|dl)|driving\s*test|dl\s*test|eligib|slot\s*book|can\s*i\s*book/i.test(query)) {
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

  // 6. RTO VISIT PREPARATION / WHAT TO BRING
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

  // 7. APPOINTMENT DETAILS / RESCHEDULE / CANCEL
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

  // 8. DOCUMENTS / REUSE / REJECTED / UPLOAD
  if (/doc|proof|upload|aadhaar|electricity|photo|signature|reject|reuse/i.test(query)) {
    if (/reuse|use\s*again|same\s*doc/i.test(query)) {
      return {
        answer: `**Document Reuse Policy**: Yes! Under Parivahan eKYC, previously authenticated identity (Aadhaar) and address documents from your Learner Licence application are automatically ported and linked to your DL application (**${context.applicationNumber}**).`,
        statusBadge: { type: 'guidance', text: 'eKYC Portability Active' },
        action: ACTION_CATALOG.OPEN_DOCUMENT_CENTER,
        followUps: [
          "Check verified documents",
          "Check test eligibility",
          "View application status"
        ]
      };
    }

    if (/reject|why\s*was|signature|issue|problem/i.test(query)) {
      return {
        answer: `All 4 documents attached to your application **${context.applicationNumber}** are currently marked **Verified ✓** by the RTO Scrutiny Officer. If any document is rejected (e.g. signature blur or expired utility bill), you can re-upload a clear copy directly in the Document Center.`,
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

  // 9. PAYMENTS / FEES / FAILED / RECEIPT
  if (/pay|fee|receipt|cost|charge|transaction|refund|failed|unpaid/i.test(query)) {
    if (/fail|unpaid|error/i.test(query)) {
      return {
        answer: `If a payment fails or is marked unpaid, the Sarathi gateway holds the session for 15 minutes before reconciliation. Do not make duplicate payments immediately — click **Check Payment Status** to verify the gateway response, or retry if marked failed.`,
        statusBadge: { type: 'attention', text: 'Payment Troubleshooting' },
        action: ACTION_CATALOG.OPEN_PAYMENTS,
        followUps: [
          "Check payment status",
          "View payment receipt",
          "Book my driving test"
        ]
      };
    }

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

  // 10. APPLICATION STATUS / GOVERNMENT RECORD EXPLANATIONS
  if (/status|scrutiny|under\s*review|where\s*is\s*my\s*app|track|explain\s*status/i.test(query)) {
    let explanation = `Your application (**${context.applicationNumber}**) has successfully cleared all online scrutiny steps (document authentication, fee verification, and LL validity). Your file is now cleared for the practical driving test.`;

    if (/under\s*scrutiny/i.test(query)) {
      explanation = `**Under Scrutiny**: Your application has been received by the RTO and all initial identity and fee checks have been approved. No action is required from you until test day.`;
    } else if (/document\s*pending/i.test(query)) {
      explanation = `**Document Pending**: The application is waiting for document verification or signature review.`;
    } else if (/payment\s*pending/i.test(query)) {
      explanation = `**Payment Pending**: The application fee has not yet been cleared by the bank gateway.`;
    }

    return {
      answer: `**Official Government Record**: *${context.governmentStatus}*

**Plain-Language Explanation**:
${explanation}`,
      statusBadge: { type: 'government', text: context.governmentStatusLabel },
      action: ACTION_CATALOG.OPEN_APPLICATION_STATUS,
      followUps: [
        "What's my next step?",
        "View my appointment",
        "What should I bring to RTO?"
      ]
    };
  }

  // 11. SHOW / DOWNLOAD LICENCE
  if (/show\s*(my\s*)?licence|download\s*(my\s*)?licence|digital\s*(dl|licence)|view\s*licence/i.test(query)) {
    return {
      answer: `Your digital Learner Licence (**${context.learnerLicenceNumber}**) is available in your digital cockpit. Your permanent Driving Licence will be issued immediately upon passing your practical driving test on **${context.appointmentState.date}**.`,
      statusBadge: { type: 'government', text: 'Digital Licence Vault' },
      action: ACTION_CATALOG.OPEN_LICENCE,
      followUps: [
        "View test appointment",
        "What should I bring to RTO?",
        "Licence services hub"
      ]
    };
  }

  // 12. RTO LOCATION / WHERE IS MY RTO
  if (/where\s*is\s*my\s*rto|location|burari|address\s*of\s*rto/i.test(query)) {
    return {
      answer: `Your registered RTO and testing facility:
• **Office**: Transport Department Zonal Office, Mall Road, North Delhi
• **Automated Driving Test Track**: Burari Automated Driving Test Center, Outer Ring Road, Delhi - 110084
• **Your Track Bay**: Track Bay 3 (LMV Track)`,
      statusBadge: { type: 'guidance', text: 'DL-01 RTO Location Details' },
      action: ACTION_CATALOG.VIEW_APPOINTMENT,
      followUps: [
        "What should I bring to RTO?",
        "Reschedule appointment",
        "What is my next step?"
      ]
    };
  }

  // 13. LICENCE SERVICES / RENEWAL / DUPLICATE / ADDRESS CHANGE
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

  // 14. HUMAN ESCALATION / CONTACT / HELP
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

  // 15. FALLBACK CONTEXTUAL ANSWER
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
