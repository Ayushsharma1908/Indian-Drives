import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const INDIAN_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली" },
  { code: "sat", name: "Santali", nativeName: "संथाली" },
  { code: "ks", name: "Kashmiri", nativeName: "کٲشُر" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी" },
  { code: "brx", name: "Bodo", nativeName: "बड़ो" },
  { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্" }
];

export function LanguageSelector({ currentLanguage, onSelectLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const selectedLang = INDIAN_LANGUAGES.find((l) => l.code === currentLanguage) || INDIAN_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = INDIAN_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="language-dropdown-container" ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Selector Trigger Pill */}
      <button
        type="button"
        className="language-pill-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          minHeight: '40px',
          background: isOpen ? '#f1f5f9' : '#ffffff',
          border: isOpen ? '1px solid #173b57' : '1px solid #e2e8f0',
          borderRadius: '12px',
          color: '#173b57',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0, 37, 66, 0.04)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        <Languages size={17} style={{ color: '#e88a2d', flexShrink: 0 }} />
        <span style={{ fontWeight: 600, letterSpacing: '-0.2px' }}>
          {selectedLang.code === 'en' ? 'English' : `${selectedLang.nativeName} (${selectedLang.name})`}
        </span>
        <ChevronDown
          size={15}
          style={{
            color: '#476179',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            marginLeft: '2px'
          }}
        />
      </button>

      {/* Dropdown Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '320px',
              maxHeight: '400px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 12px 36px rgba(0, 37, 66, 0.12), 0 4px 12px rgba(0,0,0,0.04)',
              zIndex: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header & Quick Search */}
            <div style={{ padding: '14px 16px 10px 16px', borderBottom: '1px solid #f1f5f9', background: '#fafbfc' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Select Language (भाषा)
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                  {INDIAN_LANGUAGES.length} Official Languages
                </span>
              </div>

              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  gap: '8px'
                }}
              >
                <Search size={14} style={{ color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search state language..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '13px',
                    width: '100%',
                    color: '#173b57',
                    background: 'transparent'
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Language Options Grid / List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2px'
              }}
              role="listbox"
            >
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => {
                  const isSelected = lang.code === currentLanguage;
                  return (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: isSelected ? '#f1f5f9' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '14px', fontWeight: isSelected ? 700 : 600, color: '#173b57' }}>
                          {lang.nativeName}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 400 }}>
                          {lang.name}
                        </span>
                      </div>

                      {isSelected && (
                        <div
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: '#173b57',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={13} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div style={{ padding: '24px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                  No language matching "{search}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
