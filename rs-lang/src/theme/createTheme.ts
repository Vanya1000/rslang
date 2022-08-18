import { createTheme } from '@mui/material';

export const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(0,0,0,0.8)',
    },
    background: {
      default: '#f5f5f7',
    },
    success: {
      main: 'rgb(0,0,0,0.8)',
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
});
