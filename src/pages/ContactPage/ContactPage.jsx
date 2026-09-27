import React, { useState, useRef, useCallback, useMemo, useEffect, Suspense, lazy } from 'react';
import { useTheme } from '../../context/ThemeContext';
import useDuoController from '../../hooks/useDuoController';
import { DEFAULT_LIGHTING, POSE_PRESETS } from '../../data/duoStudioData';

// 1. Facebook
import fbInDark from '../../assets/images/contacts/fb/fb-in-dark.png';
import fbInLight from '../../assets/images/contacts/fb/fb-in-light.png';
import fbOutDark from '../../assets/images/contacts/fb/fb-out-dark.png';
import fbOutLight from '../../assets/images/contacts/fb/fb-out-light.png';

// 2. Instagram
import igInDark from '../../assets/images/contacts/ig/ig-in-dark.png';
import igInLight from '../../assets/images/contacts/ig/ig-in-light.png';
import igOutDark from '../../assets/images/contacts/ig/ig-out-dark.png';
import igOutLight from '../../assets/images/contacts/ig/ig-out-light.png';

// 3. TikTok
import tiktokInDark from '../../assets/images/contacts/tiktok/tiktok-in-dark.png';
import tiktokInLight from '../../assets/images/contacts/tiktok/tiktok-in-light.png';
import tiktokOutDark from '../../assets/images/contacts/tiktok/tiktok-out-dark.png';
import tiktokOutLight from '../../assets/images/contacts/tiktok/tiktok-out-light.png';

// 4. Threads
import threadInDark from '../../assets/images/contacts/thread/thread-in-dark.png';
import threadInLight from '../../assets/images/contacts/thread/thread-in-light.png';
import threadOutDark from '../../assets/images/contacts/thread/thread-out-darkpng.png';
import threadOutLight from '../../assets/images/contacts/thread/thread-out-light.png';

// 5. GitHub
import githubInDark from '../../assets/images/contacts/github/github-in-dark.png';
import githubInLight from '../../assets/images/contacts/github/github-in-light.png';
import githubOutDark from '../../assets/images/contacts/github/github-out-dark.png';
import githubOutLight from '../../assets/images/contacts/github/github-out-light.png';

// 6. Gmail
import gmailInDark from '../../assets/images/contacts/gmail/gmail-in-dark.png';
import gmailInLight from '../../assets/images/contacts/gmail/gmail-in-light.png';
import gmailOutDark from '../../assets/images/contacts/gmail/gmail-out-dark.png';
import gmailOutLight from '../../assets/images/contacts/gmail/gmail-out-light.png';

// 7. LinkedIn
import linkedinInDark from '../../assets/images/contacts/linkedin/linkedin-in-dark.png';
import linkedinInLight from '../../assets/images/contacts/linkedin/linkedin-in-light.png';
import linkedinOutDark from '../../assets/images/contacts/linkedin/linkedin-out-dark.png';
import linkedinOutLight from '../../assets/images/contacts/linkedin/linkedin-out-light.png';

// 8. Discord
import discordInDark from '../../assets/images/contacts/discord/discord-in-dark.png';
import discordInLight from '../../assets/images/contacts/discord/discord-in-light.png';
import discordOutDark from '../../assets/images/contacts/discord/discord-out-dark.png';
import discordOutLight from '../../assets/images/contacts/discord/discord.com-out-light.png';

// 9. Telegram
import teleInDark from '../../assets/images/contacts/tele/tele-in-dark.png';
import teleInLight from '../../assets/images/contacts/tele/tele-in-light.png';
import teleOutDark from '../../assets/images/contacts/tele/tele-out-dark.png';
import teleOutLight from '../../assets/images/contacts/tele/tele-out-light.png';

// 10. Zalo
import zaloInLight from '../../assets/images/contacts/zalo/zalo-in-light.png';
import zaloOutLight from '../../assets/images/contacts/zalo/zalo-out-light.png';

import './ContactPage.css';

const DuoScene = lazy(() => import('../../components/Contact/DuoStage/DuoScene'));

/**
 * 10 Platform Screenshots Map
 */
const PLATFORM_SCREENSHOTS = {
  facebook: {
    innerDark: fbInDark,
    innerLight: fbInLight,
    outerDark: fbOutDark,
    outerLight: fbOutLight,
  },
  instagram: {
    innerDark: igInDark,
    innerLight: igInLight,
    outerDark: igOutDark,
    outerLight: igOutLight,
  },
  tiktok: {
    innerDark: tiktokInDark,
    innerLight: tiktokInLight,
    outerDark: tiktokOutDark,
    outerLight: tiktokOutLight,
  },
  threads: {
    innerDark: threadInDark,
    innerLight: threadInLight,
    outerDark: threadOutDark,
    outerLight: threadOutLight,
  },
  github: {
    innerDark: githubInDark,
    innerLight: githubInLight,
    outerDark: githubOutDark,
    outerLight: githubOutLight,
  },
  email: {
    innerDark: gmailInDark,
    innerLight: gmailInLight,
    outerDark: gmailOutDark,
    outerLight: gmailOutLight,
  },
  linkedin: {
    innerDark: linkedinInDark,
    innerLight: linkedinInLight,
    outerDark: linkedinOutDark,
    outerLight: linkedinOutLight,
  },
  discord: {
    innerDark: discordInDark,
    innerLight: discordInLight,
    outerDark: discordOutDark,
    outerLight: discordOutLight,
  },
  telegram: {
    innerDark: teleInDark,
    innerLight: teleInLight,
    outerDark: teleOutDark,
    outerLight: teleOutLight,
  },
  zalo: {
    innerDark: zaloInLight,
    innerLight: zaloInLight,
    outerDark: zaloOutLight,
    outerLight: zaloOutLight,
  },
};

/**
 * Pose SVG Icon (Closed, Half 90°, Open 180°)
 */
const PoseSvg = ({ pose, size = 32 }) => {
  if (pose === 'closed') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
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
      <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
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

  // Open 180°
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.3 6.1h21.4c2.5 0 3.5 1.25 3.5 3.7v12.4c0 2.4-1 3.7-3.5 3.7H5.3c-2.5 0-3.5-1.3-3.5-3.7V9.8c0-2.45 1-3.7 3.5-3.7Zm.15 1.75c-1.5 0-1.95.6-1.95 2.1v12.1c0 1.5.45 2.1 1.95 2.1h21.1c1.5 0 1.95-.6 1.95-2.1V9.95c0-1.5-.45-2.1-1.95-2.1H5.45Z"
      />
      <path d="M16 8v16" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 2.5" opacity=".5" />
    </svg>
  );
};

/**
 * Sun / Lighting Icon
 */
const SunSvg = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

/**
 * Moon Icon
 */
const MoonSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/**
 * 10 Social Media Platforms (Vector Paths & Brand Accents)
 * 5 on Left, 5 on Right - scattered organically
 */
const SOCIAL_BUBBLES = [
  // Left side - 5 platforms
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com',
    side: 'left',
    color: '#1877F2',
    iconSize: 38,
    size: 78,
    top: '15%',
    leftOffset: -510,
    pushRatio: 1.0,
    anim: 'floatBubble1',
    duration: '5.8s',
    delay: '0s',
    path: (
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com',
    side: 'left',
    color: '#E1306C',
    iconSize: 40,
    size: 84,
    top: '29%',
    leftOffset: -390,
    pushRatio: 1.0,
    anim: 'floatBubble2',
    duration: '6.8s',
    delay: '-2.1s',
    path: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://tiktok.com',
    side: 'left',
    color: '#EE1D52',
    iconSize: 36,
    size: 74,
    top: '44%',
    leftOffset: -530,
    pushRatio: 1.0,
    anim: 'floatBubble3',
    duration: '5.4s',
    delay: '-3.6s',
    path: (
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    ),
  },
  {
    id: 'threads',
    name: 'Threads',
    url: 'https://threads.net',
    side: 'left',
    color: '#000000',
    darkColor: '#FFFFFF',
    iconSize: 38,
    size: 76,
    top: '58%',
    leftOffset: -410,
    pushRatio: 1.0,
    anim: 'floatBubble4',
    duration: '6.2s',
    delay: '-1.1s',
    path: (
      <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/hoangbmt023',
    side: 'left',
    color: '#24292e',
    darkColor: '#f0f6fc',
    iconSize: 38,
    size: 78,
    top: '73%',
    leftOffset: -490,
    pushRatio: 1.0,
    anim: 'floatBubble1',
    duration: '6.4s',
    delay: '-2.5s',
    path: (
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    ),
  },

  // Right side - 5 platforms
  {
    id: 'email',
    name: 'Gmail',
    url: 'mailto:contact@hoangsp.com',
    side: 'right',
    color: '#EA4335',
    iconSize: 38,
    size: 78,
    top: '15%',
    leftOffset: 410,
    pushRatio: 1.0,
    anim: 'floatBubble2',
    duration: '6.0s',
    delay: '-2.8s',
    path: (
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    side: 'right',
    color: '#0A66C2',
    iconSize: 38,
    size: 80,
    top: '29%',
    leftOffset: 520,
    pushRatio: 1.0,
    anim: 'floatBubble3',
    duration: '6.6s',
    delay: '-1.4s',
    path: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
    ),
  },
  {
    id: 'discord',
    name: 'Discord',
    url: 'https://discord.com',
    side: 'right',
    color: '#5865F2',
    iconSize: 40,
    size: 84,
    top: '44%',
    leftOffset: 390,
    pushRatio: 1.0,
    anim: 'floatBubble1',
    duration: '7.2s',
    delay: '-0.6s',
    path: (
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.0777.0777 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    url: 'https://telegram.org',
    side: 'right',
    color: '#229ED9',
    iconSize: 36,
    size: 74,
    top: '58%',
    leftOffset: 510,
    pushRatio: 1.0,
    anim: 'floatBubble4',
    duration: '5.6s',
    delay: '-4.2s',
    path: (
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    ),
  },
  {
    id: 'zalo',
    name: 'Zalo',
    url: 'https://zalo.me',
    side: 'right',
    color: '#0068FF',
    iconSize: 38,
    size: 78,
    top: '73%',
    leftOffset: 410,
    pushRatio: 1.0,
    anim: 'floatBubble3',
    duration: '6.4s',
    delay: '-1.7s',
    path: (
      <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9453-1.0753 0-1.945.8706-1.945 1.9453 0 1.0746.8697 1.9453 1.945 1.9453z" />
    ),
  },
];

/**
 * Reset / Counter-clockwise SVG Icon
 */
const ResetSvg = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

/**
 * ContactPage Component - 3D iPhone Duo Interactive Studio
 */
const ContactPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // iPhone Finish (Star White / Night Sky) is independent from Light/Dark Theme!
  const { state, actions } = useDuoController({
    angle: 180,
    renderedAngle: 0,
    finish: 'night',
  });

  const [lightingOpen, setLightingOpen] = useState(false);
  const [activeBubbleId, setActiveBubbleId] = useState(null);
  const [displayedInnerPlatformId, setDisplayedInnerPlatformId] = useState(null);
  const [displayedOuterPlatformId, setDisplayedOuterPlatformId] = useState(null);
  const duoApiRef = useRef(null);
  const zoomRef = useRef(1);
  const bubblesLayerRef = useRef(null);
  const scrubberRef = useRef(null);

  // Directly update CSS variable for zoom on DOM without triggering full React re-renders
  const handleZoom = useCallback((zoom) => {
    zoomRef.current = zoom;
    if (bubblesLayerRef.current) {
      bubblesLayerRef.current.style.setProperty('--duo-zoom', zoom.toFixed(3));
    }
  }, []);

  // Directly update CSS variable for angle on DOM in 60fps real-time lock with Three.js physics & intro
  const handleRenderedAngle = useCallback((angle) => {
    actions.setRenderedAngle(angle);
    if (bubblesLayerRef.current) {
      bubblesLayerRef.current.style.setProperty('--duo-angle', angle.toFixed(2));
    }
    if (scrubberRef.current) {
      scrubberRef.current.style.setProperty('--fold-progress', (angle / 180).toFixed(4));
      const out = scrubberRef.current.querySelector('output');
      if (out) {
        out.textContent = `${Math.round(angle)}°`;
      }
    }
  }, [actions]);

  // Preload all 40 texture images across all 10 platforms for instant switching
  const allScreenshots = useMemo(
    () =>
      Object.values(PLATFORM_SCREENSHOTS).flatMap((p) => [
        p.innerDark,
        p.innerLight,
        p.outerDark,
        p.outerLight,
      ]),
    []
  );

  // Eagerly preload texture images
  useEffect(() => {
    allScreenshots.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
      img.decode().catch(() => { });
    });
  }, [allScreenshots]);

  // Screen textures: null = Default iPhone Duo wallpaper on initial load/reload
  const selectedInnerPlatform = displayedInnerPlatformId ? PLATFORM_SCREENSHOTS[displayedInnerPlatformId] : null;
  const selectedOuterPlatform = displayedOuterPlatformId ? PLATFORM_SCREENSHOTS[displayedOuterPlatformId] : null;

  const innerAsset = useMemo(() => {
    if (!selectedInnerPlatform) return null;
    return {
      kind: 'image',
      url: isDark ? selectedInnerPlatform.innerDark : selectedInnerPlatform.innerLight,
    };
  }, [selectedInnerPlatform, isDark]);

  const outerAsset = useMemo(() => {
    if (!selectedOuterPlatform) return null;
    return {
      kind: 'image',
      url: isDark ? selectedOuterPlatform.outerDark : selectedOuterPlatform.outerLight,
    };
  }, [selectedOuterPlatform, isDark]);

  // Scrubber calculation
  const calculateAngleFromEvent = useCallback((e) => {
    if (!scrubberRef.current) return state.angle;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const padding = 12;
    const travel = rect.width - padding * 2;
    if (travel <= 0) return 0;
    const progress = Math.max(0, Math.min(1, (clientX - rect.left - padding) / travel));
    return progress * 180;
  }, [state.angle]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    actions.setScrubbing(true);
    const newAngle = calculateAngleFromEvent(e);
    actions.setAngle(newAngle);

    const handlePointerMove = (moveEvent) => {
      const updatedAngle = calculateAngleFromEvent(moveEvent);
      actions.setAngle(updatedAngle);
    };

    const handlePointerUp = () => {
      actions.setScrubbing(false);
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

  const handleRetry = useCallback(() => {
    actions.setErrorMessage(null);
    actions.setIsReady(false);
    actions.resetView();
  }, [actions]);

  const displayAngle = state.scrubbing ? state.angle : state.renderedAngle;
  const progress = Math.max(0, Math.min(1, displayAngle / 180));
  const roundedDegrees = `${Math.round(displayAngle)}°`;

  // Active selected social bubble info
  const activeBubble = useMemo(() => SOCIAL_BUBBLES.find((b) => b.id === activeBubbleId), [activeBubbleId]);

  return (
    <main className={`studio ${isDark ? 'dark' : ''}`}>
      {/* 1. Topbar */}
      <header className="topbar">
        <div className="topbar-brand">
          <a href="/" className="wordmark logo-link" aria-label="HOANGF HISP">
            HOANGF HISP
          </a>
          <span className="brand-contact-label">contact</span>
        </div>
        <span className="header-caption">iPhone Duo</span>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <SunSvg size={18} /> : <MoonSvg size={18} />}
          </button>
        </div>
      </header>

      {/* 2. Main Stage - 3D Three.js iPhone Duo Canvas Container */}
      <div className="stage">
        <div className="three-viewport-box">
          {state.errorMessage ? (
            <div className="device-unavailable" role="alert">
              <SunSvg size={28} />
              <h2>3D preview unavailable</h2>
              <p>{state.errorMessage}</p>
              <button onClick={handleRetry}>Try again</button>
            </div>
          ) : (
            <Suspense fallback={null}>
              <DuoScene
                angle={state.angle}
                playing={false}
                scrubbing={state.scrubbing}
                scrubRevision={state.scrubRevision}
                warp={state.warp}
                dark={isDark}
                finish={state.finish}
                inner={innerAsset}
                outer={outerAsset}
                preloads={allScreenshots}
                fit="cover"
                reset={state.resetCounter}
                view={state.view}
                videoPlaying={true}
                lens={state.lens}
                lighting={state.lighting}
                presenting={true}
                onFocus={() => { }}
                onAPI={(api) => {
                  duoApiRef.current = api;
                }}
                onAngle={actions.setLiveAngle}
                onRenderedAngle={handleRenderedAngle}
                onZoom={handleZoom}
                onReady={() => actions.setIsReady(true)}
                onError={(err) => actions.setErrorMessage(err?.message || '3D Render Error')}
                onUnavailable={(msg) => actions.setErrorMessage(msg)}
              />
            </Suspense>
          )}

          {!state.isReady && !state.errorMessage && (
            <div className="loading-device">
              <span />
              Preparing your device
            </div>
          )}
        </div>

        {/* Floating Social Media Liquid Glass Bubbles Orbiting iPhone Duo */}
        <nav
          ref={bubblesLayerRef}
          className="social-bubbles-layer"
          aria-label="Social media connections"
          style={{
            '--duo-angle': state.renderedAngle,
            '--duo-zoom': zoomRef.current,
          }}
        >
          {SOCIAL_BUBBLES.map((b) => {
            const bubbleColor = isDark && b.darkColor ? b.darkColor : b.color;
            const isActive = activeBubbleId === b.id;

            return (
              <div
                key={b.id}
                className={`social-bubble social-bubble-${b.id} social-bubble-${b.side} ${isActive ? 'is-active' : ''}`}
                title={isActive ? `Mở trang ${b.name}` : `Xem màn hình ${b.name}`}
                aria-label={b.name}
                onClick={() => {
                  if (isActive) {
                    window.open(b.url, '_blank', 'noopener,noreferrer');
                  } else {
                    setActiveBubbleId(b.id);
                    setDisplayedOuterPlatformId(b.id);
                    duoApiRef.current?.playIntro?.(() => {
                      setDisplayedInnerPlatformId(b.id);
                    });
                  }
                }}
                style={{
                  '--bubble-color': bubbleColor,
                  '--bubble-size': `${b.size}px`,
                  '--bubble-top': b.top,
                  '--bubble-left-offset': `${b.leftOffset}px`,
                  '--push-ratio': b.pushRatio,
                  '--bubble-anim': b.anim,
                  '--float-dur': b.duration,
                  '--float-delay': b.delay,
                }}
              >
                <div className="bubble-icon-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    width={b.iconSize}
                    height={b.iconSize}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {b.path}
                  </svg>
                </div>

                {/* Expanded Capsule Info when active (Desktop) */}
                {isActive && (
                  <div className="bubble-expanded-content">
                    <div className="bubble-text-stack">
                      <span className="bubble-active-name">{b.name}</span>
                      <span className="bubble-active-action">
                        Truy cập
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Social Link CTA Button (Liquid Glass with brand color text above view-tools) */}
        {activeBubble && (
          <a
            href={activeBubble.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-cta"
            style={{
              '--active-bubble-color': isDark && activeBubble.darkColor ? activeBubble.darkColor : activeBubble.color,
            }}
            aria-label={`Truy cập ${activeBubble.name}`}
            title={`Truy cập ${activeBubble.name}`}
          >
            <span>Truy cập {activeBubble.name}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        )}

        {/* 3. View Tools (Combined Lighting & Finish Picker exactly like prototype!) */}
        <div className="view-tools">
          <button
            className={`cinematic-button ${lightingOpen ? 'selected' : ''}`}
            aria-label="Studio lighting"
            title="Studio lighting"
            aria-expanded={lightingOpen}
            onClick={() => setLightingOpen(!lightingOpen)}
            disabled={!state.isReady}
          >
            <SunSvg size={17} />
            <span>Lighting</span>
          </button>
          <div className="finish-picker">
            <span className="finish-label" aria-hidden="true">
              {state.finish === 'white' ? 'Star White' : 'Night Sky'}
            </span>
            <div className="finish-options" role="radiogroup" aria-label="Device finish">
              <button
                className={`finish-swatch white ${state.finish === 'white' ? 'active' : ''}`}
                aria-checked={state.finish === 'white'}
                data-checked={state.finish === 'white' ? true : undefined}
                title="Star White"
                aria-label="Star White"
                onClick={() => actions.setFinish('white')}
              />
              <button
                className={`finish-swatch night ${state.finish === 'night' ? 'active' : ''}`}
                aria-checked={state.finish === 'night'}
                data-checked={state.finish === 'night' ? true : undefined}
                title="Night Sky"
                aria-label="Night Sky"
                onClick={() => actions.setFinish('night')}
              />
            </div>
          </div>
        </div>

        {/* Lighting Panel */}
        {lightingOpen && (
          <aside className="lens-panel" aria-label="Lighting settings">
            <div className="panel-heading">
              <h2>Lighting</h2>
              <button
                className="icon-button"
                aria-label="Close lighting settings"
                title="Close lighting"
                onClick={() => setLightingOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="cinematic-section lighting-section">
              <div className="lighting-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>Light style</h3>
                <button
                  className="panel-reset-btn"
                  title="Reset lighting"
                  aria-label="Reset lighting"
                  onClick={() => actions.setLighting({ ...DEFAULT_LIGHTING })}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.7 }}
                >
                  <ResetSvg size={13} />
                </button>
              </div>

              <div className="lighting-presets" role="radiogroup" aria-label="Lighting style">
                {[
                  { id: 'studio', label: 'Studio', style: 'studio', softness: 0.55 },
                  { id: 'soft', label: 'Softbox', style: 'soft', softness: 0.9 },
                  { id: 'edge', label: 'Rim light', style: 'edge', softness: 0.3 },
                ].map((e) => (
                  <label
                    key={e.id}
                    className={state.lighting.style === e.style ? 'selected' : ''}
                    onClick={() => actions.setLighting({ style: e.style, intensity: 1, softness: e.softness })}
                  >
                    <span className={`light-preview light-preview-${e.id}`} aria-hidden="true">
                      <i />
                    </span>
                    <span>{e.label}</span>
                  </label>
                ))}
              </div>

              <div className="cinematic-range">
                <div className="lens-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span>Light direction</span>
                  <output>{state.lighting.direction > 0 ? `+${state.lighting.direction}°` : `${state.lighting.direction}°`}</output>
                </div>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="1"
                  value={state.lighting.direction}
                  onChange={(e) => actions.setLighting({ direction: parseInt(e.target.value, 10) })}
                  style={{ width: '100%', accentColor: 'var(--foreground)' }}
                />
                <div className="range-endpoints" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, opacity: 0.6 }}>
                  <span>Left</span>
                  <span>Right</span>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* 4. Bottom Tools */}
        <div className="bottom-tools">
          <fieldset className="pose-presets" aria-label="Device poses">
            {POSE_PRESETS.map((t) => {
              const isActive = Math.abs(state.angle - t.angle) < 1;
              return (
                <button
                  key={t.pose}
                  className={isActive ? 'active' : ''}
                  aria-label={t.label}
                  title={`${t.label} · ${t.angle}°`}
                  aria-pressed={isActive}
                  onClick={() => actions.setPose(t.angle)}
                >
                  <PoseSvg pose={t.pose} />
                </button>
              );
            })}
          </fieldset>

          <div className="fold-toolbar">
            <div
              ref={scrubberRef}
              className="fold-scrubber"
              data-dragging={state.scrubbing}
              style={{ '--fold-progress': progress, width: '100%' }}
              onPointerDown={handlePointerDown}
            >
              <div className="fold-track">
                <div className="fold-fill">
                  <span className="fold-notch" />
                </div>
              </div>

              <div className="fold-caption">
                <span className="fold-label">Drag to unfold</span>
                <output aria-hidden="true">{roundedDegrees}</output>
              </div>

              <div className="fold-caption fold-sheen" aria-hidden="true">
                <span className="fold-label">Drag to unfold</span>
              </div>
            </div>
          </div>

          <p>
            <span className="orbit-hint-pointer">
              Drag to rotate<span className="hint-divider">·</span>Scroll to zoom
            </span>
            <span className="orbit-hint-touch">
              Touch to rotate<span className="hint-divider">·</span>Pinch to zoom
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default React.memo(ContactPage);
