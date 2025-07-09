import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function TravelPlannerPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (from && to) {
      setTimeout(() => {
        setResult({
          travelOptions: [
            { type: 'Train', price: '₹500', provider: 'IRCTC', link: 'https://www.irctc.co.in/' },
            { type: 'Bus', price: '₹700', provider: 'RedBus', link: 'https://www.redbus.in/' }
          ],
          accommodations: [
            { name: 'Himalayan Homestay', type: 'Homestay', price: '₹1200/night', link: '#' },
            { name: 'Eco Lodge', type: 'Lodge', price: '₹800/night', link: '#' }
          ],
          foods: [
            { name: 'Siddu', description: 'Steamed wheat bun stuffed with spiced fillings.', whereToFind: 'Local dhabas' },
            { name: 'Chha Gosht', description: 'Spicy lamb curry.', whereToFind: 'Traditional restaurants' }
          ]
        });
        setLoading(false);
      }, 700);
    } else {
      setError('Please enter both locations');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Card elevation={4} sx={{ p: 2, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>Travel Planner</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <TextField label="From (your location)" value={from} onChange={e => setFrom(e.target.value)} required fullWidth variant="outlined" />
            <TextField label="To (destination)" value={to} onChange={e => setTo(e.target.value)} required fullWidth variant="outlined" />
            <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }} disabled={loading}>Plan Trip</Button>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {result && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h5" color="primary" gutterBottom>Cheapest Travel Options</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                {result.travelOptions.map((opt, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <Typography variant="body1"><b>{opt.type}</b> via {opt.provider} - {opt.price} <a href={opt.link} target="_blank" rel="noopener noreferrer">Book</a></Typography>
                  </li>
                ))}
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>Local Accommodations</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                {result.accommodations.map((acc, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <Typography variant="body1"><b>{acc.name}</b> ({acc.type}) - {acc.price} <a href={acc.link} target="_blank" rel="noopener noreferrer">View</a></Typography>
                  </li>
                ))}
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>Best Local Foods</Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {result.foods.map((food, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <Typography variant="body1"><b>{food.name}</b>: {food.description} <i>({food.whereToFind})</i></Typography>
                  </li>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default TravelPlannerPage; 