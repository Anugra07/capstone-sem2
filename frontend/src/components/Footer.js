import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        py: 6,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
              WanderWise
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Discover India's hidden gems and plan your perfect adventure with our AI-powered travel recommendations.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your trusted companion for offbeat destinations, treks, and local experiences across India.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Home
              </Link>
              <Link href="/planner" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Plan Your Trip
              </Link>
              <Link href="/seasonal-treks" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Seasonal Treks
              </Link>
              <Link href="/profile" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                My Profile
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Developer
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" sx={{ fontSize: 20 }} />
                <Link 
                  href="tel:+918808225553" 
                  color="text.secondary" 
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  +91 8808225553
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="primary" sx={{ fontSize: 20 }} />
                <Link 
                  href="mailto:anugra.gupta2024@nst.rishihood.edu.in" 
                  color="text.secondary" 
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  anugra.gupta2024@nst.rishihood.edu.in
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GitHubIcon color="primary" sx={{ fontSize: 20 }} />
                <Link 
                  href="https://github.com/Anugra07" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  color="text.secondary" 
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  GitHub
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinkedInIcon color="primary" sx={{ fontSize: 20 }} />
                <Link 
                  href="https://www.linkedin.com/in/anugra-gupta-0a421a2bb/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  color="text.secondary" 
                  sx={{ 
                    textDecoration: 'none', 
                    '&:hover': { color: 'primary.main' },
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  LinkedIn
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ 
          borderTop: '1px solid', 
          borderColor: 'divider', 
          mt: 4, 
          pt: 3, 
          textAlign: 'center' 
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 WanderWise. Made with ❤️ by{' '}
            <Link 
              href="mailto:anugra.gupta2024@nst.rishihood.edu.in" 
              color="primary.main" 
              sx={{ 
                textDecoration: 'none', 
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Anugra Gupta
            </Link>
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Rishihood University • NST Program • Travel Technology Project
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 