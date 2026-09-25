import React, { useState } from "react";

/**
 * Thẻ tương tác liên hệ nằm bên trong Rose Portal (SRP & OCP)
 * Cho phép người dùng Gửi email trực tiếp, Sao chép Email nhanh hoặc chuyển tiếp mạng xã hội.
 */
export const ContactActionCard = () => {
  const [copied, setCopied] = useState(false);
  const email = "hoangbmt023@gmail.com";

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2400);
  };

  return (
    <div className="contact-action-card">
      <div className="contact-card-sub">LET'S BUILD SOMETHING EXTRAORDINARY</div>
      <h3 className="contact-card-title">HÃY BẮT ĐẦU CÂU CHUYỆN SỐ CỦA BẠN</h3>

      <p className="contact-card-desc">
        Sẵn sàng trao đổi về dự án mới, ý tưởng thiết kế hoặc cơ hội hợp tác toàn diện.
      </p>

      {/* Action Buttons Row */}
      <div className="contact-buttons-row">
        <a
          href={`mailto:${email}`}
          className="contact-btn contact-btn-primary"
        >
          <span>GỬI EMAIL TRỰC TIẾP ↗</span>
        </a>

        <button
          type="button"
          onClick={handleCopyEmail}
          className={`contact-btn contact-btn-secondary ${copied ? "is-copied" : ""}`}
        >
          <span>{copied ? "✓ ĐÃ SAO CHÉP EMAIL" : "SAO CHÉP EMAIL"}</span>
        </button>
      </div>

      {/* Social Quick Links */}
      <div className="contact-social-pills">
        <a
          href="https://github.com/hoangbmt023"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-pill"
        >
          GITHUB ↗
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-pill"
        >
          LINKEDIN ↗
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-pill"
        >
          TELEGRAM ↗
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-pill"
        >
          FACEBOOK ↗
        </a>
      </div>
    </div>
  );
};

export default React.memo(ContactActionCard);
