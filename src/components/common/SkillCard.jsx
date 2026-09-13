import React from 'react';
import './SkillCard.css';

const SkillCard = ({ category, icon, skills }) => {
  return (
    <div className="skill-card reveal-stagger-item">
      <div className="skill-card-header">
        {icon && <span className="skill-icon">{icon}</span>}
        <h3 className="skill-category-title">{category}</h3>
      </div>
      <ul className="skill-list">
        {skills.map((item, idx) => (
          <li key={idx} className="skill-item">
            <span className="skill-name">{item.name}</span>
            {item.level && (
              <div className="skill-bar-wrapper">
                <div className="skill-bar-fill" style={{ width: `${item.level}%` }}></div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
