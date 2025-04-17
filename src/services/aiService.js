import axios from 'axios';

// Set the base URL for API requests
const API_BASE_URL = 'http://localhost:5000/api';

// Color analysis service
export const analyzeColors = async (formData) => {
  try {
    // Send the image file to the backend for analysis
    const response = await axios.post(`${API_BASE_URL}/ai/analyze-colors`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing colors:', error);
    throw error;
  }
};

// Outfit description service
export const generateOutfitDescription = async (outfitData) => {
  try {
    // Send the outfit data to the backend for description generation
    const response = await axios.post(`${API_BASE_URL}/ai/describe-outfit`, outfitData);
    return response.data;
  } catch (error) {
    console.error('Error generating outfit description:', error);
    throw error;
  }
};

// Style recommendation service
export const getStyleRecommendations = async (userPreferences) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/style-recommendations`, userPreferences);
    return response.data;
  } catch (error) {
    console.error('Error getting style recommendations:', error);
    throw error;
  }
}; 