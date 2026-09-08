import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        
        {/* Sample Hero Section for Portfolio Preview */}
        <main className="hero-placeholder">
          <div className="hero-badge">PERSONAL PORTFOLIO</div>
          <h1 className="hero-title">HOANG SP</h1>
          <p className="hero-subtitle">
            Developer & Creative Designer crafting modern digital experiences.
          </p>
        </main>

        {/* Torn Paper Edge Modern Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
