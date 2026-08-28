import { api } from '../../../services/api';
import { parseAssistantIntent } from './intentParser';

/**
 * Assistant Service combining backend API knowledge with client-side context engine
 */
export async function sendAssistantQuery(message, context, history = []) {
  // First generate the rich client-side context & action payload
  const localAnalysis = parseAssistantIntent(message, context, history);

  try {
    // Attempt to hit backend /api/ai/chat if server is running
    const res = await api.askAI(message).catch(() => null);
    if (res && res.answer) {
      return {
        ...localAnalysis,
        answer: res.answer,
        actions: res.actions || localAnalysis.actions,
        sources: res.sources || [
          { name: 'Ministry of Road Transport and Highways (MoRTH)', url: 'https://morth.nic.in' },
          { name: 'Sarathi Parivahan Citizen Portal', url: 'https://sarathi.parivahan.gov.in' }
        ]
      };
    }
  } catch (err) {
    console.debug('Using client reasoning engine:', err);
  }

  return {
    ...localAnalysis,
    sources: [
      { name: 'Ministry of Road Transport and Highways (MoRTH)', url: 'https://morth.nic.in' },
      { name: 'Sarathi Parivahan Citizen Portal', url: 'https://sarathi.parivahan.gov.in' }
    ]
  };
}
