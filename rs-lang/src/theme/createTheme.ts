import { createTheme } from '@mui/material';

export const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(0,0,0,0.8)',
    },
    secondary: {
      main: '#a2cf6e',
    },
    background: {
      default: '#f5f5f7',
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#a2cf6e',
    }
  },
  
});
