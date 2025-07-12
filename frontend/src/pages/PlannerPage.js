import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TravelPlannerCard from '../components/TravelPlanner/TravelPlannerCard';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToastNotification from '../components/ToastNotification';

function PlannerPage() {
  const [result, setResult] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Box sx={{ py: 6 }}>
      <TravelPlannerCard onPlan={data => { 
        console.log('🎯 PlannerPage received data:', data);
        setResult(data); 
        setToastOpen(true); 
      }} />
      {result && (
        <Box sx={{ mt: 6, maxWidth: 540, mx: 'auto', background: '#fff', borderRadius: 4, p: 3, boxShadow: '0 4px 16px rgba(34,34,34,0.08)' }}>
          <Typography variant="h5" color="primary" gutterBottom>Trip Plan Summary</Typography>
          <Divider sx={{ mb: 2 }} />
          {result.error ? (
            <Typography color="error">{result.error}</Typography>
          ) : (
            <Box>
              {result.steps && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    🚗 Travel Steps
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {result.steps}
                  </Typography>
                </Box>
              )}
              
              {result.accommodations && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    🏠 Accommodations
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {result.accommodations}
                  </Typography>
                </Box>
              )}
              
              {result.foods && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    🍽️ Local Eateries
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {result.foods}
                  </Typography>
                </Box>
              )}
              
              {!result.steps && !result.accommodations && !result.foods && (
                <Box>
                  <Typography variant="h6" color="primary" gutterBottom>
                    📋 Complete Plan
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {result.answer}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
      <ToastNotification open={toastOpen} message="Trip planned!" onClose={() => setToastOpen(false)} />
    </Box>
  );
}

export default PlannerPage; 