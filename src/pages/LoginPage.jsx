import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import { Lock as LockIcon, Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const fillDemo = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Accede a tu dashboard de recetas
            </Typography>
          </Box>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                fullWidth
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
              </Button>
            </Stack>
          </form>

          {/* Demo credentials */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mb: 2 }}>
              Credenciales de prueba:
            </Typography>
            <Stack spacing={1}>
              <Card
                onClick={() => fillDemo('admin', 'admin123')}
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
              >
                <CardContent>
                  <Typography variant="subtitle2">Admin</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Usuario: admin | Contraseña: admin123
                  </Typography>
                </CardContent>
              </Card>
              <Card
                onClick={() => fillDemo('user', 'user123')}
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
              >
                <CardContent>
                  <Typography variant="subtitle2">Usuario</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Usuario: user | Contraseña: user123
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
