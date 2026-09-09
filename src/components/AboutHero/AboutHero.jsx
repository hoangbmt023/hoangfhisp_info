import React, { useState, useEffect, useRef } from "react";
import heroPortrait from "../../assets/images/hero-portrait.png";
import heroPortraitAlt from "../../assets/images/hero-portrait-alt.png";
import heroBgVideo from "../../assets/videos/hero-bg-video.mp4";
import heroBgVideoAlt from "../../assets/videos/hero-bg-video-alt.mp4";
import verticalTornEdge from "../../assets/images/vertical-torn-edge.png";
import verticalTornMaskRight from "../../assets/images/vertical-torn-mask-right.png";
import "./AboutHero.css";

// Ultra-precision polygon clip path traced directly from vertical-torn-edge.png (288 sampling points)
const TORN_RIGHT_CLIP_PATH = `polygon(100% 0%, 50.146% 0.000%, 50.195% 0.347%, 50.146% 0.694%, 50.098% 1.042%, 50.146% 1.389%, 50.146% 1.736%, 50.146% 2.083%, 50.195% 2.431%, 50.293% 2.778%, 50.293% 3.125%, 50.391% 3.472%, 50.391% 3.819%, 50.391% 4.167%, 50.342% 4.514%, 50.391% 4.861%, 50.342% 5.208%, 50.439% 5.556%, 50.439% 5.903%, 50.439% 6.250%, 50.000% 6.597%, 50.391% 6.944%, 50.439% 7.292%, 50.000% 7.639%, 50.342% 7.986%, 50.293% 8.333%, 50.391% 8.681%, 50.391% 9.028%, 50.342% 9.375%, 50.342% 9.722%, 50.391% 10.069%, 50.391% 10.417%, 50.342% 10.764%, 50.488% 11.111%, 50.391% 11.458%, 50.000% 11.806%, 50.439% 12.153%, 50.439% 12.500%, 50.293% 12.847%, 50.439% 13.194%, 50.586% 13.542%, 50.635% 13.889%, 50.684% 14.236%, 50.684% 14.583%, 50.732% 14.931%, 50.732% 15.278%, 50.732% 15.625%, 50.732% 15.972%, 50.830% 16.319%, 50.830% 16.667%, 50.879% 17.014%, 50.830% 17.361%, 50.830% 17.708%, 50.977% 18.056%, 50.830% 18.403%, 50.879% 18.750%, 50.879% 19.097%, 50.879% 19.444%, 50.879% 19.792%, 50.879% 20.139%, 50.781% 20.486%, 50.684% 20.833%, 50.684% 21.181%, 50.635% 21.528%, 50.488% 21.875%, 50.488% 22.222%, 50.391% 22.569%, 50.391% 22.917%, 50.293% 23.264%, 50.439% 23.611%, 50.439% 23.958%, 50.439% 24.306%, 50.439% 24.653%, 50.488% 25.000%, 50.537% 25.347%, 50.586% 25.694%, 50.635% 26.042%, 50.635% 26.389%, 50.635% 26.736%, 50.830% 27.083%, 50.830% 27.431%, 50.781% 27.778%, 50.000% 28.125%, 50.732% 28.472%, 50.635% 28.819%, 50.488% 29.167%, 50.586% 29.514%, 50.537% 29.861%, 50.488% 30.208%, 50.488% 30.556%, 50.488% 30.903%, 50.439% 31.250%, 50.293% 31.597%, 50.391% 31.944%, 50.391% 32.292%, 50.391% 32.639%, 50.195% 32.986%, 50.537% 33.333%, 50.342% 33.681%, 50.342% 34.028%, 50.391% 34.375%, 50.391% 34.722%, 50.342% 35.069%, 50.439% 35.417%, 50.586% 35.764%, 50.488% 36.111%, 50.488% 36.458%, 50.488% 36.806%, 50.635% 37.153%, 50.488% 37.500%, 50.537% 37.847%, 50.586% 38.194%, 50.879% 38.542%, 50.537% 38.889%, 50.537% 39.236%, 50.537% 39.583%, 50.488% 39.931%, 50.537% 40.278%, 50.781% 40.625%, 50.830% 40.972%, 50.635% 41.319%, 50.635% 41.667%, 50.586% 42.014%, 50.537% 42.361%, 50.537% 42.708%, 50.537% 43.056%, 50.586% 43.403%, 50.537% 43.750%, 50.439% 44.097%, 50.439% 44.444%, 50.342% 44.792%, 50.342% 45.139%, 50.098% 45.486%, 50.293% 45.833%, 50.244% 46.181%, 50.195% 46.528%, 49.854% 46.875%, 50.049% 47.222%, 50.098% 47.569%, 50.049% 47.917%, 50.000% 48.264%, 49.951% 48.611%, 49.854% 48.958%, 49.805% 49.306%, 49.756% 49.653%, 49.561% 50.000%, 49.512% 50.347%, 49.316% 50.694%, 49.219% 51.042%, 49.219% 51.389%, 49.365% 51.736%, 49.219% 52.083%, 49.219% 52.431%, 49.219% 52.778%, 49.170% 53.125%, 49.268% 53.472%, 49.316% 53.819%, 49.365% 54.167%, 49.561% 54.514%, 49.561% 54.861%, 49.609% 55.208%, 49.658% 55.556%, 49.707% 55.903%, 49.756% 56.250%, 49.951% 56.597%, 49.658% 56.944%, 49.805% 57.292%, 49.854% 57.639%, 50.000% 57.986%, 49.854% 58.333%, 49.854% 58.681%, 49.805% 59.028%, 49.707% 59.375%, 49.609% 59.722%, 49.658% 60.069%, 49.658% 60.417%, 49.707% 60.764%, 49.658% 61.111%, 49.463% 61.458%, 49.512% 61.806%, 49.561% 62.153%, 49.609% 62.500%, 49.463% 62.847%, 49.316% 63.194%, 49.463% 63.542%, 49.463% 63.889%, 49.463% 64.236%, 49.365% 64.583%, 49.316% 64.931%, 49.316% 65.278%, 49.316% 65.625%, 49.316% 65.972%, 49.121% 66.319%, 49.268% 66.667%, 49.268% 67.014%, 49.268% 67.361%, 49.316% 67.708%, 49.316% 68.056%, 49.316% 68.403%, 49.316% 68.750%, 49.414% 69.097%, 49.414% 69.444%, 49.316% 69.792%, 49.463% 70.139%, 49.365% 70.486%, 49.463% 70.833%, 49.512% 71.181%, 49.512% 71.528%, 49.414% 71.875%, 49.561% 72.222%, 49.561% 72.569%, 49.561% 72.917%, 49.561% 73.264%, 49.561% 73.611%, 49.512% 73.958%, 49.512% 74.306%, 49.463% 74.653%, 49.414% 75.000%, 49.365% 75.347%, 49.219% 75.694%, 49.316% 76.042%, 49.316% 76.389%, 49.268% 76.736%, 49.268% 77.083%, 49.316% 77.431%, 49.365% 77.778%, 49.463% 78.125%, 49.512% 78.472%, 49.609% 78.819%, 49.609% 79.167%, 49.756% 79.514%, 49.805% 79.861%, 49.756% 80.208%, 49.756% 80.556%, 49.805% 80.903%, 49.805% 81.250%, 49.805% 81.597%, 49.805% 81.944%, 49.805% 82.292%, 49.805% 82.639%, 49.805% 82.986%, 49.756% 83.333%, 49.756% 83.681%, 49.707% 84.028%, 49.561% 84.375%, 49.658% 84.722%, 49.658% 85.069%, 49.658% 85.417%, 49.609% 85.764%, 49.512% 86.111%, 49.512% 86.458%, 49.414% 86.806%, 49.414% 87.153%, 49.414% 87.500%, 49.316% 87.847%, 49.316% 88.194%, 49.365% 88.542%, 49.316% 88.889%, 49.170% 89.236%, 49.268% 89.583%, 49.268% 89.931%, 49.268% 90.278%, 49.268% 90.625%, 49.268% 90.972%, 49.268% 91.319%, 49.268% 91.667%, 49.316% 92.014%, 50.000% 92.361%, 49.365% 92.708%, 49.414% 93.056%, 49.414% 93.403%, 49.414% 93.750%, 49.316% 94.097%, 49.365% 94.444%, 49.268% 94.792%, 49.316% 95.139%, 49.316% 95.486%, 49.268% 95.833%, 49.316% 96.181%, 49.268% 96.528%, 49.268% 96.875%, 49.219% 97.222%, 49.170% 97.569%, 49.121% 97.917%, 49.072% 98.264%, 49.023% 98.611%, 49.023% 98.958%, 49.072% 99.306%, 49.170% 99.653%, 49.023% 100%, 100% 100%)`;

const AboutHero = () => {
  // Video Playlist: Play hero-bg-video.mp4 -> hero-bg-video-alt.mp4 -> loop back
  const videoList = [heroBgVideo, heroBgVideoAlt];
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Portrait Image Slideshow: Swap hero-portrait.png & hero-portrait-alt.png every 4 seconds
  const portraitList = [heroPortrait, heroPortraitAlt];
  const [portraitIndex, setPortraitIndex] = useState(0);

  // Handle Video Playlist Rotation when current video ends
  const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoIndex]);

  // Handle Portrait Image Slideshow timer (cycles every 4000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setPortraitIndex((prevIndex) => (prevIndex + 1) % portraitList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentPortrait = portraitList[portraitIndex];

  return (
    <section className="about-hero-serotoninn-wrapper">
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

      {/* 2. Editorial Text & Base Center Portrait Poster inside original 1500px Grid Container */}
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
            className={`portrait-img ${portraitIndex === 1 ? "alt-portrait" : "main-portrait"} fade-in`}
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

      {/* 3. Single Right-Side Grayscale Backdrop Overlay (Masked with re-drawn vertical-torn-mask-right.png for 0 color bleed) */}
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
    </section>
  );
};

export default AboutHero;
