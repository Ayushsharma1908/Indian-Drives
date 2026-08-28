import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, MapPin, Clock, CheckCircle2, XCircle, ArrowRight, Plus,
  FileText, Download, AlertCircle, X, Printer, QrCode
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { centralDataStore } from '../../data/centralDataStore';
import { useLanguage } from '../../main';

export function AppointmentsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [tab, setTab] = useState('upcoming');
  const [appointments, setAppointments] = useState(() => centralDataStore.getAppointments());
  const [selectedPass, setSelectedPass] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setAppointments([...centralDataStore.getAppointments()]);
    };
    window.addEventListener('indian-drives-state-change', handleUpdate);
    return () => window.removeEventListener('indian-drives-state-change', handleUpdate);
  }, []);

  const handleCancelAppointment = (aptId) => {
    centralDataStore.cancelAppointment(aptId);
    setAppointments([...centralDataStore.getAppointments()]);
    setShowCancelModal(null);
  };

  const upcomingList = appointments.filter(a => a.type === 'upcoming' && a.status !== 'Cancelled');
  const pastList = appointments.filter(a => a.type === 'past' || a.status === 'Cancelled' || a.status === 'Completed' || a.status === 'Rescheduled');

  const filtered = tab === 'upcoming' ? upcomingList : tab === 'past' ? pastList : appointments;

  const user = centralDataStore.getUserProfile();

  return (
    <div className="page page-appointments" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-indigo)', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '6px' }}>
            <CalendarDays size={13} />
            {t('appointments.eyebrow', 'SLOT MANAGEMENT & TEST CENTRES')}
          </div>
          <h1 style={{ color: 'var(--color-deep-navy)', fontSize: '36px', fontWeight: 700, margin: 0, letterSpacing: '-0.8px' }}>
            {t('appointments.title', 'Appointments & Test Bookings')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', margin: '6px 0 0 0' }}>
            {t('appointments.subtitle', 'Manage your scheduled automated driving tests and view past RTO bookings.')}
          </p>
        </div>

        <button
          onClick={() => navigate('/dl/test-slot')}
          className="primary-button"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '14px' }}
        >
          <Plus size={16} /> {t('appointments.bookSlotBtn', 'Book Driving Test Slot')}
        </button>
      </div>

      <div className="filter-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          className={tab === 'upcoming' ? 'primary-button' : 'secondary-button'}
          style={{ padding: '7px 18px', fontSize: '13px' }}
          onClick={() => setTab('upcoming')}
        >
          {t('appointments.upcomingTab', 'Upcoming')} ({upcomingList.length})
        </button>
        <button
          className={tab === 'past' ? 'primary-button' : 'secondary-button'}
          style={{ padding: '7px 18px', fontSize: '13px' }}
          onClick={() => setTab('past')}
        >
          {t('appointments.pastTab', 'Past & History')} ({pastList.length})
        </button>
        <button
          className={tab === 'all' ? 'primary-button' : 'secondary-button'}
          style={{ padding: '7px 18px', fontSize: '13px' }}
          onClick={() => setTab('all')}
        >
          All ({appointments.length})
        </button>
      </div>

      {filtered.length === 0 ? (
        /* TRUE EMPTY STATE */
        <div className="card-standard" style={{ padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-pale-amber)', color: 'var(--color-warm-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarDays size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: '0 0 6px 0' }}>
              {tab === 'upcoming' ? 'No upcoming appointments scheduled' : 'No appointment history'}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '440px', lineHeight: 1.5 }}>
              {tab === 'upcoming'
                ? 'Your Learner Licence is verified. You can book an automated track test slot whenever you are ready.'
                : 'You have not completed or cancelled any previous appointments.'}
            </p>
          </div>
          {tab === 'upcoming' && (
            <button
              onClick={() => navigate('/dl/test-slot')}
              className="primary-button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '14px' }}
            >
              <Plus size={16} /> Book Practical Test Slot
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filtered.map(item => {
            const isUpcoming = item.type === 'upcoming' && item.status === 'Scheduled';

            return (
              <div key={item.id} className={isUpcoming ? 'card-standard' : 'card-standard'} style={{ padding: '24px', borderLeft: isUpcoming ? '4px solid var(--color-saffron)' : '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0 }}>{item.title}</h3>
                      <StatusBadge status={item.status} text={item.status} />
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', display: 'inline-block' }}>
                      Booking ID: <strong style={{ color: 'var(--color-text-primary)' }}>{item.id}</strong> (Ref: {item.ref})
                    </span>
                  </div>

                  {isUpcoming && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => navigate('/dl/test-slot')}
                        className="secondary-button"
                        style={{ padding: '7px 14px', fontSize: '13px', fontWeight: 600 }}
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => setSelectedPass(item)}
                        className="primary-button"
                        style={{ padding: '7px 16px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Download size={14} /> Appointment Pass
                      </button>
                      <button
                        onClick={() => setShowCancelModal(item)}
                        className="secondary-button"
                        style={{ padding: '7px 12px', fontSize: '13px', color: 'var(--color-error)' }}
                        title="Cancel Slot"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px', padding: '16px', background: 'var(--color-bg)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>DATE & TIME</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{item.date}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.time}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>TEST VENUE & TRACK</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{item.location}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Track Bay: {item.trackBay || 'Bay 3'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>VEHICLE CATEGORY</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '2px' }}>{item.vehicleClass || 'LMV (Light Motor Vehicle)'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Reporting Time: {item.reportingTime || '15 mins before slot'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* APPOINTMENT PASS MODAL */}
      {selectedPass && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 45, 67, 0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card-standard" style={{ background: '#ffffff', maxWidth: '540px', width: '100%', borderRadius: '16px', padding: '28px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setSelectedPass(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', borderBottom: '2px dashed var(--color-border)', paddingBottom: '18px', marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-indigo)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                GOVERNMENT OF INDIA · TRANSPORT DEPARTMENT
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-deep-navy)', margin: '4px 0 2px 0' }}>
                Official Driving Test Appointment Pass
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Pass Ref: <strong>{selectedPass.id}</strong> · Slot Ref: <strong>{selectedPass.ref}</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                <div><strong>Applicant Name:</strong> {user.name}</div>
                <div><strong>Application No:</strong> {user.applicationNumber || 'IND-2026-98124'}</div>
                <div><strong>Learner Licence:</strong> {user.llNumber}</div>
                <div><strong>Vehicle Class:</strong> {selectedPass.vehicleClass}</div>
                <div><strong>Slot Date & Time:</strong> {selectedPass.date} ({selectedPass.time})</div>
                <div><strong>Reporting Venue:</strong> {selectedPass.location}</div>
              </div>

              <div style={{ textAlign: 'center', background: 'var(--color-bg)', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <QrCode size={72} color="var(--color-deep-navy)" />
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-secondary)', marginTop: '4px' }}>SCAN AT GATE</div>
              </div>
            </div>

            <div style={{ background: 'var(--color-pale-amber)', padding: '12px 16px', borderRadius: '8px', border: '1px solid #F6D8B0', fontSize: '12px', color: 'var(--color-deep-navy)', marginBottom: '20px', lineHeight: 1.45 }}>
              <strong>Mandatory Test Day Checklist:</strong> Bring original Aadhaar card, Form 3 Learner Licence, fee receipt, and a roadworthy vehicle with red "L" plates.
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedPass(null)}
                className="secondary-button"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="primary-button"
                style={{ padding: '8px 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} /> Print / Save Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRMATION MODAL */}
      {showCancelModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 45, 67, 0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card-standard" style={{ background: '#ffffff', maxWidth: '440px', width: '100%', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-error)', marginBottom: '12px' }}>
              <AlertCircle size={24} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--color-deep-navy)' }}>
                Cancel Driving Test Slot?
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              Are you sure you want to cancel your practical test slot for <strong>{showCancelModal.date}</strong> at <strong>{showCancelModal.time}</strong>? You can book a new slot anytime without losing your application progress.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCancelModal(null)}
                className="secondary-button"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Keep Slot
              </button>
              <button
                onClick={() => handleCancelAppointment(showCancelModal.id)}
                className="primary-button"
                style={{ padding: '8px 18px', fontSize: '13px', background: 'var(--color-error)' }}
              >
                Yes, Cancel Slot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
