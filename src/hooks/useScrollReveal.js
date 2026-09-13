import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom Hook: useScrollReveal
 * Tự động quét và kích hoạt hoạt ảnh theo cuộn cho các phần tử bên trong containerRef
 * tuân theo phong cách Editorial & ALS-OK Miyagi (Fade Up, Stagger Cards, Parallax)
 */
export const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Stagger Fade Up cho các phần tử con có class '.reveal-stagger'
      const staggerGroups = container.querySelectorAll(".reveal-stagger-group");
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll(".reveal-stagger-item");
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 72%", // Kích hoạt khi phần tử đã vào sâu trong tầm nhìn
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // 2. Individual Fade-Up elements with class '.reveal-item'
      const singleItems = container.querySelectorAll(".reveal-item");
      singleItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%", // Tránh kích hoạt quá sớm ở đáy màn hình
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 3. Parallax elements with attribute [data-parallax]
      const parallaxItems = container.querySelectorAll("[data-parallax]");
      parallaxItems.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.2");
        gsap.to(el, {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [options]);

  return containerRef;
};

export default useScrollReveal;
