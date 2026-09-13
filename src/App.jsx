import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './styles/scroll-effects.css';

function App() {
  useSmoothScroll();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          
          <main className="app-main-content">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
