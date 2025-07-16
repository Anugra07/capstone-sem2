import React from 'react';
import HeroSection from '../components/HeroSection';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Testimonials from '../components/Testimonials';
import SeasonalBanner from '../components/SeasonalBanner';

function HomePage() {
  return (
    <Box>
      <HeroSection />
      <SeasonalBanner />
      {/* Placeholder for testimonials */}
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Traveler Stories
        </Typography>
        <Testimonials />
      </Box>
    </Box>
  );
}

export default HomePage; 