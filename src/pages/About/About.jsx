import React, { useRef } from "react";
import { STORIES, GALLERY_ITEMS } from "../../data/aboutData";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import AboutSidebar from "../../components/About/AboutSidebar";
import AboutGallery from "../../components/About/AboutGallery";
import "./About.css";

/**
 * About Section (Chapter 01 - Lookbook & Self Introduction)
 * Tuân thủ SOLID:
 * - SRP: Điều phối layout và liên kết các sub-components & custom hook.
 * - OCP / DIP: Cho phép nhận stories và galleryItems qua props (mặc định lấy từ aboutData.js).
 */
const About = ({ stories = STORIES, galleryItems = GALLERY_ITEMS }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const progressBarRef = useRef(null);

  // Custom hook xử lý toàn bộ logic tính toán cuộn ngang & cập nhật giai đoạn câu chuyện
  const { activeStoryIndex } = useHorizontalScroll({
    containerRef,
    trackRef,
    viewportRef,
    progressBarRef,
    stories,
  });

  const currentStory = stories[activeStoryIndex] || stories[0];

  return (
    <section id="about" className="about-editorial-section" ref={containerRef}>
      <div className="about-sticky-container">
        {/* Left Editorial Sidebar Component */}
        <AboutSidebar
          title="GIỚI THIỆU"
          story={currentStory}
          activeStoryIndex={activeStoryIndex}
          progressBarRef={progressBarRef}
        />

        {/* Right Horizontal Gallery Component */}
        <AboutGallery
          items={galleryItems}
          viewportRef={viewportRef}
          trackRef={trackRef}
        />
      </div>
    </section>
  );
};

export default About;
