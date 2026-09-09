import React from 'react';
import AboutHero from '../../components/AboutHero/AboutHero';
import SectionHeader from '../../components/common/SectionHeader';
import StoryQuote from '../../components/common/StoryQuote';
import TimelineChapter from '../../components/common/TimelineChapter';
import SkillCard from '../../components/common/SkillCard';
import StatCounter from '../../components/common/StatCounter';
import './About.css';

const About = () => {
  const statsData = [
    { value: '5+', label: 'Năm Sáng Tạo' },
    { value: '40+', label: 'Dự Án Hoàn Thành' },
    { value: '100%', label: 'Đam Mê & Kỷ Luật' },
    { value: '24/7', label: 'Tư Duy Đột Phá' },
  ];

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

  const skillCardsData = [
    {
      category: 'Giao Diện & Tương Tác',
      icon: '🎨',
      skills: [
        { name: 'React.js & Modern Web', level: 92 },
        { name: 'CSS Architecture & Animation', level: 95 },
        { name: 'Responsive & Mobile First', level: 90 },
      ],
    },
    {
      category: 'Tư Duy & Thiết Kế UI/UX',
      icon: '💡',
      skills: [
        { name: 'Editorial & Storytelling Layout', level: 88 },
        { name: 'Design System & Typography', level: 94 },
        { name: 'Micro-interactions & UX Polish', level: 90 },
      ],
    },
    {
      category: 'Công Cụ & Kỹ Thuật',
      icon: '⚙️',
      skills: [
        { name: 'Vite / Webpack / Git Workflow', level: 88 },
        { name: 'State Management & Router', level: 86 },
        { name: 'Optimization & Dark Mode Synergy', level: 92 },
      ],
    },
  ];

  return (
    <div className="about-page-container">
      {/* 100vh Full Viewport Serotoninn Style Hero Section */}
      <AboutHero />

      {/* Chapter 01: Hành Trình Khởi Đầu */}
      <section id="about" className="narrative-chapter-section">
        <div className="chapter-inner-container">
          <SectionHeader
            chapter="CHAPTER 01"
            title="HÀNH TRÌNH KHỞI ĐẦU"
            subtitle="Mọi câu chuyện lớn đều bắt đầu từ một nét vẽ nhỏ và một dòng code mộng mơ."
          />

          <div className="story-paragraph-block">
            <p>
              Tôi tin rằng mỗi trang web không chỉ là tập hợp của những thẻ HTML hay các câu lệnh Javascript vô cảm, mà là một sân khấu trình diễn nghệ thuật thị giác nơi người dùng được dẫn dắt qua từng cung bậc cảm xúc.
            </p>
            <p>
              Hành trình của tôi bắt đầu từ sự tò mò với những giao diện tạp chí cổ điển và niềm đam mê tái tạo chúng trên không gian số. Từ những dòng lệnh vụng dại ban đầu cho đến khi làm chủ từng nhịp chuyển động của pixel, tôi luôn giữ nguyên vẹn sự háo hức của ngày đầu tiên.
            </p>
          </div>

          <StoryQuote
            quote="Sáng tạo không phải là tạo ra điều hoàn toàn mới, mà là kết nối những chấm nhỏ ký ức thành một tác phẩm có linh hồn."
            author="HOANGF HISP"
            role="Developer & Creative Designer"
          />
        </div>
      </section>

      {/* Chapter 02: Triết Lý & Tay Nghề */}
      <section id="skills" className="narrative-chapter-section alt-bg">
        <div className="chapter-inner-container">
          <SectionHeader
            chapter="CHAPTER 02"
            title="TRIẾT LÝ & TAY NGHỀ"
            subtitle="Kỷ luật trong tư duy kỹ thuật, tự do trong biểu đạt nghệ thuật."
          />

          <StatCounter stats={statsData} />

          <div className="skills-grid-wrapper">
            {skillCardsData.map((card, idx) => (
              <SkillCard
                key={idx}
                category={card.category}
                icon={card.icon}
                skills={card.skills}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 03: Cột Mốc & Dấu Ấn */}
      <section id="experience" className="narrative-chapter-section">
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

      {/* Chapter 04: Thế Giới Quan */}
      <section id="projects" className="narrative-chapter-section alt-bg">
        <div className="chapter-inner-container">
          <SectionHeader
            chapter="CHAPTER 04"
            title="THẾ GIỚI QUAN & CẢM HỨNG"
            subtitle="Góc nhìn đa chiều nuôi dưỡng tâm hồn sáng tạo ngoài màn hình máy tính."
          />

          <div className="perspective-cards-grid">
            <div className="perspective-card">
              <div className="card-number">01</div>
              <h3 className="card-title">Âm Nhạc & Nhịp Điệu</h3>
              <p className="card-desc">
                Âm nhạc là chất xúc tác cho tư duy cấu trúc. Giống như một bản phối khí hoàn hảo, giao diện web cần có nhịp điệu (Rhythm) và khoảng nghỉ (Spacing).
              </p>
            </div>
            <div className="perspective-card">
              <div className="card-number">02</div>
              <h3 className="card-title">Nhiếp Ảnh & Góc Nhìn</h3>
              <p className="card-desc">
                Cách ánh sáng và bóng tối tương tác trong một bức ảnh tạo nên cảm hứng cho thiết kế Light/Dark Mode mang độ tương phản tinh tế.
              </p>
            </div>
            <div className="perspective-card">
              <div className="card-number">03</div>
              <h3 className="card-title">Tối Giản & Kỷ Luật</h3>
              <p className="card-desc">
                Loại bỏ những chi tiết thừa để làm nổi bật điều cốt lõi. Tối giản không phải là ít hơn, mà là vừa đủ một cách hoàn hảo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 05: Lời Mời Kết Nối */}
      <section id="contact" className="narrative-chapter-section epilogue-section">
        <div className="chapter-inner-container text-center">
          <SectionHeader
            chapter="EPILOGUE"
            title="SẴN SÀNG CHO HÀNH TRÌNH MỚI"
            subtitle="Mỗi dự án là một câu chuyện mới đang chờ được kể."
            centered={true}
          />
          <p className="epilogue-text">
            Nếu bạn đang tìm kiếm một người đồng hành sáng tạo để hiện thực hóa những ý tưởng số mang màu sắc độc bản, đừng ngần ngại kết nối cùng tôi.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
