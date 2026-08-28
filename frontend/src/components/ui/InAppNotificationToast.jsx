import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Bell, CheckCircle2, X, ArrowUpRight, ShieldCheck, Check
} from 'lucide-react';
import { useLanguage } from '../../main';
import { centralDataStore } from '../../data/centralDataStore';

export function InAppNotificationToast() {
  const [toasts, setToasts] = useState([]);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNotification = (event) => {
      const detail = event.detail || {};
      const newToast = {
        id: detail.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: detail.title || t('notifications.title', 'Notification & Alert'),
        body: detail.body || t('notifications.subtitle', 'A new system update has been sent.'),
        category: detail.category || 'general',
        route: detail.route || null,
        badgeText: detail.badgeText || t('common.notificationSent', 'Notification sent'),
        time: 'Just now',
        emailRecipient: centralDataStore.getUserProfile()?.email || 'citizen@indiandrives.gov.in',
        createdAt: Date.now()
      };

      setToasts((prev) => [newToast, ...prev.slice(0, 2)]); // Keep max 3 toasts

      // Auto-dismiss after 6.5 seconds
      setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== newToast.id));
      }, 6500);
    };

    window.addEventListener('indian-drives-notification-popup', handleNotification);
    window.addEventListener('indian-drives-email-sent', handleNotification);

    return () => {
      window.removeEventListener('indian-drives-notification-popup', handleNotification);
      window.removeEventListener('indian-drives-email-sent', handleNotification);
    };
  }, [t]);

  const removeToast = (id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  };

  const handleAction = (toast) => {
    removeToast(toast.id);
    if (toast.route) {
      navigate(toast.route);
    } else {
      navigate('/notifications');
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 32px -4px rgba(16, 45, 67, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '16px 18px',
            position: 'relative',
            animation: 'inAppSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
            fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
          }}
        >
          {/* Top colored accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3.5px',
              background: 'linear-gradient(90deg, #ea580c 0%, #0284c7 100%)'
            }}
          />

          {/* Header Row: Icon + Badge + Close Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'rgba(234, 88, 12, 0.1)',
                  color: '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Mail size={15} />
              </div>

              {/* "Notification sent" badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  letterSpacing: '0.2px'
                }}
              >
                <Check size={12} strokeWidth={3} />
                {t('common.notificationSent', 'Notification sent')}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#102d43')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div style={{ marginBottom: '12px' }}>
            <h4
              style={{
                fontSize: '14.5px',
                fontWeight: 700,
                color: '#102d43',
                margin: '0 0 4px 0',
                lineHeight: 1.3
              }}
            >
              {toast.title}
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: '#475569',
                margin: 0,
                lineHeight: 1.45
              }}
            >
              {toast.body}
            </p>
          </div>

          {/* Footer Row: Recipient info + Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid #f1f5f9',
              fontSize: '11.5px',
              color: '#64748b'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>✉️</span> {toast.emailRecipient}
            </span>

            <button
              onClick={() => handleAction(toast)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0284c7',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '2px 6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                borderRadius: '4px'
              }}
            >
              {t('common.viewDetails', 'View Details')}
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

