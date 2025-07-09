import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

function BudgetSlider({ value, onChange }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Budget (INR)</Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        min={1000}
        max={50000}
        step={500}
        valueLabelDisplay="auto"
        marks={[{ value: 1000, label: '₹1k' }, { value: 25000, label: '₹25k' }, { value: 50000, label: '₹50k' }]}
      />
    </Box>
  );
}

export default BudgetSlider; 