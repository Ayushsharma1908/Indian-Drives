import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Unified Responsive Stage Stepper Component for Indian Drives
 * Standardized across LL Flow, DL Flow, Journey Timelines, and Licence Services
 */
export function UnifiedStageStepper({ steps, currentStepIndex = 0, onStepClick, flowName }) {
  const navigate = useNavigate();

  const handleStepClick = (step, idx) => {
    if (onStepClick) {
      onStepClick(step, idx);
    } else if (step.path) {
      navigate(step.path);
    }
  };

  const currentStep = steps[currentStepIndex] || steps[0] || {};
  const progressPercent = Math.min(100, Math.max(0, (currentStepIndex / (steps.length - 1)) * 100));

  return (
    <div className="unified-stage-stepper-card" style={{
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      padding: '24px 32px',
      marginBottom: '32px',
      boxShadow: '0 4px 16px rgba(0, 37, 66, 0.03)'
    }}>
      {/* MOBILE COMPACT HEADER (< 768px) */}
      <div className="stepper-mobile-header" style={{ display: 'none', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#e88a2d', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            {flowName || 'APPLICATION PROGRESS'} · STEP {currentStepIndex + 1} OF {steps.length}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#173b57' }}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #173b57 0%, #e88a2d 100%)', transition: 'width 0.4s ease', borderRadius: '9999px' }} />
        </div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#173b57', marginTop: '10px' }}>
          {currentStep.title || currentStep.label}
        </div>
      </div>

      {/* HORIZONTAL STEPPER TRACK (SCROLLABLE ON MOBILE/TABLET) */}
      <div className="stepper-track-container" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', minWidth: '600px', padding: '4px 0' }}>
          
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <React.Fragment key={step.id || idx}>
                {/* Step Circle & Title */}
                <div
                  onClick={() => handleStepClick(step, idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    position: 'relative',
                    zIndex: 2,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isActive ? '#002542' : isCompleted ? '#16a34a' : '#ffffff',
                    color: isActive || isCompleted ? '#ffffff' : '#64748b',
                    border: isActive ? 'none' : isCompleted ? 'none' : '2px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isActive ? '0 0 0 4px rgba(0, 37, 66, 0.15)' : isCompleted ? '0 2px 8px rgba(22, 163, 74, 0.2)' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    {isCompleted ? (
                      <Check size={20} strokeWidth={3} />
                    ) : IconComp ? (
                      <IconComp size={18} />
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: 800 }}>{idx + 1}</span>
                    )}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 800 : isCompleted ? 700 : 600,
                      color: isActive ? '#173b57' : isCompleted ? '#16a34a' : '#64748b',
                      whiteSpace: 'nowrap'
                    }}>
                      {step.title || step.label}
                    </div>
                    {isActive && (
                      <div style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        color: '#e88a2d',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        marginTop: '2px'
                      }}>
                        CURRENT STEP
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '3px',
                    background: idx < currentStepIndex ? '#16a34a' : '#e2e8f0',
                    margin: '0 12px',
                    marginBottom: '22px',
                    borderRadius: '9999px',
                    transition: 'all 0.3s ease',
                    minWidth: '40px'
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
