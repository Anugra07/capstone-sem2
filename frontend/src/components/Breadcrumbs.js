import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const routeMap = {
  '': { label: 'Home', icon: <HomeIcon fontSize="small" sx={{ mr: 0.5 }} /> },
  'planner': { label: 'Planner' },
  'login': { label: 'Login' },
  'signup': { label: 'Signup' },
};

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Box sx={{ my: 2, mx: { xs: 1, md: 0 } }}>
      <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon fontSize="small" sx={{ mr: 0.5 }} /> Home
        </Link>
        {pathnames.map((value, idx) => {
          const to = `/${pathnames.slice(0, idx + 1).join('/')}`;
          const isLast = idx === pathnames.length - 1;
          const route = routeMap[value] || { label: value.charAt(0).toUpperCase() + value.slice(1) };
          return isLast ? (
            <Typography color="text.primary" key={to} sx={{ display: 'flex', alignItems: 'center' }}>
              {route.icon} {route.label}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={to}
              color="inherit"
              key={to}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {route.icon} {route.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}

export default Breadcrumbs; 