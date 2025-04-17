import React, { useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material';

// Helper function to convert RGB to Hex
const rgbToHex = (r, g, b) => {
  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Helper function to get color name from RGB
const getColorName = (r, g, b) => {
  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    
    h /= 6;
  }
  
  // Convert to degrees
  h = h * 360;
  
  // Determine color based on HSL values
  if (s < 0.15) {
    if (l > 0.85) return "White";
    if (l < 0.15) return "Black";
    return "Gray";
  }
  
  if (h < 30) return "Red";
  if (h < 60) return "Orange";
  if (h < 90) return "Yellow";
  if (h < 150) return "Green";
  if (h < 210) return "Cyan";
  if (h < 270) return "Blue";
  if (h < 330) return "Magenta";
  return "Red";
};

// Function to analyze colors from an image
const analyzeImageColors = (imageElement) => {
  // Create a canvas to draw the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size (resize for performance)
  const maxSize = 150;
  let width = imageElement.naturalWidth;
  let height = imageElement.naturalHeight;
  
  if (width > height) {
    if (width > maxSize) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // Draw image to canvas
  ctx.drawImage(imageElement, 0, 0, width, height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height).data;
  
  // Create a map to count color occurrences
  const colorMap = new Map();
  
  // Process each pixel
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    
    // Skip transparent pixels
    if (imageData[i + 3] < 128) continue;
    
    // Quantize colors to reduce the number of unique colors
    const quantizedR = Math.round(r / 10) * 10;
    const quantizedG = Math.round(g / 10) * 10;
    const quantizedB = Math.round(b / 10) * 10;
    
    const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
    
    if (colorMap.has(colorKey)) {
      colorMap.set(colorKey, colorMap.get(colorKey) + 1);
    } else {
      colorMap.set(colorKey, 1);
    }
  }
  
  // Convert map to array and sort by frequency
  const colorArray = Array.from(colorMap.entries()).map(([color, count]) => {
    const [r, g, b] = color.split(',').map(Number);
    return {
      rgb: [r, g, b],
      count,
      hex: rgbToHex(r, g, b),
      name: getColorName(r, g, b)
    };
  });
  
  // Sort by frequency (most common first)
  colorArray.sort((a, b) => b.count - a.count);
  
  // Calculate total pixels
  const totalPixels = colorArray.reduce((sum, color) => sum + color.count, 0);
  
  // Add percentage to each color
  colorArray.forEach(color => {
    color.percentage = Math.round((color.count / totalPixels) * 100);
  });
  
  // Get top 5 dominant colors
  const dominantColors = colorArray.slice(0, 5).map(color => color.hex);
  
  // Create color palette
  const colorPalette = {};
  colorArray.slice(0, 5).forEach(color => {
    colorPalette[color.name] = color.hex;
  });
  
  // Create color details
  const colorDetails = colorArray.slice(0, 5).map(color => ({
    name: color.name,
    hex: color.hex,
    rgb: color.rgb,
    percentage: color.percentage
  }));
  
  // Determine color harmony
  let harmony = "Monochromatic";
  if (colorArray.length >= 2) {
    const firstColor = colorArray[0].rgb;
    const secondColor = colorArray[1].rgb;
    
    // Simple harmony detection based on hue difference
    const h1 = (Math.atan2(firstColor[1] - firstColor[2], firstColor[0] - firstColor[2]) * 180) / Math.PI;
    const h2 = (Math.atan2(secondColor[1] - secondColor[2], secondColor[0] - secondColor[2]) * 180) / Math.PI;
    
    const hueDiff = Math.abs(h1 - h2);
    
    if (hueDiff < 30) {
      harmony = "Monochromatic";
    } else if (hueDiff < 90) {
      harmony = "Analogous";
    } else if (hueDiff < 150) {
      harmony = "Complementary";
    } else {
      harmony = "Triadic";
    }
  }
  
  return {
    dominantColors,
    colorPalette,
    colorDetails,
    colorHarmony: harmony
  };
};

const ColorAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [colorAnalysis, setColorAnalysis] = useState({
    dominantColors: [],
    colorPalette: {},
    colorDetails: [],
    colorHarmony: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const imageRef = useRef();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setColorAnalysis({
        dominantColors: [],
        colorPalette: {},
        colorDetails: [],
        colorHarmony: ''
      });
      setError(null);
    }
  };

  const analyzeColors = () => {
    if (!imageRef.current) return;

    setLoading(true);
    setError(null);

    try {
      // Wait for image to load
      if (!imageRef.current.complete) {
        imageRef.current.onload = () => {
          const result = analyzeImageColors(imageRef.current);
          setColorAnalysis(result);
          setLoading(false);
        };
      } else {
        const result = analyzeImageColors(imageRef.current);
        setColorAnalysis(result);
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to analyze colors. Please try again.');
      console.error('Color analysis error:', err);
      setColorAnalysis({
        dominantColors: [],
        colorPalette: {},
        colorDetails: [],
        colorHarmony: ''
      });
      setLoading(false);
    }
  };

  const renderColorBox = (color, index) => (
    <Box
      key={index}
      sx={{
        width: 50,
        height: 50,
        backgroundColor: color,
        border: '1px solid #ccc',
        borderRadius: 1,
      }}
    />
  );

  const renderColorPalette = () => {
    if (!colorAnalysis.colorPalette || Object.keys(colorAnalysis.colorPalette).length === 0) {
      return null;
    }

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Color Palette:</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {Object.entries(colorAnalysis.colorPalette).map(([name, color]) => (
            <Box key={name}>
              <Typography variant="caption">{name}</Typography>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: color,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderColorDetails = () => {
    if (!colorAnalysis.colorDetails || colorAnalysis.colorDetails.length === 0) {
      return null;
    }

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Color Details:</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {colorAnalysis.colorDetails.map((color, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: color.hex,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                }}
              />
              <Typography variant="body2">
                {color.name} ({color.hex}) - {color.percentage}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Color Analysis
      </Typography>

      <Box sx={{ mb: 3 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button
          variant="contained"
          onClick={() => fileInputRef.current.click()}
          sx={{ mr: 2 }}
        >
          Select Image
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={analyzeColors}
          disabled={!selectedImage || loading}
        >
          Analyze Colors
        </Button>
      </Box>

      {selectedImage && (
        <Box sx={{ mb: 3 }}>
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: 300 }}
          />
        </Box>
      )}

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

      {colorAnalysis.dominantColors && colorAnalysis.dominantColors.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Color Analysis Results
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Dominant Colors:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {colorAnalysis.dominantColors.map(renderColorBox)}
            </Box>
          </Box>

          {renderColorPalette()}
          {renderColorDetails()}

          {colorAnalysis.colorHarmony && (
            <Typography variant="subtitle1">
              Color Harmony: {colorAnalysis.colorHarmony}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ColorAnalyzer; 