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

  if (query.includes('bring') || query.includes('carry') || query.includes('checklist') || query.includes('prepare')) {
    return `**RTO Test Day Checklist & Preparation**:

When visiting the RTO for your practical driving test, please bring:

1. 📋 **Printed Appointment Pass**: With QR code from Indian Drives
2. 🆔 **Original Identity Proof**: Original Aadhaar Card / Passport
3. 📄 **Form 3 Learner Licence**: Original or printed Learner Licence
4. 💳 **Fee Payment Receipt**: Proof of application & test fee (TXN-882194)
5. 🚗 **Test Vehicle**: Roadworthy vehicle with valid RC, Insurance, Pollution Certificate (PUC), and prominent red 'L' plates on front & rear.
[[ACTION:VIEW_APPOINTMENT]]
[[SUGGESTIONS: Show my appointment | What are the 4 track tests? | What happens if I fail?]]`;
  }

  if (query.includes('book') || query.includes('slot') || query.includes('appointment') || query.includes('schedule') || query.includes('reschedule') || query.includes('track')) {
    return `**Booking Your Practical Driving Test Slot**:

1. **Eligibility**: Ensure your Learner Licence has been active for at least 30 days.
2. **Select RTO Track**: Choose your local automated testing track (e.g. Jamshedpur RTO Track / Burari Track).
3. **Pick Date & Time**: Select an available morning or afternoon slot.
4. **Confirmation**: Confirm your booking and download your instant QR Appointment Pass.

*Note: Free online rescheduling is available up to 48 hours prior to your slot.*
[[ACTION:BOOK_APPOINTMENT]]
[[SUGGESTIONS: What should I bring to the RTO? | Can I reschedule my appointment? | What are the 4 track tests?]]`;
  }

  if (query.includes('learner') || query.includes('ll') || query.includes('quiz') || query.includes('exam') || query.includes('form 2')) {
    return `**Applying for a Learner Licence (LL)**:

1. **Form 2 Online Application**: Submit personal details with instant Aadhaar eKYC verification.
2. **Document Upload**: Upload identity proof, address proof, and Form 1A self-declaration.
3. **Fee Payment**: Pay ₹200 (Form fee + Online Assessment fee).
4. **15-Minute Online Quiz**: Take the proctored traffic rules & road sign assessment (Pass mark: 9/15).
5. **Instant LL Issuance**: Upon passing, your official Form 3 Learner Licence is generated instantly.
[[ACTION:START_LL_APPLICATION]]
[[SUGGESTIONS: What documents do I need? | How much is the LL fee? | What is my next step?]]`;
  }

  if (query.includes('driving licence') || query.includes('dl') || query.includes('details') || query.includes('overview') || query.includes('permanent')) {
    return `**Driving Licence (DL) Overview & Process**:

1. **Eligibility**: Active Learner Licence held for at least 30 days.
2. **Application**: Launch guided DL application and verify address & details.
3. **Practical Track Test**: Complete 4 automated maneuvers (Parallel Park, 8-Track, S-Track, Gradient Hill Stop & Start).
4. **Smartcard Issuance**: After passing, your official Smartcard DL is printed and dispatched via Speed Post with live tracking.
[[ACTION:START_DL_APPLICATION]]
[[SUGGESTIONS: How to book a driving test slot? | What documents do I need for DL? | How much is the DL fee?]]`;
  }

  if (query.includes('fail') || query.includes('retest') || query.includes('retry') || query.includes('score') || query.includes('marks')) {
    return `**RTO Assessment & Retest Rules**:

1. **Learner Licence (LL) Online Test**:
   - Format: 15 Multiple-Choice Questions (Pass mark: 9/15).
   - Retake: You can retake the online assessment after 24 hours.

2. **Driving Licence (DL) Practical Track Test**:
   - Evaluates 4 automated track maneuvers.
   - If you do not qualify on test day, you can re-book a fresh test slot after 7 days from the portal.
[[ACTION:BOOK_APPOINTMENT]]
[[SUGGESTIONS: What should I bring to the RTO? | How to book a driving test slot? | What are the 4 track tests?]]`;
  }

  if (query.includes('age') || query.includes('eligible') || query.includes('eligibility')) {
    return `**Official Age & Eligibility Criteria**:

- **16 Years**: Learner Licence for non-geared 2-wheelers up to 50cc (with parental consent).
- **18 Years**: Learner & Permanent Licence for LMV (Cars) and Geared Motor Cycles (MCWG).
- **20 Years**: Commercial & Transport Vehicles.
[[ACTION:START_LL_APPLICATION]]
[[SUGGESTIONS: What documents do I need? | How to apply for Learner Licence? | What is the LL fee?]]`;
  }

  if (query.includes('valid') || query.includes('expire') || query.includes('duration') || query.includes('how long')) {
    return `**Licence Validity Terms**:

- **Learner Licence (LL)**: Valid for **6 months** across all states in India. Non-renewable; apply for permanent DL after 30 days.
- **Driving Licence (DL)**: Valid for **20 years** or until age 40 (whichever is earlier).
- **International Driving Permit (IDP)**: Valid for **1 year** from date of issue.
[[ACTION:RENEW_LICENCE]]
[[SUGGESTIONS: How to apply for DL? | How to renew my licence? | What documents are needed for DL?]]`;
  }

  if (query.includes('document') || query.includes('proof') || query.includes('aadhaar') || query.includes('upload') || query.includes('photo')) {
    return `**Required Documents for Licence Application**:

1. **Identity Proof**: Aadhaar Card (with eKYC verification), Voter ID, or Passport.
2. **Address Proof**: Aadhaar Card, Electricity Bill, or Utility Bill matching your RTO jurisdiction.
3. **Age Proof**: Birth Certificate, 10th School Certificate, or Passport.
4. **Form 3 Learner Licence**: Copy of active LL (for permanent DL applications).
5. **Form 1A Medical Cert**: Mandatory for applicants aged 50+ or Commercial licences.
[[ACTION:OPEN_DOCUMENT_CENTER]]
[[SUGGESTIONS: What is my next step? | How much is the licence fee? | Show my appointment]]`;
  }

  if (query.includes('fee') || query.includes('pay') || query.includes('cost') || query.includes('charge') || query.includes('price') || query.includes('receipt')) {
    return `**Official RTO Licence Fee Structure**:

- **Learner Licence (LL)**: ₹150 (Application Form) + ₹50 (Online Assessment) = **₹200**
- **Driving Licence (DL)**: ₹200 (Form 7) + ₹300 (Automated Track Test) + ₹200 (Smartcard Printing) = **₹700**
- **Licence Renewal**: **₹200**
- **Address / Name Change**: **₹200**
- **Duplicate Smartcard**: **₹200**
[[ACTION:OPEN_PAYMENTS]]
[[SUGGESTIONS: Show my payment receipt | What do I do next? | How to book a test slot?]]`;
  }

  if (query.includes('renew') || query.includes('duplicate') || query.includes('address') || query.includes('change') || query.includes('service') || query.includes('international') || query.includes('idp')) {
    return `**Citizen Licence Services & Smartcard Updates**:

- **DL Renewal**: Apply up to 1 year prior to expiry or within 1 year post expiry.
- **Address Change**: Upload updated address proof with Aadhaar eKYC.
- **Duplicate Smartcard**: Instant request if original card is lost, damaged, or stolen.
- **International Driving Permit (IDP)**: Apply with valid passport, visa, and Form 1A medical cert.
[[ACTION:RENEW_LICENCE]]
[[SUGGESTIONS: How to renew my licence? | What documents are needed for renewal? | Track my smartcard]]`;
  }

  return `**Driving Licence Journey Guidance**:

1. **Learner Licence**: Apply for Form 2 & pass 15-minute online quiz.
2. **Practice Period**: Hold LL for 30 days.
3. **Practical Driving Test**: Book automated track slot & pass 4 driving maneuvers.
4. **Smartcard DL**: Printed & delivered to registered address.
[[ACTION:START_DL_APPLICATION]]
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
