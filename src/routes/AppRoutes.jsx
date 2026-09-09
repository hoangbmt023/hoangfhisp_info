import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route serves About Me / Introduce Page */}
      <Route path="/" element={<About />} />
      <Route path="/about" element={<About />} />

      {/* 404 Page Not Found catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
