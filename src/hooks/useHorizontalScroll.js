import { useEffect, useState } from "react";

/**
 * Custom Hook: useHorizontalScroll
 * Quản lý tính toán tiến trình cuộn dọc để dịch chuyển ngang (horizontal translation)
 * và cập nhật thanh tiến trình + giai đoạn nội dung (story stages).
 *
 * @param {Object} refs - Chứa { containerRef, trackRef, viewportRef, progressBarRef }
 * @param {Array} stories - Mảng các phân đoạn story để xác định activeStoryIndex
 * @returns {Object} { activeStoryIndex, scrollProgress }
 */
export const useHorizontalScroll = ({
  containerRef,
  trackRef,
  viewportRef,
  progressBarRef,
  stories = [],
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (!containerRef?.current || !trackRef?.current || !viewportRef?.current) {
        return;
      }

      const container = containerRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / scrollHeight, 0), 1);
      
      // Vùng đệm tĩnh 5% ở đầu và cuối để ổn định thị giác và triệt tiêu quán tính cuộn
      const buffer = 0.05;
      const progress = Math.min(Math.max((rawProgress - buffer) / (1 - 2 * buffer), 0), 1);
      setScrollProgress(progress);

      // Translate track horizontally
      const trackWidth = track.scrollWidth;
      const viewWidth = viewport.clientWidth;
      const maxTranslate = Math.max(trackWidth - viewWidth, 0);
      const translateX = progress * maxTranslate;

      track.style.transform = `translate3d(-${translateX}px, 0, 0)`;

      // Progress bar fill
      if (progressBarRef?.current) {
        progressBarRef.current.style.width = `${Math.max(progress * 100, 8)}%`;
      }

      // Update story stage
      if (stories.length > 0) {
        const currentStoryIdx = stories.findIndex(
          (s) => progress >= s.range[0] && progress <= s.range[1]
        );
        if (currentStoryIdx !== -1) {
          setActiveStoryIndex(currentStoryIdx);
        }
      }
    };

    const onScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef, trackRef, viewportRef, progressBarRef, stories]);

  return { activeStoryIndex, scrollProgress };
};

export default useHorizontalScroll;
