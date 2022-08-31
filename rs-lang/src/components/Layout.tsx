import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { themeDark, themeLight } from '../theme/createTheme';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useAppSelector } from '../hooks/hooks';

const Layout = () => {
  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);
  return (
    <>
    <ThemeProvider theme={isLightTheme ? themeDark : themeLight}>
    <CssBaseline />
      <Header />
      <div style={{ minHeight: 'calc(100vh - 125px)' }}>
        <Outlet />
      </div>
      <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
