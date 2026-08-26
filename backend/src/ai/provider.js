import { buildSystemPrompt } from './systemPrompt.js';

/**
 * Stream LLM completion to HTTP response using Server-Sent Events (SSE)
 */
export async function streamChatCompletion({ messages = [], userMessage = '', context = {}, res }) {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('YOUR_')) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const errorPayload = {
      type: 'error',
      code: 'API_KEY_MISSING',
      message: 'AI API Key is not configured in backend/.env',
      details: {
        envLocation: 'backend/.env',
        variables: ['AI_API_KEY', 'GEMINI_API_KEY'],
        instructions: 'Add GEMINI_API_KEY to backend/.env and restart server.'
      }
    };

    res.write(`data: ${JSON.stringify(errorPayload)}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  const systemPrompt = buildSystemPrompt(context);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

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
    console.error('LLM Stream Error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message || 'Error communicating with AI model' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}

/**
 * Google Gemini SSE Streaming Provider with Automatic Fallback
 */
async function streamGemini({ apiKey, systemPrompt, messages, userMessage, res }) {
  const modelsToTry = [
    process.env.AI_MODEL || 'gemini-3.6-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash',
    'gemini-3.7-flash'
  ];

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

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`Gemini Error (${response.status} ${model}): ${errorText}`);
        continue; // Try next model
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
            } catch (e) {}
          }
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
      return; // Succeeded!
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Could not connect to any Gemini model');
}

/**
 * OpenAI / Compatible Provider (GPT-4o-mini, Groq, Ollama)
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
    throw new Error(`OpenAI/Compatible API Error (${response.status}): ${errorText}`);
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
