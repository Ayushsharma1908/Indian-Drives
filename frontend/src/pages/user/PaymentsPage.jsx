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
        <span className="eyebrow"><CreditCard size={13} /> FINANCIAL RECORDS</span>
        <h1 style={{ color: 'var(--color-deep-navy)', fontSize: '36px', fontWeight: 700, margin: '4px 0 6px 0' }}>Payments & Receipts</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', margin: 0 }}>View your Indian Drives payment history and download official fee receipts.</p>
      </div>

      <div className="console-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>₹1,900.00</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Total Paid</div>
        </div>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-teal)' }}>3</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Successful Payments</div>
        </div>
        <div className="card-standard" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-muted)' }}>0</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Pending Charges</div>
        </div>
      </div>

      <div className="card-standard" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>Payment History</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'successful', 'pending'].map(f => (
              <button
                key={f}
                className={filter === f ? 'primary-button' : 'secondary-button'}
                style={{ padding: '4px 14px', fontSize: '12px', textTransform: 'capitalize' }}
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
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: 'var(--color-pale-teal)', color: 'var(--color-teal)', padding: '10px', borderRadius: '10px' }}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>{txn.title}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'flex', gap: '12px' }}>
                    <span>App ID: <strong style={{ color: 'var(--color-text-primary)' }}>{txn.appId}</strong></span>
                    <span>Txn ID: <strong style={{ color: 'var(--color-text-primary)' }}>{txn.id}</strong></span>
                    <span>Date: <strong style={{ color: 'var(--color-text-primary)' }}>{txn.date}</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>{txn.amount}</div>
                  <StatusBadge status={txn.status} text={txn.status} />
                </div>
                <button className="secondary-button" style={{ padding: '8px 12px', borderRadius: '8px' }} title="Download Receipt">
                  <Download size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
