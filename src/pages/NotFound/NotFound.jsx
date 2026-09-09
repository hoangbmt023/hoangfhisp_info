import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <span className="error-badge font-mono">ERROR 404</span>
        <h1 className="error-code">404</h1>
        <h2 className="error-title">TRANG KHÔNG TỒN TẠI</h2>
        <p className="error-description">
          Đường dẫn bạn đang truy cập không tồn tại hoặc đã được di chuyển sang một hành trình sáng tạo khác.
        </p>
        <Link to="/" className="back-home-btn hover-underline">
          ← VỀ TRANG GIỚI THIỆU
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
