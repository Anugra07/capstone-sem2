import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import palette from './theme/palette';
import typography from './theme/typography';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import '@fontsource/inter';
import '@fontsource/poppins';
import '@fontsource/playfair-display';

const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 14 },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: theme.palette.background.gradient,
          position: 'fixed',
          inset: 0,
          zIndex: -1,
        }}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
