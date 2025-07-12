import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c', // Deep Green
      contrastText: '#fff',
    },
    secondary: {
      main: '#bfa14a', // Muted Gold
    },
    background: {
      default: '#f5f5f5', // Soft Gray
      paper: '#fff',
    },
    text: {
      primary: '#222', // Dark Gray
      secondary: '#666', // Medium Gray
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 400,
    },
  },
});

export default theme; 