import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Email from '@mui/icons-material/Email';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { ClipLoader } from 'react-spinners';
import { useRole, ROLE_ADMIN, ROLE_USER } from '../contexts/RoleContext';
import { useEffect } from 'react';

const STATIC_USER_EMAIL = 'demo@rewear.com';
const STATIC_USER_PASSWORD = 'password123';
const STATIC_ADMIN_EMAIL = 'admin@rewear.com';
const STATIC_ADMIN_PASSWORD = 'adminpass';

const Login = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { role } = useRole();
  const [generatedOtp, setGeneratedOtp] = useState('');

  useEffect(() => {
    if (!role || (role !== ROLE_ADMIN && role !== ROLE_USER)) {
      navigate('/select-role');
    }
  }, [role, navigate]);

  const steps = ['Login', 'Verify OTP'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (activeStep === 0) {
        // Static login check
        if (
          (role === ROLE_ADMIN && formData.email === STATIC_ADMIN_EMAIL && formData.password === STATIC_ADMIN_PASSWORD) ||
          (role === ROLE_USER && formData.email === STATIC_USER_EMAIL && formData.password === STATIC_USER_PASSWORD)
        ) {
          // Simulate sending OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedOtp(otp);
          setSuccess(`OTP sent to your email! (Demo OTP: ${otp})`);
          setActiveStep(1);
        } else {
          setError('Invalid email or password.');
        }
      } else {
        // OTP verification
        if (formData.otp === generatedOtp) {
          setSuccess('Login successful!');
          setTimeout(() => {
            // Save user email for demo session
            localStorage.setItem('rewear-user-email', formData.email);
            navigate('/dashboard');
          }, 1000);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      // Mock resend OTP API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('OTP resent successfully!');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Only show login form for admin or user
  if (!role || (role !== ROLE_ADMIN && role !== ROLE_USER)) return null;

  return (
    <Container component="main" maxWidth="sm">
      {/* Fullscreen spinner overlay when loading */}
      {loading && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(255,255,255,0.7)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ClipLoader size={70} color="#1976d2" />
        </Box>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Fade triggerOnce>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
              borderRadius: 4,
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
              Welcome Back
            </Typography>
            <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                {success}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {activeStep === 0 ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ minWidth: 'auto' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      ),
                    }}
                  />
                </>
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  inputProps={{ maxLength: 6 }}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontWeight: 600, fontSize: 18, py: 1.5 }}
                disabled={loading}
              >
                {activeStep === 0 ? 'Send OTP' : 'Verify OTP'}
              </Button>
              {activeStep === 1 && (
                <Button
                  fullWidth
                  variant="text"
                  onClick={handleResendOTP}
                  disabled={loading}
                  sx={{ mb: 2 }}
                >
                  Resend OTP
                </Button>
              )}
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don&apos;t have an account?{' '}
              <Link component={RouterLink} to="/signup">
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default Login; 