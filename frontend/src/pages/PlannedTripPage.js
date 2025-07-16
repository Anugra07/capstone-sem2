import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsIcon from '@mui/icons-material/Directions';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import ReactMarkdown from 'react-markdown';

const heroImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // mountains
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80', // city
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80', // train
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80', // food
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PlannedTripPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.trip;
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  if (!data) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">No trip data found. Please plan a trip first.</Typography>
        <Button onClick={() => navigate('/planner')} startIcon={<ArrowBackIcon />} sx={{ ml: 2 }}>Back to Planner</Button>
      </Box>
    );
  }

  // Pick a hero image based on content (simple random for now)
  const heroImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  // Custom markdown styles
  const markdownSx = {
    fontFamily: 'inherit',
    fontSize: 17,
    color: 'text.primary',
    '& h1, & h2, & h3': { color: 'primary.main', fontWeight: 700, mt: 2, mb: 1 },
    '& ul': { pl: 3, mb: 1 },
    '& li': { mb: 0.5 },
    '& strong': { color: 'secondary.main' },
    '& blockquote': { background: '#fffbe6', borderLeft: '4px solid #FF6B35', p: 1, my: 2, fontStyle: 'italic' },
    '& a': { color: 'primary.main', textDecoration: 'underline' },
    '& p': { mb: 1 },
  };

  // Save Trip handler (placeholder)
  const handleSave = () => {
    setToast({ open: true, message: 'Trip saved to your profile!', severity: 'success' });
  };

  // Share handler
  const handleShare = async () => {
    const shareUrl = window.location.origin + '/planned-trip';
    const shareText = `${data.answer?.split('\n')[0] || 'Check out my planned trip!'}\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Planned Trip', text: shareText, url: shareUrl });
        setToast({ open: true, message: 'Trip shared!', severity: 'success' });
      } catch (e) {
        setToast({ open: true, message: 'Share cancelled.', severity: 'info' });
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setToast({ open: true, message: 'Shareable link copied to clipboard!', severity: 'success' });
      } catch {
        setToast({ open: true, message: 'Could not copy link.', severity: 'error' });
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f7fa' }}>
      {/* Hero Banner */}
      <Box sx={{
        height: 260,
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 0,
        boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
        display: 'flex',
        alignItems: 'flex-end',
        p: 4,
        mb: 4,
        position: 'relative',
      }}>
        <Box sx={{ background: 'rgba(0,0,0,0.45)', p: 2, borderRadius: 2, flex: 1 }}>
          <Typography variant="h4" color="#fff" fontWeight={700} gutterBottom>
            {data.answer?.split('\n')[0] || 'Your Adventure Awaits!'}
          </Typography>
          <Typography variant="subtitle1" color="#fff">
            {data.answer?.match(/\((.*?)\)/)?.[1]}
          </Typography>
        </Box>
        {/* Save/Share Buttons */}
        <Box sx={{ position: 'absolute', top: 18, right: 24, display: 'flex', gap: 1 }}>
          <IconButton color="primary" onClick={handleSave} sx={{ background: '#fff', boxShadow: 1 }} title="Save Trip">
            <SaveIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleShare} sx={{ background: '#fff', boxShadow: 1 }} title="Share Trip">
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
      {/* Trip Summary Card */}
      <Card sx={{ maxWidth: 700, mx: 'auto', mt: -10, mb: 4, borderRadius: 4, boxShadow: '0 4px 24px rgba(44,62,80,0.10)' }}>
        <CardContent>
          <Typography variant="h5" color="primary" fontWeight={600} gutterBottom>Trip Summary</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Budget:</b> {data.answer?.match(/Budget [^\n)]+/)?.[0] || 'N/A'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Group:</b> {data.answer?.toLowerCase().includes('solo') ? 'Solo Traveler' : 'Group'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Dates:</b> {data.answer?.match(/\((.*?)\)/)?.[1] || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
      {/* Sections */}
      <Box sx={{ maxWidth: 700, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {data.steps && (
          <Card sx={{ borderRadius: 4, boxShadow: '0 2px 12px rgba(44,62,80,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DirectionsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Travel Steps</Typography>
              </Box>
              <Box sx={markdownSx}>
                <ReactMarkdown>{data.steps}</ReactMarkdown>
              </Box>
            </CardContent>
          </Card>
        )}
        {data.accommodations && (
          <Card sx={{ borderRadius: 4, boxShadow: '0 2px 12px rgba(44,62,80,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <HomeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Accommodations</Typography>
              </Box>
              <Box sx={markdownSx}>
                <ReactMarkdown>{data.accommodations}</ReactMarkdown>
              </Box>
            </CardContent>
          </Card>
        )}
        {data.foods && (
          <Card sx={{ borderRadius: 4, boxShadow: '0 2px 12px rgba(44,62,80,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <RestaurantIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Local Eateries</Typography>
              </Box>
              <Box sx={markdownSx}>
                <ReactMarkdown>{data.foods}</ReactMarkdown>
              </Box>
            </CardContent>
          </Card>
        )}
        {/* Important Notes Section */}
        {data.answer && data.answer.toLowerCase().includes('important note') && (
          <Card sx={{ borderRadius: 4, background: 'linear-gradient(90deg, #FFF8DC 60%, #FF6B35 100%)', boxShadow: '0 2px 12px rgba(255,107,53,0.10)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <InfoIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" color="warning.main">Important Notes</Typography>
              </Box>
              <Box sx={markdownSx}>
                <ReactMarkdown>{data.answer.split('**Important Note').slice(1).join('**Important Note')}</ReactMarkdown>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, mb: 4, display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/planner')}>Back to Planner</Button>
      </Box>
      {/* Toast Notification */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PlannedTripPage; 