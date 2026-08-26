import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  HelpCircle,
  Phone,
  Compass,
  AlertCircle,
  Square,
  KeyRound,
  Zap
} from 'lucide-react';
import { useJourneyContext } from '../../features/assistant/context/JourneyContextEngine';
import { streamAssistantResponse } from '../../features/assistant/services/chatStreamService';
import { executeAction } from '../../features/assistant/actions/actionCatalog';
import { ActionCard } from '../../features/assistant/components/ActionCard';
import { MultiStepCheckCard } from '../../features/assistant/components/MultiStepCheckCard';
import { RTOChecklistCard } from '../../features/assistant/components/RTOChecklistCard';
import { ConfirmationModal } from '../../features/assistant/components/ConfirmationModal';
import { ApiKeySetupModal } from '../../features/assistant/components/ApiKeySetupModal';

export function AskIndianDrivesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { context, loading } = useJourneyContext();
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [aiConfig, setAiConfig] = useState(null);
  const [streamingMessageId, setStreamingMessageId] = useState(null);

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const initialPromptTriggered = useRef(false);

  const [messages, setMessages] = useState([]);

  // Check backend AI config on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5001"}/api/ai/config`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAiConfig(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Initialize personalized greeting on context load
  useEffect(() => {
    if (context && messages.length === 0) {
      const initialGreeting = {
        id: 'welcome',
        sender: 'assistant',
        timestamp: 'Just now',
        text: `Hello, ${context.userName}! 👋 I am your Indian Drives conversational guide. I can help you understand your driving-licence journey, answer your questions, check documents, payments, tests and appointments, and help you take the next step. What would you like help with today?`,
        statusBadge: { type: 'guidance', text: 'Live AI Assistant' },
        action: null,
        followUps: [
          "What do I do next?",
          "Check driving test eligibility",
          "What documents do I need?",
          "What should I bring to the RTO?"
        ]
      };

      setMessages([initialGreeting]);

      // Check for incoming query parameter e.g. /ask?q=... or /ask?prompt=...
      const incomingQuery = searchParams.get('q') || searchParams.get('prompt');
      if (incomingQuery && !initialPromptTriggered.current) {
        initialPromptTriggered.current = true;
        setTimeout(() => {
          handleSendMessage(incomingQuery);
        }, 300);
      }
    }
  }, [context, searchParams]);

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
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botPlaceholder = {
      id: botMsgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
                  isPending: false,
                  statusBadge: action ? { type: 'government', text: 'Recommended Action' } : null
                }
              : m
          )
        );
      },
      onError: (err) => {
        setIsStreaming(false);
        setStreamingMessageId(null);

        if (err?.isMissingKey) {
          setShowKeyModal(true);
          setMessages(prev =>
            prev.map(m =>
              m.id === botMsgId
                ? {
                    ...m,
                    text: `⚠️ **AI API Key Not Configured**\n\nTo enable real conversational LLM responses, please add your **GEMINI_API_KEY** (or **OPENAI_API_KEY**) into \`backend/.env\` and restart the server.\n\n*Click the button below to view setup instructions.*`,
                    statusBadge: { type: 'attention', text: 'API Key Required' },
                    isPending: false,
                    action: {
                      id: 'SETUP_API_KEY',
                      label: 'Configure AI API Key',
                      shortLabel: 'Setup Key',
                      route: null,
                      isTool: true,
                      icon: 'KeyRound'
                    },
                    followUps: ["What do I do next?", "What documents do I need?"]
                  }
                : m
            )
          );
        } else {
          setMessages(prev =>
            prev.map(m =>
              m.id === botMsgId
                ? {
                    ...m,
                    text: `I'm having trouble connecting right now (${err.message || 'Connection timeout'}). Please check your network or try again in a moment.`,
                    statusBadge: { type: 'attention', text: 'Connection Notice' },
                    isPending: false,
                    followUps: ["What do I do next?", "Check my application status"]
                  }
                : m
            )
          );
        }
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

    if (action.id === 'SETUP_API_KEY') {
      setShowKeyModal(true);
      return;
    }

    if (action.requiresConfirm) {
      setModalConfig({
        isOpen: true,
        title: action.confirmTitle || 'Confirm Action',
        message: action.confirmMessage || 'Are you sure you want to proceed with this request?',
        onConfirm: () => {
          setModalConfig({ isOpen: false });
          executeAction(action.id, {}, navigate);
        }
      });
      return;
    }

    if (action.isTool) {
      if (action.id === 'CHECK_DL_TEST_ELIGIBILITY') {
        handleSendMessage('Check my driving test eligibility');
      } else if (action.id === 'GENERATE_RTO_CHECKLIST') {
        handleSendMessage('What should I bring to the RTO?');
      }
      return;
    }

    executeAction(action.id, {}, navigate);
  };

  const handleResetChat = () => {
    if (!context) return;
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: `New conversation started. Hello, ${context.userName}! 👋 How can I help you with your driving licence today?`,
        statusBadge: { type: 'guidance', text: 'Live AI Assistant' },
        action: null,
        followUps: [
          "What do I do next?",
          "Check driving test eligibility",
          "What documents do I need?",
          "What should I bring to the RTO?"
        ]
      }
    ]);
  };

  const defaultPrompts = [
    "What do I do next?",
    "Check driving test eligibility",
    "What documents do I need?",
    "What should I bring to the RTO?",
    "Check my payment & receipt",
    "How do I renew or update licence?"
  ];

  return (
    <div style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 78px)', padding: '24px 0 60px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff7ed', border: '1px solid #ffedd5', color: '#e88a2d', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', marginBottom: '8px' }}>
              <Sparkles size={13} />
              REAL CONVERSATIONAL AI ASSISTANT
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
              Ask Indian Drives
            </h1>
            <p style={{ fontSize: '15px', color: '#476179', margin: 0 }}>
              Your conversational guide through the driving licence process — talk naturally, understand, and take action.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowKeyModal(true)}
              style={{
                background: aiConfig?.isConfigured ? '#eefbf4' : '#fff7ed',
                border: `1px solid ${aiConfig?.isConfigured ? '#bbf7d0' : '#fed7aa'}`,
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: aiConfig?.isConfigured ? '#16805a' : '#c2410c',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {aiConfig?.isConfigured ? <Zap size={14} /> : <KeyRound size={14} />}
              {aiConfig?.isConfigured ? `AI Connected (${aiConfig.model})` : 'Configure AI Key'}
            </button>

            <button
              onClick={handleResetChat}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#476179',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
            >
              <RefreshCw size={14} /> New Conversation
            </button>
          </div>
        </div>

        {/* LIVE CONTEXT STRIP */}
        {context && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 2px 6px rgba(0, 37, 66, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#173b57', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16805a' }} />
                <span>RTO: <strong>{context.rtoCode} ({context.state})</strong></span>
              </div>
              <div style={{ width: '1px', height: '14px', background: '#cbd5e1' }} />
              <div style={{ fontSize: '12px', color: '#476179' }}>
                Stage: <strong style={{ color: '#173b57' }}>{context.currentStage}</strong>
              </div>
              <div style={{ width: '1px', height: '14px', background: '#cbd5e1' }} />
              <div style={{ fontSize: '12px', color: '#476179' }}>
                App No: <strong style={{ color: '#173b57' }}>{context.applicationNumber}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#16805a',
                background: '#eefbf4',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #bbf7d0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} /> LL Verified
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                Demo Data Mode
              </span>
            </div>
          </div>
        )}

        {/* CHAT MAIN CARD */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 37, 66, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '520px',
          overflow: 'hidden'
        }}>
          
          {/* ASSISTANT SUB-HEADER */}
          <div style={{
            background: '#002542',
            padding: '14px 20px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="#93c5fd" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>
                  Indian Drives Conversational AI
                </div>
                <div style={{ fontSize: '11px', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  Real-time LLM Streaming · Natural Conversation · Action-Based
                </div>
              </div>
            </div>
            {isStreaming && (
              <button
                onClick={handleStopGeneration}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Square size={10} fill="#ffffff" /> Stop generating
              </button>
            )}
          </div>

          {/* MESSAGES SCROLL AREA */}
          <div style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: '#fafbfc'
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
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: m.sender === 'user' ? '#173b57' : '#002542',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  {m.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Message Content Bubble */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                  <div
                    style={{
                      background: m.sender === 'user' ? '#002542' : '#ffffff',
                      color: m.sender === 'user' ? '#ffffff' : '#173b57',
                      border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                      borderRadius: m.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                      padding: '16px 20px',
                      boxShadow: '0 2px 8px rgba(0, 37, 66, 0.03)',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {/* Status badge */}
                    {m.statusBadge && (
                      <div
                        style={{
                          marginBottom: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: m.statusBadge.type === 'government' ? '#f1f5f9' : m.statusBadge.type === 'attention' ? '#fff7ed' : '#f0fdf4',
                          color: m.statusBadge.type === 'government' ? '#173b57' : m.statusBadge.type === 'attention' ? '#c2410c' : '#16805a',
                          border: `1px solid ${m.statusBadge.type === 'government' ? '#cbd5e1' : m.statusBadge.type === 'attention' ? '#fed7aa' : '#bbf7d0'}`
                        }}
                      >
                        <ShieldCheck size={12} />
                        {m.statusBadge.text}
                      </div>
                    )}

                    {/* Pending typing animation */}
                    {m.isPending && !m.text && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '4px 0' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e88a2d', animation: 'pulse 1s infinite' }} />
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#173b57', animation: 'pulse 1s infinite 0.2s' }} />
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16805a', animation: 'pulse 1s infinite 0.4s' }} />
                        <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>Thinking...</span>
                      </div>
                    )}

                    {/* Text Body */}
                    {m.text && (
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {m.text}
                        {m.id === streamingMessageId && (
                          <span style={{ display: 'inline-block', width: '6px', height: '14px', background: '#e88a2d', marginLeft: '3px', verticalAlign: 'middle', animation: 'pulse 0.8s infinite' }} />
                        )}
                      </div>
                    )}

                    {/* Multi-Step Prerequisites Check */}
                    {m.multiStepCheck && (
                      <MultiStepCheckCard checks={m.multiStepCheck} />
                    )}

                    {/* RTO Preparation Checklist */}
                    {m.rtoChecklist && (
                      <RTOChecklistCard checklist={m.rtoChecklist} />
                    )}

                    {/* Embedded Action Card CTA */}
                    {m.action && (
                      <ActionCard
                        action={m.action}
                        onExecute={handleActionExecute}
                      />
                    )}
                  </div>

                  {/* Follow-up Prompts */}
                  {m.followUps && m.followUps.length > 0 && !isStreaming && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {m.followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '20px',
                            padding: '5px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#173b57',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.borderColor = '#94a3b8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.borderColor = '#cbd5e1';
                          }}
                        >
                          {chip} →
                        </button>
                      ))}
                    </div>
                  )}

                  <div style={{ fontSize: '11px', color: '#94a3b8', padding: '0 4px', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* PROMPT SUGGESTION BAR */}
          <div style={{ padding: '10px 20px', background: '#ffffff', borderTop: '1px solid #edf2f7', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass size={14} /> Suggestions:
            </span>
            {defaultPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#476179',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#173b57';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.color = '#476179';
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* INPUT BAR */}
          <div style={{ padding: '16px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="What would you like help with? (Ask about your application, documents, payment, tests or next step...)"
              style={{
                flex: 1,
                resize: 'none',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                lineHeight: '1.4',
                color: '#173b57'
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#173b57')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isStreaming}
              style={{
                background: input.trim() && !isStreaming ? '#002542' : '#e2e8f0',
                color: input.trim() && !isStreaming ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: input.trim() && !isStreaming ? 'pointer' : 'default',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: input.trim() && !isStreaming ? '0 2px 8px rgba(0, 37, 66, 0.2)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Send size={16} /> Send
            </button>
          </div>

        </div>

        {/* HUMAN ESCALATION & HELPLINE FOOTER */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: '#476179'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} color="#e88a2d" />
            <span>Need official assistance? Transport Helpline: <strong>1077 / 011-23953785</strong> (Mon–Fri, 9:30 AM–5:30 PM)</span>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => navigate('/help')}
              style={{ background: 'none', border: 'none', color: '#173b57', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <HelpCircle size={14} /> Help Center
            </button>
            <a
              href="https://parivahan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#173b57', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
            >
              Official Parivahan <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>

      {/* Action Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig({ isOpen: false })}
      />

      {/* AI Key Configuration Guide Modal */}
      <ApiKeySetupModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
      />
    </div>
  );
}
