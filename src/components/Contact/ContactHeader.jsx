import React from "react";

/**
 * Component hiển thị tiêu đề và đoạn tuyên ngôn (Manifesto)
 * phong cách Serotoninn Film với các từ khóa màu đỏ điểm nhấn (SRP)
 */
export const ContactHeader = () => {
  return (
    <div className="contact-editorial-header">
      {/* Top Meta Row */}
      <div className="contact-header-meta">
        <span className="contact-chapter-badge">LIÊN HỆ &amp; HỢP TÁC</span>
      </div>

      {/* Main Large Headline */}
      <h2 className="contact-main-headline">SẴN SÀNG CHO HÀNH TRÌNH MỚI.</h2>

      {/* Serotoninn-style Manifesto Paragraph with Red Accents */}
      <p className="contact-manifesto-text">
        NƠI CẢM XÚC NGHỆ THUẬT GIAO THOA CÙNG{" "}
        <span className="contact-accent-red">CÔNG NGHỆ ĐỘT PHÁ</span>. MỖI DÒNG MÃ
        NGUỒN LÀ MỘT <span className="contact-accent-red">TUYÊN NGÔN</span>, MỖI DỰ
        ÁN LÀ MỘT HÀNH TRÌNH{" "}
        <span className="contact-accent-red">ĐỘC BẢN</span> ĐANG CHỜ ĐƯỢC HIỆN
        THỰC HÓA CÙNG BẠN.
      </p>
    </div>
  );
};

export default React.memo(ContactHeader);
