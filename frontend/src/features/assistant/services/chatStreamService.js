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

  // 1. Explicitly unrelated markers (Checked FIRST)
  const unrelatedMarkers = [
    'facebook', 'meta', 'google', 'apple', 'microsoft', 'amazon', 'twitter', 'instagram',
    'founder of', 'ceo of', 'who is', 'capital of', 'weather in', 'recipe', 'python', 'java',
    'code', 'coding', 'programming', 'cricket', 'football', 'movie', 'actor', 'actress',
    'president', 'prime minister', 'math', 'equation', 'solve', 'physics', 'chemistry',
    'joke', 'song', 'sing', 'dance', 'who won', 'what is the capital', 'how to cook',
    'how to make', 'meaning of life'
  ];

  if (unrelatedMarkers.some(m => query.includes(m))) {
    return false;
  }

  // 2. Casual greetings & domain starters
  const greetings = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'thanks', 'thank you', 'who are you', 'what can you do', 'help'];
  if (greetings.some(g => query === g || query.startsWith(g + ' ') || query.endsWith(' ' + g))) {
    return true;
  }

  // 3. Driving & RTO Domain Keywords with Strict Word Boundaries (\b)
  const domainPattern = /\b(licence|license|dl|ll|learner|driving|rto|parivahan|sarathi|test|slot|track|document|documents|aadhaar|proof|fee|fees|payment|renew|renewal|duplicate|address|vehicle|car|bike|lmv|mcwg|traffic|signal|exam|quiz|smartcard|speedpost|rc|puc|form|ekyc|appointment|status|challan|chalan)\b/i;

  return domainPattern.test(query);
}

/**
 * Fallback response simulator when backend server is offline or unreachable
 */
function simulateFallbackStream({ userMessage = '', onToken, onComplete }) {
  const query = userMessage.toLowerCase();
  let responseText = "";
  let action = null;
  let followUps = ["How do I apply for a Learner Licence?", "What documents do I need for DL?", "How to book a driving test slot?"];

  if (!isRelevantQuery(userMessage)) {
    responseText = `I am **DriveSeva AI**, an assistant specialized specifically for **Indian Drives - Driving Licence & RTO Citizen Services**.\n\nYour question seems unrelated to driving licences or RTO procedures. I can assist you with:\n\n- 📄 **Learner Licence (LL)**: Eligibility, application steps & online test prep\n- 🚗 **Driving Licence (DL)**: Practical test booking, track exercises & DL issuance\n- 📂 **Documents & Verification**: Aadhaar eKYC & Form 1A medical requirements\n- 💳 **Fees & Smartcard**: Fee structure, payment receipts & Speed Post tracking\n\nPlease ask a question related to your driving licence journey or RTO services!`;
    action = null;
  } else if (/\b(learner|ll|quiz|exam)\b/i.test(query)) {
    responseText = `Eligibility: Minimum age is 18 years for LMV (16 years for non-geared 50cc 2-wheelers).\n\nApply Online: Submit your details, upload Aadhaar card & address proof.\n\nOnline Test: Complete the 15-minute proctored traffic rules assessment.\n\nFee Payment: Pay ₹150 for LL application & test fee.\n\nValidity: Learner Licence is valid for 6 months across India.`;
    action = ACTION_CATALOG.START_LL_APPLICATION;
  } else if (/\b(document|documents|proof|aadhaar|id|address)\b/i.test(query)) {
    responseText = `Required Documents for Licence Application:\n\nIdentity Proof: Aadhaar Card / Passport / Voter ID\n\nAddress Proof: Aadhaar Card / Electricity Bill / Ration Card\n\nAge Proof: Birth Certificate / 10th Marksheet / PAN Card\n\nPhoto & Signature: Scanned passport-size photo and signature.`;
    action = ACTION_CATALOG.UPLOAD_DOCUMENTS;
  } else if (/\b(slot|booking|appointment|track|rto test)\b/i.test(query)) {
    responseText = `Booking a Driving Test Slot:\n\nStep 1: Ensure your Learner Licence has been active for at least 30 days.\n\nStep 2: Choose your preferred RTO testing track and date.\n\nStep 3: Select an available morning or afternoon time slot.\n\nStep 4: Confirm slot booking and download your appointment receipt.`;
    action = ACTION_CATALOG.BOOK_TEST_SLOT;
  } else {
    responseText = `Eligibility: Ensure your Learner Licence has been valid for at least 30 days.\n\nApply Online: Launch the guided DL application and enter your LL number.\n\nDocuments: Keep your Learner Licence and Address Proof ready.\n\nFee Payment: Pay the required fee for test slot & smartcard issuance.\n\nBook a Test: Schedule your practical driving test slot at your local RTO.`;
    action = ACTION_CATALOG.START_DL_APPLICATION;
  }

  let currentLength = 0;
  const interval = setInterval(() => {
    currentLength += 12;
    if (currentLength >= responseText.length) {
      clearInterval(interval);
      onToken(responseText, responseText);
      onComplete({ fullText: responseText, action, followUps });
    } else {
      onToken(responseText.slice(0, currentLength));
    }
  }, 20);
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
