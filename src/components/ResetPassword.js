import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';

// Configure axios to use the correct base URL
axios.defaults.baseURL = 'http://localhost:5000';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from URL query parameters
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    
    if (!tokenParam) {
      setError('Invalid or missing reset token');
      return;
    }
    
    setToken(tokenParam);
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      console.log('Sending reset password request with token:', token);
      
      const response = await axios.post('/api/auth/reset-password', {
        token,
        password: formData.password,
      });
      
      console.log('Reset password response:', response.data);
      setSuccess('Password reset successful! Redirecting to login...');
      
      // Redirect to sign-in page after 3 seconds
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Invalid Reset Link
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            This password reset link is invalid or has expired.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/forgot-password')}
            sx={{ mt: 2 }}
          >
            Request New Reset Link
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            color="text.primary"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display' }}
          >
            Reset Password
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enter your new password below
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!error}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/sign-in')}
                  sx={{ textTransform: 'none' }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ResetPassword; 