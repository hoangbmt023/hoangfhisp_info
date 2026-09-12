import React, { useState, useEffect, useRef } from "react";
import heroPortrait from "../../assets/images/hero-portrait.png";
import heroPortraitAlt from "../../assets/images/hero-portrait-alt.png";
import heroBgVideo from "../../assets/videos/hero-bg-video.mp4";
import heroBgVideoAlt from "../../assets/videos/hero-bg-video-alt.mp4";
import verticalTornEdge from "../../assets/images/vertical-torn-edge.png";
import verticalTornMaskRight from "../../assets/images/vertical-torn-mask-right.png";
import "./HomeHero.css";

const HomeHero = () => {
  // Video Playlist: Play hero-bg-video.mp4 -> hero-bg-video-alt.mp4 -> loop back
  const videoList = [heroBgVideo, heroBgVideoAlt];
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Portrait Image Slideshow: Swap hero-portrait.png & hero-portrait-alt.png every 4 seconds
  const portraitList = [heroPortrait, heroPortraitAlt];
  const [portraitIndex, setPortraitIndex] = useState(0);

  // Trạng thái hiển thị thực tế của HomeHero (để tạm dừng video & timer khi bị lớp About đè)
  const [isVisible, setIsVisible] = useState(true);

  // Xử lý chuyển bài trong playlist video
  const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  // 1. Tự động kiểm tra khi người dùng cuộn xuống lớp About hoặc chuyển tab
  useEffect(() => {
    let ticking = false;

    const checkVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = window.innerHeight;
          // Khi lớp nội dung trượt lên che khuất Hero (scrollY >= 100vh - 60px)
          const visible = scrollY < heroHeight - 60;
          setIsVisible(visible);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    checkVisibility();

    // Tự động tạm dừng khi người dùng ẩn trình duyệt / chuyển tab
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        checkVisibility();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 2. Tối ưu GPU: Tạm dừng / Phát video tự động theo trạng thái isVisible
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isVisible) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isVisible, videoIndex]);

  // 3. Tối ưu CPU/JS: Chỉ chạy Slideshow đổi ảnh khi HomeHero đang hiển thị
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setPortraitIndex((prevIndex) => (prevIndex + 1) % portraitList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isVisible, portraitList.length]);

  const currentPortrait = portraitList[portraitIndex];

  return (
    <div
      className={`home-hero-serotoninn-wrapper ${
        !isVisible ? "hero-hidden-paused" : ""
      }`}
      style={{
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* 1. Full Color Background Video Layer */}
      <div className="hero-video-bg-container">
        <video
          ref={videoRef}
          className="hero-ambient-video"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          poster={currentPortrait}
        >
          <source src={videoList[videoIndex]} type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* 2. Editorial Text & Base Center Portrait Poster */}
      <div className="hero-serotoninn-grid">
        {/* Left Side Giant Editorial Title */}
        <div className="hero-editorial-left">
          <div className="hero-logo-stack">
            <h1 className="editorial-huge-title logo-top">HOANGF</h1>
            <h1 className="editorial-huge-title logo-bottom">HISP</h1>
          </div>
        </div>

        {/* Center Split Portrait Box */}
        <div className="hero-center-portrait-box">
          <img
            key={portraitIndex}
            src={currentPortrait}
            alt=""
            className={`portrait-img ${
              portraitIndex === 1 ? "alt-portrait" : "main-portrait"
            } fade-in`}
          />
        </div>

        {/* Right Side Giant Editorial Tagline */}
        <div className="hero-editorial-right">
          <h2 className="editorial-huge-title-right">
            LET ME SHOW YOU
            <br />
            THE WORLD
            <br />
            THROUGH MY EYES
          </h2>
        </div>
      </div>

      {/* 3. Single Right-Side Grayscale Backdrop Overlay */}
      <div
        className="hero-right-grayscale-overlay"
        style={{
          WebkitMaskImage: `url(${verticalTornMaskRight})`,
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: `url(${verticalTornMaskRight})`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      ></div>

      {/* 4. Authentic Vertical Ripped Paper Tear Separator Line */}
      <div className="vertical-torn-tear-line">
        <img src={verticalTornEdge} alt="" className="vertical-torn-edge-img" />
      </div>
    </div>
  );
};

export default HomeHero;
