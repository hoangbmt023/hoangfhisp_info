import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './ContactBottomBar.css';

/**
 * Component hiển thị typography 3 dòng chuẩn UI/spacing theo phong cách Hoàng Dũng:
 * Dòng 1: [Tên/Thương Hiệu] • [Chủ Đề] (Title Case)
 * Dòng 2: [Phụ Đề / Vai Trò / Portfolio] (Title Case)
 * Dòng 3: © ℗ [Năm] [Bản Quyền / Quyền Sở Hữu]
 */
export const ContactBottomInfoText = ({
  title = "Hoàng Phạm • Portfolio",
  subtitle = "Creative Developer & Designer",
  copyright = "© ℗ 2026 Hoangf Hisp • All Rights Reserved",
  className = "",
  id = ""
}) => {
  return (
    <div id={id} className={`contact-bottom-info-block ${className}`}>
      <span className="info-line-primary">{title}</span>
      <span className="info-line-secondary">{subtitle}</span>
      <span className="info-line-tertiary">{copyright}</span>
    </div>
  );
};

/**
 * Component: ContactBottomBar (Clone chính xác 100% bố cục từ hoangdungmusic.com)
 * Bố cục 9 phần tử nguyên bản:
 * [Logo 1] | [Divider 1] | [Info 1] | [Divider 2] | [Button CTA /contact] | [Divider 3] | [Info 2] | [Divider 4] | [Logo 2]
 */
const ContactBottomBar = forwardRef((props, ref) => {
  return (
    <div id="contact-bottom-bar" ref={ref} className="contact-bottom-bar">
      {/* Cánh bên Trái (chiếm chính xác 50% bên trái) */}
      <div className="contact-bottom-wing left-wing">
        {/* 1. Logo HOANGF HISP (Trái) */}
        <div className="contact-bottom-logo" aria-label="HOANGF HISP">
          <div className="contact-bottom-logo-stack">
            <span className="logo-word logo-top">HOANGF</span>
            <span className="logo-word logo-bottom">HISP</span>
          </div>
        </div>

        {/* 2. Vạch ngăn cách 1 */}
        <div className="contact-bottom-divider vertical" aria-hidden="true">
          <div className="divider-line" />
        </div>

        {/* 3. Typography 3 dòng Thông tin (Trái) */}
        <div className="contact-bottom-info">
          <ContactBottomInfoText
            id="brxe-swlsgc"
            title="Hoàng Phạm • Portfolio"
            subtitle="Backend Developer & Engineer"
            copyright="© ℗ 2026 Hoangf Hisp"
          />
        </div>

        {/* 4. Vạch ngăn cách 2 */}
        <div className="contact-bottom-divider vertical" aria-hidden="true">
          <div className="divider-line" />
        </div>
      </div>

      {/* 5. Nút CTA trung tâm bo tròn - CĂN GIỮA TUYỆT ĐỐI (50% MÀN HÌNH) */}
      <Link
        to="/contact"
        id="brxe-xhkcxh"
        className="contact-bottom-cta-btn"
        aria-label="Chuyển đến trang Liên Hệ"
      >
        Liên Hệ Với Tôi
      </Link>

      {/* Cánh bên Phải (chiếm chính xác 50% bên phải) */}
      <div className="contact-bottom-wing right-wing hide-tablet">
        {/* 6. Vạch ngăn cách 3 */}
        <div className="contact-bottom-divider vertical" aria-hidden="true">
          <div className="divider-line" />
        </div>

        {/* 7. Typography 3 dòng Thông tin (Phải) */}
        <div className="contact-bottom-info">
          <ContactBottomInfoText
            id="brxe-gvepwq"
            title="Hoàng Phạm • Liên Hệ"
            subtitle="Sẵn Sàng Hợp Tác Với Các Bạn"
            copyright="© ℗ 2026 All Rights Reserved"
          />
        </div>

        {/* 8. Vạch ngăn cách 4 */}
        <div className="contact-bottom-divider vertical" aria-hidden="true">
          <div className="divider-line" />
        </div>

        {/* 9. Logo HOANGF HISP (Phải) */}
        <div className="contact-bottom-logo" aria-label="HOANGF HISP">
          <div className="contact-bottom-logo-stack">
            <span className="logo-word logo-top">HOANGF</span>
            <span className="logo-word logo-bottom">HISP</span>
          </div>
        </div>
      </div>

      {/* 10. Text "by" trên giao diện Mobile */}
      <div id="brxe-ocgrhj" className="contact-bottom-mobile-credit">
        by
      </div>
    </div>
  );
});

ContactBottomBar.displayName = 'ContactBottomBar';

export default React.memo(ContactBottomBar);
