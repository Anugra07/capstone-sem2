import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ToastNotification({ open, message, severity = 'success', onClose, duration = 3000 }) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ToastNotification; 