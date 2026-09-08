import React from 'react';
import tornPaperImg from '../../assets/torn-paper-footer.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Torn Paper Wrapper */}
      <div className="torn-paper-wrapper">
        <img src={tornPaperImg} alt="Torn Paper Edge" className="torn-paper-img" />

        {/* Content Overlaid Directly On Ripped Paper */}
        <div className="torn-paper-overlay-content">
          <div className="serotoninn-footer-container">
            
            {/* Top Navigation Row */}
            <div className="serotoninn-nav-row">
              <div className="serotoninn-nav-group left-group">
                <a href="#about" className="serotoninn-link hover-underline">GIỚI THIỆU</a>
                <a href="#projects" className="serotoninn-link hover-underline">DỰ ÁN</a>
                <a href="#skills" className="serotoninn-link hover-underline">KỸ NĂNG</a>
                <a href="#experience" className="serotoninn-link hover-underline">KINH NGHIỆM</a>
              </div>
              <div className="serotoninn-nav-group right-group">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="serotoninn-link hover-underline">GITHUB ↗</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="serotoninn-link hover-underline">LINKEDIN ↗</a>
                <a href="mailto:contact@hoangsp.com" className="serotoninn-link hover-underline">GỬI EMAIL</a>
                <a href="#contact" className="serotoninn-link hover-underline">LIÊN HỆ</a>
              </div>
            </div>

            {/* Desktop & Mobile Responsive Center Section */}
            <div className="serotoninn-brand-center">
              <div className="serotoninn-logo-stack">
                <h1 className="serotoninn-logo-top">HOANGF</h1>
                <h1 className="serotoninn-logo-bottom">HISP</h1>
              </div>

              {/* Middle Section Label in the empty space (Clean Vietnamese text without gray box) */}
              <div className="brand-middle-info">
                <span className="brand-middle-badge">MẠNG XÃ HỘI CỦA TÔI</span>
              </div>

              {/* 8 Social Icons Box: FB, Instagram, TikTok, Threads, Email, Discord, Telegram, Zalo */}
              <div className="social-icon-box">
                {/* Row 1: FB, Instagram, TikTok, Threads */}
                <div className="social-row row-top">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok" aria-label="TikTok" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                    </svg>
                  </a>
                  <a href="https://threads.net" target="_blank" rel="noopener noreferrer" title="Threads" aria-label="Threads" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21.25c-5.1 0-9.25-4.15-9.25-9.25S6.9 2.75 12 2.75s9.25 4.15 9.25 9.25c0 3.3-1.7 6.1-4.4 7.4-1 .4-2 .6-3 .6-3 0-4.8-1.9-4.8-4.5 0-2.7 2.1-4.5 5.2-4.5 1.1 0 2.1.2 3 .6v-.3c0-2-1.4-3.4-3.6-3.4-1.5 0-2.9.8-3.3 2"></path>
                      <path d="M13.4 15.2c1.8 0 3-.9 3-2.5v-.4c-.7-.3-1.6-.5-2.5-.5-2.1 0-3.3 1 3.3 2.5 0 1 .7 1.7 1.8 1.7z"></path>
                    </svg>
                  </a>
                </div>

                {/* Row 2: Email, Discord, Telegram, Zalo */}
                <div className="social-row row-bottom">
                  <a href="mailto:contact@hoangsp.com" title="Email" aria-label="Email" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Discord" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </a>
                  <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Telegram" className="social-icon-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </a>
                  <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" title="Zalo" aria-label="Zalo" className="social-icon-btn">
                    <span className="zalo-text-icon">Zalo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Grid Layout for Desktop & Mobile */}
            <div className="serotoninn-footer-bottom-grid">
              {/* Left Column / Desktop Bottom: ©2026_HOANGF_HISP */}
              <div className="footer-meta-left">
                <p className="copyright-tag">©2026_HOANGF_HISP</p>
              </div>

              {/* Right Column / Desktop Bottom: Inline EMAIL / SUBSCRIBE & Meta links */}
              <div className="footer-meta-right">
                <form className="subscribe-compact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-input-wrapper">
                    <label className="input-label">EMAIL</label>
                    <input
                      type="email"
                      className="inline-email-input"
                    />
                  </div>
                  <button type="submit" className="inline-sub-btn hover-underline">
                    ĐĂNG KÝ
                  </button>
                </form>

                <div className="bottom-meta-links">
                  <a href="#" className="meta-link hover-underline">CHÍNH SÁCH BẢO MẬT</a>
                  <a href="#" className="meta-link hover-underline">BẢN QUYỀN</a>
                  <a href="#" className="meta-link hover-underline">INSTAGRAM</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
