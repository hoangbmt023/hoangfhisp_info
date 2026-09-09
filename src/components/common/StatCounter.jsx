import React from 'react';
import './StatCounter.css';

const StatCounter = ({ stats }) => {
  return (
    <div className="stat-counter-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-card">
          <span className="stat-number">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatCounter;
