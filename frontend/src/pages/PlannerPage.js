import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TravelPlannerCard from '../components/TravelPlanner/TravelPlannerCard';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToastNotification from '../components/ToastNotification';
import { useNavigate } from 'react-router-dom';

function PlannerPage() {
  const [result, setResult] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const navigate = useNavigate();

  const handlePlan = (data) => {
    console.log('🎯 PlannerPage received data:', data);
    setResult(data); 
    setToastOpen(true); 
    if (!data.error) {
      navigate('/planned-trip', { state: { trip: data } });
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <TravelPlannerCard onPlan={handlePlan} />
      <ToastNotification open={toastOpen} message="Trip planned!" onClose={() => setToastOpen(false)} />
    </Box>
  );
}

export default PlannerPage; 