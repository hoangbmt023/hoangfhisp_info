import React from 'react';
import HomeHero from '../../components/HomeHero/HomeHero';
import About from '../About/About';
import Skills from '../Skills/Skills';
import Experience from '../Experience/Experience';
import Projects from '../Projects/Projects';
import Contact from '../Contact/Contact';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-container">
      {/* 100vh Full Viewport Home Hero Section (Pinned/Sticky) */}
      <section id="home" className="home-hero-pinned-layer">
        <HomeHero />
      </section>

      {/* Narrative content layer that slides up and overlaps the hero */}
      <div className="home-content-sliding-layer">
        <About />
        <Skills />
        <Experience />
        <Projects />
      </div>

      {/* Pinned Contact section & Curtain-reveal Footer container */}
      <div className="home-footer-reveal-container">
        <div className="contact-pinned-layer">
          <Contact />
        </div>
        <div className="footer-reveal-spacer" />
        <div className="footer-sliding-layer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
