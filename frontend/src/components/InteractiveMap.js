import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import RoomIcon from '@mui/icons-material/Room';

// Placeholder SVG map of India (simplified outline)
const indiaMapSVG = `
<svg viewBox="0 0 400 480" width="100%" height="320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M60,60 L340,60 L340,420 L60,420 Z" fill="#F7F4EF" stroke="#1976D2" stroke-width="3"/>
  <path d="M120,120 Q200,40 280,120 Q360,200 280,280 Q200,360 120,280 Q40,200 120,120 Z" fill="#FF6F00" opacity="0.08"/>
</svg>
`;

// Example marker positions (relative to SVG viewBox)
const markers = [
  { name: 'Spiti Valley', x: 120, y: 100 },
  { name: 'Hampi', x: 180, y: 320 },
  { name: 'Ziro Valley', x: 260, y: 90 },
  { name: 'Tawang', x: 320, y: 80 },
  { name: 'Majuli', x: 320, y: 180 },
  { name: 'Chopta', x: 160, y: 140 },
];

function InteractiveMap() {
  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto', my: 4 }}>
      {/* SVG Map */}
      <Box
        sx={{
          width: '100%',
          height: 320,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(34,34,34,0.10)',
          background: '#fff',
        }}
        dangerouslySetInnerHTML={{ __html: indiaMapSVG }}
      />
      {/* Markers */}
      {markers.map((m, i) => (
        <Tooltip title={m.name} key={i} arrow>
          <RoomIcon
            color="primary"
            sx={{
              position: 'absolute',
              left: `${m.x / 400 * 100}%`,
              top: `${m.y / 320 * 100}%`,
              transform: 'translate(-50%, -100%)',
              fontSize: 32,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translate(-50%, -110%) scale(1.2)' },
              zIndex: 2,
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
}

export default InteractiveMap; 