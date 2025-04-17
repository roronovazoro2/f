import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OutfitSuggestions from './pages/OutfitSuggestions';
import MyWardrobe from './pages/MyWardrobe';
import About from './pages/About';
import SignIn from './pages/SignIn';
import ColorAnalyzer from './components/ColorAnalyzer';
import OutfitDescriber from './components/OutfitDescriber';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import VerifyEmail from './components/VerifyEmail';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", serif',
      },
      h2: {
        fontFamily: '"Playfair Display", serif',
      },
      h3: {
        fontFamily: '"Playfair Display", serif',
      },
    },
    shape: {
      borderRadius: 8,
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/outfit-suggestions" element={<OutfitSuggestions />} />
            <Route path="/my-wardrobe" element={<MyWardrobe />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/color-analyzer" element={<ColorAnalyzer />} />
            <Route path="/outfit-describer" element={<OutfitDescriber />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 