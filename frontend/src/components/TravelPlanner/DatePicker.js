import React from 'react';
import TextField from '@mui/material/TextField';

function DatePicker({ label, value, onChange }) {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      fullWidth
    />
  );
}

export default DatePicker; 