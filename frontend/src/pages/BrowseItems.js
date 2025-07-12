import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  InputAdornment,
  Pagination,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterList from '@mui/icons-material/FilterList';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Star from '@mui/icons-material/Star';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import LoginPromptModal from '../components/LoginPromptModal';
import { useRole, ROLE_GUEST } from '../contexts/RoleContext';

const BrowseItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const [tabValue, setTabValue] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { role } = useRole();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  // Mock items data
  const items = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      category: 'Outerwear',
      condition: 'Excellent',
      size: 'M',
      points: 150,
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=300&fit=crop',
      uploader: 'Sarah M.',
      rating: 4.5,
      description: 'Classic vintage denim jacket in great condition',
    },
    {
      id: 2,
      title: 'Summer Dress',
      category: 'Dresses',
      condition: 'Good',
      size: 'S',
      points: 100,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
      uploader: 'Mike R.',
      rating: 4.0,
      description: 'Beautiful summer dress perfect for warm days',
    },
    {
      id: 3,
      title: 'Casual Sneakers',
      category: 'Footwear',
      condition: 'Like New',
      size: '42',
      points: 200,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      uploader: 'Emma L.',
      rating: 4.8,
      description: 'Comfortable casual sneakers barely worn',
    },
    {
      id: 4,
      title: 'Formal Shirt',
      category: 'Tops',
      condition: 'Excellent',
      size: 'L',
      points: 80,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      uploader: 'David K.',
      rating: 4.2,
      description: 'Professional formal shirt for office wear',
    },
    {
      id: 5,
      title: 'Winter Coat',
      category: 'Outerwear',
      condition: 'Good',
      size: 'XL',
      points: 180,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      uploader: 'Lisa P.',
      rating: 4.6,
      description: 'Warm winter coat perfect for cold weather',
    },
    {
      id: 6,
      title: 'Jeans',
      category: 'Bottoms',
      condition: 'Excellent',
      size: '32',
      points: 120,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
      uploader: 'Tom W.',
      rating: 4.3,
      description: 'Classic blue jeans in excellent condition',
    },
    {
      id: 7,
      title: 'Leather Handbag',
      category: 'Accessories',
      condition: 'Like New',
      size: 'One Size',
      points: 250,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      uploader: 'Anna S.',
      rating: 4.9,
      description: 'Premium leather handbag in perfect condition',
    },
    {
      id: 8,
      title: 'T-Shirt',
      category: 'Tops',
      condition: 'Good',
      size: 'M',
      points: 50,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      uploader: 'John D.',
      rating: 3.8,
      description: 'Comfortable cotton t-shirt',
    },
    {
      id: 9,
      title: 'Running Shoes',
      category: 'Footwear',
      condition: 'Excellent',
      size: '41',
      points: 160,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      uploader: 'Maria L.',
      rating: 4.7,
      description: 'High-quality running shoes for athletes',
    },
  ];

  const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses', 'Footwear', 'Accessories'];
  const conditions = ['All', 'Like New', 'Excellent', 'Good', 'Fair'];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rewear-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('rewear-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const handleFavorite = (itemId) => {
    if (role === ROLE_GUEST) {
      setLoginPromptOpen(true);
      return;
    }
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
      setSnackbarMessage('Removed from favorites');
    } else {
      newFavorites.add(itemId);
      setSnackbarMessage('Added to favorites');
    }
    setFavorites(newFavorites);
    setShowSnackbar(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when switching tabs
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = items;

    // If on favorites tab, only show favorited items
    if (tabValue === 1) {
      filteredItems = items.filter(item => favorites.has(item.id));
    }

    // Apply search and filter criteria
    filteredItems = filteredItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
                           item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === '' || item.category === category;
      const matchesCondition = condition === '' || item.condition === condition;
      const matchesPrice = item.points >= priceRange[0] && item.points <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    });

    // Apply sorting
    const sortedItems = [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id - a.id; // Assuming higher ID means newer
        case 'oldest':
          return a.id - b.id;
        case 'points-low':
          return a.points - b.points;
        case 'points-high':
          return b.points - a.points;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sortedItems;
  };

  const filteredItems = getFilteredAndSortedItems();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page when sorting changes
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Browse Items
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing clothing from our community
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              {/* Search */}
              <TextField
                fullWidth
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* Category Filter */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat === 'All' ? '' : cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Condition Filter */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Condition</InputLabel>
                <Select
                  value={condition}
                  label="Condition"
                  onChange={(e) => setCondition(e.target.value)}
                >
                  {conditions.map((cond) => (
                    <MenuItem key={cond} value={cond === 'All' ? '' : cond}>
                      {cond}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Price Range */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Points Range
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(event, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">{priceRange[0]} pts</Typography>
                  <Typography variant="body2">{priceRange[1]} pts</Typography>
                </Box>
              </Box>

              {/* Clear Filters */}
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setSearchTerm('');
                  setCategory('');
                  setCondition('');
                  setPriceRange([0, 500]);
                  setSortBy('newest');
                  setPage(1);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Items Grid */}
        <Grid item xs={12} md={9}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={`All Items (${items.length})`} />
              <Tab label={`Favorites (${favorites.size})`} />
            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              {filteredItems.length} items found
              {tabValue === 1 && favorites.size > 0 && (
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({favorites.size} favorited)
                </Typography>
              )}
            </Typography>
            <FormControl size="small">
              <InputLabel>Sort by</InputLabel>
              <Select value={sortBy} onChange={handleSortChange} label="Sort by">
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="points-low">Points: Low to High</MenuItem>
                <MenuItem value="points-high">Points: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {filteredItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {tabValue === 1 ? 'No favorite items found' : 'No items match your filters'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 1 
                  ? 'Start browsing items and add them to your favorites!'
                  : 'Try adjusting your search criteria or filters.'
                }
              </Typography>
              {tabValue === 1 && (
                <Button
                  variant="contained"
                  onClick={() => setTabValue(0)}
                  sx={{ mt: 2 }}
                >
                  Browse All Items
                </Button>
              )}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {paginatedItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Button
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          minWidth: 'auto',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                          },
                        }}
                        onClick={() => handleFavorite(item.id)}
                      >
                        {favorites.has(item.id) ? (
                          <Favorite sx={{ color: 'error.main' }} />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </Button>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {item.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip label={item.category} size="small" color="primary" />
                        <Chip label={item.condition} size="small" variant="outlined" />
                        <Chip label={`Size ${item.size}`} size="small" variant="outlined" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {item.description}
                      </Typography>
                      
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
                      <Button
                        size="small"
                        startIcon={<SwapHoriz />}
                        variant="outlined"
                      >
                        Swap Request
                      </Button>
                      <Button
                        size="small"
                        startIcon={<ShoppingCart />}
                        variant="contained"
                      >
                        Redeem
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Snackbar for favorite notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <LoginPromptModal open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)} />
    </Container>
  );
};

export default BrowseItems; 