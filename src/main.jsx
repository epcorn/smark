import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material' // 1. Added CssBaseline
import ScrollToTop from './components/ScrollToTop.jsx'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#90caf9 #121212',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#3DCED4',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#81D959',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#42a5f5',
            },
          },
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* 2. Included here */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)