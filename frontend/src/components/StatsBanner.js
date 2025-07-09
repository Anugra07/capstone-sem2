import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

function StatsBanner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 8 }, my: 4, flexWrap: 'wrap' }}>
      <Box sx={{ textAlign: 'center', minWidth: 120 }}>
        <EmojiFlagsIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>50+</Typography>
        <Typography variant="body2" color="text.secondary">Offbeat Destinations</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', minWidth: 120 }}>
        <PeopleIcon color="success" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>10,000+</Typography>
        <Typography variant="body2" color="text.secondary">Happy Travelers</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', minWidth: 120 }}>
        <StarIcon color="warning" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>4.9/5</Typography>
        <Typography variant="body2" color="text.secondary">Average Rating</Typography>
      </Box>
    </Box>
  );
}

export default StatsBanner; 