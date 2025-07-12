import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tab,
  Tabs,
  Badge,
  LinearProgress,
  IconButton,
} from '@mui/material';
import Person from '@mui/icons-material/Person';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Pending from '@mui/icons-material/Pending';
import Star from '@mui/icons-material/Star';
import Add from '@mui/icons-material/Add';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  // Mock user data
  const user = {
    name: 'Palak Patel',
    email: 'palakbheda@gmail.com',
    points: 1250,
    level: 'Gold Member',
    avatar: '', // No photo provided
  };

  // Mock uploaded items
  const uploadedItems = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=200&fit=crop',
      status: 'Active',
      views: 45,
      requests: 3,
    },
    {
      id: 2,
      title: 'Summer Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop',
      status: 'Pending',
      views: 23,
      requests: 1,
    },
    {
      id: 3,
      title: 'Formal Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
      status: 'Completed',
      views: 67,
      requests: 5,
    },
  ];

  // Mock swaps data
  const ongoingSwaps = [
    {
      id: 1,
      myItem: 'Vintage Denim Jacket',
      theirItem: 'Casual Sneakers',
      status: 'Pending Response',
      date: '2024-01-15',
    },
    {
      id: 2,
      myItem: 'Summer Dress',
      theirItem: 'Formal Shirt',
      status: 'Accepted',
      date: '2024-01-12',
    },
  ];

  const completedSwaps = [
    {
      id: 1,
      myItem: 'Formal Shirt',
      theirItem: 'Vintage Denim Jacket',
      date: '2024-01-10',
      rating: 5,
    },
    {
      id: 2,
      myItem: 'Casual Sneakers',
      theirItem: 'Summer Dress',
      date: '2024-01-05',
      rating: 4,
    },
  ];

  // Mock favorite items
  const favoriteItems = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      category: 'Outerwear',
      condition: 'Excellent',
      points: 150,
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=200&fit=crop',
      uploader: 'Sarah M.',
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Casual Sneakers',
      category: 'Footwear',
      condition: 'Like New',
      points: 200,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
      uploader: 'Emma L.',
      rating: 4.8,
    },
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rewear-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRemoveFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(itemId);
    setFavorites(newFavorites);
    localStorage.setItem('rewear-favorites', JSON.stringify([...newFavorites]));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user.name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your sustainable fashion journey
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar
                src={user.avatar || undefined}
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: !user.avatar ? 'primary.main' : undefined, fontSize: 40 }}
              >
                {!user.avatar && `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Chip
                label={user.level}
                color="primary"
                sx={{ mb: 2 }}
              />
              
              {/* Points Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {user.points}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Points Balance
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{ mt: 1, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  70% to next level
                </Typography>
              </Box>

              <Button
                variant="contained"
                component={Link}
                to="/add-item"
                startIcon={<Add />}
                sx={{ mt: 3 }}
                fullWidth
              >
                Add New Item
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="My Items" />
                <Tab label="Favorites" />
                <Tab label="Ongoing Swaps" />
                <Tab label="Completed Swaps" />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Grid container spacing={2}>
                  {uploadedItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card variant="outlined">
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.title}
                          sx={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {item.title}
                          </Typography>
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {item.views} views
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.requests} requests
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {tabValue === 1 && (
                <Grid container spacing={2}>
                  {favoriteItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card variant="outlined">
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                            }}
                          />
                          <IconButton
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,1)',
                              },
                            }}
                            onClick={() => handleRemoveFavorite(item.id)}
                          >
                            <Favorite sx={{ color: 'error.main' }} />
                          </IconButton>
                        </Box>
                        <CardContent>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {item.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip label={item.category} size="small" color="primary" />
                            <Chip label={item.condition} size="small" variant="outlined" />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Star sx={{ color: 'warning.main', fontSize: 16 }} />
                            <Typography variant="body2" color="text.secondary">
                              {item.rating} ({item.uploader})
                            </Typography>
                          </Box>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            {item.points} points
                          </Typography>
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
                    </Grid>
                  ))}
                  {favoriteItems.length === 0 && (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No favorite items yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Start browsing items and add them to your favorites!
                        </Typography>
                        <Button
                          variant="contained"
                          component={Link}
                          to="/browse"
                        >
                          Browse Items
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}

              {tabValue === 2 && (
                <List>
                  {ongoingSwaps.map((swap, index) => (
                    <React.Fragment key={swap.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <SwapHoriz />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1">
                                {swap.myItem} ↔ {swap.theirItem}
                              </Typography>
                              <Chip
                                label={swap.status}
                                color={swap.status === 'Accepted' ? 'success' : 'warning'}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Requested on {swap.date}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < ongoingSwaps.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}

              {tabValue === 3 && (
                <List>
                  {completedSwaps.map((swap, index) => (
                    <React.Fragment key={swap.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'success.main' }}>
                            <CheckCircle />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1">
                                {swap.myItem} ↔ {swap.theirItem}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {[...Array(swap.rating)].map((_, i) => (
                                  <Star key={i} sx={{ color: 'warning.main', fontSize: 16 }} />
                                ))}
                              </Box>
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Completed on {swap.date}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < completedSwaps.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ShoppingBag sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {uploadedItems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Items Listed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Favorite sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {favoriteItems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Favorite Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {completedSwaps.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Swaps
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 