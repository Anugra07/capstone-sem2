import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const heroBg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'; // Spiti Valley placeholder

// Mandala SVG pattern as a data URI (faint, white, low opacity)
const mandalaPattern =
  'url("data:image/svg+xml;utf8,<svg width=\'600\' height=\'600\' viewBox=\'0 0 600 600\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'><g opacity=\'0.08\'><circle cx=\'300\' cy=\'300\' r=\'280\' stroke=\'white\' stroke-width=\'2\'/><circle cx=\'300\' cy=\'300\' r=\'200\' stroke=\'white\' stroke-width=\'1.5\'/><circle cx=\'300\' cy=\'300\' r=\'120\' stroke=\'white\' stroke-width=\'1\'/><path d=\'M300 20 L320 300 L300 580 L280 300 Z\' stroke=\'white\' stroke-width=\'1\'/></g></svg>")';

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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroBg}), ${mandalaPattern}`,
        backgroundSize: 'cover, cover, 600px 600px',
        backgroundPosition: 'center, center, center',
        backgroundRepeat: 'no-repeat, no-repeat, repeat',
        borderRadius: 4,
        overflow: 'hidden',
        mb: 6,
        boxShadow: '0 8px 32px rgba(44,62,80,0.10)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontSize: { xs: '2.2rem', md: '3.2rem' },
            fontFamily: 'Poppins, Arial, sans-serif',
            fontWeight: 700,
            letterSpacing: '-1px',
            textShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}
        >
          Discover India’s Hidden Gems
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 400,
            fontFamily: 'Inter, Arial, sans-serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          Beyond the Beaten Path – Offbeat Destinations, Treks, and Local Flavors
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontWeight: 700,
            px: 4,
            fontFamily: 'Poppins, Arial, sans-serif',
            fontSize: 18,
            borderRadius: 25,
            boxShadow: '0 4px 16px rgba(255,107,53,0.18)',
            background: 'linear-gradient(90deg, #FF6B35 0%, #E55100 100%)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 8px 32px rgba(255,107,53,0.22)',
              background: 'linear-gradient(90deg, #E55100 0%, #FF6B35 100%)',
            },
          }}
          href="#planner"
        >
          Start Planning
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection; 