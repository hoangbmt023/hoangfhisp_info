import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';

function App() {
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
