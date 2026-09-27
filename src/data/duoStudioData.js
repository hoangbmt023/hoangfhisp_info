/**
 * Domain Models & Constants for 3D Duo Studio (Contact Page)
 * Follows DDD & Clean Architecture principles
 */

export const POSE_PRESETS = [
  { pose: 'closed', label: 'Closed', angle: 0 },
  { pose: 'half', label: 'Folded', angle: 90 },
  { pose: 'open', label: 'Open', angle: 180 },
];

export const FINISH_OPTIONS = [
  {
    id: 'white',
    name: 'Star White',
    label: 'Star White',
  },
  {
    id: 'night',
    name: 'Night Sky',
    label: 'Night Sky',
  },
];

export const DEFAULT_LIGHTING = {
  style: 'studio',
  direction: 0,
  intensity: 1,
  softness: 0.55,
};

export const LIGHTING_PRESETS = [
  { id: 'studio', label: 'Studio', style: 'studio', direction: 0, intensity: 1, softness: 0.55, className: '' },
  { id: 'soft', label: 'Soft', style: 'soft', direction: 1, intensity: 0.8, softness: 0.85, className: 'light-preview-soft' },
  { id: 'edge', label: 'Edge', style: 'edge', direction: -1, intensity: 1.2, softness: 0.3, className: 'light-preview-edge' },
];

export const DEFAULT_DUO_STATE = {
  angle: 180,
  playing: false,
  warp: true,
  finish: 'white',
  lens: {
    enabled: false,
    aperture: 0.35,
  },
  lighting: DEFAULT_LIGHTING,
};
