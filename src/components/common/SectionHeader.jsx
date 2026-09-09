import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ chapter, title, subtitle, centered = false }) => {
  return (
    <div className={`section-header-block ${centered ? 'centered' : ''}`}>
      {chapter && <span className="chapter-tag font-mono">{chapter}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-title-line"></div>
    </div>
  );
};

export default SectionHeader;
