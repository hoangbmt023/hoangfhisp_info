import React from "react";

/**
 * Component hiển thị tiêu đề lớn tách đôi: "KỸ NĂNG" (ĐỎ) & "CHUYÊN MÔN" (ĐEN/TRẮNG) (SRP)
 */
export const SkillsSplitTitle = ({ wordLeftRef, wordRightRef }) => {
  return (
    <div className="alsok-split-title-layer" aria-hidden="true">
      <div className="alsok-split-words-row">
        <span className="alsok-word-left" ref={wordLeftRef}>
          KỸ NĂNG
        </span>
        <span className="alsok-word-right" ref={wordRightRef}>
          CHUYÊN MÔN
        </span>
      </div>
    </div>
  );
};

export default React.memo(SkillsSplitTitle);
