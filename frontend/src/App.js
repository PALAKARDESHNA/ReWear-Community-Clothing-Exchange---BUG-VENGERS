import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import AddItem from './pages/AddItem';
import BrowseItems from './pages/BrowseItems';
import AdminPanel from './pages/AdminPanel';
import ContactAdmin from './pages/ContactAdmin';
import SelectRole from './pages/SelectRole';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { RoleProvider } from './contexts/RoleContext';
import theme from './theme';

function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700); // Show spinner for 700ms
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(255,255,255,0.7)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ClipLoader size={80} color="#1976d2" />
        </Box>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/contact-admin" element={<ContactAdmin />} />
          <Route path="/select-role" element={<SelectRole />} />
        </Routes>
      </Box>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoleProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <AppRoutes />
            <Footer />
          </Box>
        </Router>
      </RoleProvider>
    </ThemeProvider>
  );
}

export default App; 