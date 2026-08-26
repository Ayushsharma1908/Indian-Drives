import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

export function StatusBadge({ status, text }) {
  const s = (status || '').toLowerCase();

  if (s.includes('verifi') || s.includes('complete') || s.includes('success') || s.includes('pass')) {
    return (
      <span className="badge badge-verified">
        <CheckCircle2 size={12} /> {text || 'Verified'}
      </span>
    );
  }

  if (s.includes('pend') || s.includes('schedul') || s.includes('process')) {
    return (
      <span className="badge badge-pending">
        <Clock size={12} /> {text || 'Pending'}
      </span>
    );
  }

  if (s.includes('action') || s.includes('need') || s.includes('updat')) {
    return (
      <span className="badge badge-action">
        <AlertTriangle size={12} /> {text || 'Action Needed'}
      </span>
    );
  }

  return (
    <span className="badge badge-failed">
      <XCircle size={12} /> {text || status}
    </span>
  );
}
