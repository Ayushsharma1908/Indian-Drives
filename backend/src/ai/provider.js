import { buildSystemPrompt } from './systemPrompt.js';

function getSmartKnowledgeResponse(userMessage = '') {
  const query = (userMessage || '').toLowerCase();

  if (query.includes('document') || query.includes('proof') || query.includes('aadhaar')) {
    return `For your Driving Licence & RTO services, here are the required documents:

1. **Identity & Address Proof**: Aadhaar Card (with eKYC verification), Voter ID, or Passport.
2. **Learner Licence (LL)**: Form 3 Learner Licence copy (valid for 6 months).
3. **Medical Certificate**: Form 1A signed by a registered medical practitioner (mandatory for applicants aged 50+ or Commercial licences).
4. **Fee Payment Receipt**: Proof of application & smartcard payment.

All documents can be uploaded digitally on Indian Drives for instant verification without physical queues.`;
  }

  if (query.includes('test') || query.includes('slot') || query.includes('track') || query.includes('booking') || query.includes('appointment')) {
    return `To prepare for and book your RTO Practical Driving Test:

1. **Eligibility**: You can book a driving test slot 30 days after your Learner Licence (LL) issuance.
2. **Automated Track Exercises**:
   - **LMV (Car)**: Parallel Parking, 8-Track Steering, S-Track, and Gradient Stop & Start.
   - **MCWG (Two-Wheeler)**: Figure-8 balance track and emergency braking zone.
3. **What to Carry on Test Day**:
   - Original Learner Licence (Form 3)
   - Printed Appointment Pass & Fee Receipt
   - Valid Original ID Proof (Aadhaar/Passport)
   - Vehicle with valid RC, Insurance, PUC & 'L' plates attached.`;
  }

  if (query.includes('fee') || query.includes('pay') || query.includes('cost') || query.includes('charge') || query.includes('price')) {
    return `Official RTO Licence Fee Structure:

- **Learner Licence (LL)**: ₹150 (Form fee) + ₹50 (Online test fee) = **₹200**
- **Driving Licence (DL)**: ₹200 (Form 7) + ₹300 (Automated track test) + ₹200 (Smartcard printing) = **₹700**
- **Renewal / Address Change**: ₹200 to ₹400 based on service type.

All payments can be made securely via UPI, Net Banking, or Credit/Debit Card on Indian Drives.`;
  }

  if (query.includes('learner') || query.includes('ll') || query.includes('exam') || query.includes('quiz')) {
    return `Learner Licence (LL) Rules & Online Assessment:

1. **Assessment Format**: 15 Multiple-Choice Questions covering traffic signals, road signs, and driving safety.
2. **Passing Score**: Minimum **9 / 15** correct answers.
3. **Validity**: Valid for 6 months across India.
4. **Next Step**: Eligible to take the practical driving test after 30 days of LL issuance.`;
  }

  if (query.includes('renew') || query.includes('duplicate') || query.includes('address') || query.includes('service')) {
    return `Licence Services & Smartcard Maintenance:

- **DL Renewal**: Can be applied up to 1 year prior to expiry or within 1 year post expiry.
- **Address Change**: Upload proof of new address with Aadhaar eKYC.
- **Duplicate Smartcard**: Instant request if original card is lost, damaged, or torn.
- **Status Tracking**: Track Speed Post delivery status live from your dashboard.`;
  }

  return `Namaste! I am DriveSeva AI, your digital assistant for Indian driving licence & RTO citizen services.

I can help you with:
- **Learner Licence (LL)**: Rules, eligibility & online practice test
- **Driving Test**: Automated track guidance & slot booking
- **Documents & Verification**: Aadhaar eKYC & Form 1A rules
- **Fee Payments**: Receipt downloads & fee breakdown
- **Smartcard Tracking**: Speed Post dispatch status

How can I assist you today?`;
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
    // Send structured setup error so frontend triggers ApiKeySetupModal
    const errorPayload = {
      type: 'error',
      code: 'API_KEY_MISSING',
      message: 'AI API Key is not configured in backend/.env',
      details: {
        envLocation: 'backend/.env',
        variables: ['GEMINI_API_KEY', 'OPENAI_API_KEY', 'AI_API_KEY'],
        instructions: 'Please add your API key to backend/.env and restart the server.\nExample: GEMINI_API_KEY=AQ.Ab8RN6...\nGet free Gemini key at: https://aistudio.google.com/app/apikey'
      }
    };

    res.write(`data: ${JSON.stringify(errorPayload)}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
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
