import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get all outfits
export const getOutfits = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/outfits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching outfits:', error);
    throw error;
  }
};

// Get outfit suggestions
export const getOutfitSuggestions = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/outfits/suggestions`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching outfit suggestions:', error);
    throw error;
  }
};

// Create new outfit
export const createOutfit = async (outfitData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/outfits`, outfitData);
    return response.data;
  } catch (error) {
    console.error('Error creating outfit:', error);
    throw error;
  }
};

// Update outfit
export const updateOutfit = async (outfitId, outfitData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/outfits/${outfitId}`, outfitData);
    return response.data;
  } catch (error) {
    console.error('Error updating outfit:', error);
    throw error;
  }
};

// Delete outfit
export const deleteOutfit = async (outfitId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/outfits/${outfitId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting outfit:', error);
    throw error;
  }
}; 