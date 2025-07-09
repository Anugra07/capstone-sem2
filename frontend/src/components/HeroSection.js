import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const heroBg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'; // Placeholder (mountain landscape)

function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 400, md: 520 },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 4,
        overflow: 'hidden',
        mb: 6,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(34,34,34,0.7) 0%, rgba(255,111,0,0.3) 100%)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
          Discover India’s Hidden Gems
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 400 }}>
          Beyond the Beaten Path – Offbeat Destinations, Treks, and Local Flavors
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 700, px: 4 }} href="#planner">
          Start Planning
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection; 