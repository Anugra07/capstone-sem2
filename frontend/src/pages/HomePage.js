import React from 'react';
import HeroSection from '../components/HeroSection';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DestinationCards from '../components/DestinationCards';
import Testimonials from '../components/Testimonials';
import InteractiveMap from '../components/InteractiveMap';
import TravelTipsSidebar from '../components/TravelTipsSidebar';
import SeasonalBanner from '../components/SeasonalBanner';
import StatsBanner from '../components/StatsBanner';

function HomePage() {
  return (
    <Box>
      <HeroSection />
      <SeasonalBanner />
      {/* Placeholder for quick destination cards */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Popular Offbeat Destinations
        </Typography>
        <DestinationCards />
        <StatsBanner />
      </Box>
      {/* Placeholder for testimonials */}
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Traveler Stories
        </Typography>
        <Testimonials />
      </Box>
      <Box sx={{ mt: 10, mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Explore Offbeat India
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
          <Box sx={{ flex: 2 }}>
            <InteractiveMap />
          </Box>
          <Box sx={{ flex: 1, minWidth: 280, maxWidth: 340 }}>
            <TravelTipsSidebar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage; 