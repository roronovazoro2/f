import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
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
      console.log('Sending forgot password request for email:', email);
      
      // Use the actual API endpoint
      const response = await axios.post('/api/auth/forgot-password', { email });
      
      console.log('Forgot password response:', response.data);
      setSuccess('Password reset instructions have been sent to your email.');
      
      // Redirect to sign-in page after 3 seconds
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            Forgot Password
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enter your email address and we'll send you instructions to reset your password
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
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

export default ForgotPassword; 