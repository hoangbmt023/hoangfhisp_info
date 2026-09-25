import React from "react";
import roseFrameWhite from "../../assets/images/contacts/rose-frame-white.png";
import roseFrameBlack from "../../assets/images/contacts/rose-frame-black.png";
import contactBgImg from "../../assets/images/contacts/contact-bg.png";
import { useTheme } from "../../context/ThemeContext";

/**
 * Component hiển thị cổng ảnh hoa hồng (Rose Mask Portal):
 * - Ảnh nền căn phòng luôn cố định 100% full screen (không bị zoom, không bị méo).
 * - Bông hoa hồng đóng vai trò là khẩu độ (aperture mask) mở rộng dần để hé lộ bức ảnh.
 * - Nét viền ĐEN (Dark mode) hoặc TRẮNG (Light mode) phủ lên trên và mở to cùng khẩu độ trước khi mờ dần.
 */
export const ContactRosePortal = ({
  stageRef,
  tipRef,
}) => {
  const { theme } = useTheme();
  // Chế độ tối (Dark mode): Nét hoa TRẮNG nổi bật trên nền tối
  // Chế độ sáng (Light mode): Nét hoa ĐEN nổi bật trên nền sáng
  const roseFrameSrc = theme === "dark" ? roseFrameWhite : roseFrameBlack;

  return (
    <div className="contact-portal-stage" ref={stageRef}>
      {/* Layer 1: Ảnh nền full-screen 1 màn hình độc lập, được cắt qua mặt nạ hoa hồng */}
      <div className="contact-portal-image-layer">
        <img
          className="contact-portal-image"
          src={contactBgImg}
          alt="Contact Background"
          loading="eager"
        />
      </div>

      {/* Layer 2: Nét vẽ viền hoa hồng phủ đè 100% lên khẩu độ (Đen cho Dark Mode, Trắng cho Light Mode) */}
      <img
        src={roseFrameSrc}
        alt=""
        className="contact-rose-lines-overlay"
        aria-hidden="true"
      />

      {/* Tip chỉ dẫn ban đầu */}
      <div className="contact-scroll-tip" ref={tipRef}>
        <span className="tip-accent">TIP:</span> CUỘN ĐỂ KHÁM PHÁ
      </div>
    </div>
  );
};

export default React.memo(ContactRosePortal);
