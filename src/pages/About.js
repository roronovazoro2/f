import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StyleIcon from '@mui/icons-material/Style';
import FavoriteIcon from '@mui/icons-material/Favorite';

const About = () => {
  const features = [
    {
      icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Outfit Suggestions',
      description: 'Get personalized outfit recommendations based on your style preferences and occasions.',
    },
    {
      icon: <StyleIcon sx={{ fontSize: 40 }} />,
      title: 'Virtual Wardrobe',
      description: 'Organize and manage your clothing items in a digital wardrobe for easy access.',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: 'Style Inspiration',
      description: 'Discover trending styles and get inspired by fashion influencers and community members.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component="h1"
            variant="h3"
            color="text.primary"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display' }}
          >
            About StyleSync
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Your personal AI-powered fashion assistant that helps you discover, organize, and perfect your style.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
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
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
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

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            At StyleSync, we believe that everyone deserves to feel confident and stylish in their clothing choices.
            Our mission is to make fashion accessible and personalized through the power of artificial intelligence.
            We're here to help you discover your unique style and make getting dressed each day an enjoyable experience.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Join our community of fashion enthusiasts and let StyleSync be your guide to a more stylish and
            confident you.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About; 