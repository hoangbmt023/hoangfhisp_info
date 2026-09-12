import React from "react";

/**
 * Component: FooterSubscribe
 * Form đăng ký nhận tin và các liên kết bản quyền / chính sách dưới chân trang.
 */
export const FooterSubscribe = () => {
  return (
    <div className="serotoninn-footer-bottom-grid">
      {/* Cột trái: Copyright */}
      <div className="footer-meta-left">
        <p className="copyright-tag">
          © 2026 HOANGF HISP — BẢN QUYỀN ĐÃ ĐƯỢC BẢO LƯU
        </p>
      </div>

      {/* Cột phải: Form Email & Links */}
      <div className="footer-meta-right">
        <form
          className="subscribe-compact-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-input-wrapper">
            <label className="input-label">HỘP THƯ</label>
            <input
              type="email"
              placeholder="user@domain.com"
              className="inline-email-input"
            />
          </div>
          <button type="submit" className="inline-sub-btn hover-underline">
            KẾT NỐI
          </button>
        </form>

        <div className="bottom-meta-links">
          <a href="#" className="meta-link hover-underline">
            CHÍNH SÁCH BẢO MẬT
          </a>
          <a href="#" className="meta-link hover-underline">
            ĐIỀU KHOẢN
          </a>
          <a href="#" className="meta-link hover-underline">
            INSTAGRAM
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FooterSubscribe);
