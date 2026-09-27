import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './styles/scroll-effects.css';

const MainLayout = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <div className="app-container">
      {/* Ẩn Header trên trang /contact theo yêu cầu */}
      {!isContactPage && <Header />}
      
      <main className="app-main-content">
        <AppRoutes />
      </main>
    </div>
  );
};

function App() {
  useSmoothScroll();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
