import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { themeDark, themeLight } from '../theme/createTheme';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useAppSelector } from '../hooks/hooks';

const Layout = () => {
  const isLightTheme = true
  const location = useLocation();
  const isGamePath = location.pathname.substring(0,5) !== '/game';
  return (
    <>
    <ThemeProvider theme={isLightTheme ? themeDark : themeLight}>
    <CssBaseline />
      <Header />
      <div style={{ minHeight: 'calc(100vh - 125px)' }}>
        <Outlet />
      </div>
      {isGamePath && <Footer />}
      </ThemeProvider>
    </>
  );
};

export default Layout;
