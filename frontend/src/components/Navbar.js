import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Planner', to: '/planner' },
  { label: 'Login', to: '/login' },
  { label: 'Signup', to: '/signup' },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();

  // Add shadow on scroll
  const [elevate, setElevate] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setElevate(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={elevate ? 4 : 1}
      sx={{ zIndex: 1201, transition: 'box-shadow 0.3s' }}
    >
      <Toolbar>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ mr: 2, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Logo" style={{ height: 36, marginRight: 8 }} />
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main', textDecoration: 'none' }} component={Link} to="/">
          Indian Offbeat Travel Guide
        </Typography>
        {/* Search Bar */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2, background: '#f2f2f2', borderRadius: 2, px: 1 }}>
          <SearchIcon color="primary" />
          <InputBase
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ ml: 1, flex: 1, minWidth: 120 }}
            inputProps={{ 'aria-label': 'search destinations' }}
          />
        </Box>
        {/* Desktop Nav Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navLinks.map(link => (
            <Button
              key={link.to}
              color={location.pathname === link.to ? 'primary' : 'inherit'}
              component={Link}
              to={link.to}
              sx={{ fontWeight: 600 }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 220, pt: 2 }}>
            <List>
              {navLinks.map(link => (
                <ListItem key={link.to} disablePadding>
                  <ListItemButton component={Link} to={link.to} onClick={() => setDrawerOpen(false)} selected={location.pathname === link.to}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mt: 2, background: '#f2f2f2', borderRadius: 2 }}>
              <SearchIcon color="primary" />
              <InputBase
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ ml: 1, flex: 1, minWidth: 80 }}
                inputProps={{ 'aria-label': 'search destinations' }}
              />
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 