import React, { useRef, useState, useCallback } from 'react';
import { POSE_PRESETS } from '../../../data/duoStudioData';
import './DuoControls.css';

/**
 * Pose SVG Icon
 */
const PoseIcon = ({ pose }) => {
  if (pose === 'closed') {
    return (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M11.25 4.75h9.5c2.25 0 3.25 1.25 3.25 3.5v16c0 2.25-1 3.5-3.25 3.5h-9.5C9 27.75 8 26.5 8 24.25v-16c0-2.25 1-3.5 3.25-3.5Zm.2 1.7c-1.3 0-1.8.6-1.8 2v15.1c0 1.6.5 2.5 1.8 2.5h9.1c1.3 0 1.8-.9 1.8-2.5V8.45c0-1.4-.5-2-1.8-2h-9.1Z"
        />
        <path
          d="M8.1 7.4C6.75 7.65 6.5 8.5 6.5 9.8v13.5c0 1.4.4 2.25 1.6 2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth=".8"
          opacity=".55"
        />
        <circle cx="20.4" cy="8.6" r=".9" />
      </svg>
    );
  }

  if (pose === 'half') {
    return (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path
          d="M19.2 7h6.65c1.85 0 2.65.95 2.65 2.8v12.4c0 1.85-.8 2.8-2.65 2.8H19.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          d="M7.3 5.9 17.45 3.2c1.5-.4 2.3.5 2.3 2.1v21.4c0 1.6-.8 2.5-2.3 2.1L7.3 26.1c-1.45-.4-2.05-1.2-2.05-2.8V8.7c0-1.6.6-2.4 2.05-2.8Zm1.25 2.35c-.8.2-1.1.7-1.1 1.75v12c0 1.05.3 1.55 1.1 1.75l7.9 2.1V6.15l-7.9 2.1Z"
        />
      </svg>
    );
  }

  // Open (180°)
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.3 6.1h21.4c2.5 0 3.5 1.25 3.5 3.7v12.4c0 2.4-1 3.7-3.5 3.7H5.3c-2.5 0-3.5-1.3-3.5-3.7V9.8c0-2.45 1-3.7 3.5-3.7Zm.15 1.75c-1.5 0-1.95.6-1.95 2.1v12.1c0 1.5.45 2.1 1.95 2.1h21.1c1.5 0 1.95-.6 1.95-2.1V9.95c0-1.5-.45-2.1-1.95-2.1H5.45Z"
      />
      <path d="M16 8v16" stroke="currentColor" strokeWidth=".7" opacity=".24" />
      <path d="M15.6 6.1h.8v1.75h-.8zm0 18.05h.8v1.75h-.8z" opacity=".45" />
    </svg>
  );
};

/**
 * Play/Pause Icon
 */
const PlayPauseIcon = ({ isPlaying }) => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    {isPlaying ? (
      <>
        <rect x="7" y="5" width="6" height="22" rx="2" />
        <rect x="19" y="5" width="6" height="22" rx="2" />
      </>
    ) : (
      <path
        transform="translate(3.8 0)"
        d="M11 5C7.7 2.8 4 4.6 4 8.4v15.2c0 3.8 3.7 5.6 7 3.4l11.5-7.5c3.3-2.1 3.3-4.9 0-7L11 5Z"
      />
    )}
  </svg>
);

/**
 * Reset Orientation Icon
 */
const ResetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

/**
 * Component: DuoFoldToolbar
 * Bottom control dock for angle scrubber, pose presets, auto-play, reset, and hints.
 */
const DuoFoldToolbar = ({
  angle,
  isPlaying,
  onAngleChange,
  onPoseSelect,
  onTogglePlay,
  onResetView,
  onScrubbingChange,
}) => {
  const scrubberRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateAngleFromEvent = useCallback((e) => {
    if (!scrubberRef.current) return angle;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(ratio * 180);
  }, [angle]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    onScrubbingChange?.(true);
    const newAngle = calculateAngleFromEvent(e);
    onAngleChange(newAngle);

    const handlePointerMove = (moveEvent) => {
      const updatedAngle = calculateAngleFromEvent(moveEvent);
      onAngleChange(updatedAngle);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      onScrubbingChange?.(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  };

  const progress = Math.max(0, Math.min(1, angle / 180));
  const roundedDegrees = `${Math.round(angle)}°`;

  return (
    <div className="duo-bottom-dock">
      {/* 1. Pose Preset Buttons */}
      <div className="duo-pose-presets" role="group" aria-label="Device poses">
        {POSE_PRESETS.map((item) => {
          const isActive = Math.abs(angle - item.angle) < 2;
          return (
            <button
              key={item.pose}
              className={`duo-pose-btn ${isActive ? 'active' : ''}`}
              title={`${item.label} · ${item.desc}`}
              aria-pressed={isActive}
              onClick={() => onPoseSelect(item.angle)}
            >
              <PoseIcon pose={item.pose} />
            </button>
          );
        })}
      </div>

      {/* 2. Fold Toolbar */}
      <div className="duo-fold-toolbar">
        {/* Play/Pause Fold Loop Button */}
        <button
          className="duo-play-btn"
          onClick={onTogglePlay}
          title={isPlaying ? 'Dừng hiệu ứng gập' : 'Tự động mở/gập xoay vòng'}
          aria-label={isPlaying ? 'Pause fold animation' : 'Play fold animation'}
        >
          <PlayPauseIcon isPlaying={isPlaying} />
        </button>

        {/* Interactive Fold Scrubber Slider */}
        <div
          ref={scrubberRef}
          className={`duo-fold-scrubber ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          style={{ '--fold-progress': progress }}
        >
          <div className="duo-fold-track">
            <div className="duo-fold-fill" style={{ width: `${progress * 100}%` }}>
              <span className="duo-fold-notch" />
            </div>
          </div>

          <div className="duo-fold-caption">
            <span className="duo-fold-label">
              {isDragging ? 'Kéo để điều chỉnh góc' : 'Kéo để mở gập'}
            </span>
            <output className="duo-fold-degrees">{roundedDegrees}</output>
          </div>

          <div className="duo-fold-caption duo-fold-sheen" aria-hidden="true">
            <span className="duo-fold-label">
              {isDragging ? 'Kéo để điều chỉnh góc' : 'Kéo để mở gập'}
            </span>
          </div>
        </div>

        {/* Reset View Button */}
        <button
          className="duo-reset-btn"
          onClick={onResetView}
          title="Đặt lại góc nhìn 3D ban đầu"
          aria-label="Reset 3D camera orientation"
        >
          <ResetIcon />
        </button>
      </div>

      {/* 3. Orbit Hint */}
      <p className="duo-orbit-hint">
        <span className="hint-desktop">Kéo chuột để xoay 360° · Cuộn để phóng to</span>
        <span className="hint-mobile">Chạm & vuốt để xoay · Dùng 2 ngón để thu phóng</span>
      </p>
    </div>
  );
};

export default React.memo(DuoFoldToolbar);
