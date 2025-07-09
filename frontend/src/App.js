import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import palette from './theme/palette';
import typography from './theme/typography';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import '@fontsource/inter';

const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 14 },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Breadcrumbs />
        <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
