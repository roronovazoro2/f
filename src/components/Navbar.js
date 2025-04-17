import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Palette,
  Description,
  AccountCircle,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Outfit Suggestions', path: '/outfit-suggestions' },
    { text: 'My Wardrobe', path: '/my-wardrobe' },
    { text: 'About', path: '/about' },
  ];

  const aiFeatures = [
    { text: 'Color Analyzer', path: '/color-analyzer', icon: <Palette /> },
    { text: 'Outfit Describer', path: '/outfit-describer', icon: <Description /> },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
        AI Features
      </Typography>
      {aiFeatures.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.icon}
            <ListItemText primary={item.text} />
          </Box>
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: 'Playfair Display',
          }}
        >
          Outfit Designer
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.text}
              </Button>
            ))}
            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'divider' }} />
            {aiFeatures.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <IconButton
          color="inherit"
          onClick={() => setDarkMode(!darkMode)}
          sx={{ ml: 2 }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {user ? (
          <>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ ml: 2 }}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user.name ? user.name[0].toUpperCase() : <AccountCircle />}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
            >
              <MenuItem component={RouterLink} to="/profile">
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to="/sign-in"
            sx={{ ml: 2 }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 