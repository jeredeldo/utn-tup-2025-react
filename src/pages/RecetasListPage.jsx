import { Box, Container, Typography } from '@mui/material';
import { RestaurantMenu } from '@mui/icons-material';
import RecetasList from '../components/recetas/RecetasList';
import { useEffect } from 'react';
import { useRecetas } from '../contexts/RecetasContext';

export default function RecetasListPage() {
  const { darkMode } = useRecetas();

  useEffect(() => {
    document.title = 'Recetas | Recetas Deliciosas';
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            mb: 6,
            textAlign: 'center',
            animation: 'slideInDown 0.6s ease-out',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              mb: 3,
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
              animation: 'pulse 2s infinite',
            }}
          >
            <RestaurantMenu sx={{ fontSize: 60, color: 'white' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fadeIn 0.8s ease-in-out',
            }}
          >
            Nuestras Recetas
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              animation: 'fadeIn 1s ease-in-out',
              fontWeight: 300,
            }}
          >
            Descubre deliciosas recetas caseras, fáciles de preparar. Desde platos clásicos hasta innovaciones culinarias
          </Typography>
        </Box>
      </Container>
      <RecetasList />
    </Box>
  );
}