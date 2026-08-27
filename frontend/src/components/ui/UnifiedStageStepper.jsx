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
    <div className="unified-stage-stepper-card card-standard" style={{
      padding: '20px 28px',
      marginBottom: '28px'
    }}>
      {/* MOBILE COMPACT HEADER (< 768px) */}
      <div className="stepper-mobile-header" style={{ display: 'none', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-saffron)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            {flowName || 'APPLICATION PROGRESS'} · STEP {currentStepIndex + 1} OF {steps.length}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-deep-navy)' }}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div style={{ height: '5px', width: '100%', background: 'var(--color-border)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--color-deep-navy)', transition: 'width 0.4s ease', borderRadius: '9999px' }} />
        </div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-deep-navy)', marginTop: '8px' }}>
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
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--color-deep-navy)' : isCompleted ? 'var(--color-teal)' : '#ffffff',
                    color: isActive || isCompleted ? '#ffffff' : 'var(--color-text-muted)',
                    border: isActive ? 'none' : isCompleted ? 'none' : '1.5px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isActive ? '0 0 0 4px rgba(232, 137, 45, 0.18)' : isCompleted ? '0 2px 6px rgba(22, 138, 136, 0.2)' : 'none',
                    transition: 'all 0.25s ease'
                  }}>
                    {isCompleted ? (
                      <Check size={18} strokeWidth={2.6} />
                    ) : IconComp ? (
                      <IconComp size={17} />
                    ) : (
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{idx + 1}</span>
                    )}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
                      color: isActive ? 'var(--color-deep-navy)' : isCompleted ? 'var(--color-teal)' : 'var(--color-text-secondary)',
                      whiteSpace: 'nowrap'
                    }}>
                      {step.title || step.label}
                    </div>
                    {isActive && (
                      <div style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        color: 'var(--color-saffron)',
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
                    height: '2px',
                    background: idx < currentStepIndex ? 'var(--color-teal)' : 'var(--color-border)',
                    margin: '0 12px',
                    marginBottom: '20px',
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
