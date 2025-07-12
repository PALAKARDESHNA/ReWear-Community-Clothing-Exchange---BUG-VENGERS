import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person';
import Dashboard from '@mui/icons-material/Dashboard';
import Add from '@mui/icons-material/Add';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import ExitToApp from '@mui/icons-material/ExitToApp';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import Favorite from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Mock user state - replace with actual auth state
  const [user, setUser] = useState(null);

  // Load favorites count from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rewear-favorites');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      setFavoritesCount(favorites.length);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setUser(null);
    handleMenuClose();
    navigate('/');
  };

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
        <ListItemIcon>
          <Dashboard fontSize="small" />
        </ListItemIcon>
        Dashboard
      </MenuItem>
      <MenuItem onClick={() => { navigate('/add-item'); handleMenuClose(); }}>
        <ListItemIcon>
          <Add fontSize="small" />
        </ListItemIcon>
        Add Item
      </MenuItem>
      <MenuItem onClick={() => { navigate('/browse'); handleMenuClose(); }}>
        <ListItemIcon>
          <ShoppingBag fontSize="small" />
        </ListItemIcon>
        Browse Items
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <Box>
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/browse" onClick={handleDrawerToggle}>
          <ListItemText primary="Browse Items" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/add-item" onClick={handleDrawerToggle}>
              <ListItemText primary="Add Item" />
            </ListItem>
            <ListItem button component={Link} to="/contact-admin" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Admin" />
            </ListItem>
            {user.isAdmin && (
              <ListItem button component={Link} to="/admin" onClick={handleDrawerToggle}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" />
              </ListItem>
            )}
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/select-role" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/select-role" onClick={handleDrawerToggle}>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                lineHeight: 1.1,
                letterSpacing: '0.5px',
              }}
            >
              Clothe-Again
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                textDecoration: 'none',
                color: '#388E3C',
                fontWeight: 400,
                fontSize: '1.05rem',
                lineHeight: 1.2,
                letterSpacing: '0.2px',
                mt: '0.1rem',
              }}
            >
              Giving clothe second chance
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/browse"
                startIcon={<ShoppingBag />}
              >
                Browse Items
              </Button>
              
              {/* Favorites Button with Badge */}
              <Button
                color="inherit"
                component={Link}
                to="/browse"
                startIcon={
                  <Badge badgeContent={favoritesCount} color="error">
                    <Favorite />
                  </Badge>
                }
              >
                Favorites
              </Button>
              
              {user ? (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/add-item"
                    startIcon={<Add />}
                  >
                    Add Item
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/contact-admin"
                    startIcon={<EmailIcon />}
                  >
                    Contact Admin
                  </Button>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <Person />
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/select-role">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/select-role">
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {renderMenu}
    </>
  );
};

export default Navbar; 