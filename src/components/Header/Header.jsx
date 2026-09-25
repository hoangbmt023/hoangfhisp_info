import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { getLenis } from "../../hooks/useSmoothScroll";
import MobileDock from "./MobileDock";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = window.innerHeight;
          const heroThreshold = heroHeight - 80;

          setIsScrolled(scrollY > 40);
          setIsPastHero(scrollY >= heroThreshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Track active section accurately using getBoundingClientRect
  useEffect(() => {
    const handleSectionScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.45;

      // When in Hero section (at top of page)
      if (scrollY < heroThreshold) {
        setActiveNav("#home");
        return;
      }

      // If scrolled to bottom of page, highlight contact
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveNav("#contact");
        return;
      }

      // Exact section bounding check
      const sectionIds = ["about", "skills", "experience", "projects", "contact"];
      const triggerLine = window.innerHeight * 0.4;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine && rect.bottom > triggerLine) {
            setActiveNav(`#${id}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleSectionScroll, { passive: true });
    handleSectionScroll();
    return () => window.removeEventListener("scroll", handleSectionScroll);
  }, []);

  // Handle exact pixel smooth navigation via Lenis
  const handleNavClick = useCallback((e, href) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setActiveNav(href);

    const lenis = getLenis();

    if (href === "#home" || href === "#") {
      if (lenis) {
        lenis.scrollTo(0, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const topPos = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }
  }, []);

  // Left Nav Items
  const leftNavItems = [
    { label: "GIỚI THIỆU", href: "#about" },
    { label: "KỸ NĂNG", href: "#skills" },
    { label: "KINH NGHIỆM", href: "#experience" },
  ];

  // Right Nav Items
  const rightNavItems = [
    { label: "DỰ ÁN", href: "#projects" },
    { label: "LIÊN HỆ", href: "#contact" },
  ];

  // Mobile Dock Navigation Items
  const mobileDockItems = [
    {
      id: "about",
      href: "#about",
      title: "Giới thiệu",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      id: "skills",
      href: "#skills",
      title: "Kỹ năng",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      id: "experience",
      href: "#experience",
      title: "Kinh nghiệm",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      id: "projects",
      href: "#projects",
      title: "Dự án",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      id: "contact",
      href: "#contact",
      title: "Liên hệ",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`site-header ${isScrolled ? "scrolled" : ""} ${
          isPastHero ? "past-hero" : "on-hero"
        }`}
      >
        <div className="header-container">
          {/* Left Navigation (Desktop) */}
          <nav className="nav-group nav-left">
            <ul className="nav-list">
              {leftNavItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${
                      activeNav === item.href ? "active" : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Centered Prominent Logo */}
          <div className="brand-logo">
            <a
              href="#home"
              className={`logo-link ${activeNav === "#home" ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "#home")}
            >
              HOANGF HISP
            </a>
          </div>

          {/* Right Navigation (Desktop) */}
          <nav className="nav-group nav-right">
            <ul className="nav-list">
              {rightNavItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${
                      activeNav === item.href ? "active" : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="theme-toggle-wrapper">
              {/* Desktop Theme Toggle */}
              <button
                className="desktop-theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile iOS Floating Bottom Dock */}
      <MobileDock
        items={mobileDockItems}
        activeNav={activeNav}
        onNavClick={(e, href) => handleNavClick(e, href)}
      />
    </>
  );
};

export default Header;
