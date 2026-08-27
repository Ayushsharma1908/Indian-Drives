/**
 * Unified Single Source of Truth Profile Data for Indian Drives
 */
export const DEFAULT_USER_PROFILE = {
  fullName: 'Yanshi Chauhan',
  firstName: 'Yanshi',
  lastName: 'Chauhan',
  avatar: 'YC',
  email: 'yanshi.chauhan@example.com',
  mobile: '+91 98765 43210',
  fatherName: 'Rajesh Chauhan',
  dob: '19/08/1998',
  gender: 'Female',
  bloodGroup: 'O+ve',
  
  // Single Unified Address
  streetAddress: 'Flat 402, Green Park Heights, Sakchi',
  city: 'Jamshedpur',
  district: 'East Singhbhum',
  state: 'Jharkhand',
  pincode: '831001',
  fullAddress: 'Flat 402, Green Park Heights, Sakchi, Jamshedpur, Jharkhand - 831001',

  // RTO & Licence Details
  rtoCode: 'JH-05',
  rtoName: 'Jamshedpur RTO (Sakchi, Jamshedpur)',
  llNumber: 'LL-05/2026/008821',
  llIssueDate: '14 Jul 2026',
  llValidUntil: '13 Jan 2027',
  dlNumber: 'JH-05-2026-0098124',
  applicationNumber: 'IND-2026-98124',
  vehicleClass: 'LMV (Light Motor Vehicle)'
};

export function getStoredUserProfile() {
  try {
    const saved = localStorage.getItem('indian-drives-user-profile');
    if (saved) {
      return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error reading stored user profile:', e);
  }
  return DEFAULT_USER_PROFILE;
}

export function setStoredUserProfile(updatedProfile) {
  try {
    const merged = { ...getStoredUserProfile(), ...updatedProfile };
    localStorage.setItem('indian-drives-user-profile', JSON.stringify(merged));
    return merged;
  } catch (e) {
    console.error('Error saving user profile:', e);
    return updatedProfile;
  }
}
