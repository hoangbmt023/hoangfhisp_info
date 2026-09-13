import React from "react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Component: MobileDock
 * Thanh điều hướng nổi dạng kính mờ (iOS Glassmorphism Floating Dock) dành cho thiết bị di động.
 */
export const MobileDock = ({ items = [], activeNav = "#home", onNavClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="mobile-ios-bottom-dock">
      <div className="ios-dock-glass">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            title={item.title}
            aria-label={item.title}
            className={`ios-dock-item ${activeNav === item.href ? "active" : ""}`}
            onClick={(e) => onNavClick?.(e, item.href)}
          >
            <span className="dock-icon">{item.icon}</span>
          </a>
        ))}

        {/* Nút chuyển đổi Theme (Sáng / Tối) tích hợp trên Dock */}
        <button
          className="ios-dock-item theme-dock-btn"
          onClick={toggleTheme}
          title={`Chuyển sang giao diện ${theme === "light" ? "tối" : "sáng"}`}
          aria-label="Chuyển đổi giao diện sáng tối"
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
  );
};

export default React.memo(MobileDock);
