import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Projects.css';

const Projects = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="projects" className="narrative-chapter-section alt-bg projects-section" ref={sectionRef}>
      <div className="chapter-inner-container">
        <SectionHeader
          chapter="CHAPTER 04"
          title="THẾ GIỚI QUAN & CẢM HỨNG"
          subtitle="Góc nhìn đa chiều nuôi dưỡng tâm hồn sáng tạo ngoài màn hình máy tính."
        />

        <div className="perspective-cards-grid reveal-stagger-group">
          <div className="perspective-card reveal-stagger-item">
            <div className="card-number">01</div>
            <h3 className="card-title">Âm Nhạc & Nhịp Điệu</h3>
            <p className="card-desc">
              Âm nhạc là chất xúc tác cho tư duy cấu trúc. Giống như một bản phối khí hoàn hảo, giao diện web cần có nhịp điệu (Rhythm) và khoảng nghỉ (Spacing).
            </p>
          </div>
          <div className="perspective-card reveal-stagger-item">
            <div className="card-number">02</div>
            <h3 className="card-title">Nhiếp Ảnh & Góc Nhìn</h3>
            <p className="card-desc">
              Cách ánh sáng và bóng tối tương tác trong một bức ảnh tạo nên cảm hứng cho thiết kế Light/Dark Mode mang độ tương phản tinh tế.
            </p>
          </div>
          <div className="perspective-card reveal-stagger-item">
            <div className="card-number">03</div>
            <h3 className="card-title">Tối Giản & Kỷ Luật</h3>
            <p className="card-desc">
              Loại bỏ những chi tiết thừa để làm nổi bật điều cốt lõi. Tối giản không phải là ít hơn, mà là vừa đủ một cách hoàn hảo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
