import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';

// Configure axios to use the correct base URL
axios.defaults.baseURL = 'http://localhost:5000';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from URL query parameters
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    
    if (!tokenParam) {
      setError('Invalid or missing verification token');
      setLoading(false);
      return;
    }
    
    setToken(tokenParam);
    verifyEmail(tokenParam);
  }, [location]);

  const verifyEmail = async (verificationToken) => {
    try {
      console.log('Verifying email with token:', verificationToken);
      
      const response = await axios.get(`/api/auth/verify-email?token=${verificationToken}`);
      
      console.log('Email verification response:', response.data);
      setSuccess('Email verified successfully!');
    } catch (err) {
      console.error('Email verification error:', err);
      setError(err.response?.data?.message || 'An error occurred during email verification.');
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
          {loading ? (
            <>
              <Typography variant="h5" gutterBottom>
                Verifying Your Email
              </Typography>
              <CircularProgress sx={{ mt: 3 }} />
            </>
          ) : error ? (
            <>
              <Typography variant="h5" color="error" gutterBottom>
                Verification Failed
              </Typography>
              <Alert severity="error" sx={{ mt: 2, mb: 3, width: '100%' }}>
                {error}
              </Alert>
              <Button
                variant="contained"
                onClick={() => navigate('/sign-in')}
                sx={{ mt: 2 }}
              >
                Go to Sign In
              </Button>
            </>
          ) : (
            <>
              <Typography
                component="h1"
                variant="h4"
                color="text.primary"
                gutterBottom
                sx={{ fontFamily: 'Playfair Display' }}
              >
                Email Verified
              </Typography>
              <Alert severity="success" sx={{ mt: 2, mb: 3, width: '100%' }}>
                {success}
              </Alert>
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Your email has been successfully verified. You can now sign in to your account.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/sign-in')}
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
            </>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default VerifyEmail; 