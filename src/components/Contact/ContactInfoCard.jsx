import React, { useState } from 'react';
import { CONTACT_PROFILE } from '../../data/duoStudioData';
import './ContactInfoCard.css';

/**
 * Social Icons SVGs
 */
const SocialIcon = ({ name }) => {
  if (name === 'GitHub') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
  }
  if (name === 'LinkedIn') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (name === 'Telegram') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
};

/**
 * Component: ContactInfoCard
 * Clean Code & SOLID:
 * - Single Responsibility: Displays personal contact badge, copy-to-clipboard interactions, and direct links.
 */
const ContactInfoCard = () => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(CONTACT_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`contact-info-card ${isExpanded ? 'expanded' : ''}`}>
      {/* Header bar / Toggle */}
      <div className="contact-card-header" onClick={() => setIsExpanded((prev) => !prev)}>
        <div className="contact-avatar-pill">
          <span className="contact-status-dot" />
          <span className="contact-tagline">AVAILABLE FOR WORK</span>
        </div>
        <button
          className="contact-card-toggle-btn"
          aria-label={isExpanded ? 'Thu gọn thông tin' : 'Xem thông tin liên hệ'}
          title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`toggle-icon ${isExpanded ? 'open' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Main Info */}
      <div className="contact-card-body">
        <h4 className="contact-card-title">{CONTACT_PROFILE.name}</h4>
        <p className="contact-card-role">{CONTACT_PROFILE.role}</p>

        <div className="contact-channels">
          {/* Email Channel with Copy */}
          <div className="contact-channel-item" onClick={handleCopyEmail}>
            <div className="channel-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="channel-meta">
              <span className="channel-label">Email</span>
              <span className="channel-value">{CONTACT_PROFILE.email}</span>
            </div>
            <span className={`copy-badge ${copied ? 'copied' : ''}`}>
              {copied ? 'Đã sao chép ✓' : 'Sao chép'}
            </span>
          </div>

          {/* Location */}
          <div className="contact-channel-item static">
            <div className="channel-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="channel-meta">
              <span className="channel-label">Địa điểm</span>
              <span className="channel-value">{CONTACT_PROFILE.location}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="contact-social-row">
          {CONTACT_PROFILE.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title={s.name}
              aria-label={s.name}
            >
              <SocialIcon name={s.name} />
            </a>
          ))}
          <a
            href={`mailto:${CONTACT_PROFILE.email}`}
            className="contact-cta-btn"
            title="Gửi email trực tiếp"
          >
            Gửi Email Ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactInfoCard);
