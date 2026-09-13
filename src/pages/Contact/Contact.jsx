import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="contact" className="narrative-chapter-section epilogue-section contact-section" ref={sectionRef}>
      <div className="chapter-inner-container text-center reveal-item">
        <SectionHeader
          chapter="EPILOGUE"
          title="SẴN SÀNG CHO HÀNH TRÌNH MỚI"
          subtitle="Mỗi dự án là một câu chuyện mới đang chờ được kể."
          centered={true}
        />
        <p className="epilogue-text reveal-item">
          Nếu bạn đang tìm kiếm một người đồng hành sáng tạo để hiện thực hóa những ý tưởng số mang màu sắc độc bản, đừng ngần ngại kết nối cùng tôi.
        </p>
      </div>
    </section>
  );
};

export default Contact;
