import { buildSystemPrompt } from './systemPrompt.js';

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

function getSmartKnowledgeResponse(userMessage = '') {
  const query = (userMessage || '').toLowerCase().trim();

  if (!isRelevantQuery(userMessage)) {
    return `I am **DriveSeva AI**, an assistant specialized specifically for **Indian Drives - Driving Licence & RTO Citizen Services**.

Your question seems unrelated to driving licences or RTO procedures. I can assist you with:

- 📄 **Learner Licence (LL)**: Eligibility, application steps & online test prep
- 🚗 **Driving Licence (DL)**: Practical test booking, track exercises & DL issuance
- 📂 **Documents & Verification**: Aadhaar eKYC & Form 1A medical requirements
- 💳 **Fees & Smartcard**: Fee structure, payment receipts & Speed Post tracking

Please ask a question related to your driving licence journey or RTO services!
[[SUGGESTIONS: How do I apply for a Learner Licence? | What documents do I need for DL? | How to book a driving test slot?]]`;
  }

  if (/^(hi|hello|namaste|hey|good\s*(morning|afternoon|evening))\b/i.test(query)) {
    return `Namaste! 👋 Welcome to **Indian Drives**. I am your DriveSEVA Assistant.

I can help you with:
- 📄 **Learner Licence (LL)**: Application steps, rules & 15-min online test
- 🚗 **Driving Test Slots**: Booking RTO automated track appointments
- 📂 **Document Vault**: Aadhaar eKYC, address proof & Form 1A medical certs
- 💳 **Payments & Receipts**: Fee structure & instant tax receipts
- 🔄 **Citizen Services**: Licence renewal, duplicate smartcard & address change

How can I help you today?
[[SUGGESTIONS: What is my next step? | What documents do I need? | How much is the licence fee?]]`;
  }

  if (query.includes('fail') || query.includes('retest') || query.includes('retry') || query.includes('score') || query.includes('marks')) {
    return `RTO Assessment & Retest Rules:

1. **Learner Licence (LL) Online Test**:
   - Format: 15 Multiple-Choice Questions on road signs & safety.
   - Passing Score: **9 out of 15** (60%).
   - If you don't pass on your first attempt, you can retake the online assessment after 24 hours.

2. **Driving Licence (DL) Practical Track Test**:
   - Evaluates 4 automated track maneuvers: Parallel Parking, 8-Track, S-Track, and Gradient Hill Stop & Start.
   - If you do not qualify on test day, you can re-book a fresh test slot after 7 days from the portal.
[[ACTION:BOOK_APPOINTMENT]]
[[SUGGESTIONS: What should I bring to the RTO? | How to book a driving test slot? | What are the 4 track tests?]]`;
  }

  if (query.includes('age') || query.includes('eligible') || query.includes('eligibility')) {
    return `Official Age & Eligibility Criteria for Indian Driving Licences:

- **16 Years**: Learner Licence for non-geared 2-wheelers up to 50cc (with parental consent).
- **18 Years**: Learner & Permanent Licence for Light Motor Vehicles (LMV - Cars) and Geared Motor Cycles (MCWG).
- **20 Years**: Commercial & Transport Vehicles (requires valid LMV licence for 1+ year).

All applicants must pass the mandatory Aadhaar eKYC verification and Form 1A medical self-declaration.
[[ACTION:START_LL_APPLICATION]]
[[SUGGESTIONS: What documents do I need? | How to apply for Learner Licence? | What is the LL fee?]]`;
  }

  if (query.includes('valid') || query.includes('expire') || query.includes('duration') || query.includes('how long')) {
    return `Licence Validity Terms:

- **Learner Licence (LL)**: Valid for **6 months** across all states in India. Non-renewable; must apply for permanent DL within 6 months.
- **Driving Licence (DL)**: Valid for **20 years** or until age 40 (whichever comes earlier). After age 40, DL is renewed in 5-year increments.
- **International Driving Permit (IDP)**: Valid for **1 year** from date of issue.
[[ACTION:RENEW_LICENCE]]
[[SUGGESTIONS: How to apply for DL? | How to renew my licence? | What documents are needed for DL?]]`;
  }

  if (query.includes('document') || query.includes('proof') || query.includes('aadhaar') || query.includes('upload') || query.includes('photo')) {
    return `Required Documents for Indian Driving Licence:

1. **Identity Proof**: Aadhaar Card (with instant eKYC verification), Passport, or Voter ID.
2. **Address Proof**: Aadhaar Card, Electricity Bill, or Utility Bill matching your RTO jurisdiction.
3. **Age Proof**: Birth Certificate, 10th School Certificate, or Passport.
4. **Form 3 Learner Licence**: Copy of active LL (for permanent DL applications).
5. **Form 1A Medical Cert**: Mandatory for applicants aged 50+ or Commercial licences.

All documents are stored and verified securely in your digital Document Vault on Indian Drives.
[[ACTION:OPEN_DOCUMENT_CENTER]]
[[SUGGESTIONS: What is my next step? | How much is the licence fee? | Show my appointment]]`;
  }

  if (query.includes('test') || query.includes('slot') || query.includes('track') || query.includes('booking') || query.includes('appointment')) {
    return `To prepare for and book your RTO Practical Driving Test:

1. **Eligibility**: You can book a test slot 30 days after your Learner Licence issuance.
2. **Automated Track Exercises**:
   - **LMV (Car)**: Parallel Parking, 8-Track Steering, S-Track, and Gradient Hill Stop & Start.
   - **MCWG (Two-Wheeler)**: Figure-8 balance track and emergency braking zone.
3. **Slot Booking**: Select your local RTO track, preferred date, and morning/afternoon time slot.
4. **Rescheduling**: You can reschedule your slot online for free up to 48 hours before your appointment.
[[ACTION:VIEW_APPOINTMENT]]
[[SUGGESTIONS: What should I bring to the RTO? | Can I reschedule my appointment? | What documents do I need?]]`;
  }

  if (query.includes('bring') || query.includes('carry') || query.includes('rto visit') || query.includes('prepare') || query.includes('checklist')) {
    return `RTO Test Day Checklist:

Please bring the following to your testing track:
1. **Printed Appointment Pass**: With QR code from Indian Drives.
2. **Original Identity Proof**: Original Aadhaar Card / Passport.
3. **Form 3 Learner Licence**: Original or printed copy.
4. **Fee Payment Receipt**: Proof of application & test fee.
5. **Test Vehicle**: Roadworthy vehicle with valid RC, Insurance, PUC certificate, and prominent red 'L' plates on front and rear.
[[ACTION:VIEW_APPOINTMENT]]
[[SUGGESTIONS: Show my appointment | What are the 4 track tests? | What happens if I fail?]]`;
  }

  if (query.includes('fee') || query.includes('pay') || query.includes('cost') || query.includes('charge') || query.includes('price') || query.includes('receipt')) {
    return `Official RTO Licence Fee Structure:

- **Learner Licence (LL)**: ₹150 (Application Form) + ₹50 (Online Assessment) = **₹200**
- **Driving Licence (DL)**: ₹200 (Form 7) + ₹300 (Automated Track Test) + ₹200 (Smartcard Printing) = **₹700**
- **Licence Renewal**: **₹200**
- **Address / Name Change**: **₹200**
- **Duplicate Smartcard**: **₹200**

All payments include official tax receipts with Treasury GRN numbers, payable via UPI, Credit/Debit Card, or Net Banking.
[[ACTION:OPEN_PAYMENTS]]
[[SUGGESTIONS: Show my payment receipt | What do I do next? | How to book a test slot?]]`;
  }

  if (query.includes('learner') || query.includes('ll') || query.includes('exam') || query.includes('quiz')) {
    return `Learner Licence (LL) Process & Online Quiz:

1. **Form 2 Submission**: Complete your online application with Aadhaar eKYC.
2. **Online Assessment**: Take the 15-minute proctored traffic rules & road sign quiz.
3. **Passing Score**: Score **9 out of 15** correct answers.
4. **Instant Download**: Upon passing, your Form 3 Learner Licence is instantly generated.
5. **Validity**: Valid for 6 months across India.
[[ACTION:START_LL_APPLICATION]]
[[SUGGESTIONS: What documents do I need? | How much is the LL fee? | What is my next step?]]`;
  }

  if (query.includes('renew') || query.includes('duplicate') || query.includes('address') || query.includes('change') || query.includes('international') || query.includes('service')) {
    return `Citizen Licence Services & Smartcard Updates:

- **DL Renewal**: Apply up to 1 year prior to expiry or within 1 year post expiry.
- **Address Change**: Upload updated address proof with Aadhaar eKYC.
- **Duplicate Smartcard**: Instant request if original card is lost, damaged, or stolen.
- **International Driving Permit (IDP)**: Apply with valid passport, visa, and Form 1A medical cert.
- **Speed Post Tracking**: Track your smartcard delivery live from your dashboard.
[[ACTION:RENEW_LICENCE]]
[[SUGGESTIONS: How to renew my licence? | What documents are needed for renewal? | Track my smartcard]]`;
  }

  return `Namaste! I am DriveSeva AI, your digital assistant for Indian driving licence & RTO citizen services.

I can assist you with:
- **Learner Licence (LL)**: Form 2 application, rules & online test prep
- **Driving Licence (DL)**: Practical test booking & automated track exercises
- **Documents**: Aadhaar eKYC & Form 1A medical certificates
- **Payments**: Official fee receipts & smartcard payment tracking
- **Citizen Services**: DL renewal, duplicate smartcard & address change

How can I help you today?
[[SUGGESTIONS: What is my next step? | What documents do I need? | How to book a driving test slot?]]`;
}

async function streamFallbackKnowledge({ userMessage, res }) {
  const answer = getSmartKnowledgeResponse(userMessage);
  const words = answer.split(' ');
  for (let i = 0; i < words.length; i++) {
    const textChunk = (i === 0 ? '' : ' ') + words[i];
    res.write(`data: ${JSON.stringify({ type: 'token', text: textChunk })}\n\n`);
    await new Promise((r) => setTimeout(r, 15));
  }
  res.write('data: [DONE]\n\n');
  res.end();
}

/**
 * Stream LLM completion to HTTP response using Server-Sent Events (SSE)
 */
export async function streamChatCompletion({ messages = [], userMessage = '', context = {}, res }) {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

  // Set SSE Headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const isRealKey = Boolean(
    apiKey &&
    apiKey.trim() !== '' &&
    !apiKey.startsWith('YOUR_')
  );

  if (!isRealKey) {
    // Gracefully stream smart knowledge responses when no external API key is set
    await streamFallbackKnowledge({ userMessage, res });
    return;
  }

  const systemPrompt = buildSystemPrompt(context);

  try {
    if (provider === 'gemini') {
      await streamGemini({ apiKey, systemPrompt, messages, userMessage, res });
    } else if (provider === 'openai' || provider === 'groq' || provider === 'ollama') {
      await streamOpenAI({ apiKey, provider, systemPrompt, messages, userMessage, res });
    } else if (provider === 'anthropic') {
      await streamAnthropic({ apiKey, systemPrompt, messages, userMessage, res });
    } else {
      await streamGemini({ apiKey, systemPrompt, messages, userMessage, res });
    }
  } catch (error) {
    console.error('LLM Stream Error, falling back to smart knowledge:', error.message);
    await streamFallbackKnowledge({ userMessage, res });
  }
}

/**
 * Google Gemini SSE Streaming Provider
 */
async function streamGemini({ apiKey, systemPrompt, messages, userMessage, res }) {
  const modelsToTry = [process.env.AI_MODEL || 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  let response = null;
  let lastError = null;

  const contents = [];
  for (const m of messages) {
    if (m.text || m.content) {
      contents.push({
        role: m.sender === 'assistant' || m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text || m.content }]
      });
    }
  }

  if (userMessage) {
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });
  }

  const body = {
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hello' }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024
    }
  };

  for (const model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;
    try {
      const resAttempt = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (resAttempt.ok) {
        response = resAttempt;
        break;
      } else {
        const errorText = await resAttempt.text();
        lastError = new Error(`Gemini API Error (${resAttempt.status}): ${errorText}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  if (!response || !response.ok) {
    throw lastError || new Error('Gemini API connection failed');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
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
        if (!jsonStr) continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const candidate = parsed.candidates?.[0];
          const textChunk = candidate?.content?.parts?.[0]?.text;

          if (textChunk) {
            res.write(`data: ${JSON.stringify({ type: 'token', text: textChunk })}\n\n`);
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
}

/**
 * OpenAI / Compatible Provider
 */
async function streamOpenAI({ apiKey, provider, systemPrompt, messages, userMessage, res }) {
  const model = process.env.AI_MODEL || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');
  const baseUrl = process.env.AI_BASE_URL || (provider === 'groq' ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1');

  const formattedMessages = [{ role: 'system', content: systemPrompt }];

  for (const m of messages) {
    formattedMessages.push({
      role: m.sender === 'assistant' || m.role === 'assistant' ? 'assistant' : 'user',
      content: m.text || m.content
    });
  }

  if (userMessage) {
    formattedMessages.push({ role: 'user', content: userMessage });
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: formattedMessages,
      temperature: 0.7,
      stream: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API Error (${response.status}): ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
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
          const parsed = JSON.parse(jsonStr);
          const textChunk = parsed.choices?.[0]?.delta?.content;
          if (textChunk) {
            res.write(`data: ${JSON.stringify({ type: 'token', text: textChunk })}\n\n`);
          }
        } catch (e) {}
      }
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
}

/**
 * Anthropic Claude Provider
 */
async function streamAnthropic({ apiKey, systemPrompt, messages, userMessage, res }) {
  const model = process.env.AI_MODEL || 'claude-3-5-sonnet-20241022';
  const url = 'https://api.anthropic.com/v1/messages';

  const formattedMessages = [];
  for (const m of messages) {
    formattedMessages.push({
      role: m.sender === 'assistant' || m.role === 'assistant' ? 'assistant' : 'user',
      content: m.text || m.content
    });
  }

  if (userMessage) {
    formattedMessages.push({ role: 'user', content: userMessage });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      system: systemPrompt,
      messages: formattedMessages,
      max_tokens: 1024,
      stream: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API Error (${response.status}): ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
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
        if (!jsonStr) continue;

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
            res.write(`data: ${JSON.stringify({ type: 'token', text: parsed.delta.text })}\n\n`);
          }
        } catch (e) {}
      }
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
}
