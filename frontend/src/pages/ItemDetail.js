import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Rating,
} from '@mui/material';
import Person from '@mui/icons-material/Person';
import Star from '@mui/icons-material/Star';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Share from '@mui/icons-material/Share';
import LocationOn from '@mui/icons-material/LocationOn';
import CalendarToday from '@mui/icons-material/CalendarToday';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ItemDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock item data
  const item = {
    id: id,
    title: 'Vintage Denim Jacket',
    category: 'Outerwear',
    condition: 'Excellent',
    size: 'M',
    points: 150,
    description: 'This is a classic vintage denim jacket in excellent condition. It features a timeless design with a comfortable fit and high-quality denim material. Perfect for casual outings and layering.',
    uploader: {
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      location: 'New York, NY',
      memberSince: '2023',
    },
    images: [
      {
        original: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=150&fit=crop',
      },
      {
        original: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=150&fit=crop',
      },
      {
        original: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=150&fit=crop',
      },
    ],
    tags: ['Vintage', 'Denim', 'Casual', 'Classic'],
    measurements: {
      chest: '42"',
      length: '28"',
      shoulders: '18"',
    },
    care: 'Machine wash cold, tumble dry low',
    availability: 'Available',
  };

  const handleSwapRequest = () => {
    setShowSwapDialog(true);
  };

  const handleRedeem = () => {
    setShowRedeemDialog(true);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <ImageGallery
                items={item.images}
                showPlayButton={false}
                showFullscreenButton={true}
                showNav={true}
                showThumbnails={true}
                thumbnailPosition="bottom"
                slideInterval={3000}
                slideOnThumbnailOver={true}
                showIndex={true}
                lazyLoad={true}
              />
              <Button
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 1,
                  minWidth: 'auto',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)',
                  },
                }}
                onClick={handleFavorite}
              >
                {isFavorite ? (
                  <Favorite sx={{ color: 'error.main' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Item Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {item.title}
                </Typography>
                <Button startIcon={<Share />} size="small">
                  Share
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={item.category} color="primary" />
                <Chip label={item.condition} variant="outlined" />
                <Chip label={`Size ${item.size}`} variant="outlined" />
              </Box>

              <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                {item.points} points
              </Typography>

              <Typography variant="body1" paragraph>
                {item.description}
              </Typography>

              {/* Tags */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tags:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {item.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>

              {/* Measurements */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Measurements:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Chest: {item.measurements.chest}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Length: {item.measurements.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      Shoulders: {item.measurements.shoulders}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Care Instructions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Care Instructions:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.care}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SwapHoriz />}
                  onClick={handleSwapRequest}
                  fullWidth
                >
                  Swap Request
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleRedeem}
                  fullWidth
                >
                  Redeem via Points
                </Button>
              </Box>

              {/* Availability Status */}
              <Alert
                icon={item.availability === 'Available' ? <CheckCircle /> : <Warning />}
                severity={item.availability === 'Available' ? 'success' : 'warning'}
              >
                {item.availability}
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Uploader Information */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About the Uploader
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={item.uploader.avatar} sx={{ width: 60, height: 60 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">
                    {item.uploader.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={item.uploader.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({item.uploader.rating})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {item.uploader.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Member since {item.uploader.memberSince}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button variant="outlined" component={Link} to={`/user/${item.uploader.name}`}>
                  View Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Swap Request Dialog */}
      <Dialog open={showSwapDialog} onClose={() => setShowSwapDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Swap</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            You're requesting to swap your item for "{item.title}". Please select the item you'd like to offer:
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Your Item</InputLabel>
            <Select label="Select Your Item">
              <MenuItem value="item1">Vintage Denim Jacket</MenuItem>
              <MenuItem value="item2">Summer Dress</MenuItem>
              <MenuItem value="item3">Formal Shirt</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message (Optional)"
            placeholder="Add a personal message to the uploader..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSwapDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setShowSwapDialog(false)}>
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Redeem Dialog */}
      <Dialog open={showRedeemDialog} onClose={() => setShowRedeemDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Redeem Item</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            You're about to redeem "{item.title}" for {item.points} points. Your current balance is 1250 points.
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            After redemption, you'll have 1100 points remaining.
          </Alert>
          <Typography variant="body2" color="text.secondary">
            The uploader will be notified and you can arrange pickup/delivery details.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRedeemDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setShowRedeemDialog(false)}>
            Confirm Redemption
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ItemDetail; 