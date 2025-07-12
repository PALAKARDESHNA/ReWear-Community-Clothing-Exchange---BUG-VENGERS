import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: [],
    points: '',
    measurements: {
      chest: '',
      length: '',
      shoulders: '',
      waist: '',
      hips: '',
    },
    care: '',
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [newTag, setNewTag] = useState('');

  const steps = ['Basic Info', 'Images & Details', 'Review & Submit'];

  const categories = [
    'Outerwear',
    'Tops',
    'Bottoms',
    'Dresses',
    'Footwear',
    'Accessories',
  ];

  const conditions = [
    'Like New',
    'Excellent',
    'Good',
    'Fair',
    'Poor',
  ];

  const sizes = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL',
    '32', '34', '36', '38', '40', '42', '44',
    '6', '8', '10', '12', '14', '16', '18',
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }));
      setUploadedImages([...uploadedImages, ...newImages]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.title || !formData.category || !formData.condition) {
        setError('Please fill in all required fields');
        return;
      }
    }
    if (activeStep === 1) {
      if (uploadedImages.length === 0) {
        setError('Please upload at least one image');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Item listed successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to list item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Item Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Vintage Denim Jacket"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item in detail..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value="Casual">Casual</MenuItem>
                  <MenuItem value="Formal">Formal</MenuItem>
                  <MenuItem value="Sportswear">Sportswear</MenuItem>
                  <MenuItem value="Vintage">Vintage</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  name="size"
                  value={formData.size}
                  label="Size"
                  onChange={handleChange}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="condition"
                  value={formData.condition}
                  label="Condition"
                  onChange={handleChange}
                >
                  {conditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Points Value"
                name="points"
                type="number"
                value={formData.points}
                onChange={handleChange}
                placeholder="How many points is this item worth?"
                InputProps={{
                  endAdornment: <Typography variant="body2">points</Typography>,
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Upload Images
              </Typography>
              <Paper
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragActive ? 'primary.50' : 'grey.50',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.50',
                  },
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to select files
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  Supports: JPEG, PNG, WebP (Max 5 images)
                </Typography>
              </Paper>
            </Grid>

            {uploadedImages.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Images ({uploadedImages.length}/5)
                </Typography>
                <Grid container spacing={2}>
                  {uploadedImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={image.preview}
                            alt={image.name}
                            sx={{
                              width: '100%',
                              height: 200,
                              objectFit: 'cover',
                            }}
                          />
                          <Button
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              minWidth: 'auto',
                              backgroundColor: 'rgba(255,255,255,0.9)',
                            }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Delete />
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button
                  variant="outlined"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  Add
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Care Instructions
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Care Instructions"
                name="care"
                value={formData.care}
                onChange={handleChange}
                placeholder="e.g., Machine wash cold, tumble dry low"
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Item
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Basic Information
                    </Typography>
                    <Typography><strong>Title:</strong> {formData.title}</Typography>
                    <Typography><strong>Category:</strong> {formData.category}</Typography>
                    <Typography><strong>Condition:</strong> {formData.condition}</Typography>
                    <Typography><strong>Size:</strong> {formData.size}</Typography>
                    <Typography><strong>Points:</strong> {formData.points}</Typography>
                    <Typography><strong>Description:</strong></Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {formData.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Images ({uploadedImages.length})
                    </Typography>
                    <Grid container spacing={1}>
                      {uploadedImages.slice(0, 3).map((image, index) => (
                        <Grid item xs={4} key={index}>
                          <Box
                            component="img"
                            src={image.preview}
                            alt={image.name}
                            sx={{
                              width: '100%',
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: 1,
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    {formData.tags.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Tags:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {formData.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        List an Item
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Share your clothing with the community and earn points
      </Typography>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Listing Item...' : 'List Item'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddItem; 