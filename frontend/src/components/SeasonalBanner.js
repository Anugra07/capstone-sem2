import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const bannerBg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'; // Placeholder (beach/monsoon)

function SeasonalBanner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSeeDestinations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/seasonal-treks`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ season: 'monsoon' })
        }
      );
      const data = await res.json();
      if (data.treks) {
        navigate('/seasonal-treks', { state: { treks: data.treks } });
      } else {
        setError('No treks found.');
      }
    } catch (err) {
      setError('Failed to fetch treks.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            Explore best treks in this season.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: 700 }}
            onClick={handleSeeDestinations}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'See Monsoon Destinations'}
          </Button>
        </Box>
      </Paper>
      {error && (
        <Box sx={{ mt: 2, textAlign: 'center', color: 'error.main' }}>{error}</Box>
      )}
    </>
  );
}

export default SeasonalBanner; 