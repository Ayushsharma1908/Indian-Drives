import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Check, FileText, Calendar, CreditCard, Award, Laptop, CheckCircle2,
  AlertTriangle, ArrowRight, Download, RefreshCw
} from 'lucide-react';
import { useLanguage } from '../../main';

export function NotificationsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      category: 'applications',
      dateGroup: 'Today',
      title: 'DL Application Submitted',
      timeAgo: '2 Hours Ago',
      body: 'Your application for a new Driving Licence has been successfully submitted and is pending verification by RTO officials.',
      appNo: 'APP NO: 4899201',
      statusTag: '✓ Successful',
      unread: true,
      icon: FileText,
      iconBg: '#e0f2fe',
      iconColor: '#0369a1',
      stripeColor: '#f97316'
    },
    {
      id: 2,
      category: 'appointments',
      dateGroup: 'Today',
      title: 'Driving Test Booked',
      timeAgo: '5 Hours Ago',
      body: 'Your driving test has been scheduled for Oct 24, 2024 at 10:00 AM. Please ensure you arrive 15 minutes early with original documents.',
      eventBox: {
        month: 'OCT',
        day: '24',
        location: 'Andheri West RTO',
        actionPath: '/dl/appointment-fixed'
      },
      unread: true,
      icon: Calendar,
      iconBg: '#ffedd5',
      iconColor: '#c2410c',
      stripeColor: '#f97316'
    },
    {
      id: 3,
      category: 'payments',
      dateGroup: 'Yesterday',
      title: 'Payment Successful',
      timeAgo: 'Yesterday, 2:30 PM',
      body: 'Your payment of ₹1,200 for the Driving Licence renewal has been processed successfully.',
      refNo: 'Ref: TXN-998273',
      hasReceipt: true,
      unread: false,
      icon: CreditCard,
      iconBg: '#f1f5f9',
      iconColor: '#476179',
      stripeColor: null
    },
    {
      id: 4,
      category: 'applications',
      dateGroup: 'Yesterday',
      title: 'Document Re-upload Required',
      timeAgo: 'Yesterday, 10:15 AM',
      body: 'The address proof document you uploaded for LL Application (App No: 4899105) is unclear. Please re-upload a clearer copy.',
      reuploadAction: true,
      unread: false,
      icon: AlertTriangle,
      iconBg: '#fee2e2',
      iconColor: '#dc2626',
      stripeColor: null
    }
  ]);

  const markAllRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })));
    localStorage.setItem('indian-drives-unread-notifications', 'false');
    window.dispatchEvent(new Event('notifications-read'));
  };

  const filteredNotifications = notificationList.filter(n => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const todayItems = filteredNotifications.filter(n => n.dateGroup === 'Today');
  const yesterdayItems = filteredNotifications.filter(n => n.dateGroup === 'Yesterday');

  return (
    <div className="page page-notifications" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Header Row with | Notifications Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '4px', height: '38px', background: '#0f2942', borderRadius: '2px' }} />
            <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#173b57', margin: 0, letterSpacing: '-0.8px' }}>
              {t('userFlow.notificationsTitle')}
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '6px 0 0 16px' }}>
            Stay updated about your applications, appointments, and licences.
          </p>
        </div>

        <button
          onClick={markAllRead}
          style={{
            background: '#ffffff',
            color: '#173b57',
            border: '1px solid #cbd5e1',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(0, 37, 66, 0.03)',
            transition: 'all 0.15s ease'
          }}
        >
          <Check size={16} strokeWidth={2.5} /> Mark all as read
        </button>
      </div>

      {/* Main 2-Column Grid (Left Filter Sidebar + Right Feed) */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Filter Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
              FILTER BY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'all', label: 'All Notifications', count: 12, icon: Laptop },
                { id: 'applications', label: 'Applications', count: 4, icon: FileText },
                { id: 'appointments', label: 'Appointments', count: 2, icon: Calendar },
                { id: 'payments', label: 'Payments', count: 5, icon: CreditCard },
                { id: 'licences', label: 'Licences', count: 1, icon: Award }
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeFilter === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveFilter(item.id)}
                    style={{
                      background: isActive ? '#0a2540' : 'transparent',
                      color: isActive ? '#ffffff' : '#173b57',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '14px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? '#ffffff' : '#64748b'} />
                      <span>{item.label}</span>
                    </div>

                    <span style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.15)' : '#e0f2fe',
                      color: isActive ? '#ffffff' : '#0369a1',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Event Promo Widget */}
          <div style={{
            background: '#eef6ff',
            border: '1px solid #bae6fd',
            borderRadius: '16px',
            padding: '16px 20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Upcoming Event
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57', marginTop: '4px' }}>
              Driving Test
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#e88a2d', marginTop: '2px' }}>
              Oct 24, 10:00 AM
            </div>

            <Calendar size={48} color="#93c5fd" style={{ position: 'absolute', right: '12px', bottom: '8px', opacity: 0.4 }} />
          </div>
        </div>

        {/* Right Stream Notifications Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Today Group */}
          {todayItems.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: '0 0 16px 0' }}>
                Today
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {todayItems.map(item => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        borderLeft: item.unread ? '4px solid #f97316' : '1px solid #e2e8f0',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0, 37, 66, 0.03)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        
                        {/* Icon Badge */}
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: item.iconBg,
                          color: item.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={22} />
                        </div>

                        {/* Content Block */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                              {item.title}
                            </h3>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>
                              {item.timeAgo}
                            </span>
                          </div>

                          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                            {item.body}
                          </p>

                          {/* App No & Successful Status Badges */}
                          {item.appNo && (
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                                {item.appNo}
                              </span>
                              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                                {item.statusTag}
                              </span>
                            </div>
                          )}

                          {/* Embedded Driving Test Booked Box */}
                          {item.eventBox && (
                            <div style={{
                              background: '#f0f4ff',
                              border: '1px solid #dbeafe',
                              borderRadius: '14px',
                              padding: '12px 18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: '8px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                  background: '#ffffff',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '10px',
                                  width: '42px',
                                  height: '42px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{item.eventBox.month}</span>
                                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>{item.eventBox.day}</span>
                                </div>

                                <div>
                                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>LOCATION</div>
                                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#173b57' }}>{item.eventBox.location}</div>
                                </div>
                              </div>

                              <button
                                onClick={() => navigate(item.eventBox.actionPath)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#0369a1',
                                  fontSize: '13px',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                View Details <ArrowRight size={14} />
                              </button>
                            </div>
                          )}

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Yesterday Group */}
          {yesterdayItems.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: '0 0 16px 0' }}>
                Yesterday
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {yesterdayItems.map(item => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0, 37, 66, 0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        
                        {/* Icon Badge */}
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: item.iconBg,
                          color: item.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={22} />
                        </div>

                        {/* Content Block */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: item.iconColor === '#dc2626' ? '#dc2626' : '#173b57', margin: 0 }}>
                              {item.title}
                            </h3>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>
                              {item.timeAgo}
                            </span>
                          </div>

                          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                            {item.body}
                          </p>

                          {/* Payment Receipt button & Ref Tag */}
                          {item.hasReceipt && (
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                                {item.refNo}
                              </span>
                              <button
                                onClick={() => alert("Downloading official payment receipt (PDF)...")}
                                style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', color: '#173b57', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                <Download size={14} /> Receipt
                              </button>
                            </div>
                          )}

                          {/* Re-upload Document Action Button */}
                          {item.reuploadAction && (
                            <button
                              onClick={() => navigate('/ll/documents')}
                              style={{
                                background: '#ffffff',
                                color: '#dc2626',
                                border: '1px solid #fca5a5',
                                padding: '8px 16px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginTop: '4px'
                              }}
                            >
                              <FileText size={16} /> Re-upload Document
                            </button>
                          )}

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Pagination Button */}
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button style={{
              background: '#ffffff',
              color: '#173b57',
              border: '1px solid #cbd5e1',
              padding: '12px 28px',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 37, 66, 0.03)'
            }}>
              Load Older Notifications ˅
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
