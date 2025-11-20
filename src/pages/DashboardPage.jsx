import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, fetchProtectedData } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Proteger ruta
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Cargar datos protegidos al montar
  useEffect(() => {
    if (isAuthenticated) {
      loadProtectedData();
    }
  }, [isAuthenticated]);

  const loadProtectedData = async () => {
    setLoading(true);
    const result = await fetchProtectedData();
    if (result.success) {
      setProtectedData(result.data);
      setMessage('✅ Datos protegidos cargados correctamente');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DashboardIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Dashboard
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        {/* User Info */}
        <Grid container spacing={3}>
          {/* User Card */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    👤 {user.fullName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: '0.9rem', verticalAlign: 'middle' }} />
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <PersonIcon sx={{ mr: 1, fontSize: '0.9rem', verticalAlign: 'middle' }} />
                    ID: {user.id}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Token Info */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🔑 Token de Autenticación
              </Typography>
              <Alert severity="info">
                Tu sesión está protegida con un Bearer Token almacenado en localStorage.
                Este token se envía automáticamente con cada solicitud a endpoints protegidos.
              </Alert>
            </Paper>
          </Grid>

          {/* Protected Data */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📊 Datos Protegidos
                </Typography>
                <Button
                  size="small"
                  startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                  onClick={loadProtectedData}
                  disabled={loading}
                >
                  Recargar
                </Button>
              </Box>

              {message && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {message}
                </Alert>
              )}

              {protectedData && (
                <Stack spacing={2}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Mensaje
                      </Typography>
                      <Typography variant="body2">
                        {protectedData.message}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Timestamp
                      </Typography>
                      <Typography variant="body2">
                        {new Date(protectedData.timestamp).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              )}
            </Paper>
          </Grid>

          {/* Info */}
          <Grid item xs={12}>
            <Alert severity="success">
              ✅ <strong>Autenticación funcionando correctamente</strong>
              <br />
              • Usuario autenticado: {user.username}
              <br />
              • Token guardado en localStorage
              <br />
              • Ruta protegida accesible
              <br />
              • Datos protegidos cargados desde mock endpoint
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
