import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const options = [
  { label: 'Adventure', value: 'adventure' },
  { label: 'Culture', value: 'culture' },
  { label: 'Nature', value: 'nature' },
  { label: 'Spiritual', value: 'spiritual' },
];

function Preferences({ value, onChange }) {
  const handleChange = (option) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Preferences</Typography>
      <FormGroup row>
        {options.map(opt => (
          <FormControlLabel
            key={opt.value}
            control={<Checkbox checked={value.includes(opt.value)} onChange={() => handleChange(opt.value)} />}
            label={opt.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default Preferences; 