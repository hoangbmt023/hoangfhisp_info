import React from 'react';
import { FINISH_OPTIONS } from '../../../data/duoStudioData';
import './DuoControls.css';

/**
 * Component: DuoFinishPicker
 * Separated to the RIGHT side as required.
 * Allows switching between iPhone Duo metal finishes: Star White & Night Sky.
 */
const DuoFinishPicker = ({ finish, onFinishChange }) => {
  const currentOption = FINISH_OPTIONS.find((opt) => opt.id === finish) || FINISH_OPTIONS[0];

  return (
    <div className="duo-finish-picker-container" aria-label="Device color finish">
      <span className="duo-finish-label" aria-hidden="true">
        {currentOption.name}
      </span>

      <div className="duo-finish-options" role="radiogroup" aria-label="Color finish options">
        {FINISH_OPTIONS.map((opt) => {
          const isSelected = finish === opt.id;
          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              className={`duo-finish-swatch swatch-${opt.id} ${isSelected ? 'selected' : ''}`}
              title={`${opt.name} (${opt.label})`}
              aria-label={opt.name}
              onClick={() => onFinishChange(opt.id)}
            >
              <span className="swatch-inner-dot" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(DuoFinishPicker);
