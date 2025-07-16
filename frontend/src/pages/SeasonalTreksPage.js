import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HikingIcon from '@mui/icons-material/Hiking';
import PlaceIcon from '@mui/icons-material/Place';
import TerrainIcon from '@mui/icons-material/Terrain';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const heroImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

function SeasonalTreksPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const treks = location.state?.treks;
  console.log('Raw trek data:', treks);

  if (!treks) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography variant="h6">No trek data found. Please try again from the homepage.</Typography>
        <Button onClick={() => navigate('/')} startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>Back to Home</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f7fa' }}>
      {/* Hero Banner */}
      <Box sx={{
        height: 240,
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 0,
        boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
        display: 'flex',
        alignItems: 'flex-end',
        p: 4,
        mb: 4,
        position: 'relative',
      }}>
        <Box sx={{ background: 'rgba(0,0,0,0.45)', p: 2, borderRadius: 2 }}>
          <Typography variant="h3" color="#fff" fontWeight={700} gutterBottom>
            Best Monsoon Treks in India
          </Typography>
          <Typography variant="subtitle1" color="#fff">
            Handpicked for the season – adventure, beauty, and tips for trekkers!
          </Typography>
        </Box>
      </Box>
      {/* Trek List */}
      <Box sx={{ maxWidth: 900, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4, mb: 6 }}>
        {treks.map((trek, idx) => (
          <Card key={idx} sx={{ borderRadius: 4, boxShadow: '0 2px 12px rgba(44,62,80,0.10)', p: 2, background: '#fff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <HikingIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" color="primary" fontWeight={600}>{trek.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                <Chip icon={<PlaceIcon />} label={trek.region || 'Region'} color="default" />
                <Chip icon={<TerrainIcon />} label={trek.start ? `Start: ${trek.start}` : 'Start point'} color="secondary" />
                <Chip label={trek.difficulty || 'Difficulty'} color={
                  trek.difficulty === 'Easy' ? 'success' : trek.difficulty === 'Hard' ? 'error' : 'warning'
                } />
              </Box>
              {trek.description && (
                <Typography variant="body1" sx={{ mb: 1 }}>{trek.description}</Typography>
              )}
              {trek.tip && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TipsAndUpdatesIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="success.main"><b>Tip:</b> {trek.tip}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 4, display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
      </Box>
    </Box>
  );
}

export default SeasonalTreksPage; 