import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Check, FileText, Calendar, CreditCard, Award, Laptop, CheckCircle2,
  AlertTriangle, ArrowRight, Download, RefreshCw, Inbox
} from 'lucide-react';
import { centralDataStore } from '../../data/centralDataStore';
import { useLanguage } from '../../main';

export function NotificationsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [notificationList, setNotificationList] = useState(() => centralDataStore.getNotifications());

  useEffect(() => {
    const handleUpdate = () => {
      setNotificationList([...centralDataStore.getNotifications()]);
    };
    window.addEventListener('notifications-updated', handleUpdate);
    window.addEventListener('indian-drives-state-change', handleUpdate);
    return () => {
      window.removeEventListener('notifications-updated', handleUpdate);
      window.removeEventListener('indian-drives-state-change', handleUpdate);
    };
  }, []);

  const markAllRead = () => {
    centralDataStore.markAllNotificationsAsRead();
    setNotificationList([...centralDataStore.getNotifications()]);
  };

  const handleNotificationClick = (item) => {
    centralDataStore.markNotificationAsRead(item.id);
    setNotificationList([...centralDataStore.getNotifications()]);
    if (item.route) {
      navigate(item.route);
    }
  };

  const getIconForCategory = (cat) => {
    switch (cat) {
      case 'appointments':
        return { icon: Calendar, iconBg: 'var(--color-pale-amber)', iconColor: 'var(--color-warm-amber)' };
      case 'payments':
        return { icon: CreditCard, iconBg: 'var(--color-pale-teal)', iconColor: 'var(--color-teal)' };
      case 'licences':
        return { icon: Award, iconBg: 'var(--color-pale-indigo)', iconColor: 'var(--color-indigo)' };
      case 'applications':
      default:
        return { icon: FileText, iconBg: 'var(--color-pale-indigo)', iconColor: 'var(--color-primary-navy)' };
    }
  };

  const filteredNotifications = notificationList.filter(n => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const todayItems = filteredNotifications.filter(n => n.dateGroup === 'Today' || !n.dateGroup);
  const yesterdayItems = filteredNotifications.filter(n => n.dateGroup === 'Yesterday');
  const olderItems = filteredNotifications.filter(n => n.dateGroup && n.dateGroup !== 'Today' && n.dateGroup !== 'Yesterday');

  const upcomingApt = centralDataStore.getUpcomingAppointment();

  return (
    <div className="page page-notifications" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      
      {/* Top Header Row with Notifications Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-indigo)', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '6px' }}>
            <span style={{ display: 'inline-block', width: '16px', height: '2px', background: 'var(--color-indigo)' }} />
            SYSTEM ALERTS & ACTIVITY
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0, letterSpacing: '-0.8px' }}>
            {t('userFlow.notificationsTitle')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', margin: '6px 0 0 0' }}>
            Real-time updates regarding your applications, payments, appointments, and driving licences.
          </p>
        </div>

        {notificationList.some(n => n.unread) && (
          <button
            onClick={markAllRead}
            className="secondary-button"
            style={{
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Check size={16} /> Mark all as read
          </button>
        )}
      </div>

      {/* Main 2-Column Grid (Left Filter Sidebar + Right Feed) */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Filter Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-standard" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-secondary)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '14px' }}>
              FILTER BY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Notifications', count: notificationList.length, icon: Laptop },
                { id: 'applications', label: 'Applications', count: notificationList.filter(n => n.category === 'applications').length, icon: FileText },
                { id: 'appointments', label: 'Appointments', count: notificationList.filter(n => n.category === 'appointments').length, icon: Calendar },
                { id: 'payments', label: 'Payments', count: notificationList.filter(n => n.category === 'payments').length, icon: CreditCard },
                { id: 'licences', label: 'Licences', count: notificationList.filter(n => n.category === 'licences').length, icon: Award }
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeFilter === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveFilter(item.id)}
                    style={{
                      background: isActive ? 'var(--color-deep-navy)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--color-deep-navy)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '13.5px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? '#ffffff' : 'var(--color-text-secondary)'} />
                      <span>{item.label}</span>
                    </div>

                    <span style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'var(--color-pale-indigo)',
                      color: isActive ? '#ffffff' : 'var(--color-primary-navy)',
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

          {/* Upcoming Event Widget if booked */}
          {upcomingApt && (
            <div
              className="card-current"
              style={{
                padding: '18px 20px',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/appointments')}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-deep-navy)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--color-saffron)' }}>●</span> UPCOMING EVENT
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '6px' }}>
                {upcomingApt.title}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-deep-navy)', marginTop: '2px' }}>
                {upcomingApt.date} · {upcomingApt.slot}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                {upcomingApt.location}
              </div>
            </div>
          )}
        </div>

        {/* Right Notifications Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {filteredNotifications.length === 0 ? (
            /* TRUE EMPTY STATE */
            <div className="card-standard" style={{ padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-pale-indigo)', color: 'var(--color-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Inbox size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0 }}>
                No notifications in this category
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '420px', lineHeight: 1.5 }}>
                You're all caught up! New notifications will automatically appear here when events occur on your applications.
              </p>
              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="secondary-button"
                  style={{ marginTop: '8px', padding: '8px 16px', fontSize: '13px' }}
                >
                  View All Notifications
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Today Group */}
              {todayItems.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                    Today
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {todayItems.map(item => {
                      const { icon: Icon, iconBg, iconColor } = getIconForCategory(item.category);

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleNotificationClick(item)}
                          className="card-standard"
                          style={{
                            padding: '20px 24px',
                            borderLeft: item.unread ? '4px solid var(--color-saffron)' : '1px solid var(--color-border)',
                            cursor: item.route ? 'pointer' : 'default',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (item.route) {
                              e.currentTarget.style.borderColor = 'var(--color-slate-blue)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (item.route) {
                              e.currentTarget.style.borderColor = 'var(--color-border)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '10px',
                              background: iconBg,
                              color: iconColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Icon size={20} />
                            </div>

                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0 }}>
                                    {item.title}
                                  </h3>
                                  {item.unread && (
                                    <span style={{ fontSize: '10px', fontWeight: 800, background: 'var(--color-pale-amber)', color: 'var(--color-deep-navy)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                  {item.timeAgo}
                                </span>
                              </div>

                              <p style={{ color: 'var(--color-text-secondary)', fontSize: '13.5px', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                                {item.body}
                              </p>

                              {item.route && (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: 'var(--color-primary-navy)', marginTop: '4px' }}>
                                  <span>View details</span>
                                  <ArrowRight size={13} />
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
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px', marginTop: '12px' }}>
                    Yesterday
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {yesterdayItems.map(item => {
                      const { icon: Icon, iconBg, iconColor } = getIconForCategory(item.category);

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleNotificationClick(item)}
                          className="card-standard"
                          style={{
                            padding: '20px 24px',
                            cursor: item.route ? 'pointer' : 'default',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '10px',
                              background: iconBg,
                              color: iconColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Icon size={20} />
                            </div>

                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0 }}>
                                  {item.title}
                                </h3>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                  {item.timeAgo}
                                </span>
                              </div>

                              <p style={{ color: 'var(--color-text-secondary)', fontSize: '13.5px', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                                {item.body}
                              </p>

                              {item.route && (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: 'var(--color-primary-navy)', marginTop: '4px' }}>
                                  <span>View details</span>
                                  <ArrowRight size={13} />
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
            </>
          )}

        </div>

      </div>

    </div>
  );
}
