import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import Add from '@mui/icons-material/Add';
import Nature from '@mui/icons-material/Nature';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Star from '@mui/icons-material/Star';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock featured items data
  const featuredItems = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      category: 'Outerwear',
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=300&fit=crop',
      points: 150,
    },
    {
      id: 2,
      title: 'Summer Dress',
      category: 'Dresses',
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
      points: 100,
    },
    {
      id: 3,
      title: 'Casual Sneakers',
      category: 'Footwear',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      points: 200,
    },
    {
      id: 4,
      title: 'Formal Shirt',
      category: 'Tops',
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      points: 80,
    },
  ];

  const stats = [
    { label: 'Items Exchanged', value: '1,234', icon: <ShoppingBag /> },
    { label: 'Active Users', value: '567', icon: <TrendingUp /> },
    { label: 'CO2 Saved (kg)', value: '890', icon: <Nature /> },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Sustainable Fashion
                <br />
                Starts Here
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
                Exchange your unused clothing with the community. 
                Reduce waste, save money, and help the environment.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/browse"
                  startIcon={<ShoppingBag />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                >
                  Start Swapping
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/add-item"
                  startIcon={<Add />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  List an Item
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Sustainable Fashion"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" component="div" color="primary" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Items Section */}
      <Box sx={{ py: 6, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Featured Items
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" paragraph>
            Discover amazing items from our community
          </Typography>
          
          <Box sx={{ mt: 4, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={prevSlide}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                }}
              >
                <ChevronLeft />
              </IconButton>
              
              <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Box
                  sx={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {featuredItems.map((item) => (
                    <Box key={item.id} sx={{ minWidth: '100%', p: 1 }}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={item.title}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {item.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip label={item.category} size="small" color="primary" />
                            <Chip label={item.condition} size="small" variant="outlined" />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Star sx={{ color: 'warning.main', fontSize: 16 }} />
                            <Typography variant="body2" color="text.secondary">
                              {item.points} points
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            component={Link}
                            to={`/item/${item.id}`}
                            sx={{ color: 'primary.main' }}
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>
              
              <IconButton
                onClick={nextSlide}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
            
            {/* Dots indicator */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
              {featuredItems.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentSlide ? 'primary.main' : 'grey.300',
                    cursor: 'pointer',
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  1
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                List Your Item
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload photos and details of clothing you no longer need
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  2
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                Browse & Request
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find items you like and request swaps or redeem with points
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  3
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                Exchange & Enjoy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete the exchange and enjoy your new sustainable fashion
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 