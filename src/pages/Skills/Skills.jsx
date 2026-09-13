import React, { useRef } from "react";
import useSkillsData from "../../hooks/useSkillsData";
import useSkillsAnimation from "../../hooks/useSkillsAnimation";
import SkillsBackgroundStripes from "../../components/Skills/SkillsBackgroundStripes";
import SkillsSplitTitle from "../../components/Skills/SkillsSplitTitle";
import SkillsCenterPoster from "../../components/Skills/SkillsCenterPoster";
import TechScrollTrack from "../../components/Skills/TechScrollTrack";
import "./Skills.css";

/**
 * Component: Skills (ALSOK Miyagi 'Security+One' Style)
 * Tuân thủ chuẩn nguyên lý SOLID & Clean Architecture:
 * - S (Single Responsibility): Phân tách rõ ràng Dữ liệu (useSkillsData), Animation (useSkillsAnimation) và Giao diện (Sub-components).
 * - O (Open/Closed): Thêm mới công nghệ/ảnh nền bằng cách thả file vào assets mà không cần sửa code logic.
 * - L & I (Liskov & Interface Segregation): Các sub-components độc lập, giao tiếp qua props tinh gọn.
 * - D (Dependency Inversion): Component chính phụ thuộc vào các module trừu tượng.
 */
const Skills = () => {
  const wrapperRef = useRef(null);
  const wordLeftRef = useRef(null);
  const wordRightRef = useRef(null);
  const mediaLayerRef = useRef(null);
  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);

  // 1. Data Layer: Quản lý danh sách công nghệ & thuật toán xáo trộn ảnh nền
  const { leftCards, rightCards } = useSkillsData();

  // 2. Animation Layer: Quản lý GSAP ScrollTrigger & Hiệu ứng auto-cascade chữ
  useSkillsAnimation({
    wrapperRef,
    wordLeftRef,
    wordRightRef,
    mediaLayerRef,
  });

  return (
    <section id="skills" className="alsok-skills-wrapper" ref={wrapperRef}>
      <div className="alsok-sticky-container">
        {/* 1. Dải sọc đỏ & đen xen kẽ */}
        <SkillsBackgroundStripes />

        {/* 2. Tiêu đề lớn tách đôi: KỸ NĂNG & CHUYÊN MÔN */}
        <SkillsSplitTitle
          wordLeftRef={wordLeftRef}
          wordRightRef={wordRightRef}
        />

        {/* 3. Khung Media 3 Cột phong cách ALSOK Miyagi */}
        <div className="alsok-media-reveal-layer" ref={mediaLayerRef}>
          <div className="alsok-3col-container">
            {/* Cột Trái - Core Technologies & Frameworks (Scroll Up) */}
            <TechScrollTrack
              cards={leftCards}
              direction="up"
              trackRef={leftTrackRef}
              columnClass="alsok-col-left"
            />

            {/* Cột Giữa - Poster Chân dung & Typography Chuyên môn */}
            <SkillsCenterPoster />

            {/* Cột Phải - Database, DevOps & Tools (Scroll Down) */}
            <TechScrollTrack
              cards={rightCards}
              direction="down"
              trackRef={rightTrackRef}
              columnClass="alsok-col-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
