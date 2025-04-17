import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StyleIcon from '@mui/icons-material/Style';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Home = () => {
  const features = [
    {
      icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Suggestions',
      description: 'Get personalized outfit recommendations based on your style preferences.',
    },
    {
      icon: <StyleIcon sx={{ fontSize: 40 }} />,
      title: 'Virtual Wardrobe',
      description: 'Organize and manage your clothing items in a digital wardrobe.',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: 'Style Inspiration',
      description: 'Discover trending styles and get inspired by fashion influencers.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily: 'Playfair Display', textAlign: 'center' }}
            >
              Welcome to StyleSync
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{ textAlign: 'center', mb: 4 }}
            >
              Your personal AI-powered fashion assistant that helps you discover,
              organize, and perfect your style.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                component={RouterLink}
                to="/outfit-suggestions"
                variant="contained"
                size="large"
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                size="large"
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 