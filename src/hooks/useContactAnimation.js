import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import roseMaskFill from "../assets/images/contacts/rose-mask-fill.png";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook quản lý GSAP ScrollTrigger timeline cho Contact Rose Portal:
 * 1. Trạng thái ban đầu: Hoa ở giữa, header và tip đầy đủ.
 * 2. Cuộn dần: Hoa nở từ từ, nét viền trắng mờ dần và biến mất.
 * 3. Khi nở hết: Khẩu độ vượt qua 4 góc màn hình, lộ 100% full banner (không còn viền trắng góc).
 * 4. Ngay khi full banner: Cuộn tiếp là Footer trồi lên ngay từ đáy.
 */
export const useContactAnimation = ({
  wrapperRef,
  headerRef,
  stageRef,
  tipRef,
  bottomBarRef,
}) => {
  useEffect(() => {
    const wrapper = wrapperRef?.current;
    const header = headerRef?.current;
    const stage = stageRef?.current;
    const tip = tipRef?.current;
    const bottomBar = bottomBarRef?.current;

    if (!wrapper || !stage) return;

    // Trigger trên container cha .home-footer-reveal-container
    const triggerElement =
      wrapper.closest(".home-footer-reveal-container") || wrapper;

    const ctx = gsap.context(() => {
      // Tính toán kích thước chuẩn theo viewport (Hỗ trợ cả Mobile & Desktop)
      const getSizes = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 768;

        // Initial size: Mobile ~270-320px, Desktop ~340-400px (lấp đầy không gian hài hòa, không để trống quá nhiều)
        const initialSize = isMobile
          ? Math.min(320, Math.max(260, vw * 0.70))
          : Math.min(400, Math.max(340, vw * 0.28));

        // Target size: diagonal * 1.95 đảm bảo mở trọn vẹn 4 góc màn hình
        const diagonal = Math.hypot(vw, vh);
        const targetSize = Math.ceil(diagonal * 1.95);
        const targetScale = targetSize / initialSize;

        return { initialSize, targetSize, targetScale, isMobile };
      };

      const { initialSize, targetSize, targetScale, isMobile } = getSizes();

      const imageLayer = stage.querySelector(".contact-portal-image-layer");
      const overlay = stage.querySelector(".contact-rose-lines-overlay");

      // Tính toán toạ độ Y ban đầu chuẩn xác bằng offset DOM tự nhiên (KHÔNG BỊ ẢNH HƯỞNG BỞI GSAP TRANSFORM HAY SCROLL POSITION)
      const getInitialCenterY = () => {
        if (!header || !tip || !stage) {
          return Math.round(window.innerHeight * (isMobile ? 0.58 : 0.65));
        }

        const headerBottom = header.offsetTop + header.offsetHeight;
        const tipTop = tip.offsetTop;

        if (headerBottom > 0 && tipTop > headerBottom) {
          return Math.round((headerBottom + tipTop) / 2);
        }

        return Math.round(window.innerHeight * (isMobile ? 0.58 : 0.65));
      };

      const initialCenterY = getInitialCenterY();
      const deadCenterY = Math.round(window.innerHeight * 0.5);

      const updateMask = (size, centerY = initialCenterY) => {
        const topPos = centerY - size / 2;

        if (overlay) {
          overlay.style.top = `${centerY}px`;
          overlay.style.width = `${size}px`;
          overlay.style.height = `${size}px`;
        }

        if (imageLayer) {
          imageLayer.style.webkitMaskSize = `${size}px ${size}px`;
          imageLayer.style.maskSize = `${size}px ${size}px`;
          imageLayer.style.webkitMaskPosition = `50% ${topPos}px`;
          imageLayer.style.maskPosition = `50% ${topPos}px`;

          if (size >= targetSize * 0.96) {
            imageLayer.style.webkitMaskImage = "none";
            imageLayer.style.maskImage = "none";
          } else {
            imageLayer.style.webkitMaskImage = `url("${roseMaskFill}")`;
            imageLayer.style.maskImage = `url("${roseMaskFill}")`;
          }
        }
      };

      const animObj = { size: initialSize, centerY: initialCenterY };

      if (header) {
        gsap.set(header, {
          xPercent: -50,
          x: 0,
          scale: 1,
        });
      }

      if (tip) {
        gsap.set(tip, {
          xPercent: -50,
          x: 0,
        });
      }

      if (bottomBar) {
        gsap.set(bottomBar, {
          opacity: 0,
          y: 24,
          pointerEvents: "none",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            const currentInitialY = getInitialCenterY();
            if (self.progress >= 0.55) {
              updateMask(targetSize, deadCenterY);
              if (overlay) gsap.set(overlay, { opacity: 0 });
              if (header) gsap.set(header, { opacity: 0, y: -140, scale: 0.94 });
              if (tip) gsap.set(tip, { opacity: 0, y: 90 });
              if (bottomBar) gsap.set(bottomBar, { opacity: 1, y: 0, pointerEvents: "auto" });
            } else if (self.progress <= 0) {
              updateMask(initialSize, currentInitialY);
              if (overlay) gsap.set(overlay, { opacity: 1 });
              if (header) gsap.set(header, { y: 0, opacity: 1, scale: 1 });
              if (tip) gsap.set(tip, { y: 0, opacity: 1 });
              if (bottomBar) gsap.set(bottomBar, { opacity: 0, y: 24, pointerEvents: "none" });
            } else {
              updateMask(animObj.size, animObj.centerY);
            }
          },
        },
      });

      // 1. Cánh hoa nở to ĐẨY MẠNH TIÊU ĐỀ TRÊN LÊN TRỜI (y: -140px, mờ dần)
      if (header) {
        tl.to(
          header,
          {
            y: -140,
            scale: 0.94,
            opacity: 0,
            ease: "power2.out",
            duration: 0.22,
          },
          0
        );
      }

      // Cánh hoa nở to ĐẨY DÒNG TIP DƯỚI XUỐNG ĐÁY (y: 90px, mờ dần)
      if (tip) {
        tl.to(
          tip,
          {
            y: 90,
            opacity: 0,
            ease: "power2.out",
            duration: 0.18,
          },
          0
        );
      }

      // 2. Viền hoa hồng TRẮNG (rose-frame-white) mờ dần nhanh và biến mất sớm từ 18% -> 36%
      if (overlay) {
        tl.to(
          overlay,
          {
            opacity: 0,
            ease: "power1.out",
            duration: 0.20,
          },
          0.20
        );
      }

      // 3. Hoa vừa nở vừa di chuyển sớm về CHÍNH GIỮA MÀN HÌNH (trong 22% đầu), sau đó ĐỨNG IM Ở GIỮA
      tl.fromTo(
        animObj,
        { centerY: initialCenterY },
        {
          centerY: deadCenterY,
          ease: "power2.out",
          duration: 0.22,
          onUpdate: () => updateMask(animObj.size, animObj.centerY),
        },
        0
      );

      // 4. Hoa tiếp tục phóng to đều đặn từ 0 -> 55% chặng cuộn cho đến khi mở hết cỡ
      tl.fromTo(
        animObj,
        { size: initialSize },
        {
          size: targetSize,
          ease: "sine.inOut",
          duration: 0.55,
          onUpdate: () => updateMask(animObj.size, animObj.centerY),
        },
        0
      );

      // 5. Khi banner nở hết (48% -> 58%): Hiện trọn vẹn bottom bar brxe-block
      if (bottomBar) {
        tl.to(
          bottomBar,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            ease: "power2.out",
            duration: 0.12,
          },
          0.48
        );
      }
    }, wrapper);

    // Refresh ScrollTrigger sau khi DOM đã ổn định để bắt chính xác tọa độ
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [wrapperRef, headerRef, stageRef, tipRef, bottomBarRef]);
};

export default useContactAnimation;
