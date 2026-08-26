import React, { useState } from 'react';
import { CalendarDays, MapPin, Clock, CheckCircle2, XCircle, ArrowRight, Plus } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

export function AppointmentsPage() {
  const [tab, setTab] = useState('upcoming');

  const appointments = [
    {
      id: 'APT-982-1049',
      title: 'Automated Driving Licence Skill Test',
      date: '24 Oct 2026',
      time: '10:00 AM - 11:00 AM',
      location: 'RTO Office Track 4, Indiranagar, Bengaluru',
      type: 'upcoming',
      status: 'Scheduled',
      ref: 'IND-DL-SLOT-994'
    },
    {
      id: 'APT-492-8812',
      title: "Learner's Licence Online Test",
      date: '12 June 2026',
      time: '02:30 PM - 03:00 PM',
      location: 'Online Proctored Exam / RTO Desk 2',
      type: 'past',
      status: 'Completed',
      ref: 'IND-LL-EXAM-104'
    },
    {
      id: 'APT-112-9090',
      title: 'Address Update Verification Visit',
      date: '05 March 2025',
      time: '11:00 AM - 11:30 AM',
      location: 'Regional Transport Office, Electronic City',
      type: 'past',
      status: 'Cancelled',
      ref: 'IND-ADDR-883'
    }
  ];

  const filtered = appointments.filter(a => tab === 'all' || a.type === tab);

  return (
    <div className="page page-appointments">
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="eye-badge"><CalendarDays size={14} /> Slot Management</span>
          <h1>Appointments</h1>
          <p>Manage your upcoming tests and view past interactions with RTO centers.</p>
        </div>
        <button className="primary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Book New Appointment
        </button>
      </div>

      <div className="filter-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          className={`secondary-button ${tab === 'upcoming' ? 'primary-button' : ''}`}
          onClick={() => setTab('upcoming')}
        >
          Upcoming ({appointments.filter(a => a.type === 'upcoming').length})
        </button>
        <button
          className={`secondary-button ${tab === 'past' ? 'primary-button' : ''}`}
          onClick={() => setTab('past')}
        >
          Past ({appointments.filter(a => a.type === 'past').length})
        </button>
        <button
          className={`secondary-button ${tab === 'all' ? 'primary-button' : ''}`}
          onClick={() => setTab('all')}
        >
          All
        </button>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map(item => (
          <div key={item.id} className="services-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '18px', margin: 0 }}>{item.title}</h3>
                  <StatusBadge status={item.status} text={item.status} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', display: 'inline-block' }}>
                  Reference No: <strong>{item.id}</strong> ({item.ref})
                </span>
              </div>

              {item.type === 'upcoming' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="secondary-button" style={{ padding: '6px 12px', fontSize: '13px' }}>Reschedule</button>
                  <button className="primary-button" style={{ padding: '6px 12px', fontSize: '13px' }}>Download Pass</button>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px', background: 'var(--surface-low)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarDays size={18} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>DATE & TIME</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.date} • {item.time}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="var(--saffron)" />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>LOCATION</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.location}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
