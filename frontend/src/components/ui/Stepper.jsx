import React from 'react';
import { Check } from 'lucide-react';

export function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper-bar">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="stepper-num">
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>
              <span>{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`stepper-divider ${idx < currentStep ? 'active' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
