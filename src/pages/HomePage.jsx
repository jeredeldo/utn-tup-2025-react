import { Box, Container, Typography, Button, Stack, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Restaurant, LocalDining, Kitchen } from '@mui/icons-material';
import { useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Inicio | Recetas Deliciosas';
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 12 },
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <Container maxWidth="md">
          <Restaurant sx={{ fontSize: { xs: 48, md: 80 }, mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Recetas Deliciosas
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
            Descubre nuestras mejores recetas de cocina, desde platos clásicos hasta creaciones modernas. ¡Inspírate y comienza a cocinar hoy!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/recetas')}
            sx={{
              backgroundColor: 'white',
              color: '#667eea',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              transition: 'all 0.3s ease-in-out',
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          >
            Ver Todas las Recetas
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold',
            animation: 'slideIn 0.7s ease-in-out',
            '@keyframes slideIn': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          ¿Por qué elegir nuestras recetas?
        </Typography>

        <Grid 
          container 
          spacing={4}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={10} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                },
                animation: 'slideIn 0.7s ease-in-out',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalDining sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Fáciles de Preparar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nuestras recetas incluyen instrucciones detalladas paso a paso, perfectas para cualquier nivel de habilidad.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={10} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                },
                animation: 'slideIn 0.9s ease-in-out',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Kitchen sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Ingredientes Disponibles
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Usa ingredientes que fácilmente encuentras en tu mercado local. Recetas prácticas y accesibles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={10} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                },
                animation: 'slideIn 1.1s ease-in-out',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Restaurant sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Delicioso Sabor
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Todas nuestras recetas han sido probadas y garantizan resultados deliciosos en tu cocina.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bg: 'background.paper', py: 8, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            ¿Listo para cocinar?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Explora nuestro catálogo completo de recetas, guarda tus favoritas y comparte con tus amigos.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/recetas')}
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            Ver Recetas
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
