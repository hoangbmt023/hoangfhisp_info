import React, { useState, useRef, useEffect } from 'react';
import { LIGHTING_PRESETS } from '../../../data/duoStudioData';
import './DuoControls.css';

/**
 * Camera / Cinematic Icon
 */
const CameraIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

/**
 * Sun / Lighting Icon
 */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

/**
 * Close Icon
 */
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="6" />
  </svg>
);

/**
 * Component: DuoViewTools
 * Rewritten View Tools:
 * - Focus section is completely removed.
 * - Supports Cinematic Depth of Field & Blur Strength slider.
 * - Supports Lighting Presets selection.
 * - Positioned on the left side of the stage.
 */
const DuoViewTools = ({
  lens,
  onLensChange,
  lighting,
  onLightingChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cinematic'); // 'cinematic' | 'lighting'
  const panelRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleCinematic = (e) => {
    onLensChange({
      ...lens,
      enabled: e.target.checked,
    });
  };

  const handleApertureChange = (e) => {
    const val = parseFloat(e.target.value);
    onLensChange({
      ...lens,
      aperture: val,
    });
  };

  return (
    <div className="duo-view-tools-wrapper" ref={panelRef}>
      {/* Trigger Button */}
      <button
        className={`duo-cinematic-btn ${lens.enabled || isOpen ? 'selected' : ''}`}
        onClick={handleToggleOpen}
        disabled={disabled}
        aria-expanded={isOpen}
        title="Hiệu ứng điện ảnh & Ánh sáng 3D"
        aria-label="Cinematic and lighting controls"
      >
        <CameraIcon />
        <span>Cinematic</span>
      </button>

      {/* Cinematic & Lighting Settings Popover (NO FOCUS) */}
      {isOpen && (
        <div className="duo-lens-panel" role="region" aria-label="Cinematic and lighting settings">
          {/* Header */}
          <div className="duo-lens-header">
            <h3>Cinematic & Studio Light</h3>
            <button
              className="duo-lens-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close settings"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="duo-lens-tabs">
            <button
              className={`duo-tab-btn ${activeTab === 'cinematic' ? 'active' : ''}`}
              onClick={() => setActiveTab('cinematic')}
            >
              <CameraIcon />
              <span>Độ sâu trường ảnh (DoF)</span>
            </button>
            <button
              className={`duo-tab-btn ${activeTab === 'lighting' ? 'active' : ''}`}
              onClick={() => setActiveTab('lighting')}
            >
              <SunIcon />
              <span>Ánh sáng</span>
            </button>
          </div>

          {/* Tab 1: Cinematic (Blur & Depth of field, NO focus picker) */}
          {activeTab === 'cinematic' && (
            <div className="duo-lens-body">
              <div className="duo-control-row">
                <label htmlFor="dof-toggle" className="duo-control-label">
                  Depth of field (Mờ nền)
                </label>
                <input
                  id="dof-toggle"
                  type="checkbox"
                  className="duo-switch-input"
                  checked={lens.enabled}
                  onChange={handleToggleCinematic}
                />
              </div>

              <div className={`duo-slider-group ${!lens.enabled ? 'disabled' : ''}`}>
                <div className="duo-slider-header">
                  <span>Độ mờ hậu cảnh</span>
                  <span className="duo-slider-value">{Math.round((lens.aperture || 0.35) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={lens.aperture || 0.35}
                  disabled={!lens.enabled}
                  onChange={handleApertureChange}
                  className="duo-range-slider"
                />
                <div className="duo-slider-endpoints">
                  <span>Nhẹ dịu</span>
                  <span>Mạnh</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Lighting Presets */}
          {activeTab === 'lighting' && (
            <div className="duo-lens-body">
              <p className="duo-section-desc">Chọn môi trường ánh sáng chiếu lên thân máy:</p>
              <div className="duo-lighting-grid">
                {LIGHTING_PRESETS.map((preset) => {
                  const isSelected = lighting === preset.id;
                  return (
                    <button
                      key={preset.id}
                      className={`duo-light-card ${isSelected ? 'active' : ''}`}
                      onClick={() => onLightingChange(preset.id)}
                    >
                      <span className={`duo-light-preview light-preset-${preset.id}`} />
                      <div className="duo-light-info">
                        <strong>{preset.name}</strong>
                        <small>{preset.desc}</small>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(DuoViewTools);
