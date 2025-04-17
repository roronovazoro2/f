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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getOutfits, createOutfit, updateOutfit, deleteOutfit } from '../services/outfitService';

const MyWardrobe = () => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [newOutfit, setNewOutfit] = useState({
    name: '',
    description: '',
    style: '',
    occasion: '',
    season: '',
    items: [],
  });

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      setLoading(true);
      const data = await getOutfits();
      setOutfits(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch outfits. Please try again later.');
      console.error('Error fetching outfits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (outfit = null) => {
    if (outfit) {
      setSelectedOutfit(outfit);
      setNewOutfit(outfit);
    } else {
      setSelectedOutfit(null);
      setNewOutfit({
        name: '',
        description: '',
        style: '',
        occasion: '',
        season: '',
        items: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOutfit(null);
  };

  const handleSaveOutfit = async () => {
    try {
      if (selectedOutfit) {
        // Update existing outfit
        await updateOutfit(selectedOutfit.id, newOutfit);
      } else {
        // Add new outfit
        await createOutfit(newOutfit);
      }
      await fetchOutfits(); // Refresh the list
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save outfit. Please try again.');
      console.error('Error saving outfit:', err);
    }
  };

  const handleDeleteOutfit = async (outfitId) => {
    try {
      await deleteOutfit(outfitId);
      await fetchOutfits(); // Refresh the list
    } catch (err) {
      setError('Failed to delete outfit. Please try again.');
      console.error('Error deleting outfit:', err);
    }
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

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            component="h1"
            variant="h3"
            color="text.primary"
            sx={{ fontFamily: 'Playfair Display' }}
          >
            My Wardrobe
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Outfit
          </Button>
        </Box>

        {outfits.length === 0 ? (
          <Typography>Your wardrobe is empty. Add some outfits to get started!</Typography>
        ) : (
          <Grid container spacing={4}>
            {outfits.map((outfit) => (
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
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(outfit)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteOutfit(outfit.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedOutfit ? 'Edit Outfit' : 'Add New Outfit'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                fullWidth
                value={newOutfit.name}
                onChange={(e) => setNewOutfit({ ...newOutfit, name: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={newOutfit.description}
                onChange={(e) => setNewOutfit({ ...newOutfit, description: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Style</InputLabel>
                <Select
                  value={newOutfit.style}
                  label="Style"
                  onChange={(e) => setNewOutfit({ ...newOutfit, style: e.target.value })}
                >
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="streetwear">Streetwear</MenuItem>
                  <MenuItem value="sportswear">Sportswear</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Occasion</InputLabel>
                <Select
                  value={newOutfit.occasion}
                  label="Occasion"
                  onChange={(e) => setNewOutfit({ ...newOutfit, occasion: e.target.value })}
                >
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="party">Party</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="beach">Beach</MenuItem>
                  <MenuItem value="travel">Travel</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Season</InputLabel>
                <Select
                  value={newOutfit.season}
                  label="Season"
                  onChange={(e) => setNewOutfit({ ...newOutfit, season: e.target.value })}
                >
                  <MenuItem value="spring">Spring</MenuItem>
                  <MenuItem value="summer">Summer</MenuItem>
                  <MenuItem value="fall">Fall</MenuItem>
                  <MenuItem value="winter">Winter</MenuItem>
                  <MenuItem value="all">All Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveOutfit} variant="contained" color="primary">
              {selectedOutfit ? 'Save Changes' : 'Add Outfit'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default MyWardrobe; 