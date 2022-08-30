import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeDark, themeLight } from './theme/createTheme';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

function App() {

  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseline />
      <Header/>
      <Main/>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
