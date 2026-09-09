import React from 'react';
import './StoryQuote.css';

const StoryQuote = ({ quote, author, role }) => {
  return (
    <div className="story-quote-card">
      <div className="quote-icon-mark">“</div>
      <blockquote className="quote-text">{quote}</blockquote>
      <div className="quote-meta">
        <span className="quote-author">{author}</span>
        {role && <span className="quote-role">— {role}</span>}
      </div>
    </div>
  );
};

export default StoryQuote;
