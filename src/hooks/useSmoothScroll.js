import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;

export const getLenis = () => globalLenis;

export const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll với cơ chế LERP kiểm soát quán tính dứt khoát
    const lenis = new Lenis({
      lerp: 0.1, // Phản hồi trực tiếp, dừng ngay trong 0.15s sau khi thôi lăn chuột
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Giảm nhẹ tỉ lệ truyền động để tránh lướt quá đà
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. Handle smooth scrolling for anchor links (e.g. #home, #about, #skills, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      e.preventDefault();
      if (href === "#home") {
        lenis.scrollTo(0, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // 4. Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;
