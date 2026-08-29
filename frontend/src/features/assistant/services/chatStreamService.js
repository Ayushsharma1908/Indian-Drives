import { ACTION_CATALOG } from '../actions/actionCatalog';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

/**
 * Stream conversational responses from the backend LLM provider
 */
export async function streamAssistantResponse({
  messages = [],
  userMessage = '',
  context = {},
  signal = null,
  onToken = () => {},
  onComplete = () => {},
  onError = () => {}
}) {
  try {
    const response = await fetch(`${baseUrl}/api/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        message: userMessage,
        context
      }),
      signal
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => 'Server error');
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.type === 'token') {
              accumulatedText += data.text;
              onToken(accumulatedText, data.text);
            } else if (data.type === 'error') {
              if (data.code === 'API_KEY_MISSING') {
                console.warn('Backend API key not set, using smart local assistant fallback...');
                simulateFallbackStream({ userMessage, onToken, onComplete });
                return;
              } else {
                throw new Error(data.message || 'Stream error');
              }
            }
          } catch (e) {
            // ignore partial JSON parse errors
          }
        }
      }
    }

    // Process completed accumulated text for Action & Suggestion tags
    const { cleanText, action, followUps } = parseActionAndSuggestionTags(accumulatedText, context);

    onComplete({
      fullText: cleanText,
      action,
      followUps
    });

  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Stream generation stopped by user.');
      return;
    }
    console.warn('Streaming backend unavailable, using smart local assistant fallback...', err);
    simulateFallbackStream({ userMessage, onToken, onComplete });
  }
}

function isRelevantQuery(userMessage = '') {
  const query = (userMessage || '').toLowerCase().trim();
  if (!query) return true;

  const unrelated = [
    'facebook', 'meta', 'apple', 'microsoft', 'amazon', 'twitter', 'instagram',
    'founder of', 'ceo of', 'who is president', 'capital of france', 'recipe',
    'python', 'java', 'c++', 'html', 'javascript', 'coding', 'programming',
    'cricket', 'football', 'ipl', 'movie', 'actor', 'actress', 'president of',
    'equation', 'physics', 'chemistry', 'joke', 'sing a song'
  ];

  if (unrelated.some(m => query.includes(m))) {
    return false;
  }

  return true;
}

/**
 * Fallback response simulator when backend server is offline or unreachable
 */
function simulateFallbackStream({ userMessage = '', onToken, onComplete }) {
  const query = userMessage.toLowerCase().trim();
  let responseText = "";
  let action = null;
  let followUps = ["What is my next step?", "What documents do I need?", "How to book a driving test slot?"];

  if (!isRelevantQuery(userMessage)) {
    responseText = `I am **DriveSeva AI**, an assistant specialized specifically for **Indian Drives - Driving Licence & RTO Citizen Services**.\n\nYour question seems unrelated to driving licences or RTO procedures. I can assist you with:\n\n- 📄 **Learner Licence (LL)**: Eligibility, application steps & online test prep\n- 🚗 **Driving Licence (DL)**: Practical test booking, track exercises & DL issuance\n- 📂 **Documents & Verification**: Aadhaar eKYC & Form 1A medical requirements\n- 💳 **Fees & Smartcard**: Fee structure, payment receipts & Speed Post tracking\n\nPlease ask a question related to your driving licence journey or RTO services!`;
    action = null;
    followUps = ["How do I apply for a Learner Licence?", "What documents do I need for DL?", "How to book a driving test slot?"];
  } else if (/^(hi|hello|namaste|hey|good\s*(morning|afternoon|evening))\b/i.test(query)) {
    responseText = `Namaste! 👋 Welcome to **Indian Drives**. I am your DriveSEVA Assistant.\n\nI can help you with:\n- 📄 **Learner Licence (LL)**: Application steps, rules & 15-min online test\n- 🚗 **Driving Test Slots**: Booking RTO automated track appointments\n- 📂 **Document Vault**: Aadhaar eKYC, address proof & Form 1A medical certs\n- 💳 **Payments & Receipts**: Fee structure & instant tax receipts\n- 🔄 **Citizen Services**: Licence renewal, duplicate smartcard & address change\n\nHow can I help you today?`;
    followUps = ["What is my next step?", "What documents do I need?", "How much is the licence fee?"];
  } else if (/\b(bring|carry|rto visit|checklist|prepare|what to bring)\b/i.test(query)) {
    responseText = `**RTO Test Day Checklist & Preparation**:\n\nWhen visiting the RTO for your practical driving test, please bring:\n\n1. 📋 **Printed Appointment Pass**: With QR code from Indian Drives\n2. 🆔 **Original Identity Proof**: Original Aadhaar Card / Passport\n3. 📄 **Form 3 Learner Licence**: Original or printed Learner Licence\n4. 💳 **Fee Payment Receipt**: Proof of application & test fee (TXN-882194)\n5. 🚗 **Test Vehicle**: Roadworthy vehicle with valid RC, Insurance, Pollution Certificate (PUC), and prominent red 'L' plates on front & rear.`;
    action = ACTION_CATALOG.VIEW_APPOINTMENT;
    followUps = ["Show my appointment", "What are the 4 track tests?", "What happens if I fail?"];
  } else if (/\b(book|booking|slot|appointment|schedule|reschedule|cancel slot|track)\b/i.test(query)) {
    responseText = `**Booking Your Practical Driving Test Slot**:\n\n1. **Eligibility**: Ensure your Learner Licence has been active for at least 30 days.\n2. **Select RTO Track**: Choose your local automated testing track (e.g. Jamshedpur RTO Track / Burari Track).\n3. **Pick Date & Time**: Select an available morning or afternoon slot.\n4. **Confirmation**: Confirm your booking and download your instant QR Appointment Pass.\n\n*Note: Free online rescheduling is available up to 48 hours prior to your slot.*`;
    action = ACTION_CATALOG.BOOK_TEST_SLOT;
    followUps = ["What should I bring to the RTO?", "Can I reschedule my appointment?", "What are the 4 track tests?"];
  } else if (/\b(learner|ll|quiz|exam|apply for learner|apply learner|form 2)\b/i.test(query)) {
    responseText = `**Applying for a Learner Licence (LL)**:\n\n1. **Form 2 Online Application**: Submit personal details with instant Aadhaar eKYC verification.\n2. **Document Upload**: Upload identity proof, address proof, and Form 1A self-declaration.\n3. **Fee Payment**: Pay ₹200 (Form fee + Online Assessment fee).\n4. **15-Minute Online Quiz**: Take the proctored traffic rules & road sign assessment (Pass mark: 9/15).\n5. **Instant LL Issuance**: Upon passing, your official Form 3 Learner Licence is generated instantly.`;
    action = ACTION_CATALOG.START_LL_APPLICATION;
    followUps = ["What documents do I need?", "How much is the LL fee?", "What is my next step?"];
  } else if (/\b(driving licence|dl|details|overview|about dl|permanent)\b/i.test(query)) {
    responseText = `**Driving Licence (DL) Overview & Process**:\n\n1. **Eligibility**: Active Learner Licence held for at least 30 days.\n2. **Application**: Launch guided DL application and verify address & details.\n3. **Practical Track Test**: Complete 4 automated maneuvers (Parallel Park, 8-Track, S-Track, Gradient Hill Stop & Start).\n4. **Smartcard Issuance**: After passing, your official Smartcard DL is printed and dispatched via Speed Post with live tracking.`;
    action = ACTION_CATALOG.START_DL_APPLICATION;
    followUps = ["How to book a driving test slot?", "What documents do I need for DL?", "How much is the DL fee?"];
  } else if (/\b(fail|failed|retest|retry|score|marks)\b/i.test(query)) {
    responseText = `**RTO Assessment & Retest Rules**:\n\n1. **Learner Licence (LL) Online Test**:\n   - Format: 15 Multiple-Choice Questions (Pass mark: 9/15).\n   - Retake: You can retake the online assessment after 24 hours.\n\n2. **Driving Licence (DL) Practical Track Test**:\n   - Evaluates 4 automated track maneuvers.\n   - If you do not qualify on test day, you can re-book a fresh test slot after 7 days from the portal.`;
    action = ACTION_CATALOG.BOOK_TEST_SLOT;
    followUps = ["What should I bring to the RTO?", "How to book a driving test slot?", "What are the 4 track tests?"];
  } else if (/\b(age|eligible|eligibility)\b/i.test(query)) {
    responseText = `**Official Age & Eligibility Criteria**:\n\n- **16 Years**: Learner Licence for non-geared 2-wheelers up to 50cc (with parental consent).\n- **18 Years**: Learner & Permanent Licence for LMV (Cars) and Geared Motor Cycles (MCWG).\n- **20 Years**: Commercial & Transport Vehicles.`;
    action = ACTION_CATALOG.START_LL_APPLICATION;
    followUps = ["What documents do I need?", "How to apply for Learner Licence?", "What is the LL fee?"];
  } else if (/\b(valid|validity|expire|expiry|duration|how long)\b/i.test(query)) {
    responseText = `**Licence Validity Terms**:\n\n- **Learner Licence (LL)**: Valid for **6 months** across all states in India. Non-renewable; apply for permanent DL after 30 days.\n- **Driving Licence (DL)**: Valid for **20 years** or until age 40 (whichever is earlier).\n- **International Driving Permit (IDP)**: Valid for **1 year** from date of issue.`;
    action = ACTION_CATALOG.RENEW_LICENCE;
    followUps = ["How to apply for DL?", "How to renew my licence?", "What documents are needed for DL?"];
  } else if (/\b(document|documents|proof|aadhaar|id|address|upload|photo)\b/i.test(query)) {
    responseText = `**Required Documents for Licence Application**:\n\n1. **Identity Proof**: Aadhaar Card (with eKYC verification), Voter ID, or Passport.\n2. **Address Proof**: Aadhaar Card, Electricity Bill, or Utility Bill matching your RTO jurisdiction.\n3. **Age Proof**: Birth Certificate, 10th School Certificate, or Passport.\n4. **Form 3 Learner Licence**: Copy of active LL (for permanent DL applications).\n5. **Form 1A Medical Cert**: Mandatory for applicants aged 50+ or Commercial licences.`;
    action = ACTION_CATALOG.UPLOAD_DOCUMENTS;
    followUps = ["What is my next step?", "How much is the licence fee?", "Show my appointment"];
  } else if (/\b(fee|fees|pay|payment|cost|charge|price|receipt)\b/i.test(query)) {
    responseText = `**Official RTO Licence Fee Structure**:\n\n- **Learner Licence (LL)**: ₹150 (Application Form) + ₹50 (Online Assessment) = **₹200**\n- **Driving Licence (DL)**: ₹200 (Form 7) + ₹300 (Automated Track Test) + ₹200 (Smartcard Printing) = **₹700**\n- **Licence Renewal**: **₹200**\n- **Address / Name Change**: **₹200**\n- **Duplicate Smartcard**: **₹200**`;
    action = ACTION_CATALOG.OPEN_PAYMENTS;
    followUps = ["Show my payment receipt", "What do I do next?", "How to book a test slot?"];
  } else if (/\b(renew|renewal|duplicate|change|service|international|idp)\b/i.test(query)) {
    responseText = `**Citizen Licence Services & Smartcard Updates**:\n\n- **DL Renewal**: Apply up to 1 year prior to expiry or within 1 year post expiry.\n- **Address Change**: Upload updated address proof with Aadhaar eKYC.\n- **Duplicate Smartcard**: Instant request if original card is lost, damaged, or stolen.\n- **International Driving Permit (IDP)**: Apply with valid passport, visa, and Form 1A medical cert.`;
    action = ACTION_CATALOG.RENEW_LICENCE;
    followUps = ["How to renew my licence?", "What documents are needed for renewal?", "Track my smartcard"];
  } else {
    responseText = `**Driving Licence Journey Guidance**:\n\n1. **Learner Licence**: Apply for Form 2 & pass 15-minute online quiz.\n2. **Practice Period**: Hold LL for 30 days.\n3. **Practical Driving Test**: Book automated track slot & pass 4 driving maneuvers.\n4. **Smartcard DL**: Printed & delivered to registered address.`;
    action = ACTION_CATALOG.START_DL_APPLICATION;
  }

  // Stream word by word cleanly to prevent cutting markdown bold formatting (*..*) in half
  const words = responseText.split(' ');
  let accumulated = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i >= words.length) {
      clearInterval(interval);
      onToken(responseText, responseText);
      onComplete({ fullText: responseText, action, followUps });
    } else {
      accumulated += (i === 0 ? '' : ' ') + words[i];
      onToken(accumulated, words[i]);
      i++;
    }
  }, 25);
}

/**
 * Parses tags like [[ACTION:ACTION_ID]] and [[SUGGESTIONS: a | b]]
 */
export function parseActionAndSuggestionTags(rawText = '', context = {}) {
  let cleanText = rawText;
  let action = null;
  let followUps = [];

  // 1. Extract Action Tag
  const actionMatch = cleanText.match(/\[\[ACTION:([A-Z_]+)\]\]/);
  if (actionMatch) {
    const actionKey = actionMatch[1];
    action = ACTION_CATALOG[actionKey] || null;
    cleanText = cleanText.replace(/\[\[ACTION:[A-Z_]+\]\]/, '').trim();
  }

  // 2. Extract Suggestions Tag
  const suggestionMatch = cleanText.match(/\[\[SUGGESTIONS:([^\]]+)\]\]/);
  if (suggestionMatch) {
    const rawSuggestions = suggestionMatch[1];
    followUps = rawSuggestions.split('|').map(s => s.trim()).filter(Boolean);
    cleanText = cleanText.replace(/\[\[SUGGESTIONS:[^\]]+\]\]/, '').trim();
  }

  // Fallback defaults if no suggestions provided
  if (followUps.length === 0) {
    followUps = [
      "What do I do next?",
      "What documents do I need?",
      "Check my driving test eligibility"
    ];
  }

  return { cleanText, action, followUps };
}

/**
 * Fetch chat history from backend MongoDB / store
 */
export async function fetchChatHistory() {
  try {
    const res = await fetch(`${baseUrl}/api/chat/history`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.success && Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error('Failed to fetch chat history:', err);
    return [];
  }
}

/**
 * Persist chat history to backend MongoDB / store
 */
export async function saveChatHistory(messages) {
  try {
    const res = await fetch(`${baseUrl}/api/chat/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to save chat history:', err);
    return false;
  }
}

/**
 * Clear chat history from backend MongoDB / store
 */
export async function clearChatHistory() {
  try {
    const res = await fetch(`${baseUrl}/api/chat/history`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to clear chat history:', err);
    return false;
  }
}
