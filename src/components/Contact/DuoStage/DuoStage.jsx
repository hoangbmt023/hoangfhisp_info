import React, { Suspense, lazy } from 'react';
import './DuoStage.css';

const LazyDuoScene = lazy(() => import('./DuoScene'));

/**
 * Component: DuoStage
 * Hosts the WebGL 3D Canvas, Suspense loader, and Fallback state.
 * Single Responsibility: 3D Scene viewport rendering and loading lifecycle.
 */
const DuoStage = ({
  angle,
  playing,
  scrubbing,
  scrubRevision,
  warp = true,
  isDark = false,
  finish = 'white',
  inner = null,
  outer = null,
  fit = 'cover',
  reset = 0,
  view = 'front',
  videoPlaying = true,
  lens = { enabled: false, aperture: 0.35 },
  lighting = 0,
  presenting = true,
  onAPI,
  onAngle,
  onRenderedAngle,
  onReady,
  onError,
  onUnavailable,
  errorMessage,
  isReady,
  onRetry,
}) => {
  return (
    <div className="duo-device-stage">
      {errorMessage ? (
        <div className="duo-device-unavailable" role="alert">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2>Không thể tải mô hình 3D</h2>
          <p>{errorMessage}</p>
          {onRetry && (
            <button className="duo-retry-button" onClick={onRetry}>
              Thử lại
            </button>
          )}
        </div>
      ) : (
        <Suspense fallback={null}>
          <LazyDuoScene
            angle={angle}
            playing={playing}
            scrubbing={scrubbing}
            scrubRevision={scrubRevision}
            warp={warp}
            dark={isDark}
            finish={finish}
            inner={inner}
            outer={outer}
            fit={fit}
            reset={reset}
            view={view}
            videoPlaying={videoPlaying}
            lens={lens}
            lighting={lighting}
            presenting={presenting}
            onAPI={onAPI}
            onAngle={onAngle}
            onRenderedAngle={onRenderedAngle}
            onReady={onReady}
            onError={onError}
            onUnavailable={onUnavailable}
          />
        </Suspense>
      )}

      {!isReady && !errorMessage && (
        <div className="duo-loading-device">
          <span className="duo-spinner" />
          <p>Đang chuẩn bị mô hình iPhone Duo 3D...</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(DuoStage);
