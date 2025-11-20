import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import RecetasListPage from './pages/RecetasListPage';
import RecetaDetallePage from './pages/RecetaDetallePage';
import HomePage from './pages/HomePage';
import FavoritosPage from './pages/FavoritosPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/layout/Footer';
import { RecetasProvider, useRecetas } from './contexts/RecetasContext';
import { useAuth } from './contexts/AuthContext';
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
        default: darkMode ? '#0a0e27' : '#fafafa',
        paper: darkMode ? '#1a1f3a' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#e8eaf6' : '#1a1a1a',
        secondary: darkMode ? '#b0bec5' : '#666666',
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
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1a1f3a' : undefined,
            boxShadow: darkMode ? '0px 2px 8px rgba(0, 0, 0, 0.5)' : undefined,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1a1f3a' : undefined,
            boxShadow: darkMode ? '0px 2px 8px rgba(0, 0, 0, 0.3)' : undefined,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: darkMode ? '#141829' : undefined,
              '& fieldset': {
                borderColor: darkMode ? '#2c3e50' : undefined,
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#2196F3' : undefined,
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#2196F3' : undefined,
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            backgroundColor: darkMode ? '#141829' : undefined,
            borderColor: darkMode ? '#2196F3' : undefined,
            color: darkMode ? '#2196F3' : undefined,
            '&:hover': {
              backgroundColor: darkMode ? '#1a1f3a' : undefined,
              borderColor: darkMode ? '#1a7fd5' : undefined,
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? '#1a1f3a' : undefined,
            boxShadow: darkMode ? '0px 4px 12px rgba(0, 0, 0, 0.5)' : undefined,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#2c3e50' : undefined,
            color: darkMode ? '#e8eaf6' : undefined,
          },
        },
      },
    },
  });
};

// Componente interno que usa el contexto
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Dashboard protegido */}
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} 
      />
      
      {/* Rutas públicas */}
      <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
      <Route 
        path="/recetas" 
        element={isAuthenticated ? <RecetasListPage /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/recetas/:id" 
        element={isAuthenticated ? <RecetaDetallePage /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/favoritos" 
        element={isAuthenticated ? <FavoritosPage /> : <Navigate to="/login" replace />} 
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Componente wrapper del app
function AppContent() {
  const { darkMode } = useRecetas();
  const { isAuthenticated } = useAuth();
  const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {isAuthenticated && <Navbar />}
          <Box sx={{ flex: 1 }}>
            <AppRoutes />
          </Box>
          {isAuthenticated && <Footer />}
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