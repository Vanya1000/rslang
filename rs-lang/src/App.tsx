import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeDark, themeLight } from './theme/createTheme';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseline />
      <Header/>
      <Main/>
      <Routes>
        <Route path='/game' />
        <Route path='/audio-challenge' />
        <Route path='/sprint' />
        <Route path='*' element={<Footer />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
