import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Download, CheckCircle2, Clock, XCircle, ArrowUpRight,
  FileText, Printer, X, ShieldCheck, DollarSign
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { centralDataStore } from '../../data/centralDataStore';
import { useLanguage } from '../../main';

export function PaymentsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [transactions, setTransactions] = useState(() => centralDataStore.getPayments());
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setTransactions([...centralDataStore.getPayments()]);
    };
    window.addEventListener('indian-drives-state-change', handleUpdate);
    return () => window.removeEventListener('indian-drives-state-change', handleUpdate);
  }, []);

  const totalPaid = transactions
    .filter(t => t.status === 'Successful')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const successfulCount = transactions.filter(t => t.status === 'Successful').length;
  const pendingCount = transactions.filter(t => t.status !== 'Successful').length;

  const filtered = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'successful') return t.status === 'Successful';
    if (filter === 'pending') return t.status !== 'Successful';
    return true;
  });

  const user = centralDataStore.getUserProfile();

  return (
    <div className="page page-payments" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      
      <div className="page-header" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-warm-amber)', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '6px' }}>
          <CreditCard size={13} />
          FINANCIAL RECORDS & OFFICIAL INVOICES
        </div>
        <h1 style={{ color: 'var(--color-deep-navy)', fontSize: '36px', fontWeight: 700, margin: 0, letterSpacing: '-0.8px' }}>
          Payments & Receipts
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', margin: '6px 0 0 0' }}>
          View your verified Indian Drives fee transactions and download official RTO tax receipts.
        </p>
      </div>

      {/* Metric Stats Cards */}
      <div className="console-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>
            ₹{totalPaid.toFixed(2)}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Total Fees Paid
          </div>
        </div>

        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-teal)' }}>
            {successfulCount}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Successful Transactions
          </div>
        </div>

        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-muted)' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Pending Charges
          </div>
        </div>
      </div>

      {/* Main Payment History Card */}
      <div className="card-standard" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
            Transaction History
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'successful', 'pending'].map(f => (
              <button
                key={f}
                className={filter === f ? 'primary-button' : 'secondary-button'}
                style={{ padding: '6px 16px', fontSize: '13px', textTransform: 'capitalize' }}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          /* TRUE EMPTY STATE */
          <div style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--color-pale-teal)', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={24} />
            </div>
            <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0 }}>
              No payments recorded yet
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '400px' }}>
              When you submit licence applications or book test slots, your verified transaction receipts will be logged here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {filtered.map(txn => (
              <div
                key={txn.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 20px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ background: 'var(--color-pale-teal)', color: 'var(--color-teal)', padding: '10px', borderRadius: '10px' }}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
                      {txn.title}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <span>Ref ID: <strong style={{ color: 'var(--color-text-primary)' }}>{txn.id}</strong></span>
                      <span>Date: <strong style={{ color: 'var(--color-text-primary)' }}>{txn.date}</strong></span>
                      <span>Method: <strong style={{ color: 'var(--color-text-primary)' }}>{txn.method}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>
                      {txn.formattedAmount || `₹${Number(txn.amount).toFixed(2)}`}
                    </div>
                    <StatusBadge status={txn.status} text={txn.status} />
                  </div>

                  <button
                    onClick={() => setSelectedReceipt(txn)}
                    className="secondary-button"
                    style={{ padding: '7px 14px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Download size={14} /> Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OFFICIAL PAYMENT RECEIPT MODAL */}
      {selectedReceipt && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 45, 67, 0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card-standard" style={{ background: '#ffffff', maxWidth: '520px', width: '100%', borderRadius: '16px', padding: '28px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setSelectedReceipt(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', borderBottom: '2px dashed var(--color-border)', paddingBottom: '16px', marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-teal)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                MINISTRY OF ROAD TRANSPORT & HIGHWAYS
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-deep-navy)', margin: '4px 0 2px 0' }}>
                Electronic Fee Payment Receipt
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Transaction ID: <strong>{selectedReceipt.id}</strong> · {selectedReceipt.date}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '8px', fontSize: '13px', marginBottom: '18px' }}>
              <div><strong>Applicant Name:</strong> {user.name}</div>
              <div><strong>Application No:</strong> {selectedReceipt.appId || 'IND-2026-98124'}</div>
              <div><strong>Payment Purpose:</strong> {selectedReceipt.title}</div>
              <div><strong>Payment Mode:</strong> {selectedReceipt.method}</div>
              <div><strong>Gateway Status:</strong> <span style={{ color: 'var(--color-teal)', fontWeight: 700 }}>VERIFIED & CREDITED</span></div>
            </div>

            {/* Fee Breakdown */}
            <div style={{ background: 'var(--color-bg)', borderRadius: '10px', border: '1px solid var(--color-border)', padding: '14px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-deep-navy)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Fee Breakdown
              </div>
              <div style={{ display: 'grid', gap: '6px', fontSize: '13px' }}>
                {(selectedReceipt.breakdown || [{ label: 'Licence Processing Fee', fee: selectedReceipt.formattedAmount }]).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                    <strong style={{ color: 'var(--color-deep-navy)' }}>{item.fee}</strong>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <strong>Total Paid:</strong>
                  <strong style={{ color: 'var(--color-deep-navy)', fontSize: '16px' }}>{selectedReceipt.formattedAmount}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="secondary-button"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="primary-button"
                style={{ padding: '8px 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
