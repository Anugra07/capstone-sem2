import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SkeletonLoader from './SkeletonLoader';

const testimonials = [
  {
    name: 'Aarav Sharma',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: 'Spiti Valley was a life-changing experience! The travel guide helped me find hidden monasteries and the best local food.'
  },
  {
    name: 'Priya Nair',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'I never knew about Ziro Valley before. The planner made my solo trip safe, affordable, and unforgettable.'
  },
  {
    name: 'Rohan Das',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    review: 'The recommendations for Hampi were spot on! Loved the offbeat trek and the cozy homestay.'
  },
  {
    name: 'Meera Joshi',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    review: 'Majuli island was magical. The travel tips and local insights made all the difference.'
  },
];

function Testimonials() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonLoader count={4} height={180} />;

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 1, md: 0 } }}>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((t, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(34,34,34,0.10)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.03)',
                  boxShadow: '0 8px 32px rgba(34,34,34,0.18)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
              }}
            >
              <Avatar src={t.photo} alt={t.name} sx={{ width: 64, height: 64, mb: 2, boxShadow: 2 }} />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  “{t.review}”
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>{t.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Testimonials; 