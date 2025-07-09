import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const bannerBg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'; // Placeholder (beach/monsoon)

function SeasonalBanner() {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        minHeight: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(90deg, rgba(34,34,34,0.7) 0%, rgba(255,111,0,0.3) 100%), url(${bannerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 4,
        overflow: 'hidden',
        my: 4,
        px: { xs: 2, md: 6 },
        py: { xs: 3, md: 4 },
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          🌧️ Monsoon Magic: Best Treks & Escapes
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Explore lush green trails, misty mountains, and hidden waterfalls this season. Don’t miss our top picks for monsoon adventures!
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ fontWeight: 700 }} href="#planner">
          See Monsoon Destinations
        </Button>
      </Box>
    </Paper>
  );
}

export default SeasonalBanner; 