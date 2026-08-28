import { ACTION_CATALOG } from '../actions/actionCatalog';

/**
 * Concise, Conversational Intent Parser and Reasoning Engine
 * Provides natural, human, 2-5 sentence responses without encyclopedic dumps.
 */
export function parseAssistantIntent(input, context, conversationHistory = []) {
  const query = (input || '').trim().toLowerCase();
  const userName = context.userName || 'Raj';
  const appt = context.appointmentState || {};

  // 1. CASUAL GREETINGS
  if (/^(hi|hello|namaste|hey|good\s*(morning|afternoon|evening))\b/i.test(query)) {
    return {
      answer: `Hello, ${userName}! 👋 How can I help you with your driving licence journey today?`,
      statusBadge: null,
      action: null,
      followUps: [
        "What do I do next?",
        "What documents do I need?",
        "Check my appointment"
      ]
    };
  }

  // 2. GRATITUDE / CASUAL CLOSING
  if (/^(thanks|thank you|great|awesome|ok|okay|got it|bye)\b/i.test(query)) {
    return {
      answer: `You're welcome, ${userName}! Feel free to ask anytime if you need help with your application, documents, or driving test.`,
      statusBadge: null,
      action: null,
      followUps: [
        "What do I do next?",
        "Show my appointment"
      ]
    };
  }

  // 3. CAPABILITIES / WHAT CAN YOU DO
  if (/what\s*can\s*you\s*do|who\s*are\s*you|how\s*can\s*you\s*help/i.test(query)) {
    return {
      answer: `I can help you navigate the licence application process, check your document status, verify fee payments, guide your automated driving test bookings, and direct you to the right RTO citizen services.`,
      statusBadge: null,
      action: null,
      followUps: [
        "What do I do next?",
        "What documents do I need?",
        "Check my payment"
      ]
    };
  }

  // 4. OVERVIEW / BROAD ENCYCLOPEDIC QUESTIONS
  if (/tell\s*me\s*everything|all\s*about\s*(driving\s*)?licence|everything\s*about/i.test(query)) {
    return {
      answer: `Sure! What would you like to know more about: applying for a Learner Licence (LL), permanent Driving Licence (DL) procedures, document requirements, fee payments, or your current progress?`,
      statusBadge: null,
      action: null,
      followUps: [
        "What do I do next?",
        "What documents do I need for DL?",
        "How to book a driving test slot?"
      ]
    };
  }

  // 5. NEXT STEP / WHERE AM I / WHAT TO DO NEXT
  if (/next\s*step|what\s*(do\s*i\s*do|should\s*i\s*do|now)|where\s*am\s*i|progress|guide\s*me/i.test(query)) {
    if (appt.hasAppointment || appt.date) {
      return {
        answer: `Your DL application, document proofs, and fees are all verified. Your next step is to attend your practical driving test on **${appt.date || '24 Oct 2026'}** at **${appt.time || '10:00 AM'}** at the **Jamshedpur RTO Track**.`,
        statusBadge: null,
        action: ACTION_CATALOG.VIEW_APPOINTMENT,
        followUps: [
          "What should I bring to the RTO?",
          "Can I reschedule my appointment?"
        ]
      };
    }

    return {
      answer: `You're currently at the **Driving Licence Application** stage. Your Learner Licence is verified. The next step is to select your test track and schedule your practical driving test slot.`,
      statusBadge: null,
      action: ACTION_CATALOG.BOOK_APPOINTMENT,
      followUps: [
        "What documents do I need?",
        "How much is the DL fee?"
      ]
    };
  }

  // 6. DOCUMENTS
  if (/document|proof|aadhaar|upload|photo|form\s*1a/i.test(query)) {
    return {
      answer: `For your Driving Licence, your identity proof (Aadhaar), address proof, and Form 3 Learner Licence are verified in your Document Vault. You can review your uploaded proofs or upload new documents anytime.`,
      statusBadge: null,
      action: ACTION_CATALOG.OPEN_DOCUMENT_CENTER,
      followUps: [
        "What do I do next?",
        "What should I bring to the RTO?"
      ]
    };
  }

  // 7. PAYMENTS / RECEIPTS / FEES
  if (/pay|fee|cost|charge|receipt|txn/i.test(query)) {
    return {
      answer: `Your DL application fee of **₹450** (Ref: **TXN-882194**) is successfully paid and verified. You can view or download your official tax receipt from the Payments Hub.`,
      statusBadge: null,
      action: ACTION_CATALOG.OPEN_PAYMENTS,
      followUps: [
        "What do I do next?",
        "Show my appointment"
      ]
    };
  }

  // 8. APPOINTMENTS / TEST BOOKINGS
  if (/appointment|slot|test|booking|venue|track|reschedule|cancel/i.test(query)) {
    if (query.includes('reschedule')) {
      return {
        answer: `You can reschedule your driving test appointment online for free up to 48 hours prior to your scheduled slot from the Appointments section.`,
        statusBadge: null,
        action: ACTION_CATALOG.RESCHEDULE_APPOINTMENT,
        followUps: [
          "Show my appointment",
          "What do I do next?"
        ]
      };
    }

    return {
      answer: `Your automated track test is booked for **${appt.date || '24 Oct 2026'}** at **${appt.time || '10:00 AM'}** at **${appt.testCentre || 'Jamshedpur RTO Test Track'}**. Would you like to view your appointment pass?`,
      statusBadge: null,
      action: ACTION_CATALOG.VIEW_APPOINTMENT,
      followUps: [
        "What should I bring to the RTO?",
        "Can I reschedule my appointment?"
      ]
    };
  }

  // 9. RTO VISIT CHECKLIST
  if (/bring|rto\s*visit|prepare|carry|what\s*to\s*bring|checklist/i.test(query)) {
    return {
      answer: `On test day, carry: (1) Printed Appointment Pass with QR, (2) Original Aadhaar / ID proof, (3) Form 3 Learner Licence, (4) Fee Payment Receipt, and (5) a roadworthy vehicle with red "L" plates.`,
      statusBadge: null,
      action: ACTION_CATALOG.VIEW_APPOINTMENT,
      followUps: [
        "Show my appointment",
        "What do I do next?"
      ]
    };
  }

  // 10. LICENCE SERVICES (RENEWAL, DUPLICATE, ADDRESS)
  if (/renew|duplicate|update\s*address|change\s*address|international/i.test(query)) {
    return {
      answer: `You can manage licence renewals, duplicate smartcard requests, and address updates directly through our Licence Services Hub online with Aadhaar authentication.`,
      statusBadge: null,
      action: ACTION_CATALOG.RENEW_LICENCE,
      followUps: [
        "How long is DL valid?",
        "What documents are needed for renewal?"
      ]
    };
  }

  // 11. DEFAULT CONTEXTUAL FALLBACK
  return {
    answer: `I can help you check your driving licence application status, review documents, verify payments, or prepare for your upcoming test. What would you like to do?`,
    statusBadge: null,
    action: ACTION_CATALOG.OPEN_APPLICATION_STATUS,
    followUps: [
      "What do I do next?",
      "What documents do I need?",
      "Show my appointment"
    ]
  };
}
