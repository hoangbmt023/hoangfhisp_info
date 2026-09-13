import React from "react";

/**
 * Component: AboutSidebar
 * Hiển thị phần Editorial Sidebar bên trái (hoặc trên cùng ở mobile),
 * gồm Tiêu đề, các Tags định danh, Đoạn trích dẫn câu chuyện và Thanh tiến trình.
 */
export const AboutSidebar = ({
  title = "GIỚI THIỆU",
  story,
  activeStoryIndex,
  progressBarRef,
}) => {
  return (
    <div className="about-editorial-sidebar">
      {/* Top Title */}
      <div className="about-sidebar-top">
        <h2 className="about-editorial-title">{title}</h2>
      </div>

      {/* Middle Story & Tags */}
      <div className="about-sidebar-middle">
        <div className="editorial-meta-tags">
          <span className="editorial-tag">{story?.label1}</span>
          <span className="editorial-tag">{story?.label2}</span>
          <span className="editorial-tag">{story?.label3}</span>
        </div>

        <p className="about-short-quote" key={activeStoryIndex}>
          {story?.quote}
        </p>
      </div>

      {/* Bottom Minimalist Progress Bar */}
      <div className="about-sidebar-bottom">
        <div className="editorial-progress-line">
          <div className="editorial-progress-bar" ref={progressBarRef}></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AboutSidebar);
