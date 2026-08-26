import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle2, Clock, XCircle, ArrowUpRight } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

export function PaymentsPage() {
  const [filter, setFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN-9844-01X',
      appId: 'IND-DL-992A-4B',
      title: 'Driving Licence Application Fee',
      date: '24 OCT 2024',
      amount: '₹1,250.00',
      status: 'Successful',
      method: 'UPI (GPay)'
    },
    {
      id: 'TXN-5519-90Y',
      appId: 'IND-LL-1049-88',
      title: 'Learner Licence Test & Processing Fee',
      date: '12 JUN 2024',
      amount: '₹350.00',
      status: 'Successful',
      method: 'Net Banking'
    },
    {
      id: 'TXN-1120-44Z',
      appId: 'IND-DL-992A-4B',
      title: 'Driving Test Slot Booking Fee',
      date: '24 OCT 2024',
      amount: '₹300.00',
      status: 'Successful',
      method: 'Debit Card'
    }
  ];

  return (
    <div className="page page-payments">
      <div className="page-header">
        <span className="eye-badge"><CreditCard size={14} /> FINANCIAL RECORDS</span>
        <h1>Payments & Receipts</h1>
        <p>View your Indian Drives payment history and download official fee receipts.</p>
      </div>

      <div className="console-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <span className="stat-num">₹1,900.00</span>
          <span className="stat-label">Total Paid</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--ok)' }}>3</span>
          <span className="stat-label">Successful Payments</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" style={{ color: 'var(--muted)' }}>0</span>
          <span className="stat-label">Pending Charges</span>
        </div>
      </div>

      <div className="services-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Payment History</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'successful', 'pending'].map(f => (
              <button
                key={f}
                className={`secondary-button ${filter === f ? 'primary-button' : ''}`}
                style={{ padding: '4px 12px', fontSize: '12px', textTransform: 'capitalize' }}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {transactions.map(txn => (
            <div
              key={txn.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'var(--surface-low)',
                borderRadius: '10px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: '#dcfce7', color: 'var(--ok)', padding: '10px', borderRadius: '10px' }}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{txn.title}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '12px' }}>
                    <span>App ID: <strong>{txn.appId}</strong></span>
                    <span>Txn ID: <strong>{txn.id}</strong></span>
                    <span>Date: <strong>{txn.date}</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>{txn.amount}</div>
                  <StatusBadge status={txn.status} text={txn.status} />
                </div>
                <button className="secondary-button" style={{ padding: '8px', borderRadius: '8px' }} title="Download Receipt">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
