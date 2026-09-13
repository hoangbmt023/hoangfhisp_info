import React from "react";

/**
 * Component hiển thị các thanh sọc ĐỎ & ĐEN xen kẽ nhau phong cách ALSOK Miyagi (SRP)
 */
export const SkillsBackgroundStripes = () => {
  return (
    <div className="alsok-bg-stripes" aria-hidden="true">
      {/* Bên Trái: Cụm 3 (trên) & Cụm 2 (dưới) */}
      <div className="stripe-item stripe-left stripe-red sl-1"></div>
      <div className="stripe-item stripe-left stripe-black sl-2"></div>
      <div className="stripe-item stripe-left stripe-red sl-3"></div>
      <div className="stripe-item stripe-left stripe-black sl-4"></div>
      <div className="stripe-item stripe-left stripe-red sl-5"></div>

      {/* Bên Phải: Cụm 2 (trên) & Cụm 3 (dưới) */}
      <div className="stripe-item stripe-right stripe-black sr-1"></div>
      <div className="stripe-item stripe-right stripe-red sr-2"></div>
      <div className="stripe-item stripe-right stripe-black sr-3"></div>
      <div className="stripe-item stripe-right stripe-red sr-4"></div>
      <div className="stripe-item stripe-right stripe-black sr-5"></div>
    </div>
  );
};

export default React.memo(SkillsBackgroundStripes);
