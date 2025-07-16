import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CardActionArea
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AccountCircle as AccountCircleIcon,
  FlightTakeoff as FlightTakeoffIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

function ProfilePage() {
  const { user: authUser, updateProfile } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [savedTrips, setSavedTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  // Simple effect that only runs once when component mounts
  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }

    // Set initial data from auth context
    setUser(authUser);
    setFormData({
      name: authUser.name || '',
      email: authUser.email || ''
    });

    // Fetch data only once
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetch profile
      try {
        const profileResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          if (profileData.success) {
            setUser(profileData.data.user);
            setFormData({
              name: profileData.data.user.name || '',
              email: profileData.data.user.email || ''
            });
            updateProfile(profileData.data.user);
          }
        } else if (profileResponse.status === 401) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }

      // Fetch saved trips
      setLoadingTrips(true);
      try {
        const tripsResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/saved-trips`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (tripsResponse.ok) {
          const tripsData = await tripsResponse.json();
          setSavedTrips(tripsData.savedTrips || []);
        } else {
          console.error('Failed to fetch saved trips:', tripsResponse.status);
        }
      } catch (error) {
        console.error('Network error fetching saved trips:', error);
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array - only run once

  const handleDeleteTrip = async (tripId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/saved-trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSavedTrips(prev => prev.filter(trip => trip.id !== tripId));
        setSuccess('Trip deleted successfully!');
      } else {
        setError('Failed to delete trip');
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
      setError('Failed to delete trip');
    }
  };

  const handleViewTrip = (trip) => {
    navigate('/planned-trip', { 
      state: { 
        trip: {
          from: trip.from,
          to: trip.to,
          startDate: trip.startDate,
          endDate: trip.endDate,
          budget: trip.budget,
          groupSize: trip.groupSize,
          answer: trip.answer,
          steps: trip.steps,
          accommodations: trip.accommodations,
          foods: trip.foods
        } 
      } 
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.data.user);
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        updateProfile(data.data.user);
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const refreshTrips = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoadingTrips(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/saved-trips`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedTrips(data.savedTrips || []);
      } else {
        console.error('Failed to refresh trips:', response.status);
      }
    } catch (error) {
      console.error('Error refreshing trips:', error);
    } finally {
      setLoadingTrips(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        px: 2
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 2
            }}
          >
            Profile
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Manage your account information and saved trips
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} lg={5}>
            <Card
              elevation={24}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                height: 'fit-content',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Profile Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      fontSize: '2rem',
                      mr: 3
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                      {user.name || 'User'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {user.email}
                    </Typography>
                    <Chip
                      label={`Member since ${formatDate(user.createdAt)}`}
                      size="small"
                      icon={<CalendarIcon />}
                      sx={{ mt: 1, background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white' }}
                    />
                  </Box>
                  {!isEditing && (
                    <IconButton
                      onClick={() => setIsEditing(true)}
                      sx={{
                        p: 2,
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>

                {/* Messages */}
                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                    {success}
                  </Alert>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Profile Form */}
                <Box component="form">
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />

                  {/* Action Buttons */}
                  {isEditing && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                      <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                        sx={{
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                          },
                        }}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={loading}
                        startIcon={<CancelIcon />}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side Container */}
          <Grid item xs={12} lg={7}>
            <Grid container spacing={3} direction="column" sx={{ height: '100%' }}>
              {/* Saved Trips Section */}
              <Grid item xs={12} sx={{ flex: 1 }}>
                <Card
                  elevation={24}
                  sx={{
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlightTakeoffIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Saved Trips
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={refreshTrips}
                        disabled={loadingTrips}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          },
                        }}
                      >
                        {loadingTrips ? 'Refreshing...' : 'Refresh'}
                      </Button>
                    </Box>

                    {loadingTrips ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                      </Box>
                    ) : savedTrips.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <FlightTakeoffIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No saved trips yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          Plan your first trip and save it to see it here!
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => navigate('/planner')}
                          sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                          }}
                        >
                          Plan a Trip
                        </Button>
                      </Box>
                    ) : (
                      <List>
                        {savedTrips.map((trip) => (
                          <ListItem
                            key={trip.id}
                            sx={{
                              mb: 2,
                              borderRadius: 2,
                              border: '1px solid rgba(0,0,0,0.08)',
                              background: 'rgba(255,255,255,0.5)',
                              '&:hover': {
                                background: 'rgba(255,255,255,0.8)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                  {trip.title}
                                </Typography>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {trip.from} → {trip.to}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Saved on {formatDate(trip.createdAt)}
                                  </Typography>
                                </Box>
                              }
                            />
                            <ListItemSecondaryAction>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                  onClick={() => handleViewTrip(trip)}
                                  sx={{ color: 'primary.main' }}
                                  title="View Trip"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleDeleteTrip(trip.id)}
                                  sx={{ color: 'error.main' }}
                                  title="Delete Trip"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Stats Card */}
              <Grid item xs={12} sx={{ flex: 1 }}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Account Statistics
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2, 
                      borderRadius: 2, 
                      background: 'rgba(102, 126, 234, 0.1)',
                      flex: 1,
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}>
                      <AccountCircleIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          Account Type
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Standard User
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2, 
                      borderRadius: 2, 
                      background: 'rgba(255, 107, 53, 0.1)',
                      flex: 1,
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}>
                      <CalendarIcon sx={{ mr: 2, color: '#ff6b35', fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          Member Since
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {formatDate(user.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2, 
                      borderRadius: 2, 
                      background: 'rgba(72, 187, 120, 0.1)',
                      flex: 1,
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}>
                      <FlightTakeoffIcon sx={{ mr: 2, color: '#48bb78', fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          Saved Trips
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {savedTrips.length}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Account Features
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                      label="Travel Planning"
                      size="small"
                      sx={{ background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white' }}
                    />
                    <Chip
                      label="AI Recommendations"
                      size="small"
                      sx={{ background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white' }}
                    />
                    <Chip
                      label="Trip History"
                      size="small"
                      sx={{ background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white' }}
                    />
                    <Chip
                      label="Saved Trips"
                      size="small"
                      sx={{ background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white' }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfilePage; 