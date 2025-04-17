import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, Paper, TextField, MenuItem, Grid } from '@mui/material';
import { generateOutfitDescription } from '../services/aiService';

const OutfitDescriber = () => {
  const [outfitData, setOutfitData] = useState({
    top: '',
    bottom: '',
    shoes: '',
    accessories: '',
    occasion: '',
    season: ''
  });
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const occasions = [
    'Casual',
    'Business Casual',
    'Formal',
    'Evening',
    'Sport',
    'Beach',
    'Party',
    'Wedding',
    'Interview',
    'Date Night'
  ];

  const seasons = [
    'Spring',
    'Summer',
    'Fall',
    'Winter',
    'All Season'
  ];

  const handleInputChange = (field) => (event) => {
    setOutfitData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const generateDescription = async () => {
    // Validate inputs
    if (!outfitData.top || !outfitData.bottom || !outfitData.shoes) {
      setError('Please fill in at least the top, bottom, and shoes fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll generate a description locally
      // In a real implementation, this would call the Grok API
      const result = await generateLocalDescription(outfitData);
      setDescription(result);
    } catch (err) {
      setError('Failed to generate outfit description. Please try again.');
      console.error('Description generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateLocalDescription = async (data) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate style tags based on the outfit components
    const styleTags = [];
    
    // Analyze top
    if (data.top.toLowerCase().includes('t-shirt') || data.top.toLowerCase().includes('tshirt')) {
      styleTags.push('casual');
    } else if (data.top.toLowerCase().includes('shirt') || data.top.toLowerCase().includes('blouse')) {
      styleTags.push('smart casual');
    } else if (data.top.toLowerCase().includes('sweater') || data.top.toLowerCase().includes('jumper')) {
      styleTags.push('cozy');
    } else if (data.top.toLowerCase().includes('jacket') || data.top.toLowerCase().includes('blazer')) {
      styleTags.push('layered');
    }
    
    // Analyze bottom
    if (data.bottom.toLowerCase().includes('jean')) {
      styleTags.push('denim');
    } else if (data.bottom.toLowerCase().includes('skirt')) {
      styleTags.push('feminine');
    } else if (data.bottom.toLowerCase().includes('pant') || data.bottom.toLowerCase().includes('trouser')) {
      styleTags.push('tailored');
    } else if (data.bottom.toLowerCase().includes('short')) {
      styleTags.push('summer');
    }
    
    // Analyze shoes
    if (data.shoes.toLowerCase().includes('sneaker') || data.shoes.toLowerCase().includes('trainer')) {
      styleTags.push('athletic');
    } else if (data.shoes.toLowerCase().includes('boot')) {
      styleTags.push('rugged');
    } else if (data.shoes.toLowerCase().includes('heel')) {
      styleTags.push('elegant');
    } else if (data.shoes.toLowerCase().includes('sandals') || data.shoes.toLowerCase().includes('flip-flop')) {
      styleTags.push('relaxed');
    }
    
    // Add occasion-based tags
    if (data.occasion) {
      styleTags.push(data.occasion.toLowerCase());
    }
    
    // Add season-based tags
    if (data.season) {
      styleTags.push(data.season.toLowerCase());
    }
    
    // Remove duplicates
    const uniqueTags = [...new Set(styleTags)];
    
    // Generate description based on components
    let descriptionText = `A stylish ${data.occasion ? data.occasion.toLowerCase() : 'casual'} outfit featuring `;
    
    // Add top description
    descriptionText += `a ${data.top}`;
    
    // Add bottom description
    descriptionText += ` paired with ${data.bottom}`;
    
    // Add shoes description
    descriptionText += ` and ${data.shoes}`;
    
    // Add accessories if provided
    if (data.accessories) {
      descriptionText += `. Accessorized with ${data.accessories}`;
    }
    
    // Add occasion and season
    descriptionText += `. Perfect for ${data.occasion ? `a ${data.occasion.toLowerCase()} occasion` : 'casual wear'}`;
    descriptionText += data.season ? ` during ${data.season}` : '';
    descriptionText += '.';
    
    return {
      description: descriptionText,
      styleTags: uniqueTags,
      occasion: data.occasion || 'casual',
      season: data.season || 'all-season'
    };
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Outfit Description Generator
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Top"
            value={outfitData.top}
            onChange={handleInputChange('top')}
            margin="normal"
            placeholder="e.g., Blue Denim Jacket, White T-shirt"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bottom"
            value={outfitData.bottom}
            onChange={handleInputChange('bottom')}
            margin="normal"
            placeholder="e.g., Black Slim-fit Jeans, Navy Chinos"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Shoes"
            value={outfitData.shoes}
            onChange={handleInputChange('shoes')}
            margin="normal"
            placeholder="e.g., White Sneakers, Brown Leather Boots"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Accessories"
            value={outfitData.accessories}
            onChange={handleInputChange('accessories')}
            margin="normal"
            placeholder="e.g., Silver Watch, Gold Necklace"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Occasion"
            value={outfitData.occasion}
            onChange={handleInputChange('occasion')}
            margin="normal"
          >
            {occasions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Season"
            value={outfitData.season}
            onChange={handleInputChange('season')}
            margin="normal"
          >
            {seasons.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={generateDescription}
        disabled={loading}
        sx={{ mb: 3 }}
        fullWidth
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
          
          <Typography paragraph>
            {description.description}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Style Tags:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {description.styleTags.map((tag, index) => (
                <Typography
                  key={index}
                  sx={{
                    backgroundColor: '#f0f0f0',
                    padding: '4px 8px',
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {tag}
                </Typography>
              ))}
            </Box>
          </Box>

          <Typography variant="subtitle1">
            Occasion: {description.occasion}
          </Typography>
          <Typography variant="subtitle1">
            Season: {description.season}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default OutfitDescriber; 