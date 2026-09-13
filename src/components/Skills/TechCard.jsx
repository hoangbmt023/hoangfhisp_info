import React from "react";

/**
 * Thẻ công nghệ độc lập với ảnh nền random và logo sắc nét (SRP & OCP)
 */
export const TechCard = ({ card }) => {
  if (!card) return null;

  return (
    <div className="alsok-tech-card" title={card.name}>
      <img
        src={card.bgPhoto}
        alt=""
        className="alsok-tech-bg-photo"
        loading="lazy"
      />
      <div className="alsok-tech-bg-overlay"></div>
      <img
        src={card.icon}
        alt={card.name}
        className="alsok-tech-icon"
        loading="lazy"
      />
    </div>
  );
};

export default React.memo(TechCard);
