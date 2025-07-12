import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import { useRole, ROLE_USER } from '../contexts/RoleContext';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Clothe-Again
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Giving clothe second chance
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/browse" color="inherit" display="block">
                Browse Items
              </Link>
              <Link href="/add-item" color="inherit" display="block">
                List an Item
              </Link>
              <Link href="/dashboard" color="inherit" display="block">
                Dashboard
              </Link>
              <Link href="/about" color="inherit" display="block">
                About Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
            {/* Only show for user role */}
            {role === ROLE_USER && (
              <Box sx={{ mt: 2 }}>
                <Link
                  component="button"
                  variant="body1"
                  color="primary"
                  underline="hover"
                  onClick={() => navigate('/contact-admin')}
                  sx={{ fontWeight: 600 }}
                >
                  Send Mail to Admin
                </Link>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              © 2024 Clothe-Again. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer; 