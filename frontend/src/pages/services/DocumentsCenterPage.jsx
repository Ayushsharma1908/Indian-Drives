import React, { useState, useEffect } from 'react';
import {
  FileCheck2, Upload, FileText, CheckCircle2, Clock, AlertTriangle,
  ShieldCheck, Eye, Download, X, Plus, Check
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { centralDataStore } from '../../data/centralDataStore';
import { useLanguage } from '../../main';

export function DocumentsCenterPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState(() => centralDataStore.getDocuments());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const [newDocType, setNewDocType] = useState('Identity Proof');
  const [newDocName, setNewDocName] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      setDocuments([...centralDataStore.getDocuments()]);
    };
    window.addEventListener('indian-drives-state-change', handleUpdate);
    return () => window.removeEventListener('indian-drives-state-change', handleUpdate);
  }, []);

  const totalDocs = documents.length;
  const verifiedDocs = documents.filter(d => d.status === 'Verified').length;
  const pendingDocs = documents.filter(d => d.status === 'Pending').length;
  const needsUpdateDocs = documents.filter(d => d.status === 'Needs Update' || d.status === 'Rejected').length;

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDocName) return;

    centralDataStore.addDocument({
      name: newDocName,
      category: newDocType,
      type: newDocType.toLowerCase().includes('identity') ? 'identity' : 'address',
      status: 'Verified',
      fileSize: '480 KB'
    });

    setDocuments([...centralDataStore.getDocuments()]);
    setShowUploadModal(false);
    setNewDocName('');
    setFileName('');
  };

  const user = centralDataStore.getUserProfile();

  return (
    <div className="page page-documents" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      
      <div className="page-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '6px' }}>
            <FileCheck2 size={13} />
            DOCUMENT VAULT & EKYC VERIFICATION
          </div>
          <h1 style={{ color: 'var(--color-deep-navy)', fontSize: '36px', fontWeight: 700, margin: 0, letterSpacing: '-0.8px' }}>
            Documents Center
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', margin: '6px 0 0 0' }}>
            Manage the verified proofs used across your Indian Drives applications.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="primary-button"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '14px' }}
        >
          <Upload size={16} /> Upload New Document
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="console-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>{totalDocs}</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>All Documents</div>
        </div>
        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-teal)' }}>{verifiedDocs}</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Verified & Cleared</div>
        </div>
        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-indigo)' }}>{pendingDocs}</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Pending Scrutiny</div>
        </div>
        <div className="card-standard" style={{ padding: '20px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-muted)' }}>{needsUpdateDocs}</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginTop: '4px' }}>Needs Update</div>
        </div>
      </div>

      {documents.length === 0 ? (
        /* TRUE EMPTY STATE */
        <div className="card-standard" style={{ padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EAF4F8', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: '0 0 6px 0' }}>
              You haven't uploaded any documents yet
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '420px', lineHeight: 1.5 }}>
              Upload your Aadhaar ID proof, address verification, or Learner Licence copy to complete application scrutiny.
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="primary-button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '14px' }}
          >
            <Upload size={16} /> Upload Document
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {documents.map((doc) => (
            <div key={doc.id} className="card-standard" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EAF4F8', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0284c7', fontWeight: 800, letterSpacing: '0.6px' }}>
                      {doc.category}
                    </span>
                    <h3 style={{ margin: '3px 0 5px 0', fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-navy)' }}>
                      {doc.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12.5px', color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
                      <span>Uploaded: <strong style={{ color: 'var(--color-text-primary)' }}>{doc.date}</strong></span>
                      <span>Validity: <strong style={{ color: 'var(--color-text-primary)' }}>{doc.validUntil || 'Permanent'}</strong></span>
                      {doc.fileSize && <span>Size: <strong style={{ color: 'var(--color-text-primary)' }}>{doc.fileSize}</strong></span>}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StatusBadge status={doc.status} text={doc.status} />
                  <button
                    onClick={() => setSelectedPreview(doc)}
                    className="secondary-button"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12.5px' }}
                  >
                    <Eye size={14} /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 45, 67, 0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card-standard" style={{ background: '#ffffff', maxWidth: '480px', width: '100%', borderRadius: '16px', padding: '28px', position: 'relative' }}>
            <button
              onClick={() => setShowUploadModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: '0 0 6px 0' }}>
              Upload New Document
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px 0' }}>
              Upload clear PDF, JPG or PNG scans. Max file size: 2 MB.
            </p>

            <form onSubmit={handleUploadSubmit} style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-navy)', display: 'block', marginBottom: '6px' }}>
                  Document Category
                </label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', background: '#ffffff' }}
                >
                  <option value="Identity Proof">Identity Proof (Aadhaar / Voter ID / Passport)</option>
                  <option value="Address Proof">Address Proof (Utility Bill / Rent Agreement)</option>
                  <option value="Health & Fitness">Medical Certificate (Form 1A)</option>
                  <option value="Biometric Proof">Passport Photograph / Signature</option>
                  <option value="Licence Proof">Learner Licence Form 3</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-navy)', display: 'block', marginBottom: '6px' }}>
                  Document Label / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aadhaar Card (Front & Back)"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-navy)', display: 'block', marginBottom: '6px' }}>
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                  style={{ width: '100%', padding: '8px', border: '1px dashed var(--color-border)', borderRadius: '8px', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="secondary-button"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  style={{ padding: '8px 20px', fontSize: '13px' }}
                >
                  Upload & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedPreview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 45, 67, 0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card-standard" style={{ background: '#ffffff', maxWidth: '480px', width: '100%', borderRadius: '16px', padding: '28px', position: 'relative' }}>
            <button
              onClick={() => setSelectedPreview(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EAF4F8', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-deep-navy)', margin: 0 }}>
                  {selectedPreview.name}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {selectedPreview.category}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '13px', display: 'grid', gap: '8px', marginBottom: '20px' }}>
              <div><strong>Document ID:</strong> {selectedPreview.id}</div>
              <div><strong>Owner:</strong> {user.name}</div>
              <div><strong>Upload Date:</strong> {selectedPreview.date}</div>
              <div><strong>Verification Status:</strong> <span style={{ color: 'var(--color-teal)', fontWeight: 700 }}>{selectedPreview.status} ✓</span></div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedPreview(null)}
                className="secondary-button"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="primary-button"
                style={{ padding: '8px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={14} /> Download Proof
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
