import React from "react";
import AboutGalleryCard from "./AboutGalleryCard";

/**
 * Component: AboutGallery
 * Quản lý khung nhìn Viewport và Track cuộn ngang, render danh sách các Lookbook Cards.
 */
export const AboutGallery = ({
  items = [],
  viewportRef,
  trackRef,
}) => {
  return (
    <div className="about-gallery-viewport" ref={viewportRef}>
      <div className="about-gallery-track" ref={trackRef}>
        {items.map((item, index) => (
          <AboutGalleryCard
            key={item.id}
            item={item}
            isPriority={index < 4}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(AboutGallery);
