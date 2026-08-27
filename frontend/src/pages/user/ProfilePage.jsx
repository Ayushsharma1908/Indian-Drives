import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Phone, Mail, FileText, Award, FolderCheck, Edit3, X, Check,
  ArrowRight, ShieldCheck, Calendar, MapPin, LogOut
} from 'lucide-react';
import { AuthContext } from '../../main';
import { getStoredUserProfile, setStoredUserProfile } from '../../data/userProfileData';

export function ProfilePage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // Load initial profile details from unified single source of truth
  const [profile, setProfile] = useState(() => getStoredUserProfile());

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleOpenEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = setStoredUserProfile(editForm);
    setProfile(updated);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    if (auth && auth.logout) {
      await auth.logout();
    }
    localStorage.removeItem('indian-drives-authenticated');
    localStorage.removeItem('indian-drives-token');
    localStorage.removeItem('indian-drives-user-profile');
    navigate('/', { replace: true });
  };

  return (
    <div className="page page-profile" style={{ width: 'min(1184px, calc(100% - 48px))', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1. TOP USER PROFILE HERO CARD */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '28px 36px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Avatar Circle */}
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: '#eef6ff',
            border: '1px solid #cbd5e1',
            color: '#173b57',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <User size={36} />
          </div>

          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#173b57', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
              {profile.fullName}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', fontWeight: 600, color: '#476179' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                📱 {profile.phone}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✉️ {profile.email}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleOpenEdit}
            style={{
              background: '#0a2540',
              color: '#ffffff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(10, 37, 64, 0.15)',
              transition: 'all 0.15s ease'
            }}
          >
            <Edit3 size={16} /> Edit Profile
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: '#fff1f2',
              color: '#e11d48',
              border: '1px solid #fecdd3',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffe4e6';
              e.currentTarget.style.borderColor = '#fda4af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff1f2';
              e.currentTarget.style.borderColor = '#fecdd3';
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

      </div>

      {/* 2. MAIN CONTENT GRID (2 COLUMNS: LEFT 340PX, RIGHT 1FR) */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: PERSONAL INFORMATION CARD */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '24px' }}>
            <User size={20} color="#173b57" />
            <span>Personal Information</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* FULL NAME */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                FULL NAME
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#173b57' }}>
                {profile.fullName}
              </div>
            </div>

            {/* DATE OF BIRTH & GENDER (2 COLUMNS) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  DATE OF BIRTH
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>
                  {profile.dob}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  GENDER
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57' }}>
                  {profile.gender}
                </div>
              </div>
            </div>

            {/* BLOOD GROUP */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                BLOOD GROUP
              </div>
              <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '13px', fontWeight: 800, padding: '4px 12px', borderRadius: '6px', display: 'inline-block' }}>
                {profile.bloodGroup}
              </span>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />

            {/* PERMANENT ADDRESS */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                PERMANENT ADDRESS
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#173b57', lineHeight: 1.5 }}>
                {profile.address}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />

            {/* LOGOUT ACTION BUTTON */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                background: '#fff1f2',
                color: '#e11d48',
                border: '1px solid #fecdd3',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '4px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffe4e6';
                e.currentTarget.style.borderColor = '#fda4af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff1f2';
                e.currentTarget.style.borderColor = '#fecdd3';
              }}
            >
              <LogOut size={15} /> Logout Account
            </button>

          </div>
        </div>

        {/* RIGHT COLUMN: STACK OF CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* MY APPLICATIONS CARD */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57' }}>
                <FileText size={20} color="#173b57" />
                <span>My Applications</span>
              </div>

              <span
                onClick={() => navigate('/journey')}
                style={{ fontSize: '14px', fontWeight: 800, color: '#c2410c', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                View All <ArrowRight size={14} />
              </span>
            </div>

            {/* Application Item 1: In Progress */}
            <div style={{
              background: '#f0f7ff',
              borderRadius: '14px',
              border: '1px solid #bae6fd',
              borderLeft: '4px solid #c2410c',
              padding: '20px 24px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#c2410c', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                CURRENT APPLICATION
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>
                    Driving Licence (DL) Application
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '2px' }}>
                    Appl. No: 9876543210
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    📂 In Progress
                  </span>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginTop: '4px' }}>
                    Last updated: 2 days ago
                  </div>
                </div>
              </div>
            </div>

            {/* Application Item 2: Completed */}
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              padding: '20px 24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57' }}>
                    Learner Licence (LL) Application
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '2px' }}>
                    Appl. No: 1234567890
                  </div>
                </div>

                <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  ✓ Completed
                </span>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: 2 CARDS SIDE-BY-SIDE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* CARD 1: MY LICENCES */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '20px' }}>
                <Award size={20} color="#173b57" />
                <span>My Licences</span>
              </div>

              {/* Dark Navy Licence Preview Badge */}
              <div style={{
                background: '#0a2540',
                borderRadius: '14px',
                padding: '20px',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.8px', color: '#94a3b8' }}>
                    LEARNER LICENCE
                  </span>
                  <span style={{ background: '#ffffff', color: '#173b57', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                    Active
                  </span>
                </div>

                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '12px 0 4px 0' }}>
                  LL-DL-2023-9876
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Valid till: 14 Feb 2024
                </div>
              </div>

              <button
                onClick={() => navigate('/manage-licence')}
                style={{
                  background: '#ffffff',
                  color: '#173b57',
                  border: '1px solid #cbd5e1',
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                View Details
              </button>
            </div>

            {/* CARD 2: MY DOCUMENTS */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 800, color: '#173b57', marginBottom: '20px' }}>
                  <FolderCheck size={20} color="#173b57" />
                  <span>My Documents</span>
                </div>

                {/* Circular Donut Gauge */}
                <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="90" height="90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#92400e" strokeWidth="8" strokeDasharray="180 60" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#173b57', lineHeight: 1 }}>4</div>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px' }}>VERIFIED</div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => navigate('/ll/documents')}
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  marginTop: '12px'
                }}
              >
                Manage Documents <ArrowRight size={14} />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. EDIT PROFILE MODAL */}
      {isEditing && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Edit3 size={22} color="#173b57" />
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#173b57', margin: 0 }}>
                  Edit Profile Details
                </h2>
              </div>

              <button
                onClick={() => setIsEditing(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'grid', gap: '16px' }}>
              
              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>PHONE NUMBER</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>DATE OF BIRTH</label>
                  <input
                    type="text"
                    value={editForm.dob}
                    onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>GENDER</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57', background: '#ffffff' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>BLOOD GROUP</label>
                  <input
                    type="text"
                    value={editForm.bloodGroup}
                    onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#476179', display: 'block', marginBottom: '6px' }}>PERMANENT ADDRESS</label>
                <textarea
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 600, color: '#173b57', resize: 'vertical' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ background: '#f1f5f9', color: '#173b57', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{ background: '#0a2540', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
