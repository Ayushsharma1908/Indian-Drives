import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Send,
  Bot,
  User,
  RefreshCw,
  Square,
  ArrowRight,
  ExternalLink,
  Phone
} from 'lucide-react';
import { useJourneyContext } from '../../features/assistant/context/JourneyContextEngine';
import { streamAssistantResponse } from '../../features/assistant/services/chatStreamService';
import { executeAction } from '../../features/assistant/actions/actionCatalog';
import { ActionCard } from '../../features/assistant/components/ActionCard';
import { ConfirmationModal } from '../../features/assistant/components/ConfirmationModal';

export function AskIndianDrivesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { context } = useJourneyContext();
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const [streamingMessageId, setStreamingMessageId] = useState(null);

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const initialPromptTriggered = useRef(false);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! 👋 I'm your Indian Drives AI guide. How can I help you with your driving licence today?",
      followUps: [
        "What is my next step?",
        "What documents do I need?",
        "What should I bring to the RTO?",
        "Check my driving test status"
      ]
    }
  ]);

  // Handle incoming query parameter e.g. /ask?q=...
  useEffect(() => {
    const incomingQuery = searchParams.get('q') || searchParams.get('prompt');
    if (incomingQuery && !initialPromptTriggered.current) {
      initialPromptTriggered.current = true;
      setTimeout(() => {
        handleSendMessage(incomingQuery);
      }, 300);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isStreaming) return;

    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    const userMessage = {
      id: userMsgId,
      sender: 'user',
      text: text.trim()
    };

    const botPlaceholder = {
      id: botMsgId,
      sender: 'assistant',
      text: '',
      isPending: true
    };

    setMessages(prev => [...prev, userMessage, botPlaceholder]);
    setInput('');
    setIsStreaming(true);
    setStreamingMessageId(botMsgId);

    const abortCtrl = new AbortController();
    abortControllerRef.current = abortCtrl;

    await streamAssistantResponse({
      messages: messages.filter(m => m.text),
      userMessage: text.trim(),
      context,
      signal: abortCtrl.signal,
      onToken: (accumulatedText) => {
        setMessages(prev =>
          prev.map(m => (m.id === botMsgId ? { ...m, text: accumulatedText, isPending: false } : m))
        );
      },
      onComplete: ({ fullText, action, followUps }) => {
        setIsStreaming(false);
        setStreamingMessageId(null);
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? {
                  ...m,
                  text: fullText,
                  action,
                  followUps,
                  isPending: false
                }
              : m
          )
        );
      },
      onError: (err) => {
        setIsStreaming(false);
        setStreamingMessageId(null);
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? {
                  ...m,
                  text: "I'm having trouble connecting right now. Please check if the backend server is running.",
                  isPending: false,
                  followUps: ["What is my next step?", "Check my documents"]
                }
              : m
          )
        );
      }
    });
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setStreamingMessageId(null);
    }
  };

  const handleActionExecute = (action) => {
    if (!action) return;

    if (action.requiresConfirm) {
      setModalConfig({
        isOpen: true,
        title: action.confirmTitle || 'Confirm Action',
        message: action.confirmMessage || 'Are you sure you want to proceed?',
        onConfirm: () => {
          setModalConfig({ isOpen: false });
          executeAction(action.id, {}, navigate);
        }
      });
      return;
    }

    executeAction(action.id, {}, navigate);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: "Hello! 👋 How can I help you with your driving licence today?",
        followUps: [
          "What is my next step?",
          "What documents do I need?",
          "What should I bring to the RTO?"
        ]
      }
    ]);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 78px)', padding: '24px 0 40px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* CLEAN MINIMAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#002542', margin: '0 0 2px 0', letterSpacing: '-0.4px' }}>
              Ask Indian Drives
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Your AI guide for driving licences and transport services.
            </p>
          </div>

          <button
            onClick={handleResetChat}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#476179',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            <RefreshCw size={13} /> New Chat
          </button>
        </div>

        {/* CHAT CONTAINER */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 12px rgba(0, 37, 66, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '520px',
          overflow: 'hidden'
        }}>
          
          {/* MESSAGES SCROLL AREA */}
          <div style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            minHeight: '420px'
          }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  maxWidth: '85%',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  flexDirection: m.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: m.sender === 'user' ? '#002542' : '#f1f5f9',
                    color: m.sender === 'user' ? '#ffffff' : '#002542',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  {m.sender === 'user' ? <User size={16} /> : <Bot size={18} />}
                </div>

                {/* Bubble */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                  <div
                    style={{
                      background: m.sender === 'user' ? '#002542' : '#f8fafc',
                      color: m.sender === 'user' ? '#ffffff' : '#1e293b',
                      border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                      borderRadius: m.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                      padding: '14px 18px',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {/* Typing state */}
                    {m.isPending && !m.text && (
                      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '4px 0' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'pulse 1s infinite' }} />
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'pulse 1s infinite 0.2s' }} />
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'pulse 1s infinite 0.4s' }} />
                      </div>
                    )}

                    {/* Text Body */}
                    {m.text && (
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {m.text}
                        {m.id === streamingMessageId && (
                          <span style={{ display: 'inline-block', width: '5px', height: '13px', background: '#002542', marginLeft: '3px', verticalAlign: 'middle', animation: 'pulse 0.8s infinite' }} />
                        )}
                      </div>
                    )}

                    {/* Clean Action Card */}
                    {m.action && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                        <button
                          onClick={() => handleActionExecute(m.action)}
                          style={{
                            background: '#002542',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '9px 16px',
                            fontSize: '13px',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}
                        >
                          {m.action.label || m.action.shortLabel || 'Continue'} <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Clean follow-up pills */}
                  {m.followUps && m.followUps.length > 0 && !isStreaming && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                      {m.followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '4px 11px',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#476179',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.color = '#002542';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.color = '#476179';
                          }}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div style={{ padding: '14px 18px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Message Ask Indian Drives..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                color: '#1e293b'
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#002542')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
            />

            {isStreaming ? (
              <button
                onClick={handleStopGeneration}
                style={{
                  background: '#f1f5f9',
                  color: '#476179',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Square size={12} fill="#476179" /> Stop
              </button>
            ) : (
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#002542' : '#f1f5f9',
                  color: input.trim() ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Send size={15} /> Send
              </button>
            )}
          </div>

        </div>

        {/* SUBTLE FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '12px', color: '#64748b', padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={13} color="#e88a2d" />
            <span>Transport Helpline: <strong>1077 / 011-23953785</strong> (Mon–Fri, 9:30 AM–5:30 PM)</span>
          </div>

          <a
            href="https://parivahan.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#64748b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
          >
            Official Parivahan <ExternalLink size={11} />
          </a>
        </div>

      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig({ isOpen: false })}
      />
    </div>
  );
}
