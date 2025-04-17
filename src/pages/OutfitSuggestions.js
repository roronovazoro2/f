import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { getOutfitSuggestions } from '../services/outfitService';

const OutfitSuggestions = () => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    style: '',
    occasion: '',
    season: '',
    color: '',
  });

  useEffect(() => {
    fetchSuggestions();
  }, [filters]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const data = await getOutfitSuggestions(filters);
      setOutfits(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch outfit suggestions. Please try again later.');
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const filteredOutfits = outfits.filter((outfit) => {
    if (filters.style && outfit.style !== filters.style) return false;
    if (filters.occasion && outfit.occasion !== filters.occasion) return false;
    if (filters.season && outfit.season !== filters.season) return false;
    if (filters.color) {
      const hasColor = outfit.items.some((item) => item.color === filters.color);
      if (!hasColor) return false;
    }
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="text.primary"
          gutterBottom
          sx={{ fontFamily: 'Playfair Display', mb: 4 }}
        >
          Outfit Suggestions
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="style-label">Style</InputLabel>
                <Select
                  labelId="style-label"
                  name="style"
                  value={filters.style}
                  label="Style"
                  onChange={handleFilterChange('style')}
                >
                  <MenuItem value="">All Styles</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="streetwear">Streetwear</MenuItem>
                  <MenuItem value="sportswear">Sportswear</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="occasion-label">Occasion</InputLabel>
                <Select
                  labelId="occasion-label"
                  name="occasion"
                  value={filters.occasion}
                  label="Occasion"
                  onChange={handleFilterChange('occasion')}
                >
                  <MenuItem value="">All Occasions</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="party">Party</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="beach">Beach</MenuItem>
                  <MenuItem value="travel">Travel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="season-label">Season</InputLabel>
                <Select
                  labelId="season-label"
                  name="season"
                  value={filters.season}
                  label="Season"
                  onChange={handleFilterChange('season')}
                >
                  <MenuItem value="">All Seasons</MenuItem>
                  <MenuItem value="spring">Spring</MenuItem>
                  <MenuItem value="summer">Summer</MenuItem>
                  <MenuItem value="fall">Fall</MenuItem>
                  <MenuItem value="winter">Winter</MenuItem>
                  <MenuItem value="all">All Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  labelId="color-label"
                  name="color"
                  value={filters.color}
                  label="Color"
                  onChange={handleFilterChange('color')}
                >
                  <MenuItem value="">All Colors</MenuItem>
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="white">White</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="yellow">Yellow</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                  <MenuItem value="brown">Brown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {loading ? (
          <Typography>Loading outfits...</Typography>
        ) : filteredOutfits.length === 0 ? (
          <Typography>No outfits match your filters. Try adjusting your criteria.</Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredOutfits.map((outfit) => (
              <Grid item key={outfit.id} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={outfit.image}
                      alt={outfit.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {outfit.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {outfit.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip label={outfit.style} size="small" />
                        <Chip label={outfit.occasion} size="small" />
                        <Chip label={outfit.season} size="small" />
                      </Stack>
                      <Button variant="contained" color="primary" fullWidth>
                        Save to Wardrobe
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </Container>
  );
};

export default OutfitSuggestions; 