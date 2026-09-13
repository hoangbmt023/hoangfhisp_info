import React from "react";
import TechCard from "./TechCard";

/**
 * Cột cuộn vô tận cho thẻ công nghệ (Hỗ trợ hướng cuộn 'up' hoặc 'down') (OCP & ISP)
 */
export const TechScrollTrack = ({
  cards = [],
  direction = "up",
  trackRef,
  columnClass = "",
}) => {
  const isDown = direction === "down";
  const groupClass = isDown ? "alsok-track-group-down" : "alsok-track-group";
  const trackClass = isDown ? "alsok-track-right" : "alsok-track-left";

  return (
    <div className={columnClass}>
      <div className={trackClass} ref={trackRef}>
        {/* Nhóm thẻ gốc */}
        <div className={groupClass}>
          {cards.map((card, idx) => (
            <TechCard key={`${direction}-1-${card.id || idx}`} card={card} />
          ))}
        </div>

        {/* Nhóm thẻ clone (đảm bảo vòng lặp 100% liền mạch không giật) */}
        <div className={groupClass} aria-hidden="true">
          {cards.map((card, idx) => (
            <TechCard key={`${direction}-2-${card.id || idx}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechScrollTrack);
