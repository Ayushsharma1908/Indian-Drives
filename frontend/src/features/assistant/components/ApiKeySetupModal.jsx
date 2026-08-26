import React from 'react';
import { KeyRound, CheckCircle2, ExternalLink, Terminal, Sparkles, Copy, X } from 'lucide-react';

export function ApiKeySetupModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 37, 66, 0.55)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          maxWidth: '560px',
          width: '100%',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#f1f5f9',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#fff7ed',
              color: '#e88a2d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <KeyRound size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
              Connect Live AI Provider
            </h3>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Enable real streaming LLM conversations with Gemini or OpenAI
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #edf2f7' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#002542', color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              1
            </span>
            <div style={{ fontSize: '13px', color: '#173b57' }}>
              Get a free API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#e88a2d', fontWeight: 700, textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              >
                Google AI Studio (Free) <ExternalLink size={12} />
              </a>
              {' '}or OpenAI Platform.
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #edf2f7' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#002542', color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              2
            </span>
            <div style={{ fontSize: '13px', color: '#173b57', width: '100%' }}>
              Add it to <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>backend/.env</code>:
              <div style={{ marginTop: '6px', background: '#0f172a', color: '#38bdf8', padding: '8px 12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px' }}>
                GEMINI_API_KEY=your_key_here
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #edf2f7' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#002542', color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              3
            </span>
            <div style={{ fontSize: '13px', color: '#173b57' }}>
              Restart your development server:
              <div style={{ marginTop: '6px', background: '#0f172a', color: '#4ade80', padding: '8px 12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px' }}>
                npm run dev
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: '#002542',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Got it, I'll configure it
          </button>
        </div>
      </div>
    </div>
  );
}
