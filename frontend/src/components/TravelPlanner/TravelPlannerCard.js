import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AutocompleteCity from './AutocompleteCity';
import DatePicker from './DatePicker';
import Preferences from './Preferences';
import BudgetSlider from './BudgetSlider';
import GroupSizeSelector from './GroupSizeSelector';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const durations = [
  { label: 'Weekend', value: 'weekend' },
  { label: '1 Week', value: 'week' },
  { label: '1 Month', value: 'month' },
];

function TravelPlannerCard({ onPlan }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('weekend');
  const [preferences, setPreferences] = useState([]);
  const [budget, setBudget] = useState(10000);
  const [groupSize, setGroupSize] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/ai?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
      const data = await res.json();
      setLoading(false);
      if (data.error) {
        onPlan && onPlan({ error: data.error });
      } else {
        onPlan && onPlan({ answer: data.answer });
      }
    } catch (err) {
      setLoading(false);
      onPlan && onPlan({ error: 'Failed to fetch travel options' });
    }
  };

  return (
    <Card elevation={6} sx={{ p: 3, borderRadius: 5, maxWidth: 540, mx: 'auto', background: '#fff', boxShadow: '0 8px 32px rgba(34,34,34,0.10)' }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Plan Your Offbeat Adventure
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <AutocompleteCity label="From" value={from} onChange={setFrom} />
          <AutocompleteCity label="To" value={to} onChange={setTo} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />
            <DatePicker label="End Date" value={endDate} onChange={setEndDate} />
          </Box>
          <FormControl fullWidth>
            <InputLabel id="duration-label">Trip Duration</InputLabel>
            <Select
              labelId="duration-label"
              value={duration}
              label="Trip Duration"
              onChange={e => setDuration(e.target.value)}
            >
              {durations.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Preferences value={preferences} onChange={setPreferences} />
          <BudgetSlider value={budget} onChange={setBudget} />
          <GroupSizeSelector value={groupSize} onChange={setGroupSize} />
          {/* Map preview placeholder */}
          <Paper elevation={2} sx={{ height: 120, background: 'linear-gradient(90deg, #F7F4EF 60%, #FF6F00 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">[Map preview coming soon]</Typography>
          </Paper>
          <Divider sx={{ my: 2 }} />
          <Button type="submit" variant="contained" size="large" sx={{ fontWeight: 700, py: 1.2 }} disabled={loading}>
            {loading ? <CircularProgress size={26} color="inherit" sx={{ verticalAlign: 'middle' }} /> : 'Plan Trip'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TravelPlannerCard; 