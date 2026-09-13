import React from 'react';
import './TimelineChapter.css';

const TimelineChapter = ({ items }) => {
  return (
    <div className="timeline-chapter-wrapper reveal-stagger-group">
      <div className="timeline-spine"></div>
      {items.map((item, index) => (
        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal-stagger-item`}>
          <div className="timeline-dot">
            <span className="dot-pulse"></span>
          </div>
          <div className="timeline-card">
            <span className="timeline-year">{item.year}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-description">{item.description}</p>
            {item.tags && (
              <div className="timeline-tags">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="timeline-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineChapter;
