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
      <TravelPlannerCard onPlan={data => { setResult(data); setToastOpen(true); }} />
      {result && (
        <Box sx={{ mt: 6, maxWidth: 540, mx: 'auto', background: '#fff', borderRadius: 4, p: 3, boxShadow: '0 4px 16px rgba(34,34,34,0.08)' }}>
          <Typography variant="h5" color="primary" gutterBottom>Trip Plan Summary</Typography>
          <Divider sx={{ mb: 2 }} />
          {result.error ? (
            <Typography color="error">{result.error}</Typography>
          ) : (
            <pre style={{ fontFamily: 'inherit', fontSize: 16, background: 'none', padding: 0, whiteSpace: 'pre-wrap' }}>{result.answer}</pre>
          )}
        </Box>
      )}
      <ToastNotification open={toastOpen} message="Trip planned!" onClose={() => setToastOpen(false)} />
    </Box>
  );
}

export default PlannerPage; 