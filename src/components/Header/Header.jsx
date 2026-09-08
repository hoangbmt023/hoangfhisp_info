import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("#about");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNavItems = [
    { label: "GIỚI THIỆU", href: "#about" },
    { label: "DỰ ÁN", href: "#projects" },
    { label: "KỸ NĂNG", href: "#skills" },
  ];

  const rightNavItems = [
    { label: "KINH NGHIỆM", href: "#experience" },
    { label: "LIÊN HỆ", href: "#contact" },
  ];

  // 4 Icon Items for Mobile Dock Navigation (Only Icons, No Text Labels)
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
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Left Navigation (Desktop) */}
          <nav className="nav-group nav-left">
            <ul className="nav-list">
              {leftNavItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${activeNav === item.href ? "active" : ""}`}
                    onClick={() => setActiveNav(item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Centered Prominent Logo */}
          <div className="brand-logo">
            <a href="#" className="logo-link">
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
                    className={`nav-link ${activeNav === item.href ? "active" : ""}`}
                    onClick={() => setActiveNav(item.href)}
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

      {/* Mobile iOS Floating Bottom Dock (4 Nav Icons + 1 Integrated Theme Toggle) */}
      <nav className="mobile-ios-bottom-dock">
        <div className="ios-dock-glass">
          {mobileDockItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              title={item.title}
              aria-label={item.title}
              className={`ios-dock-item ${activeNav === item.href ? "active" : ""}`}
              onClick={() => setActiveNav(item.href)}
            >
              <span className="dock-icon">{item.icon}</span>
            </a>
          ))}

          {/* Integrated 5th Action: Theme Toggle Button */}
          <button
            className="ios-dock-item theme-dock-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-label="Toggle Light Dark Mode"
          >
            <span className="dock-icon">
              {theme === "light" ? (
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
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
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
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
