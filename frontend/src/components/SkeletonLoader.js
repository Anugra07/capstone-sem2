import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function SkeletonLoader({ count = 3, variant = 'rectangular', height = 220 }) {
  return (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          width={320}
          height={height}
          sx={{ borderRadius: 4, mb: 2 }}
        />
      ))}
    </Box>
  );
}

export default SkeletonLoader; 