import React, { useRef } from "react";
import ContactHeader from "../../components/Contact/ContactHeader";
import ContactRosePortal from "../../components/Contact/ContactRosePortal";
import useContactAnimation from "../../hooks/useContactAnimation";
import "./Contact.css";

/**
 * Component: Contact (Serotoninn Film Style with Rose Frame Mask)
 * Chuẩn 1 màn hình (100vh) được ghim chính xác bằng GSAP Pinning:
 * - Khi cuộn tới Contact: Ghim giữ 1 màn hình, hoa hồng nở to dần mở ảnh.
 * - Khi hoa hồng biến mất hoàn toàn: Hiện đầy đủ bức ảnh nền căn phòng.
 * - Cuộn tiếp một nhịp nữa: Unpin và Footer trồi lên ngay từ đáy.
 */
const Contact = () => {
  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const stageRef = useRef(null);
  const tipRef = useRef(null);

  // Hook quản lý hiệu ứng mở khẩu độ hoa hồng và GSAP Pinning
  useContactAnimation({
    wrapperRef,
    headerRef,
    stageRef,
    tipRef,
  });

  return (
    <section id="contact" className="contact-section" ref={wrapperRef}>
      {/* Editorial Header với các từ khóa điểm nhấn màu đỏ */}
      <div className="contact-header-container" ref={headerRef}>
        <ContactHeader />
      </div>

      {/* Khung Rose Mask chứa Ảnh Nền căn phòng full màn hình */}
      <ContactRosePortal
        stageRef={stageRef}
        tipRef={tipRef}
      />
    </section>
  );
};

export default React.memo(Contact);
