import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString();
    } catch (error) {
      return 'Not available';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'secondary.main',
                fontSize: '3rem',
                mb: 2,
              }}
            >
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
              {user.name || 'User Profile'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {user.email || 'Not set'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Name:</strong> {user.name || 'Not set'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Account Created:</strong>{' '}
                  {formatDate(user.createdAt)}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Last Login:</strong>{' '}
                  {formatDate(user.lastLogin)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Account Actions
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => navigate('/edit-profile')}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => navigate('/change-password')}
                >
                  Change Password
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Profile; 