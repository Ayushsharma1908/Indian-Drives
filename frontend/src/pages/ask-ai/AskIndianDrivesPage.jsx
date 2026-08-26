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
  AlertCircle
} from 'lucide-react';
import { useJourneyContext } from '../../features/assistant/context/JourneyContextEngine';
import { sendAssistantQuery } from '../../features/assistant/services/assistantService';
import { executeAction } from '../../features/assistant/actions/actionCatalog';
import { ActionCard } from '../../features/assistant/components/ActionCard';
import { MultiStepCheckCard } from '../../features/assistant/components/MultiStepCheckCard';
import { RTOChecklistCard } from '../../features/assistant/components/RTOChecklistCard';
import { ConfirmationModal } from '../../features/assistant/components/ConfirmationModal';

export function AskIndianDrivesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { context, loading } = useJourneyContext();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const messagesEndRef = useRef(null);
  const initialPromptTriggered = useRef(false);

  const [messages, setMessages] = useState([]);

  // Initialize personalized greeting on context load
  useEffect(() => {
    if (context && messages.length === 0) {
      const initialGreeting = {
        id: 'welcome',
        sender: 'assistant',
        timestamp: 'Just now',
        text: `Namaste, ${context.userName}! I am your Indian Drives AI Guide. Your Learner Licence (${context.learnerLicenceNumber}) is verified and active. You are currently at the **Driving Licence (DL) Application** stage.`,
        statusBadge: { type: 'government', text: 'Government Record: Scrutiny Cleared' },
        action: {
          id: 'CONTINUE_DL_APPLICATION',
          label: 'Continue DL Application',
          shortLabel: 'Continue DL',
          route: '/dl/confirm-intro',
          icon: 'ArrowRight',
          description: 'Confirm applicant profile and vehicle categories for permanent DL.'
        },
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
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendAssistantQuery(text.trim(), context, messages);
      setIsTyping(false);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.answer,
        statusBadge: response.statusBadge,
        action: response.action,
        multiStepCheck: response.multiStepCheck,
        rtoChecklist: response.rtoChecklist,
        sources: response.sources,
        followUps: response.followUps
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I couldn't verify that from connected records right now. You can check the official service portal or contact support.",
          statusBadge: { type: 'attention', text: 'System Notice' },
          action: {
            id: 'OPEN_HELP',
            label: 'Open Help Center',
            shortLabel: 'Help Center',
            route: '/help',
            icon: 'HelpCircle'
          },
          followUps: ["What's my next step?", "Check my application status"]
        }
      ]);
    }
  };

  const handleActionExecute = (action) => {
    if (!action) return;

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
        text: `Chat context reset. Namaste, ${context.userName}! How can I help you with your driving licence journey today?`,
        statusBadge: { type: 'guidance', text: 'Context Ready' },
        action: {
          id: 'CONTINUE_DL_APPLICATION',
          label: 'Continue DL Application',
          shortLabel: 'Continue DL',
          route: '/dl/confirm-intro',
          icon: 'ArrowRight'
        },
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
              CONTEXT-AWARE ACTION ASSISTANT
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
              Ask Indian Drives
            </h1>
            <p style={{ fontSize: '15px', color: '#476179', margin: 0 }}>
              Your guide through the driving licence process — understand, verify, and take action.
            </p>
          </div>

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
                  Indian Drives Action Assistant
                </div>
                <div style={{ fontSize: '11px', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  Connected to Journey Engine · 24/7 Citizen Guidance
                </div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '12px' }}>
              Parivahan Standards
            </div>
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
                    {/* Official Record vs Indian Drives Guidance Badge */}
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

                    {/* Text Body */}
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {m.text}
                    </div>

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

                    {/* Knowledge Sources */}
                    {m.sources && m.sources.length > 0 && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '11px', color: '#94a3b8' }}>
                        <span>Official Sources:</span>
                        {m.sources.map((s, idx) => (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#476179', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                          >
                            {s.name} <ExternalLink size={10} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Follow-up Prompts */}
                  {m.followUps && m.followUps.length > 0 && (
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

            {isTyping && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#002542', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={18} />
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '12px 18px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e88a2d', animation: 'pulse 1s infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#173b57', animation: 'pulse 1s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16805a', animation: 'pulse 1s infinite 0.4s' }} />
                  <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>Consulting journey context & Parivahan guidelines...</span>
                </div>
              </div>
            )}

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
              placeholder="Ask about your application, documents, payment, test or next step..."
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
              disabled={!input.trim() || isTyping}
              style={{
                background: input.trim() ? '#002542' : '#e2e8f0',
                color: input.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: input.trim() ? '0 2px 8px rgba(0, 37, 66, 0.2)' : 'none',
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
    </div>
  );
}
