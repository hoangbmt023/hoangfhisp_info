import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import TimelineChapter from '../../components/common/TimelineChapter';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Experience.css';

const Experience = () => {
  const sectionRef = useScrollReveal();
  const timelineData = [
    {
      year: '2021',
      title: 'Khởi Đầu Nguồn Cảm Hứng',
      description: 'Đặt những dòng code đầu tiên, khám phá vẻ đẹp của sự kết hợp giữa thuật toán logic và cảm xúc thiết kế.',
      tags: ['HTML/CSS', 'JavaScript', 'Design Principles'],
    },
    {
      year: '2023',
      title: 'Định Hình Phong Cách UI/UX',
      description: 'Theo đuổi phong cách thiết kế tối giản, tạp chí nghệ thuật (Editorial Layout) và chuyển động mượt mà.',
      tags: ['React.js', 'Vite', 'UI/UX Design', 'CSS Architecture'],
    },
    {
      year: '2025',
      title: 'Dấu Ấn Tuyên Ngôn Sáng Tạo',
      description: 'Xây dựng các dự án hệ sinh thái portfolio cá nhân mang màu sắc âm nhạc, điện ảnh và trải nghiệm tương tác.',
      tags: ['Design System', 'Micro-interactions', 'Performance'],
    },
    {
      year: '2026+',
      title: 'Chinh Phục Tương Lai',
      description: 'Liên tục đổi mới, tạo ra những sản phẩm số vượt mốc mong đợi với tinh thần nghệ sĩ công nghệ.',
      tags: ['Innovation', 'Full-stack Vision', 'Creative Engineering'],
    },
  ];

  return (
    <section id="experience" className="narrative-chapter-section experience-section" ref={sectionRef}>
      <div className="chapter-inner-container">
        <SectionHeader
          chapter="CHAPTER 03"
          title="CỘT MỐC & DẤU ẤN"
          subtitle="Từng dấu chân đánh dấu sự trưởng thành trong tay nghề và tư duy."
          centered={true}
        />

        <TimelineChapter items={timelineData} />
      </div>
    </section>
  );
};

export default Experience;
