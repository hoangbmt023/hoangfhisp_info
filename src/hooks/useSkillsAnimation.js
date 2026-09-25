import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook quản lý toàn bộ logic GSAP ScrollTrigger và Animation cho trang Skills (SRP & DIP)
 */
export const useSkillsAnimation = ({
  wrapperRef,
  wordLeftRef,
  wordRightRef,
  mediaLayerRef,
}) => {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const wordLeft = wordLeftRef.current;
    const wordRight = wordRightRef.current;
    const mediaLayer = mediaLayerRef.current;

    if (!wrapper || !wordLeft || !wordRight || !mediaLayer) return;

    const ctx = gsap.context(() => {
      // 1. Trạng thái khởi tạo của Khung Media: hoàn toàn ẩn và trong suốt
      gsap.set(mediaLayer, {
        clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        scale: 0.3,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });

      const getCenterElements = () =>
        wrapper.querySelectorAll(
          ".alsok-center-top-block, .alsok-center-main-manifesto, .alsok-center-narrative, .alsok-center-bottom-callout"
        );

      // Khởi tạo ẩn nội dung ở giữa để khi mở hết media mới tự động chạy từ trên xuống
      const initialCenterEls = getCenterElements();
      if (initialCenterEls.length > 0) {
        gsap.set(initialCenterEls, {
          opacity: 0,
          y: -30,
        });
      }

      // =========================================================================
      // SCROLLTRIGGER 1: KHI CUỘN TỪ TRÊN (ABOUT) XUỐNG SKILLS
      // =========================================================================
      gsap.fromTo(
        ".stripe-left",
        { x: "35vw", opacity: 0.8 },
        {
          x: "0vw",
          opacity: 1,
          ease: "none",
          stagger: 0.02,
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".stripe-right",
        { x: "-35vw", opacity: 0.8 },
        {
          x: "0vw",
          opacity: 1,
          ease: "none",
          stagger: 0.02,
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        [wordLeft, wordRight],
        { yPercent: 75, opacity: 0.8 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Quản lý trạng thái tự động chạy animation xuất hiện chữ từ trên xuống
      let centerRevealed = false;

      const autoRevealCenter = () => {
        if (centerRevealed) return;
        const els = getCenterElements();
        if (!els.length) return;
        centerRevealed = true;
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const autoHideCenter = () => {
        if (!centerRevealed) return;
        const els = getCenterElements();
        if (!els.length) return;
        centerRevealed = false;
        gsap.to(Array.from(els).reverse(), {
          opacity: 0,
          y: -25,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
          overwrite: "auto",
        });
      };

      // =========================================================================
      // SCROLLTRIGGER 2: KHI CUỘN BÊN TRONG SKILLS (STICKY PINNED)
      // - Giai đoạn 1 (0.00 -> 0.80): Mở bung 100% Khung Media 3 cột
      // - Giai đoạn 2 (progress >= 0.82): Cuộn 1 phát -> Chữ TỰ ĐỘNG chạy từ trên xuống
      // =========================================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            if (self.progress > 0.01) {
              mediaLayer.style.visibility = "visible";
            } else {
              mediaLayer.style.visibility = "hidden";
            }

            if (self.progress >= 0.65) {
              mediaLayer.style.pointerEvents = "auto";
            } else {
              mediaLayer.style.pointerEvents = "none";
            }

            if (self.progress >= 0.82) {
              autoRevealCenter();
            } else if (self.progress < 0.76) {
              autoHideCenter();
            }
          },
          onUpdate: (self) => {
            if (self.progress > 0.01) {
              mediaLayer.style.visibility = "visible";
            } else {
              mediaLayer.style.visibility = "hidden";
            }

            if (self.progress >= 0.65) {
              mediaLayer.style.pointerEvents = "auto";
            } else {
              mediaLayer.style.pointerEvents = "none";
            }

            // Khi mở full và cuộn 1 phát -> Tự động kích hoạt animation chữ từ trên xuống
            if (self.progress >= 0.82) {
              autoRevealCenter();
            } else if (self.progress < 0.76) {
              autoHideCenter();
            }
          },
        },
      });

      // NẤC 1 (0.00 -> 0.20): Media hé mở nhỏ ở giữa
      tl.to(
        wordLeft,
        {
          x: "-18vw",
          opacity: 1,
          ease: "none",
          duration: 0.2,
        },
        0
      );

      tl.to(
        wordRight,
        {
          x: "29vw",
          opacity: 1,
          ease: "none",
          duration: 0.2,
        },
        0
      );

      tl.fromTo(
        mediaLayer,
        {
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
          scale: 0.35,
          opacity: 0,
        },
        {
          clipPath: "polygon(40% 0%, 60% 0%, 60% 100%, 40% 100%)",
          scale: 0.6,
          opacity: 0.9,
          ease: "none",
          duration: 0.2,
        },
        0
      );

      // Ẩn hoàn toàn các thanh sọc đỏ/đen phía sau khi Khung Media bắt đầu mở
      tl.to(
        [".alsok-bg-stripes", ".stripe-item"],
        {
          opacity: 0,
          ease: "none",
          duration: 0.25,
        },
        0.03
      );

      // NẤC 2 (0.20 -> 0.40): Media mở rộng cỡ vừa (60% màn hình)
      tl.to(
        wordLeft,
        {
          x: "-32vw",
          opacity: 0.9,
          ease: "none",
          duration: 0.2,
        },
        0.2
      );

      tl.to(
        wordRight,
        {
          x: "42vw",
          opacity: 0.9,
          ease: "none",
          duration: 0.2,
        },
        0.2
      );

      tl.to(
        mediaLayer,
        {
          clipPath: "polygon(22% 0%, 78% 0%, 78% 100%, 22% 100%)",
          scale: 0.8,
          opacity: 0.95,
          ease: "none",
          duration: 0.2,
        },
        0.2
      );

      // NẤC 3 (0.40 -> 0.60): Media mở rộng gần hết (85% màn hình)
      tl.to(
        wordLeft,
        {
          x: "-46vw",
          opacity: 0.5,
          ease: "none",
          duration: 0.2,
        },
        0.4
      );

      tl.to(
        wordRight,
        {
          x: "52vw",
          opacity: 0.5,
          ease: "none",
          duration: 0.2,
        },
        0.4
      );

      tl.to(
        mediaLayer,
        {
          clipPath: "polygon(8% 0%, 92% 0%, 92% 100%, 8% 100%)",
          scale: 0.93,
          opacity: 1,
          ease: "none",
          duration: 0.2,
        },
        0.4
      );

      // NẤC 4 (0.60 -> 0.80): Mở 100% TRỌN VẸN alsok-3col-container đầy đủ 3 cột
      tl.to(
        wordLeft,
        {
          x: "-60vw",
          opacity: 0,
          ease: "none",
          duration: 0.2,
        },
        0.6
      );

      tl.to(
        wordRight,
        {
          x: "60vw",
          opacity: 0,
          ease: "none",
          duration: 0.2,
        },
        0.6
      );

      tl.to(
        mediaLayer,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          opacity: 1,
          ease: "none",
          duration: 0.2,
        },
        0.6
      );
    }, wrapper);

    return () => ctx.revert();
  }, [wrapperRef, wordLeftRef, wordRightRef, mediaLayerRef]);
};

export default useSkillsAnimation;
