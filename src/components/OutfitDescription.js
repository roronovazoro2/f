import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Paper } from '@mui/material';
import { generateOutfitDescription } from '../services/aiService';

const OutfitDescription = () => {
  const [outfitData, setOutfitData] = useState({
    top: '',
    bottom: '',
    shoes: '',
    accessories: '',
    occasion: '',
    season: '',
  });
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOutfitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateDescription = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateOutfitDescription(outfitData);
      setDescription(result.description);
    } catch (err) {
      setError('Failed to generate outfit description. Please try again.');
      console.error('Description generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Outfit Description Generator
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Top"
          name="top"
          value={outfitData.top}
          onChange={handleInputChange}
          placeholder="e.g., White button-down shirt"
        />
        <TextField
          label="Bottom"
          name="bottom"
          value={outfitData.bottom}
          onChange={handleInputChange}
          placeholder="e.g., Black skinny jeans"
        />
        <TextField
          label="Shoes"
          name="shoes"
          value={outfitData.shoes}
          onChange={handleInputChange}
          placeholder="e.g., Brown leather boots"
        />
        <TextField
          label="Accessories"
          name="accessories"
          value={outfitData.accessories}
          onChange={handleInputChange}
          placeholder="e.g., Gold necklace, silver watch"
        />
        <TextField
          label="Occasion"
          name="occasion"
          value={outfitData.occasion}
          onChange={handleInputChange}
          placeholder="e.g., Casual Friday at work"
        />
        <TextField
          label="Season"
          name="season"
          value={outfitData.season}
          onChange={handleInputChange}
          placeholder="e.g., Fall"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={generateDescription}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        Generate Description
      </Button>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      {description && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Generated Description
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default OutfitDescription; 