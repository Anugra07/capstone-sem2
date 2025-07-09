import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function GroupSizeSelector({ value, onChange }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Group Size</Typography>
      <Select value={value} onChange={e => onChange(e.target.value)} fullWidth>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <MenuItem key={n} value={n}>{n === 1 ? 'Solo' : n}</MenuItem>
        ))}
        <MenuItem value={"10+"}>10+</MenuItem>
      </Select>
    </Box>
  );
}

export default GroupSizeSelector; 