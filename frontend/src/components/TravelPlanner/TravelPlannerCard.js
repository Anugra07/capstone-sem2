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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from '@mui/icons-material/Explore';

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
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          startDate,
          endDate,
          duration,
          preferences,
          budget,
          groupSize
        })
      });
      const data = await res.json();
      setLoading(false);
      if (data.error) {
        onPlan && onPlan({ error: data.error });
      } else {
        // Parse Gemini answer into sections
        const answer = data.answer || '';
        // Simple parsing: split by numbered sections
        const sections = answer.split(/\n\d+\. /).map((s, i) => (i === 0 ? s : (i + '. ' + s)));
        let steps = '', accommodations = '', foods = '';
        sections.forEach(section => {
          if (/cheapest way/i.test(section)) steps = section;
          else if (/homestays|accommodations|pg/i.test(section)) accommodations = section;
          else if (/eateries|foods|restaurants/i.test(section)) foods = section;
        });
        onPlan && onPlan({ answer, steps, accommodations, foods });
      }
    } catch (err) {
      setLoading(false);
      onPlan && onPlan({ error: 'Failed to fetch travel options' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Card
        elevation={8}
        sx={{
          width: { xs: '95vw', sm: 450 },
          maxWidth: '95vw',
          p: { xs: 2, sm: 5 },
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderTop: '2px solid #FF6B35',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              fontFamily: 'Poppins, Arial, sans-serif',
              fontSize: 28,
              mb: 3,
            }}
          >
            Plan Your Offbeat Adventure
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              mt: 1,
            }}
          >
            {/* From Field with Icon */}
            <Box sx={{ position: 'relative' }}>
              <LocationOnIcon sx={{ position: 'absolute', left: 12, top: 18, color: '#FF6B35', fontSize: 22, zIndex: 2 }} />
              <AutocompleteCity
                label="From"
                value={from}
                onChange={setFrom}
                sx={{
                  pl: 4,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(30,58,138,0.04)',
                  background: '#fff',
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: <Box sx={{ width: 24 }} />,
                }}
              />
            </Box>
            {/* To Field with Icon */}
            <Box sx={{ position: 'relative' }}>
              <ExploreIcon sx={{ position: 'absolute', left: 12, top: 18, color: '#1E3A8A', fontSize: 22, zIndex: 2 }} />
              <AutocompleteCity
                label="To"
                value={to}
                onChange={setTo}
                sx={{
                  pl: 4,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(30,58,138,0.04)',
                  background: '#fff',
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: <Box sx={{ width: 24 }} />,
                }}
              />
            </Box>
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
                sx={{ borderRadius: 2, background: '#fff', fontFamily: 'Inter, Arial, sans-serif' }}
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
            <Paper
              elevation={2}
              sx={{
                height: 120,
                background: 'linear-gradient(90deg, #FFF8DC 60%, #FF6B35 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(255,215,0,0.08)',
              }}
            >
              <Typography variant="body2" color="text.secondary">[Map preview coming soon]</Typography>
            </Paper>
            <Divider sx={{ my: 2 }} />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                width: '100%',
                height: 50,
                borderRadius: 25,
                fontWeight: 600,
                fontFamily: 'Poppins, Arial, sans-serif',
                fontSize: 16,
                background: 'linear-gradient(90deg, #FF6B35 0%, #E55100 100%)',
                color: '#fff',
                boxShadow: '0 4px 16px rgba(255,107,53,0.18)',
                textTransform: 'none',
                letterSpacing: 0.5,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 32px rgba(255,107,53,0.22)',
                  background: 'linear-gradient(90deg, #E55100 0%, #FF6B35 100%)',
                },
                '&:disabled': {
                  opacity: 0.7,
                },
              }}
            >
              {loading ? <CircularProgress size={26} color="inherit" sx={{ verticalAlign: 'middle' }} /> : 'Plan Trip'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TravelPlannerCard; 