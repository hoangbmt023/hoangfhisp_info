import { useState, useCallback } from 'react';
import { DEFAULT_DUO_STATE } from '../data/duoStudioData';

/**
 * Custom Hook: useDuoController
 * Manages 3D Duo angle, presets, rendered angle sync, finish, lighting and camera reset.
 */
export const useDuoController = (initialOptions = {}) => {
  const [targetAngle, setTargetAngle] = useState(initialOptions.angle ?? DEFAULT_DUO_STATE.angle);
  const [renderedAngle, setRenderedAngle] = useState(initialOptions.renderedAngle ?? 0);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubRevision, setScrubRevision] = useState(0);
  const [finish, setFinish] = useState(initialOptions.finish ?? DEFAULT_DUO_STATE.finish);
  const [warp, setWarp] = useState(initialOptions.warp ?? DEFAULT_DUO_STATE.warp);
  const [lens, setLens] = useState(initialOptions.lens ?? DEFAULT_DUO_STATE.lens);
  const [lighting, setLighting] = useState(initialOptions.lighting ?? DEFAULT_DUO_STATE.lighting);
  const [view, setView] = useState('front');
  const [resetCounter, setResetCounter] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // When dragging scrubber: updates target angle & increments scrubRevision for instant tracking
  const handleScrubAngle = useCallback((newAngle) => {
    const clamped = Math.max(0, Math.min(180, newAngle));
    setTargetAngle(clamped);
    setRenderedAngle(clamped);
    setScrubRevision((r) => r + 1);
  }, []);

  // When clicking a pose preset (0°, 90°, 180°):
  // DOES NOT increment scrubRevision so Three.js spring physics animates the unfolding/folding smoothly!
  const handleSetPose = useCallback((newAngle) => {
    const clamped = Math.max(0, Math.min(180, newAngle));
    setTargetAngle(clamped);
    setView('front');
    setResetCounter((c) => c + 1);
  }, []);

  const handleResetView = useCallback(() => {
    setView('front');
    setResetCounter((c) => c + 1);
  }, []);

  const handleFinishChange = useCallback((newFinish) => {
    if (newFinish === 'white' || newFinish === 'night') {
      setFinish(newFinish);
    }
  }, []);

  const handleLensChange = useCallback((updatedLens) => {
    setLens((prev) => ({ ...prev, ...updatedLens }));
  }, []);

  const handleLightingChange = useCallback((newLighting) => {
    setLighting((prev) => ({ ...prev, ...newLighting }));
  }, []);

  // When receiving live angle animation updates from Three.js scene (e.g. Intro animation or spring physics)
  const handleLiveAngle = useCallback((curAngle) => {
    setTargetAngle(curAngle);
    setRenderedAngle(curAngle);
  }, []);

  return {
    state: {
      angle: targetAngle,
      renderedAngle,
      scrubbing,
      scrubRevision,
      finish,
      warp,
      lens,
      lighting,
      view,
      resetCounter,
      isReady,
      errorMessage,
    },
    actions: {
      setAngle: handleScrubAngle,
      setLiveAngle: handleLiveAngle,
      setRenderedAngle,
      setPose: handleSetPose,
      setScrubbing,
      setFinish: handleFinishChange,
      setWarp,
      setLens: handleLensChange,
      setLighting: handleLightingChange,
      setView,
      resetView: handleResetView,
      setIsReady,
      setErrorMessage,
    },
  };
};

export default useDuoController;
