import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, User, Bot, TrafficCone, HelpCircle } from 'lucide-react';

export function AskIndianDrivesPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am your DriveSeva AI Assistant. How can I help you with your Learner Licence exam, Driving Licence application, or RTO slot booking today?'
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Thank you for your question regarding "${userMsg}". Under Motor Vehicle Rules, you can complete this process online via Indian Drives. Please let me know if you need step-by-step help!`
        }
      ]);
    }, 800);
  };

  return (
    <div className="page page-ask">
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <span className="eye-badge" style={{ background: 'var(--saffron-soft)', color: '#000' }}><Sparkles size={14} /> AI DRIVING ASSISTANT</span>
        <h1>Ask DriveSeva</h1>
        <p>Instant answers on RTO rules, traffic sign quizzes, and application guidelines.</p>
      </div>

      <div className="services-panel" style={{ height: '520px', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bot size={24} />
          <div>
            <h3 style={{ margin: 0, fontSize: '16px' }}>DriveSeva AI Helper</h3>
            <span style={{ fontSize: '11px', color: '#93c5fd' }}>Online • 24/7 Official Guidance</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--background)' }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: m.sender === 'user' ? 'var(--primary)' : '#fff',
                color: m.sender === 'user' ? '#fff' : 'var(--text)',
                padding: '14px 18px',
                borderRadius: '16px',
                boxShadow: 'var(--shadow)',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid var(--surface-high)', display: 'flex', gap: '12px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Type your RTO or licence query here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1 }}
          />
          <button className="primary-button" onClick={handleSend} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
