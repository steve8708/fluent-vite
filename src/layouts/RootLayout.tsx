import React from 'react';
import { ThemeProvider } from '../theme/ThemeProvider';
import { Outlet } from 'react-router-dom';
import '../styles/globals.css';

export const RootLayout: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app-root">
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default RootLayout; 