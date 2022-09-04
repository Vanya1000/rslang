import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { themeDark, themeLight } from '../theme/createTheme';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useAppSelector } from '../hooks/hooks';
import AlertSnackbar from './Common/AlertSnackbar';

const Layout = () => {
  const isLightTheme = useAppSelector(state => state.settings.isLightTheme);
  const somethingWrong = useAppSelector(state => state.user.somethingWrong);
  const location = useLocation();
  const isGamePath = location.pathname.substring(0,5) !== '/game';
  return (
    <>
    <ThemeProvider theme={isLightTheme ? themeLight : themeDark}>
    <CssBaseline />
      <Header />
      <div style={{ minHeight: 'calc(100vh - 125px)' }}>
        <Outlet />
      </div>
      <AlertSnackbar msg={somethingWrong} />
      {isGamePath && <Footer />}
      </ThemeProvider>
    </>
  );
};

export default Layout;
