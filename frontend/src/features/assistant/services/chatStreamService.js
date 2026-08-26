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
                onError({
                  isMissingKey: true,
                  message: data.message,
                  details: data.details
                });
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
    console.error('Streaming error:', err);
    onError(err);
  }
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
