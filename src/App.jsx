import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import RecetasListPage from './pages/RecetasListPage';
import RecetaDetallePage from './pages/RecetaDetallePage';
import HomePage from './pages/HomePage';
import FavoritosPage from './pages/FavoritosPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/layout/Footer';
import { RecetasProvider, useRecetas } from './contexts/RecetasContext';
import { Box } from '@mui/material';

// Función para crear tema dinámico
const createAppTheme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196F3',
      },
      secondary: {
        main: '#e74c3c',
      },
      success: {
        main: '#27ae60',
      },
      warning: {
        main: '#f39c12',
      },
      error: {
        main: '#e74c3c',
      },
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
  });
};

// Componente interno que usa el contexto
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recetas" element={<RecetasListPage />} />
      <Route path="/recetas/:id" element={<RecetaDetallePage />} />
      <Route path="/favoritos" element={<FavoritosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Componente wrapper del app
function AppContent() {
  const { darkMode } = useRecetas();
  const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <AppRoutes />
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <RecetasProvider>
      <AppContent />
    </RecetasProvider>
  );
}

export default App;