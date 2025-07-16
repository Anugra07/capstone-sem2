import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import SkeletonLoader from './SkeletonLoader';

const travelStories = [
  {
    name: 'Aarav Sharma',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    destination: 'Spiti Valley',
    story: 'A life-changing journey through the mystical Spiti Valley. Hidden monasteries, pristine landscapes, and warm hospitality made this unforgettable.',
    duration: '7 days',
    season: 'Summer'
  },
  {
    name: 'Priya Nair',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    destination: 'Ziro Valley',
    story: 'My solo expedition to Ziro Valley was magical. The Apatani tribe\'s culture, rolling rice fields, and peaceful atmosphere created the perfect escape.',
    duration: '5 days',
    season: 'Monsoon'
  },
  {
    name: 'Rohan Das',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    destination: 'Hampi',
    story: 'Exploring ancient ruins was like stepping back in time. Hidden temples, secret viewpoints, and charming homestays revealed new wonders.',
    duration: '6 days',
    season: 'Winter'
  },
  {
    name: 'Meera Joshi',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    destination: 'Majuli Island',
    story: 'Majuli\'s serene beauty and rich heritage left me spellbound. The Raas Mahotsav festival and traditional workshops created lasting memories.',
    duration: '4 days',
    season: 'Autumn'
  },
  {
    name: 'Arjun Mehta',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    destination: 'Chopta',
    story: 'The trek to Tungnath was a spiritual awakening. Panoramic Himalayan views and crisp mountain air made every step worth it.',
    duration: '8 days',
    season: 'Spring'
  },
  {
    name: 'Kavya Reddy',
    photo: 'https://randomuser.me/api/portraits/women/52.jpg',
    destination: 'Kutch',
    story: 'The white desert during Rann Utsav was a sensory overload. Vibrant handicrafts, folk music, and endless salt flats created surreal experiences.',
    duration: '6 days',
    season: 'Winter'
  },
  {
    name: 'Vikram Singh',
    photo: 'https://randomuser.me/api/portraits/men/28.jpg',
    destination: 'Kodaikanal',
    story: 'The misty hills and serene lakes of Kodaikanal offered perfect tranquility. The boat rides and forest walks were absolutely magical.',
    duration: '5 days',
    season: 'Spring'
  },
  {
    name: 'Ananya Patel',
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    destination: 'Gokarna',
    story: 'Gokarna\'s pristine beaches and spiritual vibes were perfect for soul-searching. The sunset views from the cliffs were breathtaking.',
    duration: '4 days',
    season: 'Winter'
  }
];

function Testimonials() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonLoader count={6} height={200} />;

  return (
    <Box sx={{ 
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      py: 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '60px',
        zIndex: 2,
        pointerEvents: 'none'
      },
      '&::before': {
        left: 0,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
      },
      '&::after': {
        right: 0,
        background: 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
      }
    }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          animation: 'scroll 30s linear infinite',
          width: 'max-content',
          '@keyframes scroll': {
            '0%': {
              transform: 'translateX(0)'
            },
            '100%': {
              transform: 'translateX(-50%)'
            }
          },
          '&:hover': {
            animationPlayState: 'paused'
          }
        }}
      >
        {/* First set of cards */}
        {travelStories.map((story, idx) => (
          <Card
            key={`first-${idx}`}
            sx={{
              minWidth: 320,
              maxWidth: 320,
              height: 200,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                '& .story-avatar': {
                  transform: 'scale(1.1)',
                }
              },
            }}
          >
            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Avatar 
                  src={story.photo} 
                  alt={story.name} 
                  className="story-avatar"
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    mr: 1.5,
                    border: '2px solid rgba(255,107,53,0.2)',
                    transition: 'transform 0.3s ease'
                  }} 
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'text.primary',
                      fontSize: '0.85rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {story.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.7rem'
                    }}
                  >
                    Traveler
                  </Typography>
                </Box>
              </Box>

              {/* Destination */}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  mb: 1,
                  fontSize: '1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {story.destination}
              </Typography>

              {/* Story */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.5,
                  fontSize: '0.8rem',
                  flex: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  mb: 1.5
                }}
              >
                "{story.story}"
              </Typography>

              {/* Chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={story.duration} 
                  size="small" 
                  sx={{ 
                    background: 'rgba(255,107,53,0.1)', 
                    color: 'primary.main',
                    fontSize: '0.65rem',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }} 
                />
                <Chip 
                  label={story.season} 
                  size="small" 
                  sx={{ 
                    background: 'rgba(76,175,80,0.1)', 
                    color: 'success.main',
                    fontSize: '0.65rem',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Duplicate set for seamless loop */}
        {travelStories.map((story, idx) => (
          <Card
            key={`second-${idx}`}
            sx={{
              minWidth: 320,
              maxWidth: 320,
              height: 200,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                '& .story-avatar': {
                  transform: 'scale(1.1)',
                }
              },
            }}
          >
            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Avatar 
                  src={story.photo} 
                  alt={story.name} 
                  className="story-avatar"
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    mr: 1.5,
                    border: '2px solid rgba(255,107,53,0.2)',
                    transition: 'transform 0.3s ease'
                  }} 
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'text.primary',
                      fontSize: '0.85rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {story.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.7rem'
                    }}
                  >
                    Traveler
                  </Typography>
                </Box>
              </Box>

              {/* Destination */}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  mb: 1,
                  fontSize: '1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {story.destination}
              </Typography>

              {/* Story */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.5,
                  fontSize: '0.8rem',
                  flex: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  mb: 1.5
                }}
              >
                "{story.story}"
              </Typography>

              {/* Chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={story.duration} 
                  size="small" 
                  sx={{ 
                    background: 'rgba(255,107,53,0.1)', 
                    color: 'primary.main',
                    fontSize: '0.65rem',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }} 
                />
                <Chip 
                  label={story.season} 
                  size="small" 
                  sx={{ 
                    background: 'rgba(76,175,80,0.1)', 
                    color: 'success.main',
                    fontSize: '0.65rem',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Testimonials; 