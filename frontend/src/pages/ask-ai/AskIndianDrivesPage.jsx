import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  User,
  RefreshCw,
  Square,
  ArrowRight,
  FileText,
  Folder,
  Calendar,
  CreditCard,
  Banknote,
  ClipboardList,
  Paperclip,
  Bot
} from 'lucide-react';
import { useJourneyContext } from '../../features/assistant/context/JourneyContextEngine';
import {
  streamAssistantResponse,
  fetchChatHistory,
  saveChatHistory,
  clearChatHistory
} from '../../features/assistant/services/chatStreamService';
import { executeAction } from '../../features/assistant/actions/actionCatalog';
import { ConfirmationModal } from '../../features/assistant/components/ConfirmationModal';

import { useLanguage } from '../../main';

const SUGGESTED_QUESTIONS = [
  { id: 1, icon: FileText, text: 'How do I apply for a Learner Licence?' },
  { id: 2, icon: Folder, text: 'What documents do I need for an LL?' },
  { id: 3, icon: Calendar, text: 'How can I book my driving test?' },
  { id: 4, icon: CreditCard, text: 'How do I check my application status?' },
  { id: 5, icon: Banknote, text: 'How much does a Driving Licence cost?' },
  { id: 6, icon: ClipboardList, text: 'What should I bring to my driving test?' }
];

const FILTER_PILLS = [
  'LL',
  'DL',
  'Documents',
  'Driving Test',
];

export function AskIndianDrivesPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const { context } = useJourneyContext();
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const localizedQuestions = [
    { id: 1, icon: FileText, text: t('ask.q1', 'How do I apply for a Learner Licence?') },
    { id: 2, icon: Folder, text: t('ask.q2', 'What documents do I need for an LL?') },
    { id: 3, icon: Calendar, text: t('ask.q3', 'How can I book my driving test?') },
    { id: 4, icon: CreditCard, text: t('ask.q4', 'How do I check my application status?') },
    { id: 5, icon: Banknote, text: t('ask.q5', 'How much does a Driving Licence cost?') },
    { id: 6, icon: ClipboardList, text: t('ask.q6', 'What should I bring to my driving test?') }
  ];

  const localizedFilterPills = [
    t('ask.pillLL', 'LL'),
    t('ask.pillDL', 'DL'),
    t('ask.pillDocs', 'Documents'),
    t('ask.pillTest', 'Driving Test')
  ];

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const initialPromptTriggered = useRef(false);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello, Raj! 👋 I'm your DriveSEVA Assistant. I can help you with your application steps, document checklists, fee payments, and driving test bookings. How can I help you today?`,
      timestamp: 'Just now',
      followUps: [
        "What do I do next?",
        "What documents do I need?",
        "Show my appointment",
        "Check my payment status"
      ]
    }
  ]);

  // Load chat history from backend on mount
  useEffect(() => {
    fetchChatHistory().then((history) => {
      if (Array.isArray(history) && history.length > 0) {
        setMessages(history);
      }
    });
  }, []);

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

  // Auto-save history when messages change and streaming finishes
  useEffect(() => {
    if (!isStreaming && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages, isStreaming]);

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
      isPending: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
          executeAction(action.id || action.actionId, {}, navigate);
        }
      });
      return;
    }

    executeAction(action.id || action.actionId || 'START_DL_APPLICATION', {}, navigate);
  };

  const handleResetChat = () => {
    clearChatHistory();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Hello, Raj! 👋 A fresh conversation has been started. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: [
          "What do I do next?",
          "What documents do I need?",
          "Show my appointment",
          "Check my payment status"
        ]
      }
    ]);
  };

  const parseInlineMarkdown = (str) => {
    if (!str) return null;
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanContent = part.slice(2, -2);
        return (
          <strong key={i} style={{ color: '#173b57', fontWeight: 700 }}>
            {cleanContent}
          </strong>
        );
      }
      return part;
    });
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} style={{ height: '6px' }} />;
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.slice(2);
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px', lineHeight: '1.6' }}>
            <span style={{ color: '#e88a2d', fontWeight: 800, fontSize: '14px', lineHeight: '1.6' }}>•</span>
            <div style={{ flex: 1 }}>{parseInlineMarkdown(content)}</div>
          </div>
        );
      }

      const colonIndex = line.indexOf(':');
      if (colonIndex > 0 && colonIndex < 35 && !line.startsWith('http') && !line.includes('**')) {
        const label = line.slice(0, colonIndex + 1);
        const rest = line.slice(colonIndex + 1);
        return (
          <div key={idx} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
            <strong style={{ color: '#173b57', fontWeight: 700 }}>{label}</strong>{parseInlineMarkdown(rest)}
          </div>
        );
      }

      return (
        <div key={idx} style={{ marginBottom: '6px', lineHeight: '1.6' }}>
          {parseInlineMarkdown(line)}
        </div>
      );
    });
  };

  return (
    <div style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 78px)', padding: '32px 0 60px 0', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1184px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* PAGE HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#e88a2d', fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
              <span style={{ display: 'inline-block', width: '18px', height: '2px', background: '#e88a2d' }} />
              {t('nav.ask')}
            </div>
            <h1 className="page-main-heading" style={{ fontSize: '48px', fontWeight: 700, color: '#173b57', margin: '0 0 6px 0', letterSpacing: '-0.8px', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
              {t('ask.greeting')}
            </h1>
            <p style={{ fontSize: '14px', color: '#476179', margin: 0, maxWidth: '640px' }}>
              {t('ask.subtitle')}
            </p>
          </div>

          <button
            onClick={handleResetChat}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#476179',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,37,66,0.03)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.color = '#173b57';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#476179';
            }}
          >
            <RefreshCw size={13} /> {t('ask.newChat', 'New Chat')}
          </button>
        </div>

        {/* 2-COLUMN MAIN LAYOUT */}
        <div className="ask-ai-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ASSISTANT CARD */}
            <div className="card" style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '18px 20px',
              boxShadow: '0 2px 10px rgba(23, 59, 87, 0.03)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: '#fff7ed',
                border: '1px solid #ffedd5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0
              }}>
                <Sparkles size={20} color="#e88a2d" />
                <span className="status-pill" style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '9999px',
                  background: '#22c55e',
                  border: '2px solid #ffffff'
                }} />
              </div>
              <div>
                <h3 className="card-header" style={{ fontSize: '24px', fontWeight: 600, color: '#173b57', margin: '0 0 3px 0' }}>
                  {t('ask.assistantTitle', 'DriveSEVA Assistant')}
                </h3>
                <p className="status-pill" style={{ fontSize: '13px', color: '#476179', margin: 0, fontWeight: 500, borderRadius: '9999px' }}>
                  {t('ask.onlineStatus', 'Online • Ready to help')}
                </p>
              </div>
            </div>

            {/* SUGGESTED QUESTIONS */}
            <div>
              <div className="section-heading" style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '0.5px', color: '#173b57', marginBottom: '12px', paddingLeft: '4px' }}>
                {t('ask.suggestedHeading', 'SUGGESTED QUESTIONS')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {localizedQuestions.map((q) => {
                  const IconComp = q.icon;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSendMessage(q.text)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '14px 16px',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(23, 59, 87, 0.02)',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: 600
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.boxShadow = '0 3px 10px rgba(23, 59, 87, 0.06)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(23, 59, 87, 0.02)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ color: '#476179', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        <IconComp size={18} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#173b57', lineHeight: '1.4' }}>
                        {q.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT CHAT WINDOW */}
          <div className="card chat-container" style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(23, 59, 87, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '620px',
            overflow: 'hidden'
          }}>

            {/* MESSAGES SCROLL AREA */}
            <div style={{
              flex: 1,
              padding: '28px 28px 16px 28px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: m.sender === 'user' ? '80%' : '100%',
                    width: m.sender === 'user' ? 'auto' : '100%'
                  }}
                >
                  <div
                    style={{
                      background: m.sender === 'user' ? '#00253e' : 'transparent',
                      color: m.sender === 'user' ? '#ffffff' : '#1e293b',
                      borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : '0px',
                      padding: m.sender === 'user' ? '12px 18px' : '0px',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {/* Pending dots state */}
                    {m.isPending && !m.text && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '12px 0' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8', animation: 'pulse 1s infinite' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8', animation: 'pulse 1s infinite 0.2s' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8', animation: 'pulse 1s infinite 0.4s' }} />
                      </div>
                    )}

                    {/* Message Body */}
                    {m.text && renderFormattedText(m.text)}

                    {/* Streaming Cursor */}
                    {m.id === streamingMessageId && (
                      <span style={{ display: 'inline-block', width: '6px', height: '14px', background: '#00253e', marginLeft: '4px', verticalAlign: 'middle', animation: 'pulse 0.8s infinite' }} />
                    )}

                    {/* Action Callout Box */}
                    {(m.actionCard || m.action) && (
                      <div className="card" style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        marginTop: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div>
                          <div className="card-header" style={{ fontSize: '24px', fontWeight: 600, color: '#173b57', marginBottom: '2px' }}>
                            {m.actionCard?.title || m.action?.confirmTitle || 'Ready to start?'}
                          </div>
                          <div style={{ fontSize: '14px', color: '#476179' }}>
                            {m.actionCard?.subtitle || m.action?.confirmMessage || 'Launch the guided DL application'}
                          </div>
                        </div>

                        <button
                          onClick={() => handleActionExecute(m.actionCard || m.action)}
                          style={{
                            background: '#00253e',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 18px',
                            fontSize: '16px',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            boxShadow: '0 2px 6px rgba(0,37,62,0.15)'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#173b57')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = '#00253e')}
                        >
                          {m.actionCard?.buttonText || m.action?.label || 'Continue to DL Journey'} <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message Timestamp */}
                  {m.timestamp && (
                    <div className="timestamp date" style={{ fontSize: '16px', fontWeight: 500, color: '#94a3b8', marginTop: '6px', textAlign: m.sender === 'user' ? 'right' : 'left' }}>
                      {m.timestamp}
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* FILTER TAGS BAR */}
            <div style={{ padding: '10px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px', flexWrap: 'wrap', background: '#ffffff' }}>
              {localizedFilterPills.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    className="status-pill chip"
                    onClick={() => {
                      setSelectedTag(isActive ? null : tag);
                      handleSendMessage(`Tell me details regarding ${tag}`);
                    }}
                    style={{
                      background: isActive ? '#00253e' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#476179',
                      border: '1px solid',
                      borderColor: isActive ? '#00253e' : '#e2e8f0',
                      borderRadius: '9999px',
                      padding: '6px 16px',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#e2e8f0';
                        e.currentTarget.style.color = '#173b57';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#f1f5f9';
                        e.currentTarget.style.color = '#476179';
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* INPUT FIELD BAR */}
            <div style={{ padding: '14px 24px 8px 24px', background: '#ffffff', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '4px 14px',
                transition: 'all 0.15s ease'
              }}>
                <Paperclip size={18} color="#476179" style={{ marginRight: '8px', flexShrink: 0, cursor: 'pointer' }} />
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
                  placeholder={t('ask.inputPlaceholder', 'Ask anything about driving licences...')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    outline: 'none',
                    color: '#173b57'
                  }}
                />
              </div>

              {isStreaming ? (
                <button
                  onClick={handleStopGeneration}
                  style={{
                    background: '#f1f5f9',
                    color: '#476179',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    width: '46px',
                    height: '46px',
                    fontSize: '16px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={t('ask.stopGenerating', 'Stop generating')}
                >
                  <Square size={14} fill="#476179" />
                </button>
              ) : (
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  style={{
                    background: input.trim() ? '#e98b2e' : '#f1f5f9',
                    color: input.trim() ? '#ffffff' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '8px',
                    width: '46px',
                    height: '46px',
                    fontSize: '16px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'all 0.15s ease',
                    boxShadow: input.trim() ? '0 2px 8px rgba(233, 139, 46, 0.3)' : 'none'
                  }}
                >
                  <Send size={18} />
                </button>
              )}
            </div>

            {/* DISCLAIMER SUBTEXT */}
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px', color: '#94a3b8', textAlign: 'center', padding: '6px 24px 14px 24px', textTransform: 'uppercase' }}>
              {t('ask.disclaimer', 'AI ASSISTANT CAN MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.')}
            </div>

          </div>

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
