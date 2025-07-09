import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SkeletonLoader from './SkeletonLoader';

const destinations = [
  {
    name: 'Spiti Valley',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
    description: 'A cold desert mountain valley in Himachal Pradesh, known for its surreal landscapes and monasteries.'
  },
  {
    name: 'Hampi',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Ruins of a lost kingdom in Karnataka, dotted with boulders, temples, and a unique landscape.'
  },
  {
    name: 'Ziro Valley',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'A lush green valley in Arunachal Pradesh, famous for its rice fields and Apatani culture.'
  },
  {
    name: 'Tawang',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    description: 'A scenic town in Arunachal Pradesh, home to India’s largest Buddhist monastery.'
  },
  {
    name: 'Chopta',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Mini Switzerland of Uttarakhand, a base for treks to Tungnath and Chandrashila.'
  },
  {
    name: 'Majuli',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    description: 'The world’s largest river island, located in Assam, rich in culture and natural beauty.'
  },
];

function DestinationCards() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonLoader count={3} />;

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 1, md: 0 } }}>
      <Grid container spacing={4} justifyContent="center">
        {destinations.map((dest, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(34,34,34,0.10)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.03)',
                  boxShadow: '0 8px 32px rgba(34,34,34,0.18)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={dest.image}
                alt={dest.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" color="primary" gutterBottom>{dest.name}</Typography>
                <Typography variant="body2" color="text.secondary">{dest.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DestinationCards; 