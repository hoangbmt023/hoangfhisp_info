import React from "react";
import tornPaperImg from "../../assets/torn-paper-footer.png";
import FooterSocials from "./FooterSocials";
import FooterSubscribe from "./FooterSubscribe";
import "./Footer.css";

/**
 * Component: Footer
 * Chân trang giao diện Tạp chí viền giấy rách (Torn Paper Footer).
 * Tuân thủ SOLID: Điều phối các component con FooterSocials và FooterSubscribe.
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Torn Paper Wrapper */}
      <div className="torn-paper-wrapper">
        <img
          src={tornPaperImg}
          alt="Torn Paper Edge"
          className="torn-paper-img"
        />

        {/* Content Overlaid Directly On Ripped Paper */}
        <div className="torn-paper-overlay-content">
          <div className="serotoninn-footer-container">
            {/* Top Navigation Row */}
            <div className="serotoninn-nav-row">
              <div className="serotoninn-nav-group left-group">
                <a href="#about" className="serotoninn-link hover-underline">
                  GIỚI THIỆU
                </a>
                <a href="#skills" className="serotoninn-link hover-underline">
                  KỸ NĂNG
                </a>
                <a
                  href="#experience"
                  className="serotoninn-link hover-underline"
                >
                  KINH NGHIỆM
                </a>
                <a href="#projects" className="serotoninn-link hover-underline">
                  DỰ ÁN
                </a>
              </div>
              <div className="serotoninn-nav-group right-group">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="serotoninn-link hover-underline"
                >
                  GITHUB ↗
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="serotoninn-link hover-underline"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="mailto:contact@hoangsp.com"
                  className="serotoninn-link hover-underline"
                >
                  GỬI EMAIL
                </a>
                <a href="#contact" className="serotoninn-link hover-underline">
                  LIÊN HỆ
                </a>
              </div>
            </div>

            {/* Desktop & Mobile Responsive Center Section */}
            <div className="serotoninn-brand-center">
              <div className="serotoninn-logo-stack">
                <h1 className="serotoninn-logo-top">HOANGF</h1>
                <h1 className="serotoninn-logo-bottom">HISP</h1>
              </div>

              {/* Middle Section Label */}
              <div className="brand-middle-info">
                <span className="brand-middle-badge">MẠNG XÃ HỘI CỦA TÔI</span>
              </div>

              {/* 8 Social Icons Component */}
              <FooterSocials />
            </div>

            {/* Bottom Meta & Subscribe Form Component */}
            <FooterSubscribe />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
