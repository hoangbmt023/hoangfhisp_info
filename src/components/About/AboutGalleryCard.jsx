import React from "react";

/**
 * Component: AboutGalleryCard
 * Hiển thị 1 thẻ ảnh Lookbook chuẩn tỷ lệ 4:5 kèm thanh thông tin meta bar.
 * Tái sử dụng độc lập cho bất kỳ item ảnh nào.
 */
export const AboutGalleryCard = ({ item, isPriority = false }) => {
  return (
    <div className="about-gallery-card">
      {/* Uniform Image Box (4:5 Aspect Ratio) */}
      <div className="card-image-box">
        <img
          src={item.src}
          alt={item.title}
          loading={isPriority ? "eager" : "lazy"}
          className="card-image-el"
        />
      </div>

      {/* Bottom Meta Bar */}
      <div className="card-meta-bar">
        <div className="card-meta-left">
          <span className="card-meta-title">{item.title}</span>
          <span className="card-meta-code">{item.code}</span>
        </div>
        <div className="card-meta-center">
          <span className="card-size-tags">{item.sizeTags}</span>
        </div>
        <div className="card-meta-right">
          <span className="card-meta-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AboutGalleryCard);
