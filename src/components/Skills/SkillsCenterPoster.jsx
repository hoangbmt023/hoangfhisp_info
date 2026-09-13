import React from "react";
import heroPortrait from "../../assets/images/hero-portrait.png";

/**
 * Khối trung tâm poster typography hỗ trợ Trắng/Đen & Animation thả từ trên xuống (SRP)
 */
export const SkillsCenterPoster = () => {
  return (
    <div className="alsok-col-center">
      <img src={heroPortrait} alt="" className="alsok-center-bg-img" />
      <div className="alsok-center-overlay"></div>

      {/* Phía trên: RECRUIT / KỸ NĂNG + Subtitle + Line */}
      <div className="alsok-center-top-block">
        <h3 className="alsok-recruit-headline">KỸ NĂNG</h3>
        <div className="alsok-recruit-sub">NĂNG LỰC CHUYÊN MÔN</div>
        <div className="alsok-recruit-divider"></div>
      </div>

      {/* Ở giữa: Tiêu đề lớn 2 dòng */}
      <div className="alsok-center-main-manifesto">
        <div className="manifesto-line">KIẾN TẠO GIÁ TRỊ</div>
        <div className="manifesto-line">LÀM CHỦ CÔNG NGHỆ</div>
      </div>

      {/* Mô tả ngắn 2 dòng */}
      <div className="alsok-center-narrative">
        <p>Không chỉ đơn thuần là viết mã nguồn.</p>
        <p>
          Đó là hành trình kiến tạo những hệ thống tối ưu, an toàn và bền bỉ.
        </p>
      </div>

      {/* Phía dưới: Điểm nhấn kêu gọi */}
      <div className="alsok-center-bottom-callout">
        <div className="callout-lead">
          Tận tâm trong từng giải pháp số!
        </div>
        <div className="callout-sub">
          Sẵn sàng kiến tạo những trải nghiệm đột phá.
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillsCenterPoster);
