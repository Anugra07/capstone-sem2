import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/planner');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Card elevation={4} sx={{ p: 2, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth variant="outlined" />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth variant="outlined" />
            <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>Sign Up</Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignupPage; 