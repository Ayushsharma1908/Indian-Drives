import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

export function StatusBadge({ status, text }) {
  const s = (status || '').toLowerCase();

  // 1. Verified / Completed / Passed / Issued -> Teal/Sage
  if (
    s.includes('verifi') ||
    s.includes('complete') ||
    s.includes('success') ||
    s.includes('pass') ||
    s.includes('issue') ||
    s.includes('approv')
  ) {
    return (
      <span className="badge badge-verified">
        <CheckCircle2 size={13} strokeWidth={2.2} />
        <span>{text || (s.includes('issue') ? 'Issued' : 'Verified')}</span>
      </span>
    );
  }

  // 2. Current / Active / In Progress -> Saffron
  if (s.includes('current') || s.includes('active') || s.includes('progress')) {
    return (
      <span className="badge badge-action">
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-saffron)' }} />
        <span>{text || 'Active'}</span>
      </span>
    );
  }

  // 3. Pending / Scheduled / Processing -> Indigo
  if (
    s.includes('pend') ||
    s.includes('schedul') ||
    s.includes('process') ||
    s.includes('wait') ||
    s.includes('book')
  ) {
    return (
      <span className="badge badge-pending">
        <Clock size={13} strokeWidth={2.2} />
        <span>{text || (s.includes('book') || s.includes('schedul') ? 'Scheduled' : 'Pending')}</span>
      </span>
    );
  }

  // 4. Action Needed / Warning -> Amber
  if (s.includes('action') || s.includes('need') || s.includes('updat') || s.includes('warn')) {
    return (
      <span className="badge badge-action">
        <AlertTriangle size={13} strokeWidth={2.2} />
        <span>{text || 'Action Needed'}</span>
      </span>
    );
  }

  // 5. Failed / Rejected / Error -> Red
  return (
    <span className="badge badge-failed">
      <XCircle size={13} strokeWidth={2.2} />
      <span>{text || (s.includes('reject') ? 'Rejected' : 'Failed')}</span>
    </span>
  );
}
